import type { Metadata } from "next";
import { ServiceCards } from "@/components/sections/services/ServiceCards";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";
import { SpecialistServices } from "@/components/sections/services/SpecialistServices";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Comprehensive SMSF services designed to take the complexity out of self-managed superannuation, allowing you to focus on what matters most.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="What We Do"
        description="Comprehensive SMSF services designed to take the complexity out of self-managed superannuation, allowing you to focus on what matters most"
      />

      <ServiceCards />
      <ProcessSteps />
      <SpecialistServices />

      <CTASection
        title="Ready to Get Started?"
        description="Take the first step with our free consultation and transparent pricing"
        primaryButtonText="Start Free Consultation"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/what-we-do"
      />
    </>
  );
}
