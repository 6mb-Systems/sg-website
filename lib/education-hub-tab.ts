/** Query param on `/education` and post URLs to restore the hub tab when using “Back to Education Hub”. */
export const EDUCATION_HUB_TAB_PARAM = "tab" as const;

export type EducationHubTabId = "articles" | "webinars" | "calculators";

const VALID_TABS = new Set<string>(["articles", "webinars", "calculators"]);

function firstString(
  value: string | string[] | undefined
): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

/** Tab to show on `/education` from a post URL’s `?tab=` (default: Insights). */
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

/** Hub list URL that opens the given tab. */
export function educationHubHref(tab: EducationHubTabId): string {
  if (tab === "articles") return "/education";
  return `/education?${EDUCATION_HUB_TAB_PARAM}=${tab}`;
}

/** Link to a post from a hub tab (webinars preserve `?tab=webinars` for the back button). */
export function educationPostHref(
  slug: string,
  sourceTab: "articles" | "webinars"
): string {
  const path = `/education/${encodeURIComponent(slug)}`;
  if (sourceTab === "webinars") {
    return `${path}?${EDUCATION_HUB_TAB_PARAM}=webinars`;
  }
  return path;
}
