"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  FileText,
  Video,
  Calendar,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import {
  EDUCATION_HUB_TAB_PARAM,
  educationHubHref,
  educationPostHref,
  parseTabFromHubSearchParams,
  type EducationHubTabId,
} from "@/lib/education-hub-tab";
import { YouTubePlaylist } from "@/components/sections/webinars/YouTubePlaylist";
import { webinarVideos } from "@/lib/webinar-videos";

export interface Article {
  id?: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  downloads: number;
  imageUrl?: string | null;
  imageAlt?: string | null;
  videoUrl?: string | null;
  /** Webinar/event posts only: drives Past Event vs Upcoming Event badge */
  isUpcomingEvent?: boolean;
}

export interface WebinarItem {
  slug: string;
  status: string;
  category: string;
  title: string;
  excerpt: string;
  presenter: string;
  date: string;
  duration: string;
  attendees: number;
}

interface EducationHubProps {
  articles: Article[];
  categories: string[];
  /** From `/education?tab=` on first render (avoids tab flash with Suspense). */
  initialTab?: EducationHubTabId;
}

const tabs = [
  { id: "articles", label: "Insights", icon: FileText },
  { id: "webinars", label: "Webinars", icon: Video },
  { id: "calculators", label: "Calculators", icon: Calculator },
];

const calculatorItems = [
  {
    href: "/education/calculators/division-296",
    title: "Division 296 Tax Calculator",
    excerpt:
      "Estimate additional tax under Division 296 using your year-end total super balance and realised earnings.",
    badge: "Tax",
  },
] as const;

const ARTICLES_PER_PAGE = 9;

function visiblePageNumbers(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const set = new Set<number>([1, total]);
  for (let d = -1; d <= 1; d++) {
    const p = current + d;
    if (p >= 1 && p <= total) set.add(p);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("gap");
    out.push(p);
    prev = p;
  }
  return out;
}

