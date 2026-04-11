import type { Metadata } from "next";
import { Suspense } from "react";
import { EducationHub } from "@/components/sections/education/EducationHub";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Providers } from "@/components/Providers";
import { getFactsheetPosts, getCategories } from "@/lib/sanity/queries";
import type { Article } from "@/components/sections/education/EducationHub";
import { urlFor } from "@/lib/sanity/client";
import {
  parseTabFromHubSearchParams,
  type EducationHubTabId,
} from "@/lib/education-hub-tab";

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
    downloads: 1250,
  },
  {
    slug: "investment-strategy-best-practices",
    category: "Investment",
    title: "Investment Strategy Best Practices",
    excerpt:
      "Essential guidance for creating and maintaining diversified SMSF portfolios",
    date: "November 2024",
    downloads: 890,
  },
  {
    slug: "smsf-property-investment-guide",
    category: "Property",
    title: "SMSF Property Investment Guide",
    excerpt:
      "Complete guide to purchasing property through your SMSF including LRBAs",
    date: "October 2024",
    downloads: 2100,
  },
  {
    slug: "pension-phase-transition-checklist",
    category: "Pensions",
    title: "Pension Phase Transition Checklist",
    excerpt:
      "Step-by-step guide for converting from accumulation to pension phase",
    date: "September 2024",
    downloads: 670,
  },
  {
    slug: "capital-gains-tax-in-smsfs",
    category: "Tax",
    title: "Capital Gains Tax in SMSFs",
    excerpt:
      "Understanding CGT calculations, exemptions, and optimisation strategies",
    date: "August 2024",
    downloads: 1450,
  },
  {
    slug: "smsf-wind-up-process",
    category: "Administration",
    title: "SMSF Wind-up Process",
    excerpt:
      "Complete guide to closing your SMSF and member benefit rollovers",
    date: "July 2024",
    downloads: 320,
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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EducationPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const hubSearch = await searchParams;
  const tabRaw =
    typeof hubSearch.tab === "string"
      ? hubSearch.tab
      : Array.isArray(hubSearch.tab)
        ? hubSearch.tab[0]
        : null;
  const initialHubTab: EducationHubTabId =
    parseTabFromHubSearchParams(tabRaw);
  const [sanityFactsheets, sanityCategories] = await Promise.all([
    getFactsheetPosts(),
    getCategories(),
  ]);

  const hasSanityContent = sanityFactsheets.length > 0;

  function toArticle(p: (typeof sanityFactsheets)[number]): Article {
    return {
      id: p._id,
      slug: typeof p.slug === "string" ? p.slug : (p.slug as any).current,
      category: p.category?.title ?? "General",
      secondaryCategory: p.secondaryCategory?.title,
      title: p.title,
      excerpt: p.excerpt ?? "",
      date: formatDate(p.publishedAt),
      downloads: p.downloadCount ?? 0,
      imageUrl: p.mainImage?.asset ? urlFor(p.mainImage).width(800).height(450).url() : null,
      imageAlt: p.mainImage?.alt ?? null,
      videoUrl: p.videoUrl ?? null,
      isUpcomingEvent: p.isUpcomingEvent === true,
    };
  }

  const articles: Article[] = hasSanityContent ? sanityFactsheets.map(toArticle) : fallbackArticles;

  const categoryList =
    sanityCategories.length > 0
      ? ["All", ...sanityCategories.map((c) => c.title)]
      : fallbackCategories;

  return (
    <Providers>
      <PageHero
        title="SMSF Education Hub"
        description="Whether it's catching up on the latest changes to the SMSF environment, or refreshing your memory on those issues that only arise every so often we've got your SMSF professional development needs covered"
      />

      <Suspense
        fallback={
          <section className="section-padding bg-gray-50">
            <div className="container-width min-h-[480px]" aria-hidden />
          </section>
        }
      >
        <EducationHub
          articles={articles}
          categories={categoryList}
          initialTab={initialHubTab}
        />
      </Suspense>
    </Providers>
  );
}
