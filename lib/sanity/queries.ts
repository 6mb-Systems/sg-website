import { sanityClient, isSanityConfigured } from "./client";
import type { PortableTextBlock } from "@portabletext/types";
import type { QueryParams } from "@sanity/client";

// Type definitions
export interface SanityPost {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  // Portable Text blocks + custom blocks (e.g. richTableBlock)
  body?: Array<PortableTextBlock | Record<string, unknown>>;
  category?: {
    title: string;
    slug: { current: string };
  };
  secondaryCategory?: {
    title: string;
    slug: { current: string };
  };
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
  readTime?: number;
  downloadCount?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: {
        _ref: string;
      };
    };
  };
  pdfFile?: {
    asset?: {
      url: string;
    };
  };
  isWebinarPost?: boolean;
  isUpcomingEvent?: boolean;
  videoUrl?: string;
}

export interface SanityWebinar {
  _id: string;
  _type: "webinar";
  title: string;
  slug: { current: string };
  excerpt?: string;
  date: string;
  duration?: string;
  status: "upcoming" | "live" | "replay";
  presenter?: {
    name: string;
    role?: string;
  };
  category?: {
    title: string;
  };
  videoUrl?: string;
  attendeeCount?: number;
}

export interface SanityEvent {
  _id: string;
  _type: "event";
  title: string;
  slug: { current: string };
  excerpt?: string;
  date: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  registrationUrl?: string;
}

// GROQ Queries
const postFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "category": category->{title, "slug": slug.current},
  "secondaryCategory": secondaryCategory->{title, "slug": slug.current},
  "author": author->{name, image},
  readTime,
  downloadCount,
  isWebinarPost,
  isUpcomingEvent,
  videoUrl
`;

async function fetchSanity<T>(
  query: string,
  fallback: T,
  params?: QueryParams
): Promise<T> {
  try {
    return params
      ? await sanityClient.fetch<T>(query, params)
      : await sanityClient.fetch<T>(query);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn("Sanity fetch failed in local development. Using fallback data.", error);
    return fallback;
  }
}

const postFieldsWithBody = `
  ${postFields},
  body,
  seo,
  pdfFile { asset-> { url } }
`;

// Get all published posts
export async function getPosts(limit?: number): Promise<SanityPost[]> {
  if (!isSanityConfigured()) {
    console.warn("Sanity is not configured. Returning empty array.");
    return [];
  }

  const limitClause = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) ${limitClause} {
    ${postFields}
  }`;

  return fetchSanity<SanityPost[]>(query, []);
}

// Get fact-sheet posts only (not webinar/event), newest first
export async function getFactsheetPosts(limit?: number): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];
  const limitClause = limit != null ? `[0...${limit}]` : "";
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && isWebinarPost != true] | order(publishedAt desc) ${limitClause} {
    ${postFields}
  }`;
  return fetchSanity<SanityPost[]>(query, []);
}

// Get webinar/event posts only
export async function getWebinarPosts(): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && isWebinarPost == true] | order(publishedAt desc) {
    ${postFields}
  }`;
  return fetchSanity<SanityPost[]>(query, []);
}

// Get posts by category
export async function getPostsByCategory(
  categorySlug: string
): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "post" && !(_id in path("drafts.**")) && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${postFields}
  }`;

  return fetchSanity<SanityPost[]>(query, [], { categorySlug });
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${postFieldsWithBody}
  }`;

  return fetchSanity<SanityPost | null>(query, null, { slug });
}

// Get all webinars
export async function getWebinars(): Promise<SanityWebinar[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "webinar" && !(_id in path("drafts.**"))] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    date,
    duration,
    status,
    presenter,
    "category": category->{title},
    videoUrl,
    attendeeCount
  }`;

  return fetchSanity<SanityWebinar[]>(query, []);
}

// Get all events
export async function getEvents(): Promise<SanityEvent[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "event" && !(_id in path("drafts.**")) && date >= now()] | order(date asc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    date,
    endDate,
    location,
    isVirtual,
    registrationUrl
  }`;

  return fetchSanity<SanityEvent[]>(query, []);
}

// Get all categories that have at least one published post
export async function getCategories(): Promise<
  { title: string; slug: string }[]
> {
  if (!isSanityConfigured()) return [];

  // Only return categories referenced by at least one published post,
  // excluding WordPress organisational/layout categories
  const excluded = [
    "home box", "fact find", "event details", "past event details",
    "past events", "events", "uncategorized", "sg blog", "blog",
    "segregations", // duplicate of "segregation"
  ];
  // A category appears in the filter bar if it is referenced by at least one
  // published post as either the primary (`category`) or secondary
  // (`secondaryCategory`) tag. Clicking the pill then matches cards against
  // both fields in EducationHub.tsx.
  const query = `*[_type == "category"
    && count(*[_type == "post"
      && !(_id in path("drafts.**"))
      && (category._ref == ^._id || secondaryCategory._ref == ^._id)
    ]) > 0
    && !(lower(title) in ${JSON.stringify(excluded)})
  ] | order(title asc) {
    title,
    "slug": slug.current
  }`;

  const raw = await fetchSanity<Array<{ title: string; slug: string }>>(query, []);

  // Decode HTML entities (e.g. &amp; → &) and deduplicate by normalised title
  const seen = new Set<string>();
  const result: { title: string; slug: string }[] = [];
  for (const cat of raw) {
    const decoded = cat.title
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    const key = decoded.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      result.push({ title: decoded, slug: cat.slug });
    }
  }
  return result;
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "post" && !(_id in path("drafts.**"))].slug.current`;

  return fetchSanity<string[]>(query, []);
}

// Get slug + last-modified timestamp for each post — used by app/sitemap.ts.
// `_updatedAt` is a Sanity built-in that moves whenever the document changes,
// which is the right signal for <lastmod> in a sitemap.
export async function getAllPostsForSitemap(): Promise<
  Array<{ slug: string; updatedAt: string }>
> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`;

  const rows = await fetchSanity<
    | Array<{ slug?: string; updatedAt?: string }>
    | null
  >(query, null);
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r): r is { slug: string; updatedAt: string } =>
      typeof r.slug === "string" && typeof r.updatedAt === "string"
    )
    .map((r) => ({ slug: r.slug, updatedAt: r.updatedAt }));
}
