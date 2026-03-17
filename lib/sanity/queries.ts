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
  downloadCount
`;

const postFieldsWithBody = `
  ${postFields},
  body,
  seo
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

// Get all categories
export async function getCategories(): Promise<
  { title: string; slug: string }[]
> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }`;

  return sanityClient.fetch(query);
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "post" && !(_id in path("drafts.**"))].slug.current`;

  return sanityClient.fetch(query);
}
