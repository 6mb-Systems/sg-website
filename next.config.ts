import type { NextConfig } from "next";
import path from "path";

/**
 * Content-Security-Policy — enforced.
 *
 * `'unsafe-inline'` is required today for:
 *   - styled-components (injects inline <style> tags at runtime)
 *   - framer-motion (inline style attrs on animated elements)
 *   - Next.js + the embedded Sanity Studio (runtime style injection)
 *   - Google Analytics gtag bootstrap (inline <Script> in app/layout)
 * These can be removed later by switching to a nonce-based CSP. Next 16's
 * middleware-nonce pattern would let us drop 'unsafe-inline' for scripts
 * (but not for styles, which styled-components still needs). That's a
 * future tightening pass; 'unsafe-inline' is acceptable today because
 * XSS sinks are locked down separately (HTML escaping in email bodies,
 * safeLinkHref in Portable Text, no dangerouslySetInnerHTML on user data).
 *
 * `'unsafe-eval'` is required by the embedded Sanity Studio runtime at
 * /studio. If Studio is ever moved to a separate subdomain we can drop it.
 *
 * If any real user report shows a CSP block on production, the fastest
 * mitigation is to rename this header back to
 * `Content-Security-Policy-Report-Only`, redeploy, then add the missing
 * host to the correct directive below.
 */
const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "https://cdn.sanity.io",
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
  ],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://cdn.sanity.io",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://*.sanity.io",
  ],
  "font-src": [
    "'self'",
    "data:",
    "https://fonts.gstatic.com",
  ],
  "connect-src": [
    "'self'",
    "https://*.sanity.io",
    "https://cdn.sanity.io",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://*.googletagmanager.com",
    "https://www.google.com/recaptcha/",
  ],
  "frame-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    // Office location embeds on /contact use the Google Maps embed URL.
    "https://maps.google.com",
    "https://www.google.com/maps/",
  ],
  "worker-src": ["'self'", "blob:"],
  "media-src": ["'self'", "https://cdn.sanity.io"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'self'"],
  "upgrade-insecure-requests": [],
};

const cspValue = Object.entries(cspDirectives)
  .map(([directive, sources]) =>
    sources.length === 0 ? directive : `${directive} ${sources.join(" ")}`
  )
  .join("; ");

/**
 * Baseline security response headers applied to every route.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspValue,
  },
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

  // Turbopack otherwise picks the parent folder when another lockfile exists nearby
  // (e.g. pnpm-lock.yaml in `C:\Users\<you>` while this project uses npm).
  turbopack: {
    root: path.resolve(process.cwd()),
  },

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

  async redirects() {
    return [
      {
        source: "/blog-pdfs/Client-Service-Guide.pdf",
        destination: "/pdfs/Client-Service-Guide.pdf",
        permanent: true,
      },
      {
        // RFC 9116 canonical location is /.well-known/security.txt, but many
        // automated scanners still probe /security.txt at the root. Redirect
        // so both work and we don't get false-positive "missing security.txt"
        // reports from security scoring tools.
        source: "/security.txt",
        destination: "/.well-known/security.txt",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply baseline security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Keep the embedded Sanity Studio out of search engines. This is a
        // defence-in-depth layer on top of the `robots` metadata and robots.txt.
        source: "/studio/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        // Belt-and-braces: never let form / API responses be cached by CDNs,
        // intermediaries, or browsers. Each route also returns no-store, but
        // setting it here guarantees it for any future route under /api/*.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
