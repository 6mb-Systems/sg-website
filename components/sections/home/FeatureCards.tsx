import { ShieldCheck, Zap, UserRoundCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Image from "next/image";

const features = [
  {
    icon: ShieldCheck,
    title: "Expert Compliance",
    description:
      "Stay compliant with our expert team handling all regulatory requirements and reporting obligations.",
    image: "/Homepage Highlights - Expert Compliance.png",
  },
  {
    icon: Zap,
    title: "Time Efficient",
    description:
      "Streamlined processes and technology integrations save you hours every week on SMSF administration.",
    image: "/Homepage Highlights - Time Efficient.png",
  },
  {
    icon: UserRoundCheck,
    title: "Dedicated Client Managers",
    description:
      "SuperGuardian clients value their Client Managers – a dedicated SMSF specialist providing personalised, trusted support.",
    image: "/Homepage Highlights - Dedicated Client Managers.png",
  },
];

export function FeatureCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} direction="up" delay={index * 0.1} className="h-full">
              <SpotlightCard variant="dark" className="h-full group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply transition-opacity duration-300 group-hover:bg-brand-blue/70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  >
                    <feature.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className="text-xl font-semibold text-brand-orange">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
