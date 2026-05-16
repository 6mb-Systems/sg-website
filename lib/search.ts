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

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "on", "at", "to", "for",
  "is", "are", "was", "were", "be", "it", "its", "by", "we", "our",
  "us", "you", "do", "how", "what", "with", "that", "this", "as", "so",
  "my", "me", "i", "he", "she", "they", "about", "can", "will", "from",
]);

const staticPages: Array<SearchResult & { keywords: string[] }> = [
  {
    title: "Home",
    href: "/",
    excerpt:
      "SuperGuardian provides specialist SMSF administration, accounting and compliance support for trustees, advisers and accountants.",
    type: "Page",
    keywords: [
      "smsf", "administration", "superguardian", "home",
      "self managed super fund", "self-managed superannuation", "specialist",
      "superannuation", "chartered accounting",
    ],
  },
  {
    title: "Who We Are",
    href: "/who-we-are",
    excerpt:
      "Learn about SuperGuardian, what we do, who we help, and how our SMSF administration team supports clients.",
    type: "Page",
    keywords: [
      "about", "team", "what we do", "who we help", "smsf", "history",
      "values", "leadership", "accountants", "advisers", "trustees",
      "company", "firm", "established", "2002",
    ],
  },
  {
    title: "What We Do",
    href: "/who-we-are#what-we-do",
    excerpt:
      "Comprehensive SMSF services including establishment, administration, accounting, tax, compliance and reporting.",
    type: "Page",
    keywords: [
      "services", "establishment", "administration", "accounting", "tax",
      "compliance", "reporting", "smsf", "what we do", "set up",
      "annual return", "audit", "financial statements",
    ],
  },
  {
    title: "Who We Help",
    href: "/who-we-are#who-we-help",
    excerpt:
      "Tailored SMSF solutions for financial advisers, accounting practices, and SMSF trustees across Australia.",
    type: "Page",
    keywords: [
      "advisers", "accountants", "trustees", "financial advisers",
      "who we help", "smsf", "professionals", "practices",
    ],
  },
  {
    title: "Partnerships",
    href: "/partnerships",
    excerpt:
      "Explore SuperGuardian's technology partners, integrations and industry relationships.",
    type: "Page",
    keywords: [
      "partners", "integrations", "technology", "industry",
      "class", "xplan", "bgl", "software", "platform", "connected",
    ],
  },
  {
    title: "Pricing",
    href: "/pricing",
    excerpt:
      "Transparent SMSF administration pricing with predictable fees and no hidden surprises.",
    type: "Page",
    keywords: [
      "pricing", "fees", "cost", "administration fee", "smsf",
      "annual fee", "transparent", "plan", "flat fee", "no hidden",
    ],
  },
  {
    title: "Security",
    href: "/security",
    excerpt:
      "How SuperGuardian protects client information with security controls, compliance practices and certifications.",
    type: "Page",
    keywords: [
      "security", "privacy", "compliance", "certifications",
      "data protection", "iso", "cyber", "safe", "encryption",
      "information security", "controls",
    ],
  },
  {
    title: "Education Hub",
    href: "/education",
    excerpt:
      "Access SMSF fact sheets, webinars, calculators and expert insights from SuperGuardian.",
    type: "Page",
    keywords: [
      "education", "insights", "webinars", "calculators", "factsheets",
      "articles", "resources", "learning", "hub", "fact sheets",
    ],
  },
  {
    title: "SMSF Insights & Articles",
    href: "/education",
    excerpt:
      "Expert SMSF articles, fact sheets and insights from SuperGuardian covering compliance, investment, and superannuation topics.",
    type: "Page",
    keywords: [
      "articles", "insights", "fact sheets", "factsheets", "blog",
      "smsf", "education", "resources", "news",
    ],
  },
  {
    title: "SMSF Webinars",
    href: "/education?tab=webinars",
    excerpt:
      "Watch SuperGuardian SMSF webinars and education sessions covering administration, compliance and technical updates.",
    type: "Page",
    keywords: [
      "webinars", "education", "smsf", "online", "video", "replay",
      "upcoming", "events", "watch", "register",
    ],
  },
  {
    title: "SMSF Calculators",
    href: "/education?tab=calculators",
    excerpt:
      "Use SuperGuardian's SMSF calculators to model tax, retirement income, contributions and more.",
    type: "Page",
    keywords: [
      "calculators", "tools", "smsf", "tax", "retirement",
      "contributions", "model", "estimate", "calculate",
    ],
  },
  {
    title: "Division 296 Tax Calculator",
    href: "/education/calculators/division-296",
    excerpt:
      "Estimate the potential impact of Division 296 tax on super balances above $3 million using SuperGuardian's calculator.",
    type: "Page",
    keywords: [
      "division 296", "div 296", "calculator", "tax", "smsf",
      "super balance", "3 million", "high balance", "unrealised gains",
      "earnings tax", "296 tax",
    ],
  },
  {
    title: "Webinars",
    href: "/webinars",
    excerpt:
      "Watch SuperGuardian webinars and education sessions covering SMSF administration and technical updates.",
    type: "Page",
    keywords: [
      "webinars", "education", "events", "smsf", "video", "replay",
      "watch", "online", "sessions",
    ],
  },
  {
    title: "Contact Us",
    href: "/contact",
    excerpt:
      "Get in touch with SuperGuardian or find our Adelaide and Melbourne office, phone and email contact details.",
    type: "Page",
    keywords: [
      "contact", "phone", "email", "office", "support",
      "adelaide", "melbourne", "get in touch", "enquiry",
      "1300 787 576", "info@superguardian.com.au",
    ],
  },
  {
    title: "Careers",
    href: "/careers",
    excerpt:
      "Explore career opportunities at SuperGuardian and apply to join the team.",
    type: "Page",
    keywords: [
      "careers", "jobs", "employment", "apply", "work",
      "hire", "position", "vacancy", "opportunities",
    ],
  },
  {
    title: "Forms & Documents",
    href: "/sg-forms",
    excerpt:
      "Download SuperGuardian forms including Direct Debit Authority, Terms and Conditions, Financial Services Guide, pension forms, LRBA instructions and SMSF wind-up forms.",
    type: "Page",
    keywords: [
      // generic
      "forms", "documents", "downloads", "smsf", "paperwork", "pdf",
      // engagement forms
      "terms and conditions", "terms", "conditions",
      "direct debit", "direct debit authority", "direct debit agreement", "debit",
      "financial services guide", "fsg",
      // event-based forms
      "pension establishment", "pension",
      "pension consolidation", "consolidation",
      "pension commutation", "commutation",
      "wind up", "wind-up", "winding up", "smsf wind up",
      "limited recourse borrowing", "lrba", "borrowing arrangement",
      "private lender", "commercial lender",
    ],
  },
  {
    title: "Hive",
    href: "/hive",
    excerpt:
      "Learn about Hive, SuperGuardian's connected technology experience for SMSF administration.",
    type: "Page",
    keywords: [
      "hive", "technology", "platform", "smsf", "portal",
      "connected", "app", "tools", "experience",
    ],
  },
  {
    title: "Online Reporting & Client Portal",
    href: "/login",
    excerpt:
      "Access your SuperGuardian SMSF portal for daily reports, portfolio valuations, investment performance and key documents.",
    type: "Page",
    keywords: [
      "login", "portal", "online reporting", "reports", "client login",
      "adviser login", "key documents", "access", "smsf portal",
      "performance", "valuations", "log in", "sign in",
    ],
  },
];

