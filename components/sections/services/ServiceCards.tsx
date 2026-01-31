import { FileText, Settings, Calculator, ClipboardCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

const services = [
  {
    id: "establishment",
    icon: FileText,
    title: "SMSF Establishment",
    description: "Complete SMSF setup from trust deed preparation to ATO registration",
    price: "From $690",
    priceType: null,
    timeline: "5-7 business days",
    features: [
      "Trust deed preparation & execution",
      "ATO registration & ABN application",
      "Bank account establishment",
      "Initial compliance documentation",
      "Investment strategy development",
      "Member benefit statements",
    ],
  },
  {
    id: "administration",
    icon: Settings,
    title: "SMSF Administration",
    description: "Ongoing administration to keep your SMSF running smoothly",
    price: "From $170",
    priceType: "/month",
    timeline: "Ongoing monthly",
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Pension calculations",
      "Corporate trustee support",
      "Document management",
    ],
  },
  {
    id: "accounting",
    icon: Calculator,
    title: "SMSF Accounting & Tax",
    description: "Expert tax preparation and lodgment services",
    price: "From $2,200",
    priceType: "/year",
    timeline: "Within 6 weeks",
    features: [
      "Annual financial statements",
      "Tax return preparation",
      "Member statements",
      "Actuarial certificates",
      "PAYG withholding",
    ],
  },
  {
    id: "compliance",
    icon: ClipboardCheck,
    title: "Compliance & Reporting",
    description: "Comprehensive compliance monitoring and reporting",
    price: "From $800",
    priceType: "/year",
    timeline: "Quarterly reviews",
    features: [
      "Regulatory health checks",
      "Contribution monitoring",
      "Investment compliance",
      "Event-based reporting",
      "ATO lodgment support",
    ],
  },
];

export function ServiceCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 0.1}>
              <div
                id={service.id}
                className="h-full flex flex-col rounded-xl border border-gray-200 p-6 hover:border-brand-blue hover:shadow-md transition-all hover:-translate-y-1"
              >
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

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="mt-6 w-full" asChild>
                  <a
                    href={siteConfig.externalLinks.getStarted}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
