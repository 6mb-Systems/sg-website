import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { Mission } from "@/components/sections/about/Mission";
import { Values } from "@/components/sections/about/Values";
import { LeadershipTeam } from "@/components/sections/about/LeadershipTeam";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "SuperGuardian is a privately owned Chartered Accounting firm and specialist SMSF administrator, with more than 20 years of experience.",
};

export default function WhoWeArePage() {
  return (
    <>
      <AboutIntro />
      <Mission />
      <Values />
      <LeadershipTeam />
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
