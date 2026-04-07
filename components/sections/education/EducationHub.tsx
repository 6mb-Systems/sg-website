"use client";

import * as React from "react";
import Link from "next/link";
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
  webinarArticles: Article[];
  webinars: WebinarItem[];
  categories: string[];
}

const tabs = [
  { id: "articles", label: "Fact Sheets & Blogs", icon: FileText },
  { id: "webinars", label: "Webinars & Events", icon: Video },
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

export function EducationHub({ articles, webinarArticles, webinars, categories }: EducationHubProps) {
  const [activeTab, setActiveTab] = React.useState("articles");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [articlesPage, setArticlesPage] = React.useState(1);
  const [webinarsPage, setWebinarsPage] = React.useState(1);
  const articlesAnchorRef = React.useRef<HTMLDivElement>(null);
  const webinarsAnchorRef = React.useRef<HTMLDivElement>(null);

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

  const webinarTotalPages =
    webinarArticles.length === 0
      ? 0
      : Math.ceil(webinarArticles.length / ARTICLES_PER_PAGE);
  const webinarPageSafe =
    webinarTotalPages === 0
      ? 1
      : Math.min(Math.max(1, webinarsPage), webinarTotalPages);
  const webinarOffset = (webinarPageSafe - 1) * ARTICLES_PER_PAGE;
  const paginatedWebinars = webinarArticles.slice(
    webinarOffset,
    webinarOffset + ARTICLES_PER_PAGE
  );

  React.useEffect(() => {
    setArticlesPage(1);
  }, [searchQuery, selectedCategory]);

  const goToArticlePage = React.useCallback((page: number) => {
    setArticlesPage(page);
    articlesAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToWebinarPage = React.useCallback((page: number) => {
    setWebinarsPage(page);
    webinarsAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all",
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
                    Fact Sheets & Blogs
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
                        href={`/education/${article.slug}`}
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
                  <h2 className="text-2xl font-bold text-brand-blue">
                    Webinars & Events
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Interactive learning with our SMSF experts
                  </p>
                </div>

                <div ref={webinarsAnchorRef} className="scroll-mt-24" aria-hidden />

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedWebinars.map((item, index) => (
                    <FadeIn key={item.id ?? item.slug} direction="up" delay={index * 0.04}>
                      <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {item.imageUrl && (
                          <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-brand-blue/5">
                            <Image
                              src={item.imageUrl}
                              alt={item.imageAlt || item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="h-3.5 w-3.5" />
                              {item.date}
                            </span>
                          </div>
                          <h3 className="mt-3 text-base font-semibold text-gray-900 leading-snug">
                            {item.title}
                          </h3>
                          {item.excerpt && (
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">
                              {item.excerpt}
                            </p>
                          )}
                          <div className="mt-auto pt-4 flex gap-2">
                            {item.videoUrl ? (
                              <a
                                href={item.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-600 transition-colors"
                              >
                                <Video className="h-4 w-4" />
                                Watch Replay
                              </a>
                            ) : null}
                            <Link
                              href={`/education/${item.slug}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}

                  {/* Dedicated webinar documents (future use) */}
                  {webinars.map((webinar, index) => (
                    <FadeIn key={webinar.slug} direction="up" delay={(webinarArticles.length + index) * 0.04}>
                      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium",
                            webinar.status === "Upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          )}>
                            {webinar.status}
                          </span>
                          <span className="text-xs text-gray-400">{webinar.category}</span>
                        </div>
                        <h3 className="mt-3 text-base font-semibold text-gray-900">{webinar.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 flex-grow">{webinar.excerpt}</p>
                        {webinar.presenter && (
                          <p className="mt-2 text-sm text-brand-orange">Presented by {webinar.presenter}</p>
                        )}
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{webinar.date}</span>
                          {webinar.duration && <span>{webinar.duration}</span>}
                        </div>
                        <button className={cn(
                          "mt-4 w-full rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                          webinar.status === "Upcoming"
                            ? "bg-brand-blue text-white hover:bg-brand-blue-600"
                            : "bg-brand-orange text-white hover:bg-brand-orange-600"
                        )}>
                          <Video className="h-4 w-4" />
                          {webinar.status === "Upcoming" ? "Register Now" : "Watch Now"}
                        </button>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {webinarTotalPages > 1 ? (
                  <nav
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
                    aria-label="Webinar pages"
                  >
                    <p className="order-2 text-sm text-gray-600 sm:order-1 sm:w-full sm:text-center">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {webinarOffset + 1}-
                        {Math.min(
                          webinarOffset + paginatedWebinars.length,
                          webinarArticles.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {webinarArticles.length}
                      </span>
                    </p>
                    <div className="order-1 flex items-center gap-1 sm:order-2">
                      <button
                        type="button"
                        onClick={() => goToWebinarPage(webinarPageSafe - 1)}
                        disabled={webinarPageSafe <= 1}
                        className={cn(
                          "inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium transition-colors",
                          webinarPageSafe <= 1
                            ? "cursor-not-allowed text-gray-300"
                            : "text-gray-700 hover:border-brand-blue hover:text-brand-blue"
                        )}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden />
                        Previous
                      </button>
                      <div className="mx-1 flex flex-wrap items-center justify-center gap-1">
                        {visiblePageNumbers(webinarPageSafe, webinarTotalPages).map(
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
                                onClick={() => goToWebinarPage(item)}
                                className={cn(
                                  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors",
                                  item === webinarPageSafe
                                    ? "bg-brand-blue text-white"
                                    : "border border-gray-200 bg-white text-gray-700 hover:border-brand-blue hover:text-brand-blue"
                                )}
                                aria-label={`Page ${item}`}
                                aria-current={item === webinarPageSafe ? "page" : undefined}
                              >
                                {item}
                              </button>
                            )
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => goToWebinarPage(webinarPageSafe + 1)}
                        disabled={webinarPageSafe >= webinarTotalPages}
                        className={cn(
                          "inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium transition-colors",
                          webinarPageSafe >= webinarTotalPages
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
