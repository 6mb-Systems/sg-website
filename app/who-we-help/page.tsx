import type { Metadata } from "next";
import { AudienceTabs } from "@/components/sections/who-we-help/AudienceTabs";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Tailored SMSF solutions for financial advisers, accounting practices, and SMSF trustees across Australia.",
};

export default function WhoWeHelpPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              Who We Help
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Tailored SMSF solutions for financial advisers, accounting
              practices, and SMSF trustees across Australia
            </p>
          </div>
        </div>
      </section>

      <AudienceTabs />

      <CTASection
        title="Start Your SMSF Journey"
        description="Join hundreds of professionals who trust SuperGuardian"
        primaryButtonText="Get Started Today"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
