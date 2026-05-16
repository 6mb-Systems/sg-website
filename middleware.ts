import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Top-level app routes that must NOT be redirected to /education/.
 * Matches the directories under /app (plus static/system paths).
 */
const REAL_ROUTES = new Set([
  "PDF",
  "api",
  "careers",
  "contact",
  "education",
  "hive",
  "login",
  "partnerships",
  "pricing",
  "search",
  "security",
  "sg-forms",
  "studio",
  "webinars",
  "who-we-are",
  ".well-known",
  "_next",
  "pdfs",
  "blog-pdfs",
  "public",
]);

/**
 * Redirects old WordPress fact-sheet URLs from the site root to /education/.
 *
 * The original WordPress site served every fact sheet at /{slug}/ (root level).
 * The new Next.js site serves them at /education/{slug}. Google still has the
 * old URLs indexed, so any root-level path that isn't a real app route gets a
 * 301 to the corresponding /education/ path.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Split off the leading slash, strip trailing slash, get first segment.
  const trimmed = pathname.replace(/^\//, "").replace(/\/$/, "");
  const firstSegment = trimmed.split("/")[0];

  // Skip empty (home), known real routes, and static file extensions.
  if (
    !firstSegment ||
    REAL_ROUTES.has(firstSegment) ||
    /\.[a-z0-9]+$/i.test(firstSegment)
  ) {
    return NextResponse.next();
  }

  // Single-segment root path only (e.g. /smsf-windups or /smsf-windups/).
  // Multi-segment paths not under a known route are 404 territory, not ours to redirect.
  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length !== 1) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/education/${firstSegment}`;
  return NextResponse.redirect(url, { status: 301 });
}

export const config = {
  // Run on all paths except Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
