import type { Metadata } from "next";
import { AudienceTabs } from "@/components/sections/who-we-help/AudienceTabs";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Tailored SMSF solutions for financial advisers, accounting practices, and SMSF trustees across Australia.",
};

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        title="Who We Help"
        description="Tailored SMSF solutions for financial advisers, accounting practices, and SMSF trustees across Australia"
      />

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
