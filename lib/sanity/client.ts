import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Define image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

// These values should be set in your .env.local file
// NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
// NEXT_PUBLIC_SANITY_DATASET=production
// SANITY_API_TOKEN=your_read_token (optional, for previews)

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient({
  ...sanityConfig,
  // Use read token for server-side requests (optional)
  token: process.env.SANITY_API_TOKEN,
});

// Client for public queries (no token)
export const publicClient = createClient({
  ...sanityConfig,
  token: undefined,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to check if Sanity is configured
export function isSanityConfigured(): boolean {
  return Boolean(sanityConfig.projectId);
}
