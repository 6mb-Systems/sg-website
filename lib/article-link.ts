import { educationPostHref } from "@/lib/education-hub-tab";
import { safeExternalUrl } from "@/lib/safe-url";

export interface ArticleLinkFields {
  slug: string;
  externalUrl?: string | null;
  externalSource?: string | null;
}

export function isExternalArticle(article: ArticleLinkFields): boolean {
  return Boolean(article.externalUrl?.trim());
}

export function articleCardHref(
  article: ArticleLinkFields,
  options?: {
    sourceTab?: "articles" | "webinars";
    page?: number;
    /** Override for pages that use a plain /education/{slug} path. */
    internalHref?: string;
  }
): string {
  const external = safeExternalUrl(article.externalUrl);
  if (external) return external;

  if (options?.internalHref) return options.internalHref;

  return educationPostHref(
    article.slug,
    options?.sourceTab ?? "articles",
    options?.page
  );
}

export function articleCtaLabel(externalSource?: string | null): string {
  const source = externalSource?.trim();
  return source ? `Read on ${source}` : "Read article";
}
