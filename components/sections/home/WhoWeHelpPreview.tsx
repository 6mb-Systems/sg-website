import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";

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

export function WhoWeHelpPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Who We Help
            </h2>
            <p className="mt-4 text-lg text-gray-700 leading-7 font-medium">
              Tailored solutions for every type of SMSF professional
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <FadeIn key={audience.title} direction="up" delay={0.1 + index * 0.1} className="h-full">
              <Link href={audience.href} className="block h-full group">
                <SpotlightCard variant="dark" className="h-full">
                  <div className="flex flex-col h-full p-6">
                    <span className="relative z-10 inline-block w-fit rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {audience.tag}
                    </span>
                    <h3 className="relative z-10 mt-4 text-xl font-semibold text-brand-orange">
                      {audience.title}
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-white/90 flex-grow">
                      {audience.description}
                    </p>
                    <span className="relative z-10 mt-4 inline-flex items-center text-sm font-medium text-white group-hover:text-brand-orange transition-colors">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
