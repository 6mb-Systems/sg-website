/**
 * Shared URL validation helpers. Defence-in-depth for CMS content and
 * user-supplied links — never let javascript:, data:, or protocol-relative
 * URLs reach redirects or the rendered DOM.
 */

/**
 * Accept relative paths, fragments, and an explicit allow-list of protocols.
 */
export function safeLinkHref(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;
  const trimmed = href.trim();
  if (!trimmed) return undefined;
  // Protocol-relative URLs are not safe.
  if (trimmed.startsWith("//")) return undefined;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return undefined;
}

/**
 * Allow only absolute http(s) URLs for external article redirects and links.
 */
export function safeExternalUrl(href: unknown): string | undefined {
  if (typeof href !== "string") return undefined;
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("//")) return undefined;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

/**
 * Strip characters that could inject extra email headers via a subject line.
 */
export function sanitizeEmailSubject(value: string, maxLength = 200): string {
  return value.replace(/[\r\n]/g, "").slice(0, maxLength);
}

/**
 * Produce a safe filename token for Content-Disposition headers.
 */
export function safeContentDispositionFilename(
  filename: string,
  fallback = "document.pdf"
): string {
  const cleaned = filename.replace(/[^\w.\- ()]/g, "_").slice(0, 120);
  return cleaned.length > 0 ? cleaned : fallback;
}
