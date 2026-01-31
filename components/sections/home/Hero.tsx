import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Background pattern/image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-white/5" />
      </div>

      <div className="container-width relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            SMSF Admin Made Simple
          </h1>
          <p className="mt-4 text-xl text-brand-orange font-medium">
            Expert Compliance & Reporting
          </p>
          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            We ensure Accountants, Trustees and Financial Advisers have ready
            access to the facts, tools and support they need to make informed
            decisions and to maximise wealth creation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a
                href={siteConfig.externalLinks.getStarted}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Today →
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue" asChild>
              <Link href="/what-we-do">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
