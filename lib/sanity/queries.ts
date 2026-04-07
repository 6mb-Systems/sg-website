import { sanityClient, isSanityConfigured } from "./client";
import type { PortableTextBlock } from "@portabletext/types";

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
  "author": author->{name, image},
  readTime,
  downloadCount,
  isWebinarPost,
  isUpcomingEvent,
  videoUrl
`;

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

  return sanityClient.fetch(query);
}

// Get fact-sheet posts only (not webinar/event), newest first
export async function getFactsheetPosts(limit?: number): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];
  const limitClause = limit != null ? `[0...${limit}]` : "";
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && isWebinarPost != true] | order(publishedAt desc) ${limitClause} {
    ${postFields}
  }`;
  return sanityClient.fetch(query);
}

// Get webinar/event posts only
export async function getWebinarPosts(): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && isWebinarPost == true] | order(publishedAt desc) {
    ${postFields}
  }`;
  return sanityClient.fetch(query);
}

// Get posts by category
export async function getPostsByCategory(
  categorySlug: string
): Promise<SanityPost[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "post" && !(_id in path("drafts.**")) && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${postFields}
  }`;

  return sanityClient.fetch(query, { categorySlug });
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${postFieldsWithBody}
  }`;

  return sanityClient.fetch(query, { slug });
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

  return sanityClient.fetch(query);
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

  return sanityClient.fetch(query);
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
  const query = `*[_type == "category"
    && count(*[_type == "post" && !(_id in path("drafts.**")) && references(^._id)]) > 0
    && !(lower(title) in ${JSON.stringify(excluded)})
  ] | order(title asc) {
    title,
    "slug": slug.current
  }`;

  const raw: { title: string; slug: string }[] = await sanityClient.fetch(query);

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

  return sanityClient.fetch(query);
}
