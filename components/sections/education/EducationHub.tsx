"use client";

import * as React from "react";
import Link from "next/link";
import { Search, FileText, Video, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "articles", label: "Fact Sheets & Articles", icon: FileText },
  { id: "webinars", label: "Webinars & Videos", icon: Video },
  { id: "events", label: "Events", icon: Calendar },
];

// Placeholder data - will be replaced with Sanity data
const articles = [
  {
    slug: "2024-smsf-compliance-update",
    category: "Compliance",
    title: "2024 SMSF Compliance Update",
    excerpt: "Latest regulatory changes affecting SMSF trustees and administrators",
    date: "December 2024",
    readTime: "5 min read",
    downloads: 1250,
  },
  {
    slug: "investment-strategy-best-practices",
    category: "Investment",
    title: "Investment Strategy Best Practices",
    excerpt: "Essential guidance for creating and maintaining diversified SMSF portfolios",
    date: "November 2024",
    readTime: "8 min read",
    downloads: 890,
  },
  {
    slug: "smsf-property-investment-guide",
    category: "Property",
    title: "SMSF Property Investment Guide",
    excerpt: "Complete guide to purchasing property through your SMSF including LRBAs",
    date: "October 2024",
    readTime: "12 min read",
    downloads: 2100,
  },
  {
    slug: "pension-phase-transition-checklist",
    category: "Pensions",
    title: "Pension Phase Transition Checklist",
    excerpt: "Step-by-step guide for converting from accumulation to pension phase",
    date: "September 2024",
    readTime: "6 min read",
    downloads: 670,
  },
  {
    slug: "capital-gains-tax-in-smsfs",
    category: "Tax",
    title: "Capital Gains Tax in SMSFs",
    excerpt: "Understanding CGT calculations, exemptions, and optimization strategies",
    date: "August 2024",
    readTime: "10 min read",
    downloads: 1450,
  },
  {
    slug: "smsf-wind-up-process",
    category: "Administration",
    title: "SMSF Wind-up Process",
    excerpt: "Complete guide to closing your SMSF and member benefit rollovers",
    date: "July 2024",
    readTime: "7 min read",
    downloads: 320,
  },
];

const webinars = [
  {
    slug: "smsf-fundamentals-workshop",
    status: "Upcoming",
    category: "Fundamentals",
    title: "SMSF Fundamentals Workshop",
    excerpt: "Comprehensive 2-hour workshop covering SMSF basics for new trustees",
    presenter: "Sarah Chen, Managing Director",
    date: "January 15, 2025",
    duration: "2 hours",
    attendees: 340,
  },
  {
    slug: "2024-tax-year-review",
    status: "Watch Replay",
    category: "Tax",
    title: "2024 Tax Year Review",
    excerpt: "Key changes and considerations for the 2024 financial year",
    presenter: "Michael Thompson, Head of Compliance",
    date: "December 10, 2024",
    duration: "45 minutes",
    attendees: 180,
  },
  {
    slug: "investment-strategy-deep-dive",
    status: "Watch Replay",
    category: "Investment",
    title: "Investment Strategy Deep Dive",
    excerpt: "Advanced strategies for optimizing SMSF investment portfolios",
    presenter: "Lisa Rodriguez, Client Success Manager",
    date: "November 20, 2024",
    duration: "60 minutes",
    attendees: 95,
  },
  {
    slug: "technology-integration-masterclass",
    status: "Watch Replay",
    category: "Technology",
    title: "Technology Integration Masterclass",
    excerpt: "Maximizing efficiency through Class, BGL, and other platform integrations",
    presenter: "David Kim, Technology Director",
    date: "October 25, 2024",
    duration: "90 minutes",
    attendees: 220,
  },
];

const categories = ["All", "Compliance", "Investment", "Property", "Pensions", "Tax", "Administration"];

export function EducationHub() {
  const [activeTab, setActiveTab] = React.useState("articles");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for SMSF topics, guides, or webinars..."
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
                    Fact Sheets & Articles
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Stay informed with our expert insights and guides
                  </p>
                </div>

                {/* Category Filter */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
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

                {/* Articles Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article, index) => (
                    <FadeIn key={article.slug} direction="up" delay={index * 0.05}>
                      <article
                        className="group h-full flex flex-col rounded-xl border border-gray-200 bg-white p-6 hover:border-brand-blue transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Download className="h-3 w-3" />
                            {article.downloads}
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-blue">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <span>📅 {article.date}</span>
                          <span>⏱ {article.readTime}</span>
                        </div>
                        <Link
                          href={`/education/${article.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange hover:text-brand-orange-600"
                        >
                          <FileText className="mr-1 h-4 w-4" />
                          Download PDF
                        </Link>
                      </article>
                    </FadeIn>
                  ))}
                </div>
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
                    Webinars & Videos
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Interactive learning with our SMSF experts
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {webinars.map((webinar, index) => (
                    <FadeIn key={webinar.slug} direction="up" delay={index * 0.1}>
                      <article
                        className="h-full flex flex-col rounded-xl border border-gray-200 bg-white p-6"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              webinar.status === "Upcoming"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            )}
                          >
                            {webinar.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {webinar.category}
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                          {webinar.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 flex-grow">
                          {webinar.excerpt}
                        </p>
                        <p className="mt-2 text-sm text-brand-orange">
                          Presented by {webinar.presenter}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <span>📅 {webinar.date}</span>
                          <span>⏱ {webinar.duration}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          👥 {webinar.attendees} attendees
                        </div>
                        <button
                          className={cn(
                            "mt-4 w-full rounded-lg py-3 text-sm font-medium transition-colors",
                            webinar.status === "Upcoming"
                              ? "bg-brand-blue text-white hover:bg-brand-blue-600"
                              : "bg-brand-orange text-white hover:bg-brand-orange-600"
                          )}
                        >
                          <Video className="mr-2 inline h-4 w-4" />
                          {webinar.status === "Upcoming" ? "Register Now" : "Watch Now"}
                        </button>
                      </article>
                    </FadeIn>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Coming Soon
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  We&apos;re planning exciting events. Check back soon!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
