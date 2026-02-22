import { Hero } from "@/components/sections/home/Hero";
import { ValueProposition } from "@/components/sections/home/ValueProposition";
import { FeatureCards } from "@/components/sections/home/FeatureCards";
import { WhoWeHelpPreview } from "@/components/sections/home/WhoWeHelpPreview";
import { TechnologyPartners } from "@/components/sections/home/TechnologyPartners";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { CTASection } from "@/components/sections/shared/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <FeatureCards />
      <WhoWeHelpPreview />
      <TechnologyPartners />
      <LatestInsights />
      <CTASection
        title="Ready to Get Started?"
        description="Join hundreds of professionals who trust SuperGuardian with their clients' retirement futures"
        primaryButtonText="Get Started Today"
        primaryButtonHref="https://applications.superguardian.com.au/"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/what-we-do"
      />
    </>
  );
}
