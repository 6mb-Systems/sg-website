import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

// Placeholder data - will be replaced with Sanity data later
const insights = [
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

export function LatestInsights() {
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
          {insights.map((insight) => (
            <Link
              key={insight.slug}
              href={`/education/${insight.slug}`}
              className="group relative h-full flex flex-col overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-blue/5">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                    {insight.type}
                  </span>
                  <span className="text-xs text-gray-500">{insight.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-blue">
                  {insight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-grow">{insight.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange group-hover:text-brand-orange-600">
                  <FileText className="mr-1 h-4 w-4" />
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90 w-full md:w-auto px-8" asChild>
            <Link href="/education">
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
