import { Zap, RefreshCw, BarChart3, FileText } from "lucide-react";

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
      "Live data synchronization ensures your information is always current",
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
      "Centralized document storage with automatic version control",
  },
];

export function IntegrationBenefits() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Integration Benefits
          </h2>
          <p className="mt-4 text-gray-600">
            Why our technology partnerships matter
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
