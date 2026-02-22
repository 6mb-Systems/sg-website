import { PageHero } from "@/components/sections/shared/PageHero";
import { CTASection } from "@/components/sections/shared/CTASection";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers at SuperGuardian"
        description="Join our team of specialists and help shape the future of SMSF administration in Australia."
      />
      
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-brand-blue">Why work with us?</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator. With more than 24 years of experience, we provide a premium service to Accountants, Financial Advisers, and Trustees.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              We are always on the lookout for talented, motivated individuals to join our team in Adelaide and Melbourne. We offer a supportive, flexible, and rewarding environment where your professional development is a priority.
            </p>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Current Opportunities</h3>
            <p className="mt-4 text-gray-600">
              All of our current job openings are advertised on SEEK. Click the link below to view our active listings and apply directly.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-brand-blue text-white hover:bg-brand-blue-600" asChild>
                <a 
                  href="https://www.seek.com.au/SuperGuardian-jobs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Opportunities on SEEK
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to join the team?"
        description="Check out our SEEK profile for all the latest career opportunities at SuperGuardian."
        primaryButtonText="View on SEEK"
        primaryButtonHref="https://www.seek.com.au/SuperGuardian-jobs"
        isExternal={true}
      />
    </>
  );
}
