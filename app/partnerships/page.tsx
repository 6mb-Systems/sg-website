import type { Metadata } from "next";
import { IntegrationBenefits } from "@/components/sections/partnerships/IntegrationBenefits";
import { TechPartners } from "@/components/sections/partnerships/TechPartners";
import { IndustryAssociations } from "@/components/sections/partnerships/IndustryAssociations";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Strategic partnerships with leading technology providers and industry bodies to deliver the best possible SMSF experience.",
};

export default function PartnershipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              Our Partnerships
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Strategic partnerships with leading technology providers and
              industry bodies to deliver the best possible SMSF experience
            </p>
          </div>
        </div>
      </section>

      <IntegrationBenefits />
      <TechPartners />
      <IndustryAssociations />

      <CTASection
        title="Partner With Us"
        description="Join our network of technology and industry partners"
        primaryButtonText="Get Started Today"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
