import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { getFactsheetPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { InsightArticleCard } from "@/components/sections/education/InsightArticleCard";

const fallbackInsights = [
  {
    type: "Fact Sheet",
    title: "2024 SMSF Compliance Update",
    description: "Latest regulatory changes affecting SMSF trustees",
    date: "Dec 2024",
    slug: "2024-smsf-compliance-update",
    image: "/Homepage Latest Insights - Fact Sheet.png",
  },
  {
    type: "Webinar",
    title: "Investment Strategy Best Practices",
    description: "Essential guidance for diversified SMSF portfolios",
    date: "Nov 2024",
    slug: "investment-strategy-best-practices",
    image: "/Homepage Latest Insights - Webinar.png",
  },
  {
    type: "Case Study",
    title: "Pension Phase Transition",
    description: "Case study: Converting accumulation to pension",
    date: "Nov 2024",
    slug: "pension-phase-transition",
    image: "/Homepage Latest Insights - Case Study.png",
  },
];

export async function LatestInsights() {
  const sanityPosts = await getFactsheetPosts(3);

  const insights =
    sanityPosts.length > 0
      ? sanityPosts.map((post) => {
          const slug =
            typeof post.slug === "string" ? post.slug : post.slug.current;
          const imageUrl = post.mainImage?.asset
            ? urlFor(post.mainImage).width(600).height(340).url()
            : null;
          const date = new Date(post.publishedAt).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return {
            type: post.category?.title ?? "Article",
            title: post.title,
            description: post.excerpt ?? "",
            date,
            slug,
            image: imageUrl,
            externalUrl: post.externalUrl ?? null,
            externalSource: post.externalSource ?? null,
          };
        })
      : fallbackInsights;

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mx-auto">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Latest Insights
          </h2>
          <p className="mt-2 text-lg text-gray-700 leading-7 font-medium">
            Stay informed with our expert resources
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((insight, index) => (
            <FadeIn key={insight.slug} direction="up" delay={index * 0.1}>
              <InsightArticleCard
                slug={insight.slug}
                category={insight.type}
                title={insight.title}
                excerpt={insight.description}
                date={insight.date}
                imageUrl={insight.image}
                externalUrl={"externalUrl" in insight ? insight.externalUrl : null}
                externalSource={"externalSource" in insight ? insight.externalSource : null}
                internalHref={`/education/${insight.slug}`}
                patternId={`insight-hex-${index}`}
              />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-[280px] bg-brand-orange text-white hover:bg-brand-orange/90 sm:w-auto sm:max-w-none px-8"
            asChild
          >
            <Link href="/education">
              View All Resources
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
