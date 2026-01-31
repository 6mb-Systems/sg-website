import type { Metadata } from "next";
import { Certifications } from "@/components/sections/security/Certifications";
import { SecurityFramework } from "@/components/sections/security/SecurityFramework";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Security at SG",
  description:
    "Your trust is our priority. We maintain the highest standards of security and compliance to protect your sensitive SMSF data.",
};

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-brand-blue md:text-5xl">
              Security at SuperGuardian
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Your trust is our priority. We maintain the highest standards of
              security and compliance to protect your sensitive SMSF data.
            </p>
          </div>
        </div>
      </section>

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
