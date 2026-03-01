import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CTASection } from "@/components/sections/shared/CTASection";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Reporting",
  description:
    "Access your SuperGuardian premium reports and SMSF portal. Client login, adviser login, and key document access.",
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        title="Online Reporting"
        description="SuperGuardian offers premium reports, updated daily"
      />

      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn direction="up">
              <p className="text-gray-600">
                Our online SMSF portal houses a wealth of information for your SMSF. The portal provides daily insights into investment income and performance, portfolio valuations and more.
              </p>
              <p className="mt-4 text-gray-600">
                Click on the buttons below to access your SuperGuardian premium reports.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full max-w-[280px] sm:w-auto bg-brand-blue text-white hover:bg-brand-blue-600" asChild>
                  <a
                    href={siteConfig.externalLinks.clientLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Client Login
                  </a>
                </Button>
                <Button size="lg" variant="secondary" className="w-full max-w-[280px] sm:w-auto" asChild>
                  <a
                    href={siteConfig.externalLinks.adviserLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adviser Login
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn direction="up">
              <h2 className="text-2xl font-bold text-brand-blue">Access your SMSF Key Documents</h2>
              <p className="mt-4 text-gray-600">
                Your SMSF key documents such as your trust deed, minutes of meetings, other regulatory documents and historical financial statements are available via this login.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                  <a
                    href={siteConfig.externalLinks.keyDocumentsLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Key Document Login
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Talk"
        description={`If you would like to find out further information on the SuperGuardian service please give us a call. ${siteConfig.phone}`}
        primaryButtonText="Book for a FREE Consultation"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
