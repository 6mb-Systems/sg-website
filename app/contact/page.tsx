import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { OfficeLocations } from "@/components/sections/contact/OfficeLocations";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to one of our experts. If you would like to find out further information on the SuperGuardian service please give us a call.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              Talk to one of our experts
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              If you would like to find out further information on the
              SuperGuardian service please give us a call.
            </p>
          </div>
        </div>
      </section>

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
    </>
  );
}
