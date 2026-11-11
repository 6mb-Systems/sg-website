import type { MetadataRoute } from "next";

/**
 * robots.txt at the site root.
 *
 * Explicitly block search engines from:
 *  - /studio/*  — the embedded Sanity Studio login surface
 *  - /api/*     — all POST endpoints (emails, rate-limited)
 *  - /_next/*   — build artefacts
 *  - /cybersecurityandyoursmsf and /client-updates/ — unlisted client newsletter
 *
 * Everything else (including the blog at /education/*) is allowed.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.superguardian.com.au";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/studio/",
          "/api/",
          "/_next/",
          "/cybersecurityandyoursmsf",
          "/client-updates/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
