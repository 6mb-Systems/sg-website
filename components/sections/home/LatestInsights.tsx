import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder data - will be replaced with Sanity data later
const insights = [
  {
    type: "Fact Sheet",
    title: "2024 SMSF Compliance Update",
    description: "Latest regulatory changes affecting SMSF trustees",
    date: "Dec 2024",
    slug: "2024-smsf-compliance-update",
  },
  {
    type: "Webinar",
    title: "Investment Strategy Best Practices",
    description: "Essential guidance for diversified SMSF portfolios",
    date: "Nov 2024",
    slug: "investment-strategy-best-practices",
  },
  {
    type: "Case Study",
    title: "Pension Phase Transition",
    description: "Case study: Converting accumulation to pension",
    date: "Nov 2024",
    slug: "pension-phase-transition",
  },
];

export function LatestInsights() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-2 text-gray-600">
              Stay informed with our expert resources
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/education">
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className="group rounded-xl border border-gray-200 bg-white p-6 hover:border-brand-blue hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                  {insight.type}
                </span>
                <span className="text-xs text-gray-500">{insight.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-blue">
                {insight.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{insight.description}</p>
              <Link
                href={`/education/${insight.slug}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange hover:text-brand-orange-600"
              >
                <FileText className="mr-1 h-4 w-4" />
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
