/**
 * security.txt — RFC 9116
 *
 * Served at /.well-known/security.txt so security researchers have a clear,
 * machine-readable way to report issues.
 *
 * The `Expires` field MUST be less than a year in the future. We compute it
 * dynamically (12 months from the first request that lands on a given build)
 * so it can never go stale — if the site hasn't redeployed in >12 months
 * something else is wrong.
 */

export const runtime = "nodejs";
// Regenerate at most once per day so the Expires field stays fresh.
export const revalidate = 86400;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.superguardian.com.au"
).replace(/\/+$/, "");

// Primary inbox for coordinated disclosure. If you want a dedicated alias
// (security@superguardian.com.au) set up later, change this in one place.
const SECURITY_CONTACT_EMAIL = "info@superguardian.com.au";

export async function GET() {
  const expires = new Date();
  // 11 months: under the RFC 9116 maximum of 12 months, with a month of
  // buffer so a slightly delayed rebuild doesn't ship an expired file.
  expires.setMonth(expires.getMonth() + 11);

  const body = [
    `Contact: mailto:${SECURITY_CONTACT_EMAIL}`,
    `Expires: ${expires.toISOString()}`,
    `Preferred-Languages: en`,
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    ``,
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
