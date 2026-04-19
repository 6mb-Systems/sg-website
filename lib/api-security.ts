import type { NextRequest } from "next/server";

/**
 * Shared security helpers for the public form API routes.
 *
 * Keeping this in one place so /api/contact, /api/careers-application, and
 * /api/webinar-notify share the same Origin check, rate-limiting, HTML
 * escaping, input validation, and reCAPTCHA verification behaviour.
 */

// ---------- HTML escaping ----------

/**
 * Escape a string for safe interpolation into an HTML email body.
 * Covers the five characters that matter for HTML contexts (&, <, >, ", ').
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Client IP ----------

/**
 * Read the client IP from proxy headers.
 *
 * Preference order:
 *   1. `x-vercel-forwarded-for` — set by Vercel's edge on every request and
 *      NOT settable by the client, so it can't be spoofed to reset a
 *      per-IP rate-limit bucket. This is the only source we trust in prod.
 *   2. `x-real-ip` — often set by other trusted proxies.
 *   3. `x-forwarded-for` (first hop only) — user-settable, but a reasonable
 *      fallback for local dev or non-Vercel deployments.
 */
export function getClientIp(request: NextRequest): string {
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) {
    const first = vercel.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

// ---------- Origin check (CSRF mitigation) ----------

/**
 * Parse a comma-separated list of allowed origins from env, trimming and
 * stripping trailing slashes so "https://foo/" and "https://foo" match.
 */
function allowedOrigins(): string[] {
  const list: string[] = [];
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) list.push(site);
  const extra = process.env.ALLOWED_ORIGINS;
  if (extra) list.push(...extra.split(","));
  return list
    .map((v) => v.trim().replace(/\/+$/, ""))
    .filter((v) => v.length > 0);
}

/**
 * Verify the request originated from a page we serve. This is a lightweight
 * CSRF defence: a cross-origin fetch() will either omit Origin (server-to-
 * server) or send the attacker's origin. Either way we reject.
 *
 * In development (NODE_ENV !== "production") we skip the check so local
 * testing from http://localhost:3000 keeps working without extra config.
 */
export function verifyOrigin(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const candidate = origin || referer;
  if (!candidate) return false;

  let candidateOrigin: string;
  try {
    candidateOrigin = new URL(candidate).origin;
  } catch {
    return false;
  }
  const allow = allowedOrigins();
  // If nothing is configured in prod, fail closed — easier to notice in logs
  // than silently accepting everything.
  if (allow.length === 0) return false;
  return allow.some((a) => a === candidateOrigin);
}

// ---------- Rate limiting ----------
//
// Two backends are supported. The first one that is available wins:
//
//   1. Upstash Redis over HTTPS, when UPSTASH_REDIS_REST_URL and
//      UPSTASH_REDIS_REST_TOKEN are set. This is the only mode that gives
//      accurate per-IP limits across N serverless instances. Implemented with
//      plain fetch() so we don't pull in @upstash/ratelimit or @upstash/redis
//      as dependencies.
//
//   2. In-memory fallback, per serverless instance. Good enough for local
//      dev and preview deploys; degraded but safe in prod.

type RateRecord = { count: number; lastReset: number };

const rateLimitStore = new Map<string, RateRecord>();
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_STORE_SOFT_LIMIT = 2000;

