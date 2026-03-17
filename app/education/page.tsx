import type { Metadata } from "next";
import { EducationHub } from "@/components/sections/education/EducationHub";
import { PageHero } from "@/components/sections/shared/PageHero";
import { getPosts, getWebinars, getCategories } from "@/lib/sanity/queries";
import type { Article, WebinarItem } from "@/components/sections/education/EducationHub";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Education",
  description:
    "Comprehensive resources to help you navigate the SMSF landscape with confidence. Access fact sheets, webinars, and expert insights.",
};

const fallbackArticles: Article[] = [
  {
    slug: "2024-smsf-compliance-update",
    category: "Compliance",
    title: "2024 SMSF Compliance Update",
    excerpt:
      "Latest regulatory changes affecting SMSF trustees and administrators",
    date: "December 2024",
    readTime: "5 min read",
    downloads: 1250,
  },
  {
    slug: "investment-strategy-best-practices",
    category: "Investment",
    title: "Investment Strategy Best Practices",
    excerpt:
      "Essential guidance for creating and maintaining diversified SMSF portfolios",
    date: "November 2024",
    readTime: "8 min read",
    downloads: 890,
  },
  {
    slug: "smsf-property-investment-guide",
    category: "Property",
    title: "SMSF Property Investment Guide",
    excerpt:
      "Complete guide to purchasing property through your SMSF including LRBAs",
    date: "October 2024",
    readTime: "12 min read",
    downloads: 2100,
  },
  {
    slug: "pension-phase-transition-checklist",
    category: "Pensions",
    title: "Pension Phase Transition Checklist",
    excerpt:
      "Step-by-step guide for converting from accumulation to pension phase",
    date: "September 2024",
    readTime: "6 min read",
    downloads: 670,
  },
  {
    slug: "capital-gains-tax-in-smsfs",
    category: "Tax",
    title: "Capital Gains Tax in SMSFs",
    excerpt:
      "Understanding CGT calculations, exemptions, and optimization strategies",
    date: "August 2024",
    readTime: "10 min read",
    downloads: 1450,
  },
  {
    slug: "smsf-wind-up-process",
    category: "Administration",
    title: "SMSF Wind-up Process",
    excerpt:
      "Complete guide to closing your SMSF and member benefit rollovers",
    date: "July 2024",
    readTime: "7 min read",
    downloads: 320,
  },
];

const fallbackWebinars: WebinarItem[] = [
  {
    slug: "smsf-fundamentals-workshop",
    status: "Upcoming",
    category: "Fundamentals",
    title: "SMSF Fundamentals Workshop",
    excerpt:
      "Comprehensive 2-hour workshop covering SMSF basics for new trustees",
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
    excerpt:
      "Key changes and considerations for the 2024 financial year",
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
    excerpt:
      "Advanced strategies for optimizing SMSF investment portfolios",
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
    excerpt:
      "Maximizing efficiency through Class, BGL, and other platform integrations",
    presenter: "David Kim, Technology Director",
    date: "October 25, 2024",
    duration: "90 minutes",
    attendees: 220,
  },
];

const fallbackCategories = [
  "All",
  "Compliance",
  "Investment",
  "Property",
  "Pensions",
  "Tax",
  "Administration",
];

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

function formatWebinarDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-AU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EducationPage() {
  const [sanityPosts, sanityWebinars, sanityCategories] = await Promise.all([
    getPosts(),
    getWebinars(),
    getCategories(),
  ]);

  const hasSanityContent = sanityPosts.length > 0;

  const articles: Article[] = hasSanityContent
    ? sanityPosts.map((p) => ({
        slug: typeof p.slug === "string" ? p.slug : p.slug.current,
        category: p.category?.title ?? "General",
        title: p.title,
        excerpt: p.excerpt ?? "",
        date: formatDate(p.publishedAt),
        readTime: p.readTime ? `${p.readTime} min read` : "5 min read",
        downloads: p.downloadCount ?? 0,
      }))
    : fallbackArticles;

  const hasSanityWebinars = sanityWebinars.length > 0;

  const webinarItems: WebinarItem[] = hasSanityWebinars
    ? sanityWebinars.map((w) => ({
        slug: typeof w.slug === "string" ? w.slug : w.slug.current,
        status:
          w.status === "upcoming"
            ? "Upcoming"
            : w.status === "live"
              ? "Live"
              : "Watch Replay",
        category: w.category?.title ?? "General",
        title: w.title,
        excerpt: w.excerpt ?? "",
        presenter: w.presenter
          ? `${w.presenter.name}${w.presenter.role ? `, ${w.presenter.role}` : ""}`
          : "",
        date: formatWebinarDate(w.date),
        duration: w.duration ?? "",
        attendees: w.attendeeCount ?? 0,
      }))
    : fallbackWebinars;

  const categoryList =
    sanityCategories.length > 0
      ? ["All", ...sanityCategories.map((c) => c.title)]
      : fallbackCategories;

  return (
    <>
      <PageHero
        title="SMSF Education Hub"
        description="Whether it's catching up on the latest changes to the SMSF environment, or refreshing your memory on those issues that only arise every so often we've got your SMSF professional development needs covered"
      />

      <EducationHub
        articles={articles}
        webinars={webinarItems}
        categories={categoryList}
      />
    </>
  );
}
