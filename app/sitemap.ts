import type { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/sanity/queries";

/**
 * XML sitemap served at /sitemap.xml.
 *
 * Contains every public route that real users / search engines should reach:
 *   - the marketing pages under app/*
 *   - one entry per Sanity post under /education/<slug>
 *
 * Deliberately excluded:
 *   - /studio/*  (admin surface — also blocked in robots.ts)
 *   - /api/*     (POST-only form endpoints)
 *   - /login     (just an outbound-link hub, no SEO value)
 */

// Regenerate at most once an hour. A blog post update will show up in the
// sitemap within that window.
export const revalidate = 3600;

type SitemapEntry = MetadataRoute.Sitemap[number];

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.superguardian.com.au"
).replace(/\/+$/, "");

// Static marketing routes. `changeFrequency` and `priority` are hints only —
// crawlers mostly ignore them, but we set them for completeness.
const staticRoutes: Array<{
  path: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/who-we-are", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hive", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partnerships", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sg-forms", changeFrequency: "monthly", priority: 0.6 },
  { path: "/security", changeFrequency: "yearly", priority: 0.5 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/education", changeFrequency: "weekly", priority: 0.9 },
  { path: "/webinars", changeFrequency: "weekly", priority: 0.8 },
  {
    path: "/education/calculators/division-296",
    changeFrequency: "yearly",
    priority: 0.6,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPostsForSitemap();
    postEntries = posts.map((p) => ({
      url: `${siteUrl}/education/${encodeURIComponent(p.slug)}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    // If Sanity is unreachable we still want the static sitemap to ship,
    // rather than 500-ing the whole /sitemap.xml request.
    console.error("[sitemap] Failed to load posts from Sanity:", err);
  }

  return [...staticEntries, ...postEntries];
}
