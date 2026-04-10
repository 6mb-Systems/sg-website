/** Query param on `/education` and post URLs to restore the hub tab when using "Back to Education Hub". */
export const EDUCATION_HUB_TAB_PARAM = "tab" as const;
/** Query param to preserve the pagination page when navigating to/from an article. */
export const EDUCATION_HUB_PAGE_PARAM = "page" as const;

export type EducationHubTabId = "articles" | "webinars" | "calculators";

const VALID_TABS = new Set<string>(["articles", "webinars", "calculators"]);

function firstString(
  value: string | string[] | undefined
): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

/** Tab to show on `/education` from a post URL's `?tab=` (default: Insights). */
export function parseTabFromPostSearchParams(
  tab: string | string[] | undefined
): "articles" | "webinars" {
  const v = firstString(tab);
  return v === "webinars" ? "webinars" : "articles";
}

/** Tab to select on the hub from `/education?tab=`. */
export function parseTabFromHubSearchParams(
  tab: string | null
): EducationHubTabId {
  if (tab && VALID_TABS.has(tab)) return tab as EducationHubTabId;
  return "articles";
}

/** Hub list URL that opens the given tab, optionally restoring a pagination page. */
export function educationHubHref(tab: EducationHubTabId, page?: number): string {
  const params = new URLSearchParams();
  if (tab !== "articles") params.set(EDUCATION_HUB_TAB_PARAM, tab);
  if (page && page > 1) params.set(EDUCATION_HUB_PAGE_PARAM, String(page));
  const qs = params.toString();
  return qs ? `/education?${qs}` : "/education";
}

/** Link to a post from a hub tab, preserving tab and page for the back button. */
export function educationPostHref(
  slug: string,
  sourceTab: "articles" | "webinars",
  page?: number
): string {
  const path = `/education/${encodeURIComponent(slug)}`;
  const params = new URLSearchParams();
  if (sourceTab === "webinars") params.set(EDUCATION_HUB_TAB_PARAM, "webinars");
  if (page && page > 1) params.set(EDUCATION_HUB_PAGE_PARAM, String(page));
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
