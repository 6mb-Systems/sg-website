"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Users, Building2, UserCircle, type LucideIcon } from "lucide-react";

interface FeatureWithItems {
  title: string;
  description: string;
  items: string[];
  footnote?: string;
}

interface JourneyStep {
  number: number;
  title: string;
  time: string;
  description: string;
}


interface Benefit {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

interface BaseAudience {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
}

interface AdvisersAccountantsAudience extends BaseAudience {
  id: "advisers" | "accountants";
  features: FeatureWithItems[];
  benefits: Benefit[];
}

interface TrusteesAudience extends BaseAudience {
  id: "trustees";
  journeySteps: JourneyStep[];
  faqs: FAQ[];
}

type Audience = AdvisersAccountantsAudience | TrusteesAudience;

const audiences: Audience[] = [
  {
    id: "advisers",
    icon: Users,
    label: "Financial Advisers",
    title: "For Financial Advisers",
    subtitle:
      "Expand your SMSF offering with our comprehensive administration and compliance services",
    features: [
      {
        title: "SMSF Setup & Administration",
        description: "Complete establishment and ongoing administration services",
        items: [
          "Fast 5-7 day setup*",
          "Monthly reconciliations",
          "Direct client communication",
        ],
        footnote:
          "*Subject to the ATO processing timeframe for fund registrations",
      },
      {
        title: "Investment Strategy Support",
        description: "Expert guidance on compliant investment strategies",
        items: ["Tailored strategies", "Compliance reviews", "Documentation support"],
      },
      {
        title: "Client Reporting",
        description: "Comprehensive reporting to keep your clients informed",
        items: ["Monthly statements", "Performance reporting", "Tax summaries"],
      },
    ],
    benefits: [
      { title: "White Label Service", description: "Our services appear as your own, maintaining your client relationships" },
      { title: "Dedicated Support", description: "Direct access and personalised support to your dedicated Client Manager" },
      { title: "Scalable Solutions", description: "Grow your SMSF book without increasing internal resources" },
      { title: "Competitive Pricing", description: "Volume discounts available for practices with multiple SMSFs" },
    ],
  },
  {
    id: "accountants",
    icon: Building2,
    label: "Accountants",
    title: "For Accountants",
    subtitle:
      "Seamless integration with your existing systems and comprehensive SMSF support",
    features: [
      {
        title: "Seamless Integration",
        description: "Direct integration with Class and Microsoft SharePoint",
        items: ["Automated data sync", "Reduced manual entry", "Real-time updates"],
      },
      {
        title: "Tax & Compliance",
        description: "Expert tax preparation and compliance monitoring",
        items: ["SMSF tax returns", "Audit preparation", "Regulatory updates"],
      },
      {
        title: "Practice Support",
        description: "Resources and training to grow your SMSF practice",
        items: ["CPD training", "Technical updates", "Marketing support"],
      },
    ],
    benefits: [
      { title: "Practice Growth", description: "Resources to help you expand your SMSF client base" },
      { title: "Technical Excellence", description: "Stay current with regulatory changes and best practices" },
      { title: "Flexible Service Levels", description: "Choose the level of involvement that suits your practice" },
    ],
  },
  {
    id: "trustees",
    icon: UserCircle,
    label: "SMSF Trustees",
    title: "For SMSF Trustees",
    subtitle: "Plain-language guidance and professional support for your SMSF journey",
    journeySteps: [
      {
        number: 1,
        title: "Initial Consultation",
        time: "30 minutes",
        description: "We understand your needs and recommend the right services",
      },
      {
        number: 2,
        title: "Service Agreement",
        time: "—",
        description: "Clear pricing and service levels with no hidden fees",
      },
      {
        number: 3,
        title: "Implementation",
        time: "—",
        description: "Our experts handle all the setup and integration work",
      },
      {
        number: 4,
        title: "Ongoing Support",
        time: "Ongoing",
        description: "Regular communication and proactive service delivery",
      },
    ],
    faqs: [
      {
        question: "What are my responsibilities as an SMSF trustee?",
        answer: (
          <>
            As a trustee, you're responsible for ensuring your SMSF complies with super laws and is run for the sole purpose of providing retirement benefits. For more information on the implications of having a self-managed super fund (SMSF), please review{" "}
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/self-managed-super-funds-smsf/before-you-start-an-smsf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline hover:text-brand-blue-700"
            >
              Before you start an SMSF
            </a>{" "}
            on the ATO website.
          </>
        ),
      },
      { question: "How much does it cost to run an SMSF?", answer: "Costs vary based on fund complexity. Our services start from $215 per month for administration." },
      { question: "Can I invest in property through my SMSF?", answer: "Yes, SMSFs can invest in property, including residential and commercial real estate, subject to certain rules." },
      { question: "What happens if I make a mistake?", answer: "We're here to help you stay compliant every step of the way. With a dedicated Client Manager, every SuperGuardian client benefits from personalised support and a seamless experience. Our proactive monitoring means we identify and resolve issues early before they become problems." },
    ],
  },
];

function isAdvisersOrAccountants(audience: Audience): audience is AdvisersAccountantsAudience {
  return audience.id === "advisers" || audience.id === "accountants";
}

function isTrustees(audience: Audience): audience is TrusteesAudience {
  return audience.id === "trustees";
}

export function AudienceTabs() {
  const [activeTab, setActiveTab] = React.useState<string>("advisers");

  const initialHashHandled = React.useRef(false);

  React.useEffect(() => {
    const handleHashChange = (isInitial: boolean) => {
      const hash = window.location.hash.replace("#", "");
      if (hash && audiences.some((a) => a.id === hash)) {
        setActiveTab(hash);
        // On initial load only: for accountants/trustees, scroll to Who We Help hero so title section is visible (same as advisers)
        if (isInitial && (hash === "accountants" || hash === "trustees")) {
          const hero = document.getElementById("advisers");
          hero?.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
    };

    if (!initialHashHandled.current) {
      initialHashHandled.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => handleHashChange(true));
      });
    }

    const onHashChange = () => handleHashChange(false);

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const activeAudience = audiences.find((a) => a.id === activeTab)!;

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Tab Navigation - segmented control: clear selected state, neutral container */}
        <div className="flex justify-center">
          <div
            className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="Audience"
          >
            {audiences.map((audience) => (
              <button
                key={audience.id}
                id={audience.id}
                role="tab"
                aria-selected={activeTab === audience.id}
                aria-controls={`panel-${audience.id}`}
                onClick={() => handleTabClick(audience.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200",
                  activeTab === audience.id
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
                )}
              >
                <audience.icon className="h-4 w-4 shrink-0" aria-hidden />
                <span>{audience.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue">
              {activeAudience.title}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {activeAudience.subtitle}
            </p>
          </div>

          {/* Features Grid - for advisers and accountants */}
          {isAdvisersOrAccountants(activeAudience) && (
            <>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {activeAudience.features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="relative overflow-hidden rounded-xl border border-gray-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                    <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                      <defs>
                        <pattern id={`audience-feature-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                          <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#audience-feature-hex-${index})`} />
                    </svg>
                    <div className="relative z-10 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {feature.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {feature.footnote ? (
                      <p className="mt-3 text-[11px] text-gray-500 leading-tight tracking-tight">
                        {feature.footnote}
                      </p>
                    ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-12 rounded-xl bg-brand-blue-50 p-8">
                <h3 className="text-xl font-semibold text-brand-blue">
                  Why {activeAudience.label} Choose SuperGuardian
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {activeAudience.benefits.map((benefit) => (
                    <div key={benefit.title}>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Trustees - Journey Steps */}
          {isTrustees(activeAudience) && (
            <>
              <div className="mt-12">
                <h3 className="text-center text-xl font-semibold text-brand-blue">
                  Your SMSF Journey
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {activeAudience.journeySteps.map((step, index) => (
                    <div key={step.number} className="relative overflow-hidden rounded-xl border border-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                        <defs>
                          <pattern id={`audience-step-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                            <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#audience-step-hex-${index})`} />
                      </svg>
                      <div className="relative z-10 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white font-bold">
                        {step.number}
                      </div>
                      <h4 className="mt-4 font-semibold text-gray-900">{step.title}</h4>
                      <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="mt-12">
                <h3 className="text-center text-xl font-semibold text-brand-blue">
                  Frequently Asked Questions
                </h3>
                <div className="mt-8 space-y-4 max-w-3xl mx-auto">
                  {activeAudience.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="rounded-xl border border-gray-200 bg-white"
                    >
                      <summary className="cursor-pointer p-4 font-medium text-gray-900 hover:text-brand-blue">
                        {faq.question}
                      </summary>
                      <div className="border-t px-4 py-3 text-sm text-gray-600">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
