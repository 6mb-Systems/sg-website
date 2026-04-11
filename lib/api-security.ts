import type { NextRequest } from "next/server";

/**
 * Shared security helpers for the public form API routes.
 *
 * Keeping this in one place so both /api/contact and /api/webinar-notify
 * share the exact same rate-limiting, HTML escaping, input validation, and
 * reCAPTCHA verification behaviour — a bug fixed here gets fixed for both.
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

// ---------- Rate limiting (in-memory, best-effort) ----------
//
// This works per serverless instance only, so it is a soft defence — if the
// app runs on multiple warm instances, an attacker can still send
// RATE_LIMIT_MAX * N requests per window. Combined with reCAPTCHA v3 and the
// honeypot, this is acceptable for a low-traffic marketing site. For stronger
// guarantees, move to an external store (Upstash / Redis / Vercel KV).

type RateRecord = { count: number; lastReset: number };

const rateLimitStore = new Map<string, RateRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per IP per window
const RATE_LIMIT_STORE_SOFT_LIMIT = 2000;

/**
 * Read the client IP from proxy headers. On Vercel and most CDNs this is
 * populated; locally it falls back to "unknown".
 */
export function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the Map cannot grow unbounded over the lifetime
  // of a long-lived serverless instance.
  if (rateLimitStore.size > RATE_LIMIT_STORE_SOFT_LIMIT) {
    for (const [key, rec] of rateLimitStore) {
      if (now - rec.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }

  const record = rateLimitStore.get(ip);
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
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
  // Control-char filter. For single-line fields (default) we reject *all*
  // C0 controls so newlines/carriage returns can't be smuggled into subject
  // lines or other headers. For multiline fields we allow \t, \n, \r.
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
  // Reject control chars (email-header injection defence).
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) return null;
  return trimmed;
}

// ---------- reCAPTCHA v3 verification ----------

export type RecaptchaResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

/**
 * Verify a reCAPTCHA v3 token with Google's siteverify endpoint.
 *
 * Behaviour:
 *  - In development, if RECAPTCHA_SECRET_KEY is not set, verification is
 *    skipped (matches the existing dev workflow).
 *  - In production, the secret MUST be configured. A missing secret causes
 *    the request to be rejected (fail-closed) rather than silently bypassing
 *    the check, which is what the old code did.
 *  - A score below 0.5 is treated as a failure.
 */
export async function verifyRecaptcha(
  token: unknown,
  action: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const isProd = process.env.NODE_ENV === "production";

  if (!secret) {
    if (isProd) {
      console.error(
        `[security] RECAPTCHA_SECRET_KEY is not set in production (action=${action})`
      );
      return {
        ok: false,
        status: 500,
        error: "Security check is not configured.",
      };
    }
    // Dev/test: allow through so local testing works without a secret.
    return { ok: true };
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