export function EducationHub({
  articles,
  categories,
  initialTab = "articles",
}: EducationHubProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] =
    React.useState<EducationHubTabId>(initialTab);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [articlesPage, setArticlesPage] = React.useState(1);
  const articlesAnchorRef = React.useRef<HTMLDivElement>(null);

  const uniqueCategories = React.useMemo(() => {
    const seen = new Set<string>();
    return categories.filter((category) => {
      if (seen.has(category)) return false;
      seen.add(category);
      return true;
    });
  }, [categories]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const articleTotalPages =
    filteredArticles.length === 0
      ? 0
      : Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const articlePageSafe =
    articleTotalPages === 0
      ? 1
      : Math.min(Math.max(1, articlesPage), articleTotalPages);
  const articleOffset = (articlePageSafe - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    articleOffset,
    articleOffset + ARTICLES_PER_PAGE
  );

  React.useEffect(() => {
    setArticlesPage(1);
  }, [searchQuery, selectedCategory]);

  React.useEffect(() => {
    setActiveTab(
      parseTabFromHubSearchParams(searchParams.get(EDUCATION_HUB_TAB_PARAM))
    );
  }, [searchParams]);

  const goToArticlePage = React.useCallback((page: number) => {
    setArticlesPage(page);
    articlesAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for SMSF topics, fact sheets, webinars, or events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex justify-center">
          <div className="flex w-full max-w-xl rounded-full bg-white p-1 shadow-sm border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  const id = tab.id as EducationHubTabId;
                  setActiveTab(id);
                  router.replace(educationHubHref(id), { scroll: false });
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-brand-blue text-white"
                    : "text-gray-600 hover:text-brand-blue"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {/* Articles Tab */}
            {activeTab === "articles" && (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-brand-blue">
                    Insights
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Stay informed with our expert insights and guides
                  </p>
                </div>

                {/* Category Filter */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {uniqueCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        selectedCategory === category
                          ? "bg-brand-blue text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div ref={articlesAnchorRef} className="scroll-mt-24" aria-hidden />

                {/* Articles Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedArticles.length === 0 ? (
                    <p className="col-span-full text-center text-sm text-gray-600">
                      No articles match your search or category.
                    </p>
                  ) : null}
                  {paginatedArticles.map((article, index) => (
                    <FadeIn
                      key={article.id ?? `${article.slug}-${articleOffset + index}`}
                      direction="up"
                      delay={index * 0.05}
                    >
                      <Link
                        href={educationPostHref(article.slug, "articles")}
                        className="relative flex h-full min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                        aria-label={`Open article: ${article.title}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                          <defs>
                            <pattern
                              id={`edu-article-hex-${articlePageSafe}-${index}`}
                              x="0"
                              y="0"
                              width="60"
                              height="34.64"
                              patternUnits="userSpaceOnUse"
                              patternTransform="scale(2)"
                            >
                              <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#edu-article-hex-${articlePageSafe}-${index})`} />
                        </svg>
                        {article.imageUrl ? (
                          <div className="relative z-10 h-[210px] w-full overflow-hidden bg-brand-blue/5">
                            <Image
                              src={article.imageUrl}
                              alt={article.imageAlt || article.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : null}

                        <article className="relative z-10 flex flex-1 flex-col p-6">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3.5 w-3.5" />
                              {article.date}
                            </span>
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">
                            {article.excerpt}
                          </p>
                          <div className="mt-auto flex items-center pt-4 text-xs text-gray-500">
                            <span className="inline-flex items-center text-sm font-medium text-brand-orange">
                              <FileText className="mr-1 h-4 w-4" />
                              Read article
                            </span>
                          </div>
                        </article>
                      </Link>
                    </FadeIn>
                  ))}
                </div>

                {articleTotalPages > 1 ? (
                  <nav
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
                    aria-label="Article pages"
                  >
                    <p className="order-2 text-sm text-gray-600 sm:order-1 sm:w-full sm:text-center">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {articleOffset + 1}-
                        {Math.min(
                          articleOffset + paginatedArticles.length,
                          filteredArticles.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {filteredArticles.length}
                      </span>
                    </p>
                    <div className="order-1 flex items-center gap-1 sm:order-2">
                      <button
                        type="button"
                        onClick={() => goToArticlePage(articlePageSafe - 1)}
                        disabled={articlePageSafe <= 1}
                        className={cn(
                          "inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium transition-colors",
                          articlePageSafe <= 1
                            ? "cursor-not-allowed text-gray-300"
                            : "text-gray-700 hover:border-brand-blue hover:text-brand-blue"
                        )}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden />
                        Previous
                      </button>
                      <div className="mx-1 flex flex-wrap items-center justify-center gap-1">
                        {visiblePageNumbers(articlePageSafe, articleTotalPages).map(
                          (item, i) =>
                            item === "gap" ? (
                              <span
                                key={`gap-${i}`}
                                className="px-1 text-gray-400"
                                aria-hidden
                              >
                                …
                              </span>
                            ) : (
                              <button
                                key={item}
                                type="button"
                                onClick={() => goToArticlePage(item)}
                                className={cn(
                                  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors",
                                  item === articlePageSafe
                                    ? "bg-brand-blue text-white"
                                    : "border border-gray-200 bg-white text-gray-700 hover:border-brand-blue hover:text-brand-blue"
                                )}
                                aria-label={`Page ${item}`}
                                aria-current={item === articlePageSafe ? "page" : undefined}
                              >
                                {item}
                              </button>
                            )
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => goToArticlePage(articlePageSafe + 1)}
                        disabled={articlePageSafe >= articleTotalPages}
                        className={cn(
                          "inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium transition-colors",
                          articlePageSafe >= articleTotalPages
                            ? "cursor-not-allowed text-gray-300"
                            : "text-gray-700 hover:border-brand-blue hover:text-brand-blue"
                        )}
                        aria-label="Next page"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </nav>
                ) : null}
              </motion.div>
            )}

            {/* Webinars Tab */}
            {activeTab === "webinars" && (
              <motion.div
                key="webinars"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-brand-blue">Webinars</h2>
                  <p className="mt-2 text-gray-600">Interactive learning with our SMSF experts</p>
                </div>
                <div className="mt-8">
                  <YouTubePlaylist videos={webinarVideos} />
                </div>
              </motion.div>
            )}

            {/* Calculators Tab */}
            {activeTab === "calculators" && (
              <motion.div
                key="calculators"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-brand-blue">Calculators</h2>
                  <p className="mt-2 text-gray-600">
                    SMSF tools and calculators to support your planning
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {calculatorItems.map((item, index) => (
                    <FadeIn key={item.href} direction="up" delay={index * 0.05}>
                      <Link
                        href={item.href}
                        className="relative flex h-full min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition-colors hover:border-brand-blue/30 focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                        aria-label={`Open calculator: ${item.title}`}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80"
                          aria-hidden
                        />
                        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                          <defs>
                            <pattern
                              id={`edu-calc-hex-${index}`}
                              x="0"
                              y="0"
                              width="60"
                              height="34.64"
                              patternUnits="userSpaceOnUse"
                              patternTransform="scale(2)"
                            >
                              <path
                                d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
                                fill="none"
                                stroke="#d1d5db"
                                strokeWidth="0.55"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#edu-calc-hex-${index})`}
                          />
                        </svg>
                        <article className="relative z-10 flex flex-1 flex-col p-6">
                          <span className="w-fit rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                            {item.badge}
                          </span>
                          <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 flex-grow text-sm text-gray-600 line-clamp-4">
                            {item.excerpt}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-gray-500">
                            <span className="inline-flex items-center text-sm font-medium text-brand-orange">
                              <Calculator className="mr-1.5 h-4 w-4" aria-hidden />
                              Open Calculator
                            </span>
                          </div>
                        </article>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
