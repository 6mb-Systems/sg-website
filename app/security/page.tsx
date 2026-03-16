import type { Metadata } from "next";
import { Certifications } from "@/components/sections/security/Certifications";
import { SecurityFramework } from "@/components/sections/security/SecurityFramework";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FadeIn } from "@/components/ui/fade-in";

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
        description="SuperGuardian follows internationally recognised compliance frameworks that demonstrate our adherence to industry-leading security guidelines and practices"
      />

      <section className="section-padding bg-white">
        <div className="container-width">
          <FadeIn direction="up">
            <p className="text-gray-700 leading-relaxed">
              SuperGuardian recognises that the confidentiality, integrity and availability of information and data created, maintained, and hosted by us are vital to the success of the business and privacy of our clients and partners.
            </p>
          </FadeIn>
        </div>
      </section>

      <Certifications />
      <SecurityFramework />

      <CTASection
        title="Questions About Our Security?"
        description="Our team is happy to discuss our security practices and compliance in detail"
        primaryButtonText="Chat to our Leadership"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
