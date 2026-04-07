import type { Metadata } from "next";
import { Certifications } from "@/components/sections/security/Certifications";
import { SecurityFramework } from "@/components/sections/security/SecurityFramework";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Security",
  description:
    "SuperGuardian follows internationally recognised compliance frameworks that demonstrate our adherence to industry-leading security guidelines and practices.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        title="Security at SuperGuardian"
        description={
          <>
            SuperGuardian follows internationally recognised compliance frameworks{" "}
            <br className="hidden md:block" />
            that demonstrate our adherence to industry-leading{" "}
            <br className="hidden md:block" />
            security guidelines and practices
          </>
        }
      />

      <Certifications />
      <SecurityFramework />

      <CTASection
        title="Questions About Our Security?"
        description={
          <>
            Our Leadership is happy to discuss our security practices
            <br />
            and compliance in detail
          </>
        }
        primaryButtonText="Chat to our Leadership"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
