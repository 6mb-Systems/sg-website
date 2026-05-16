import { getPosts } from "@/lib/sanity/queries";
import type { SanityPost } from "@/lib/sanity/queries";

export type SearchResultType = "Page" | "Education";

export interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  type: SearchResultType;
  label?: string;
  date?: string;
}

const staticPages: Array<SearchResult & { keywords: string[] }> = [
  {
    title: "Home",
    href: "/",
    excerpt:
      "SuperGuardian provides specialist SMSF administration, accounting and compliance support for trustees, advisers and accountants.",
    type: "Page",
    keywords: ["smsf", "administration", "superguardian", "home"],
  },
  {
    title: "Who We Are",
    href: "/who-we-are",
    excerpt:
      "Learn about SuperGuardian, what we do, who we help, and how our SMSF administration team supports clients.",
    type: "Page",
    keywords: ["about", "team", "what we do", "who we help", "smsf"],
  },
  {
    title: "Partnerships",
    href: "/partnerships",
    excerpt:
      "Explore SuperGuardian's technology partners, integrations and industry relationships.",
    type: "Page",
    keywords: ["partners", "integrations", "technology", "industry"],
  },
  {
    title: "Pricing",
    href: "/pricing",
    excerpt:
      "Transparent SMSF administration pricing with predictable fees and no hidden surprises.",
    type: "Page",
    keywords: ["pricing", "fees", "cost", "administration fee", "smsf"],
  },
  {
    title: "Security",
    href: "/security",
    excerpt:
      "How SuperGuardian protects client information with security controls, compliance practices and certifications.",
    type: "Page",
    keywords: ["security", "privacy", "compliance", "certifications"],
  },
  {
    title: "Education Hub",
    href: "/education",
    excerpt:
      "Access SMSF fact sheets, webinars, calculators and expert insights from SuperGuardian.",
    type: "Page",
    keywords: ["education", "insights", "webinars", "calculators", "factsheets"],
  },
  {
    title: "Division 296 Calculator",
    href: "/education/calculators/division-296",
    excerpt:
      "Estimate the potential impact of Division 296 tax changes using SuperGuardian's SMSF calculator.",
    type: "Page",
    keywords: ["division 296", "calculator", "tax", "smsf"],
  },
  {
    title: "Webinars",
    href: "/webinars",
    excerpt:
      "Watch SuperGuardian webinars and education sessions covering SMSF administration and technical updates.",
    type: "Page",
    keywords: ["webinars", "education", "events", "smsf"],
  },
  {
    title: "Contact",
    href: "/contact",
    excerpt:
      "Get in touch with SuperGuardian or find office, phone and email contact details.",
    type: "Page",
    keywords: ["contact", "phone", "email", "office", "support"],
  },
  {
    title: "Careers",
    href: "/careers",
    excerpt:
      "Explore career opportunities at SuperGuardian and apply to join the team.",
    type: "Page",
    keywords: ["careers", "jobs", "employment", "apply"],
  },
  {
    title: "Forms",
    href: "/sg-forms",
    excerpt:
      "Find SuperGuardian forms and documents for SMSF administration support.",
    type: "Page",
    keywords: ["forms", "documents", "downloads", "smsf"],
  },
  {
    title: "Hive",
    href: "/hive",
    excerpt:
      "Learn about Hive, SuperGuardian's connected technology experience for SMSF administration.",
    type: "Page",
    keywords: ["hive", "technology", "platform", "smsf"],
  },
];

function normalise(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function tokensFor(query: string): string[] {
  return normalise(query)
    .split(" ")
    .filter((token) => token.length > 1);
}

function scoreResult(
  result: Pick<SearchResult, "title" | "excerpt" | "label"> & {
    keywords?: string[];
  },
  tokens: string[]
): number {
  const title = normalise(result.title);
  const excerpt = normalise(result.excerpt);
  const label = normalise(result.label ?? "");
  const keywords = normalise((result.keywords ?? []).join(" "));

  return tokens.reduce((score, token) => {
    if (title.includes(token)) score += 6;
    if (excerpt.includes(token)) score += 3;
    if (label.includes(token)) score += 2;
    if (keywords.includes(token)) score += 2;
    return score;
  }, 0);
}

function postSlug(post: SanityPost): string {
  return typeof post.slug === "string" ? post.slug : post.slug.current;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function educationResults(tokens: string[]): Promise<Array<SearchResult & { score: number }>> {
  const posts = await getPosts();

  return posts
    .map((post) => {
      const label = post.isWebinarPost
        ? "Webinar"
        : post.category?.title ?? "Insight";
      const result: SearchResult = {
        title: post.title,
        href: `/education/${postSlug(post)}`,
        excerpt: post.excerpt ?? "",
        type: "Education",
        label,
        date: post.publishedAt ? formatDate(post.publishedAt) : undefined,
      };

      return {
        ...result,
        score: scoreResult(result, tokens),
      };
    })
    .filter((result) => result.score > 0);
}

export async function searchSite(query: string): Promise<SearchResult[]> {
  const tokens = tokensFor(query);
  if (tokens.length === 0) return [];

  const pageResults = staticPages
    .map((page) => ({
      title: page.title,
      href: page.href,
      excerpt: page.excerpt,
      type: page.type,
      score: scoreResult(page, tokens),
    }))
    .filter((result) => result.score > 0);

  const results = [...pageResults, ...(await educationResults(tokens))]
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .map(({ score: _score, ...result }) => result);

  return results;
}

export function sanitiseSearchQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
}
