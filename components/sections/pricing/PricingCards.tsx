import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

const plans = [
  {
    name: "SMSF Startup",
    description: "Perfect for new SMSF establishments",
    price: "$1,500",
    priceType: "/one-time",
    timeline: "5-7 business days",
    badge: "New SMSFs",
    popular: false,
    features: [
      "Trust deed preparation & execution",
      "ATO registration & ABN application",
      "Bank account establishment",
      "Initial investment strategy",
      "Member benefit statements",
      "3 months free administration",
    ],
  },
  {
    name: "SMSF Essential",
    description: "Comprehensive ongoing administration",
    price: "$150",
    priceType: "/per month",
    timeline: "Monthly service",
    badge: "Most Popular",
    popular: true,
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Quarterly reporting",
      "Compliance monitoring",
      "Online portal access",
    ],
  },
  {
    name: "SMSF Professional",
    description: "Full-service administration and compliance",
    price: "$250",
    priceType: "/per month",
    timeline: "Monthly service",
    badge: "Complex SMSFs",
    popular: false,
    features: [
      "Everything in Essential",
      "Pension calculations",
      "Investment strategy reviews",
      "Corporate trustee support",
      "Priority support",
      "Dedicated relationship manager",
    ],
  },
];

export function PricingCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-600">
              No hidden fees, no surprises – just honest, competitive pricing
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} direction="up" delay={index * 0.1}>
              <div
                className={cn(
                  "relative h-full overflow-hidden rounded-xl border",
                  plan.popular
                    ? "border-brand-blue ring-2 ring-brand-blue"
                    : "border-gray-200"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`pricing-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#pricing-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      plan.popular
                        ? "bg-brand-blue text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-600">{plan.priceType}</span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  ⏱ {plan.timeline}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a
                    href={siteConfig.externalLinks.getStarted}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
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
