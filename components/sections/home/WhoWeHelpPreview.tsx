import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const audiences = [
  {
    tag: "For Advisers",
    title: "Financial Advisers",
    description:
      "Comprehensive SMSF services to support your clients' retirement strategies",
    href: "/who-we-help#advisers",
  },
  {
    tag: "For Accountants",
    title: "Accounting Practices",
    description:
      "Seamless integration with your existing systems and workflow processes",
    href: "/who-we-help#accountants",
  },
  {
    tag: "For Trustees",
    title: "SMSF Trustees",
    description:
      "Simple, transparent SMSF management with clear guidance every step",
    href: "/who-we-help#trustees",
  },
];

/** Light grey honeycomb pattern for Who We Help cards */
function HoneycombBgLight({ patternId }: { patternId: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.2)"
        >
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function WhoWeHelpPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Who We Help
            </h2>
            <p className="mt-4 text-gray-600">
              Tailored solutions for every type of SMSF professional
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <FadeIn key={audience.title} direction="up" delay={0.1 + index * 0.1}>
              <Link
                href={audience.href}
                className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50 p-6 hover:border-brand-blue hover:shadow-md transition-all"
              >
                <HoneycombBgLight patternId={`who-we-help-hive-${index}`} />
                <span className="relative z-10 inline-block w-fit rounded-full bg-brand-blue px-3 py-1 text-xs font-medium text-white">
                  {audience.tag}
                </span>
                <h3 className="relative z-10 mt-4 text-xl font-semibold text-gray-900 group-hover:text-brand-blue">
                  {audience.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm text-gray-600 flex-grow">
                  {audience.description}
                </p>
                <span className="relative z-10 mt-4 inline-flex items-center text-sm font-medium text-brand-orange group-hover:text-brand-orange-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
