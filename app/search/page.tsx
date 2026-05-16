import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HivePattern } from "@/components/sections/shared/PageHero";
import { searchSite, sanitiseSearchQuery, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";

export const revalidate = 60;

type SearchFilter = "all" | "pages" | "education";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string | string[];
    type?: string | string[];
  }>;
}

function parseFilter(value: string | string[] | undefined): SearchFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "pages" || raw === "education") return raw;
  return "all";
}

function filterResults(results: SearchResult[], filter: SearchFilter): SearchResult[] {
  if (filter === "pages") return results.filter((result) => result.type === "Page");
  if (filter === "education") {
    return results.filter((result) => result.type === "Education");
  }
  return results;
}

function filterHref(query: string, filter: SearchFilter): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (filter !== "all") params.set("type", filter);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = sanitiseSearchQuery(params.q);

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description:
      "Search SuperGuardian pages, SMSF education resources, webinars and insights.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = sanitiseSearchQuery(params.q);
  const activeFilter = parseFilter(params.type);
  const results = await searchSite(query);
  const filteredResults = filterResults(results, activeFilter);
  const pagesCount = results.filter((result) => result.type === "Page").length;
  const educationCount = results.filter((result) => result.type === "Education").length;

  const filters: Array<{ id: SearchFilter; label: string; count: number }> = [
    { id: "all", label: "All Results", count: results.length },
    { id: "pages", label: "Pages", count: pagesCount },
    { id: "education", label: "Education", count: educationCount },
  ];

  return (
    <>
      <section className="relative bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
        <HivePattern />

        <div className="container-width relative py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in-up text-4xl font-bold text-white md:text-5xl">
              {query ? `Search results for "${query}"` : "Search SuperGuardian"}
            </h1>
            <p
              className="animate-fade-in-up mt-4 text-pretty text-xl text-brand-orange font-medium"
              style={{ animationDelay: "0.1s" }}
            >
              Find pages, SMSF education resources, webinars and insights.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <form
            action="/search"
            method="GET"
            className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-brand-blue/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            role="search"
          >
            <label className="sr-only" htmlFor="search-page-input">
              Search SuperGuardian
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-blue/55"
                aria-hidden
              />
              <input
                id="search-page-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="What are you looking for?"
                className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/15"
              />
            </div>
            <Button type="submit" className="h-12 px-7">
              Search
            </Button>
          </form>

          {query ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
              <aside className="lg:sticky lg:top-36 lg:self-start">
                <div className="rounded-2xl border border-brand-blue/10 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                    Filter Results
                  </h2>
                  <div className="mt-4 space-y-2">
                    {filters.map((filter) => (
                      <Link
                        key={filter.id}
                        href={filterHref(query, filter.id)}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          activeFilter === filter.id
                            ? "bg-brand-orange text-white"
                            : "text-gray-700 hover:bg-brand-blue-50 hover:text-brand-blue"
                        )}
                      >
                        <span>{filter.label}</span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs",
                            activeFilter === filter.id
                              ? "bg-white/20 text-white"
                              : "bg-brand-blue-50 text-brand-blue"
                          )}
                        >
                          {filter.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>

              <div>
                <p className="text-sm text-gray-600">
                  Showing {filteredResults.length} of {results.length} result
                  {results.length === 1 ? "" : "s"}
                </p>

                {filteredResults.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {filteredResults.map((result) => (
                      <article
                        key={`${result.type}-${result.href}`}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded-full bg-brand-blue-50 px-3 py-1 font-medium text-brand-blue">
                            {result.type}
                          </span>
                          {result.label && (
                            <span className="rounded-full bg-brand-orange/10 px-3 py-1 font-medium text-brand-orange">
                              {result.label}
                            </span>
                          )}
                          {result.date && (
                            <span className="text-gray-500">{result.date}</span>
                          )}
                        </div>
                        <h2 className="mt-3 text-2xl font-bold text-brand-blue">
                          <Link
                            href={result.href}
                            className="underline decoration-brand-orange/30 underline-offset-4 transition-colors hover:text-brand-orange"
                          >
                            {result.title}
                          </Link>
                        </h2>
                        <p className="mt-3 leading-7 text-gray-600">
                          {result.excerpt ||
                            "Open this result to learn more from SuperGuardian."}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-brand-blue/20 bg-white p-8 text-center">
                    <h2 className="text-2xl font-bold text-brand-blue">
                      No results found
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Try a broader SMSF term, such as administration, pricing,
                      compliance or webinars.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-blue/10 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-brand-blue">
                Start with a keyword
              </h2>
              <p className="mt-3 text-gray-600">
                Search across SuperGuardian pages and education resources using
                terms like pricing, security, compliance or webinars.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
