import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Who We Help
          </h2>
          <p className="mt-4 text-gray-600">
            Tailored solutions for every type of SMSF professional
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((audience) => (
            <Link
              key={audience.title}
              href={audience.href}
              className="group rounded-xl border border-gray-200 p-6 hover:border-brand-blue hover:shadow-md transition-all"
            >
              <span className="inline-block rounded-full bg-brand-blue px-3 py-1 text-xs font-medium text-white">
                {audience.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-brand-blue">
                {audience.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {audience.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange group-hover:text-brand-orange-600">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
