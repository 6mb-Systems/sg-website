import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Call Us */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
            <Phone className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-gray-900">Call Us Directly</h3>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">General Enquiries</p>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="text-xl font-semibold text-brand-orange hover:text-brand-orange-600"
          >
            {siteConfig.phone}
          </a>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">Business Hours</p>
          <p className="text-sm text-gray-600">
            Monday – Friday: 8:30 AM – 5:00 PM (ACST)
          </p>
        </div>
      </div>

      {/* Email Support */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-gray-900">Email Support</h3>
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-sm text-gray-600">General Enquiries</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-600"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">Technical Support</p>
            <a
              href="mailto:support@smsfpro.com.au"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-600"
            >
              support@smsfpro.com.au
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">Partnership Enquiries</p>
            <a
              href="mailto:partners@smsfpro.com.au"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-600"
            >
              partners@smsfpro.com.au
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
