import type { Metadata } from "next";
import { IntegrationBenefits } from "@/components/sections/partnerships/IntegrationBenefits";
import { TechPartners } from "@/components/sections/partnerships/TechPartners";
import { IndustryAssociations } from "@/components/sections/partnerships/IndustryAssociations";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Strategic partnerships with leading technology providers and industry bodies to deliver the best possible SMSF experience.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        title="Our Partnerships"
        description="Strategic partnerships with leading technology providers and industry bodies to deliver the best possible SMSF experience"
      />

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
