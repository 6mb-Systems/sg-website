import type { Metadata } from "next";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { VolumeDiscounts } from "@/components/sections/pricing/VolumeDiscounts";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";
import { MobileFeatures } from "@/components/sections/pricing/MobileFeatures";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing and a proven 4-step process designed to get your SMSF up and running efficiently.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Pricing"
        description="Transparent pricing and a proven 4-step process designed to get your SMSF up and running efficiently"
      />

      <PricingCards />
      <VolumeDiscounts />
      <ProcessSteps />
      <MobileFeatures />

      <CTASection
        title="Ready to Get Started?"
        description="Take the first step with our free consultation and transparent pricing"
        primaryButtonText="Start Free Consultation"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
