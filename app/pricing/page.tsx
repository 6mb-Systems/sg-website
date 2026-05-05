import type { Metadata } from "next";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { PricingProcess } from "@/components/sections/pricing/PricingProcess";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, predictable SMSF pricing with no hidden fees. Setup, standard administration, and flexible plans for complex SMSFs.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Transparent Pricing"
        description="No hidden fees, no surprises - just honest, predictable pricing"
      />

      <PricingCards />
      <PricingProcess />

      <CTASection
        title="Ready to Get Started?"
        description="Take the first step with our free consultation and transparent pricing"
        primaryButtonText="Start Free Consultation"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
