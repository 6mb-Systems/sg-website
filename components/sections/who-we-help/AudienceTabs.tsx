"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Users, Building2, UserCircle, type LucideIcon } from "lucide-react";

interface FeatureWithItems {
  title: string;
  description: string;
  items: string[];
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
  answer: string;
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
  partners?: string[];
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
        items: ["Fast 5-7 day setup", "Monthly reconciliations", "Direct client communication"],
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
      { title: "Dedicated Support", description: "Direct access to your relationship manager and technical team" },
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
        description: "Direct integration with Class, BGL, MYOB, and Xero",
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
      { title: "Integration Partners", description: "We work directly with leading SMSF software providers" },
      { title: "Practice Growth", description: "Resources to help you expand your SMSF client base" },
      { title: "Technical Excellence", description: "Stay current with regulatory changes and best practices" },
      { title: "Flexible Service Levels", description: "Choose the level of involvement that suits your practice" },
    ],
    partners: ["Class", "BGL", "MYOB", "Xero"],
  },
  {
    id: "trustees",
    icon: UserCircle,
    label: "SMSF Trustees",
    title: "For SMSF Trustees",
    subtitle: "Plain-language guidance and professional support for your SMSF journey",
    journeySteps: [
      { number: 1, title: "Initial Consultation", time: "30 minutes", description: "Free 30-minute consultation to assess your SMSF needs and goals" },
      { number: 2, title: "Documentation & Setup", time: "5-7 days", description: "Complete all required documentation and ATO registrations" },
      { number: 3, title: "Account Setup", time: "2-3 days", description: "Establish bank accounts and integrate with your chosen platforms" },
      { number: 4, title: "Ongoing Support", time: "Ongoing", description: "Regular monitoring, reporting, and compliance management" },
    ],
    faqs: [
      { question: "What are my responsibilities as an SMSF trustee?", answer: "As a trustee, you're responsible for ensuring your SMSF complies with super laws and is run for the sole purpose of providing retirement benefits." },
      { question: "How much does it cost to run an SMSF?", answer: "Costs vary based on fund complexity. Our services start from $170/month for administration." },
      { question: "Can I invest in property through my SMSF?", answer: "Yes, SMSFs can invest in property, including residential and commercial real estate, subject to certain rules." },
      { question: "What happens if I make a mistake?", answer: "We're here to help you stay compliant. Our proactive monitoring helps identify and resolve issues before they become problems." },
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
        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm border">
            {audiences.map((audience) => (
              <button
                key={audience.id}
                id={audience.id}
                onClick={() => handleTabClick(audience.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all",
                  activeTab === audience.id
                    ? "bg-brand-blue text-white"
                    : "text-gray-600 hover:text-brand-blue"
                )}
              >
                <audience.icon className="h-4 w-4" />
                {audience.label}
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
                {activeAudience.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                  >
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

              {/* Integration Partners for Accountants */}
              {activeAudience.partners && (
                <div className="mt-8">
                  <h3 className="text-center text-lg font-semibold text-gray-900">
                    Integration Partners
                  </h3>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    We work directly with leading SMSF software providers
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {activeAudience.partners.map((partner) => (
                      <div
                        key={partner}
                        className="rounded-lg border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700"
                      >
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  {activeAudience.journeySteps.map((step) => (
                    <div key={step.number} className="rounded-xl border border-gray-200 bg-white p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white font-bold">
                        {step.number}
                      </div>
                      <h4 className="mt-4 font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-brand-orange">{step.time}</p>
                      <p className="mt-2 text-sm text-gray-600">{step.description}</p>
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
