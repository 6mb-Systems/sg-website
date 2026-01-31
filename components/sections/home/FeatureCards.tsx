import { Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Expert Compliance",
    description:
      "Stay compliant with our expert team handling all regulatory requirements and reporting obligations.",
  },
  {
    icon: Clock,
    title: "Time Efficient",
    description:
      "Streamlined processes and technology integrations save you hours every week on SMSF administration.",
  },
  {
    icon: Users,
    title: "Dedicated Client Managers",
    description:
      "SuperGuardian clients value their Client Managers – a dedicated SMSF specialist providing personalised, trusted support.",
  },
];

export function FeatureCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-blue">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
