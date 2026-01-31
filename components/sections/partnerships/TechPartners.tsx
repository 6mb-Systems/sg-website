import { CheckCircle } from "lucide-react";

const partners = [
  {
    name: "Class",
    tagline: "Class Super",
    type: "Native API integration",
    description: "Australia's leading cloud-based SMSF administration platform",
    features: ["Real-time data sync"],
  },
  {
    name: "BGL",
    tagline: "BGL Corporate Solutions",
    type: "Direct data exchange",
    description: "Comprehensive SMSF software suite for professionals",
    features: ["Document generation"],
  },
  {
    name: "MYOB",
    tagline: "MYOB",
    type: "Cloud-based sync",
    description: "Business management platform with SMSF capabilities",
    features: ["Accounting integration"],
  },
];

export function TechPartners() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Technology Partners
          </h2>
          <p className="mt-4 text-gray-600">
            Integrated with Australia&apos;s leading SMSF platforms
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                  {partner.name}
                </div>
                <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
                  {partner.type}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {partner.tagline}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{partner.description}</p>
              <ul className="mt-4 space-y-2">
                {partner.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