function normalise(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function tokensFor(query: string): string[] {
  return normalise(query)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreResult(
  result: Pick<SearchResult, "title" | "excerpt" | "label"> & {
    keywords?: string[];
  },
  tokens: string[],
  phrase: string
): number {
  const title = normalise(result.title);
  const excerpt = normalise(result.excerpt);
  const label = normalise(result.label ?? "");
  const keywords = normalise((result.keywords ?? []).join(" "));

  let score = tokens.reduce((s, token) => {
    if (title.includes(token)) s += 6;
    if (excerpt.includes(token)) s += 3;
    if (label.includes(token)) s += 2;
    if (keywords.includes(token)) s += 2;
    return s;
  }, 0);

  // Bonus when the full query appears as a contiguous phrase
  if (phrase.length >= 3) {
    if (title.includes(phrase)) score += 8;
    if (excerpt.includes(phrase)) score += 4;
    if (keywords.includes(phrase)) score += 3;
  }

  return score;
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

async function educationResults(
  tokens: string[],
  phrase: string
): Promise<Array<SearchResult & { score: number }>> {
  const posts = await getPosts();

  return posts
    .map((post) => {
      const label = post.isWebinarPost
        ? "Webinar"
        : post.category?.title ?? "Insight";

      // Include category, secondaryCategory, and content type as searchable keywords
      const keywords = [
        post.category?.title,
        post.secondaryCategory?.title,
        post.isWebinarPost ? "webinar" : "article",
        post.author?.name,
      ].filter((k): k is string => Boolean(k));

      const result: SearchResult & { keywords: string[] } = {
        title: post.title,
        href: `/education/${postSlug(post)}`,
        excerpt: post.excerpt ?? "",
        type: "Education",
        label,
        date: post.publishedAt ? formatDate(post.publishedAt) : undefined,
        keywords,
      };

      return {
        ...result,
        score: scoreResult(result, tokens, phrase),
      };
    })
    .filter((result) => result.score > 0);
}

export async function searchSite(query: string): Promise<SearchResult[]> {
  const tokens = tokensFor(query);
  if (tokens.length === 0) return [];

  const phrase = normalise(query);

  const pageResults = staticPages
    .map((page) => ({
      title: page.title,
      href: page.href,
      excerpt: page.excerpt,
      type: page.type,
      score: scoreResult(page, tokens, phrase),
    }))
    .filter((result) => result.score > 0);

  const results = [...pageResults, ...(await educationResults(tokens, phrase))]
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .map(({ score: _score, ...result }) => result);

  return results;
}

export function sanitiseSearchQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
}
