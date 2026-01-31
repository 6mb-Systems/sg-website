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
              <div className="h-full flex flex-col rounded-xl border border-gray-200 p-6 text-center hover:border-brand-blue hover:shadow-md transition-all hover:-translate-y-1">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-700 text-white">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