function upstashEnabled(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

async function checkRateLimitUpstash(ip: string): Promise<boolean> {
  const base = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const key = `ratelimit:form:${ip}`;

  try {
    // Pipeline: INCR + EXPIRE in a single round-trip. EXPIRE is a no-op if
    // the key already has a TTL, so on the second+ hit within the window it
    // just increments.
    const res = await fetch(`${base}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(RATE_LIMIT_WINDOW_SECONDS), "NX"],
      ]),
      // If Upstash is slow, fail open rather than blocking a real user.
      signal: AbortSignal.timeout(800),
    });

    if (!res.ok) {
      console.error(
        `[security] Upstash rate-limit HTTP ${res.status}; falling back to in-memory`
      );
      return checkRateLimitMemory(ip);
    }

    const body = (await res.json()) as Array<{ result?: number }>;
    const count = body?.[0]?.result;
    if (typeof count !== "number") {
      console.error("[security] Upstash rate-limit: unexpected response shape");
      return checkRateLimitMemory(ip);
    }
    return count <= RATE_LIMIT_MAX;
  } catch (err) {
    console.error("[security] Upstash rate-limit error:", err);
    return checkRateLimitMemory(ip);
  }
}

function checkRateLimitMemory(ip: string): boolean {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SECONDS * 1000;

  if (rateLimitStore.size > RATE_LIMIT_STORE_SOFT_LIMIT) {
    for (const [key, rec] of rateLimitStore) {
      if (now - rec.lastReset > windowMs) {
        rateLimitStore.delete(key);
      }
    }
  }

  const record = rateLimitStore.get(ip);
  if (!record || now - record.lastReset > windowMs) {
    rateLimitStore.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

/**
 * Allow up to RATE_LIMIT_MAX requests per IP per RATE_LIMIT_WINDOW_SECONDS.
 * Returns true when the request is under the limit, false when it should be
 * rejected with 429.
 */
export async function checkRateLimit(ip: string): Promise<boolean> {
  if (upstashEnabled()) {
    return checkRateLimitUpstash(ip);
  }
  return checkRateLimitMemory(ip);
}

// ---------- Input validation ----------

/**
 * Accept a string, trim it, reject control characters and anything longer
 * than `maxLength`. Returns null on invalid input, an empty string for a
 * missing optional field.
 *
 * By default only prints are allowed — newlines and carriage returns are
 * rejected so the value is safe to embed in an email subject line or any
 * other single-line context. Pass `{ multiline: true }` for fields like a
 * free-form message where LF/CR/tab are expected.
 */
export function sanitizeString(
  value: unknown,
  maxLength: number,
  opts: { multiline?: boolean } = {}
): string | null {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length > maxLength) return null;
  const re = opts.multiline
    ? // eslint-disable-next-line no-control-regex
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/
    : // eslint-disable-next-line no-control-regex
      /[\u0000-\u001F]/;
  if (re.test(trimmed)) return null;
  return trimmed;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an email address. RFC 5321 caps addresses at 254 octets — enforcing
 * that prevents memory abuse and keeps us well below Resend's limits.
 */
export function sanitizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return null;
  if (!EMAIL_RE.test(trimmed)) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) return null;
  return trimmed;
}

// ---------- File signature (magic-number) check ----------

/**
 * Very small magic-number check for resume uploads. We already enforce
 * extension + MIME allow-lists in the route; this is the third layer so a
 * renamed .exe → .pdf doesn't get relayed to a human inbox as a real PDF.
 *
 * Recognised headers:
 *   - PDF  : "%PDF-"                      (25 50 44 46 2D)
 *   - DOC  : OLE compound file (D0CF11E0) — legacy Word .doc
 *   - DOCX : ZIP archive (504B0304)       — modern Word, also Pages/etc
 *            plus the deprecated legacy ZIP signatures (PK 0506, PK 0708)
 */
export function isAllowedResumeSignature(bytes: Uint8Array): boolean {
  if (bytes.length < 4) return false;

  const b0 = bytes[0];
  const b1 = bytes[1];
  const b2 = bytes[2];
  const b3 = bytes[3];

  // %PDF
  if (
    b0 === 0x25 &&
    b1 === 0x50 &&
    b2 === 0x44 &&
    b3 === 0x46 &&
    bytes[4] === 0x2d
  ) {
    return true;
  }

  // Legacy DOC (OLE compound file)
  if (
    bytes.length >= 8 &&
    b0 === 0xd0 &&
    b1 === 0xcf &&
    b2 === 0x11 &&
    b3 === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1
  ) {
    return true;
  }

  // DOCX / any ZIP container
  if (b0 === 0x50 && b1 === 0x4b) {
    if (
      (b2 === 0x03 && b3 === 0x04) ||
      (b2 === 0x05 && b3 === 0x06) ||
      (b2 === 0x07 && b3 === 0x08)
    ) {
      return true;
    }
  }

  return false;
}

// ---------- reCAPTCHA v3 verification ----------

export type RecaptchaResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

/**
 * Verify a reCAPTCHA v3 token with Google's siteverify endpoint.
 *
 * Behaviour:
 *  - In production, the secret MUST be configured. A missing secret causes
 *    the request to be rejected (fail-closed).
 *  - In local development (NODE_ENV === "development"), if no secret is set
 *    the check is skipped so `next dev` works without extra config. The
 *    previous behaviour skipped whenever NODE_ENV !== "production", which
 *    also silently skipped in "test" and any unset NODE_ENV — we now fail
 *    closed outside of true development.
 *  - A score below 0.5 is treated as a failure.
 */
export async function verifyRecaptcha(
  token: unknown,
  action: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const isDev = process.env.NODE_ENV === "development";

  if (!secret) {
    if (isDev) {
      return { ok: true };
    }
    console.error(
      `[security] RECAPTCHA_SECRET_KEY is not set (action=${action})`
    );
    return {
      ok: false,
      status: 500,
      error: "Security check is not configured.",
    };
  }

  if (typeof token !== "string" || token.length === 0 || token.length > 4096) {
    return {
      ok: false,
      status: 400,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  try {
    // POST as application/x-www-form-urlencoded so the secret isn't leaked in
    // the URL (query strings often end up in access logs).
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (
      !data.success ||
      typeof data.score !== "number" ||
      data.score < 0.5
    ) {
      // Log the score on failure so we can tune the threshold from real data.
      console.warn(
        `[security] reCAPTCHA rejected (action=${action} score=${
          data.score ?? "n/a"
        } codes=${(data["error-codes"] ?? []).join(",")})`
      );
      return {
        ok: false,
        status: 400,
        error: "reCAPTCHA verification failed. Please try again.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("[security] reCAPTCHA verify error:", err);
    return {
      ok: false,
      status: 502,
      error: "Security check failed. Please try again.",
    };
  }
}

// ---------- Safe JSON parse ----------

/**
 * Parse a JSON request body, guarding against invalid JSON and enforcing a
 * maximum serialised size. Next's default body limit is 1MB but we cap much
 * lower for form submissions to minimise the blast radius of a flood.
 */
export async function readJsonBody<T = unknown>(
  request: NextRequest,
  maxBytes = 32 * 1024 // 32KB is plenty for a contact form
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const text = await request.text();
    if (text.length > maxBytes) {
      return { ok: false, error: "Request body too large." };
    }
    if (text.length === 0) {
      return { ok: false, error: "Empty request body." };
    }
    return { ok: true, data: JSON.parse(text) as T };
  } catch {
    return { ok: false, error: "Invalid JSON." };
  }
}
