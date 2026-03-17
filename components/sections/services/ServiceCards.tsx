import { FileText, Settings, Calculator, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

const services = [
  {
    id: "establishment",
    icon: FileText,
    title: "SMSF Setup",
    description: "for new SMSF establishments",
    price: "From $690",
    priceType: null,
    timeline: "1 to 3 Business days",
    features: [
      "Welcome call",
      "Rollover support - $210 per member",
      "Trust deed preparation",
      "Fund establishment minutes and declaration",
      "TFN & ABN applications",
      "Bank account establishment assistance",
      "Limited investment strategy forms and guide",
      "Death Benefit Nomination form and guide",
      "Corporate trustee establishment",
    ],
  },
  {
    id: "administration",
    icon: Settings,
    title: "Standard Administration",
    description: "for SMSFs on an eligible platform",
    price: "From $215",
    priceType: "/month",
    timeline: "Ongoing service",
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Compliance monitoring",
      "24/7 online reporting",
      "Dedicated specialist Client Manager",
      "Fund Mailhouse",
      "Australian listed investments",
      "Term deposits via Australian Money Markets",
    ],
  },
  {
    id: "flexible",
    icon: Calculator,
    title: "Flexible Administration",
    description: "full-service for complex SMSFs",
    price: "From $240",
    priceType: "/month",
    timeline: "Ongoing service",
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Compliance monitoring",
      "24/7 online reporting",
      "Dedicated specialist Client Manager",
      "Fund Mailhouse",
      "Foreign listed investments",
      "Unlisted investments, derivatives & more",
    ],
  },
];

export function ServiceCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 0.1}>
              <div
                id={service.id}
                className="relative h-full overflow-hidden rounded-xl border border-gray-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`service-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#service-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex h-full flex-col p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue shrink-0">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">⏱</span>
                  <span className="text-sm text-gray-600">{service.timeline}</span>
                  <span className="ml-auto rounded-full bg-brand-orange-50 px-3 py-1 text-sm font-medium text-brand-orange">
                    {service.price}
                    {service.priceType}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="mt-6 w-full" asChild>
                  <a href="/pricing">View Pricing</a>
                </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
