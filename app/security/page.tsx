import type { Metadata } from "next";
import { Certifications } from "@/components/sections/security/Certifications";
import { SecurityFramework } from "@/components/sections/security/SecurityFramework";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Security",
  description:
    "We maintain the highest standards of security and compliance to protect your sensitive SMSF data.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        title="Security at SuperGuardian"
        description="We maintain the highest standards of security and compliance to protect your sensitive SMSF data"
      />

      <Certifications />
      <SecurityFramework />

      <CTASection
        title="Questions About Our Security?"
        description="Our team is happy to discuss our security practices and certifications in detail"
        primaryButtonText="Contact Our Security Team"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
