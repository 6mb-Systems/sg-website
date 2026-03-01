import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
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
          {insights.map((insight, index) => (
            <FadeIn key={insight.slug} direction="up" delay={index * 0.1}>
              <Link
                href={`/education/${insight.slug}`}
                className="relative block h-full overflow-hidden rounded-xl border border-gray-200"
              >
              {/* Light grey hex gradient background (match Certifications style) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
              <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                <defs>
                  <pattern
                    id={`insight-hex-${index}`}
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
                <rect width="100%" height="100%" fill={`url(#insight-hex-${index})`} />
              </svg>

              {/* Image Section */}
              <div className="relative z-10 h-48 w-full overflow-hidden bg-brand-blue/5">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="relative z-10 flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                    {insight.type}
                  </span>
                  <span className="text-xs text-gray-500">{insight.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {insight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-grow">{insight.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange">
                  <FileText className="mr-1 h-4 w-4" />
                  Read more
                </span>
              </div>
            </Link>
            </FadeIn>
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
