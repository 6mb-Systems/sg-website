import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { OfficeLocations } from "@/components/sections/contact/OfficeLocations";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to one of our experts. If you would like to find out further information on the SuperGuardian service please give us a call.",
};

export default function ContactPage() {
  return (
    <Providers>
      <PageHero
        title="Talk to one of our experts"
        description="If you would like to find out further information on the SuperGuardian service please give us a call"
      />

      {/* Contact Form and Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <OfficeLocations />
    </Providers>
  );
}
