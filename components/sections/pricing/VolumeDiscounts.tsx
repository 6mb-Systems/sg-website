import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

const tiers = [
  { range: "1-5 SMSFs", discount: "Standard pricing" },
  { range: "6-15 SMSFs", discount: "10% discount" },
  { range: "16-30 SMSFs", discount: "15% discount" },
  { range: "31+ SMSFs", discount: "20% discount" },
];

export function VolumeDiscounts() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Volume Discounts
            </h2>
            <p className="mt-4 text-gray-600">
              Special pricing for advisers and accountants with multiple SMSFs
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <FadeIn key={tier.range} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`vol-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#vol-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-orange-50 text-brand-orange">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tier.range}
                </h3>
                <p className="mt-2 text-brand-blue font-medium">{tier.discount}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.4}>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Volume discounts apply to monthly administration fees and are
              calculated automatically
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <a href="/contact">Discuss Custom Pricing</a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
