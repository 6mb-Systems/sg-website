import type { Metadata } from "next";
import { ServiceCards } from "@/components/sections/services/ServiceCards";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";
import { SpecialistServices } from "@/components/sections/services/SpecialistServices";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Comprehensive SMSF services designed to take the complexity out of self-managed superannuation, allowing you to focus on what matters most.",
};

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              What We Do
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Comprehensive SMSF services designed to take the complexity out of
              self-managed superannuation, allowing you to focus on what matters
              most.
            </p>
          </div>
        </div>
      </section>

      <ServiceCards />
      <ProcessSteps />
      <SpecialistServices />

      <CTASection
        title="Ready to Get Started?"
        description="Take the first step with our free consultation and transparent pricing"
        primaryButtonText="Start Free Consultation"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="View Pricing"
        secondaryButtonHref="/pricing"
      />
    </>
  );
}
