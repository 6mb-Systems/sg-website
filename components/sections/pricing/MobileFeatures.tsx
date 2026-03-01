import { Smartphone, Bell, Cloud } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Portal",
    description: "Access your SMSF data on any device",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay informed with instant updates",
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Secure access from anywhere",
  },
];

export function MobileFeatures() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Mobile-First Experience
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our process is designed with mobile accessibility in mind, ensuring
              you can manage your SMSF anytime, anywhere
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`mobile-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#mobile-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-700 text-white">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
