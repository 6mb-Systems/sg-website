import { ShieldCheck, Zap, UserRoundCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const features = [
  {
    icon: ShieldCheck,
    title: "Expert Compliance",
    description:
      "Stay compliant with our expert team handling all regulatory requirements and reporting obligations.",
  },
  {
    icon: Zap,
    title: "Time Efficient",
    description:
      "Streamlined processes and technology integrations save you hours every week on SMSF administration.",
  },
  {
    icon: UserRoundCheck,
    title: "Dedicated Client Managers",
    description:
      "SuperGuardian clients value their Client Managers – a dedicated SMSF specialist providing personalised, trusted support.",
  },
];

export function FeatureCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} direction="up" delay={index * 0.1}>
              <SpotlightCard variant="dark" className="h-full">
                <div className="flex flex-col p-6">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
                    aria-hidden
                  >
                    <feature.icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-orange">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/95 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
