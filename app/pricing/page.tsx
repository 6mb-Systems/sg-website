import type { Metadata } from "next";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { VolumeDiscounts } from "@/components/sections/pricing/VolumeDiscounts";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";
import { MobileFeatures } from "@/components/sections/pricing/MobileFeatures";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Pricing & Process",
  description:
    "Transparent pricing and a proven 4-step process designed to get your SMSF up and running efficiently.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              Pricing & Process
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Transparent pricing and a proven 4-step process designed to get
              your SMSF up and running efficiently
            </p>
          </div>
        </div>
      </section>

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
