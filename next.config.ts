import type { NextConfig } from "next";

/**
 * Baseline security response headers applied to every route.
 *
 * A strict Content-Security-Policy is intentionally NOT set here — the site
 * relies on Google Tag Manager / Analytics, reCAPTCHA v3, styled-components
 * injected <style> tags, framer-motion inline styles, and an embedded Sanity
 * Studio at /studio. A too-tight CSP would break those without careful
 * per-route tuning. This should be added later in report-only mode and then
 * enforced once tuned.
 */
const securityHeaders = [
  {
    // Force HTTPS for two years on this host and all subdomains.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Disable MIME type sniffing so browsers honour our Content-Type.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Only same-origin framing is allowed. The embedded Sanity Studio lives
    // at /studio on the same origin so this is compatible.
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Send the origin on cross-origin requests and the full URL only for
    // same-origin navigations. Keeps internal paths out of external referers.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Disable powerful browser features we don't use.
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=(), interest-cohort=(), browsing-topics=()",
  },
  {
    // Legacy XSS filter — modern browsers ignore it, but setting it to 0
    // disables a known vulnerable implementation in older Edge/IE.
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    // Allow DNS prefetching for external assets (sanity CDN, fonts, GA).
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Don't leak the Next.js version in the X-Powered-By response header.
  poweredByHeader: false,

  images: {
    // Next 16 only generates optimized variants for qualities listed here.
    // Profile photos on the "who we are" page request q=90, so it has to be
    // in the allow-list or Next refuses to serve the optimized image.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply baseline security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
