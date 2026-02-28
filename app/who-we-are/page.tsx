import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { Values } from "@/components/sections/about/Values";
import { LeadershipTeam } from "@/components/sections/about/LeadershipTeam";
import { ServiceCards } from "@/components/sections/services/ServiceCards";
import { ProcessSteps } from "@/components/sections/services/ProcessSteps";
import { SpecialistServices } from "@/components/sections/services/SpecialistServices";
import { AudienceTabs } from "@/components/sections/who-we-help/AudienceTabs";
import { CTASection } from "@/components/sections/shared/CTASection";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "SuperGuardian has been passionately supporting Trustees, Financial Advisers and Accountants for over 24 years.",
};

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        title="Who We Are"
        description="SuperGuardian has been passionately supporting Trustees, Financial Advisers and Accountants for over 24 years."
      />
      <AboutIntro />
      <Values />
      <LeadershipTeam />
      
      {/* What We Do Section - scroll-margin so hash link shows full hero below header */}
      <div id="what-we-do" className="scroll-mt-[8rem]">
        <PageHero
          title="What We Do"
          description="Comprehensive SMSF services designed to take the complexity out of self-managed superannuation, allowing you to focus on what matters most."
        />
        <ServiceCards />
        <ProcessSteps />
        <SpecialistServices />
      </div>

      {/* Who We Help Section - scroll-margin so hash link shows full hero below header */}
      <div id="who-we-help" className="scroll-mt-[8rem]">
        <div>
          <div id="advisers" className="scroll-mt-[8rem]">
            <PageHero
              title="Who We Help"
              description="Tailored SMSF solutions for financial advisers, accounting practices, and SMSF trustees across Australia."
            />
          </div>
        </div>
        <div id="accountants" className="scroll-mt-[8rem]" />
        <div id="trustees" className="scroll-mt-[8rem]" />
        <AudienceTabs />
      </div>

      <CTASection
        title="Ready to Work With Us?"
        description="Join thousands of professionals who trust SuperGuardian"
        primaryButtonText="Get Started Today"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
