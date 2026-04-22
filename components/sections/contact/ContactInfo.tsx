import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Call Us & Hours */}
      <FadeIn direction="up" delay={0.1}>
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
            <defs>
              <pattern id="contact-hex-0" x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hex-0)" />
          </svg>
          <div className="relative z-10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-gray-900">Contact & Hours</h3>
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
              Monday - Friday: 8:30 AM - 5:00 PM (ACST)
            </p>
          </div>
          </div>
        </div>
      </FadeIn>

      {/* Email Support */}
      <FadeIn direction="up" delay={0.2}>
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
            <defs>
              <pattern id="contact-hex-1" x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hex-1)" />
          </svg>
          <div className="relative z-10 p-6">
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
              <p className="text-sm text-gray-600">Application Support</p>
              <a
                href="mailto:applications@superguardian.com.au"
                className="text-sm font-medium text-brand-orange hover:text-brand-orange-600"
              >
                applications@superguardian.com.au
              </a>
            </div>
          </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
