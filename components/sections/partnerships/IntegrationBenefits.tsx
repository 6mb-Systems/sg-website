import { Zap, RefreshCw, BarChart3, FileText } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const benefits = [
  {
    icon: Zap,
    title: "Automated Workflows",
    description:
      "Reduce manual data entry by up to 80% with our seamless integrations",
  },
  {
    icon: RefreshCw,
    title: "Real-time Sync",
    description:
      "Live data synchronisation ensures your information is always current",
  },
  {
    icon: BarChart3,
    title: "Enhanced Reporting",
    description:
      "Generate comprehensive reports across all connected platforms",
  },
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Centralised document storage with automatic version control",
  },
];

export function IntegrationBenefits() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Integration Benefits
            </h2>
            <p className="mt-4 text-gray-600">
              Why our technology partnerships matter
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.title} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`intben-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#intben-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
