import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  maxRetries: process.env.NODE_ENV === "production" ? 5 : 0,
  timeout: process.env.NODE_ENV === "production" ? 300_000 : 5_000,
};

export function isSanityConfigured(): boolean {
  return Boolean(sanityConfig.projectId);
}

let _sanityClient: SanityClient | null = null;
let _publicClient: SanityClient | null = null;

function getClient(token?: string): SanityClient | null {
  if (!isSanityConfigured()) return null;
  return createClient({ ...sanityConfig, token });
}

export function getSanityClient(): SanityClient | null {
  if (!_sanityClient) {
    _sanityClient = getClient(process.env.SANITY_API_TOKEN);
  }
  return _sanityClient;
}

export function getPublicClient(): SanityClient | null {
  if (!_publicClient) {
    _publicClient = getClient(undefined);
  }
  return _publicClient;
}

// Keep backward-compatible exports (lazy, so they don't throw at import time)
export const sanityClient = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const client = getSanityClient();
    if (!client) {
      if (prop === "fetch") return () => Promise.resolve(null);
      return undefined;
    }
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export const publicClient = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const client = getPublicClient();
    if (!client) {
      if (prop === "fetch") return () => Promise.resolve(null);
      return undefined;
    }
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) {
    throw new Error("Sanity is not configured. Cannot build image URL.");
  }
  const builder = createImageUrlBuilder(client);
  return builder.image(source);
}
