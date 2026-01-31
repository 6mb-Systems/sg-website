import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Volume Discounts
          </h2>
          <p className="mt-4 text-gray-600">
            Special pricing for advisers and accountants with multiple SMSFs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.range}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-orange-50 text-brand-orange">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {tier.range}
              </h3>
              <p className="mt-2 text-brand-blue font-medium">{tier.discount}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Volume discounts apply to monthly administration fees and are
            calculated automatically
          </p>
          <Button className="mt-4" variant="outline" asChild>
            <a href="/contact">Discuss Custom Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
