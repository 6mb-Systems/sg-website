import { FileText, Download } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const PDF_BASE = "/SG%20Forms";

type FormItem = {
  label: string;
  file: string;
};

const engagementForms: FormItem[] = [
  { label: "Terms and Conditions", file: "TermsandConditions.pdf" },
  { label: "Direct Debit Agreement (2021)", file: "SG-Direct-Debit-Agreement-2021.pdf" },
  { label: "Financial Services Guide", file: "Financial-Services-Guide.pdf" },
];

const eventBasedForms: FormItem[] = [
  { label: "Pension Establishment (2025)", file: "Pension-Establishment-2025.pdf" },
  { label: "Pension Consolidation (2025)", file: "Pension-Consolidation-2025.pdf" },
  { label: "Pension Commutation (2025)", file: "Pension-Commutation-2025.pdf" },
  { label: "Wind-Up Instruction (2025)", file: "Wind-Up-Instruction-2025.pdf" },
  { label: "LRBA — Private Lender (2025)", file: "LRBA-Private-Lender-2025.pdf" },
  { label: "LRBA — Commercial Lender (2025)", file: "LRBA-Commercial-Lender-2025.pdf" },
];

function FormLink({ item }: { item: FormItem }) {
  const href = `${PDF_BASE}/${encodeURIComponent(item.file)}`;
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex min-h-[3.25rem] items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-colors",
          "hover:border-brand-orange/35 hover:bg-brand-orange/[0.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        )}
      >
        <span className="flex min-w-0 items-start gap-3">
          <FileText
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue"
            aria-hidden
          />
          <span className="text-left font-medium text-gray-900">{item.label}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">PDF</span>
          <Download
            className="h-5 w-5 text-gray-400 transition-colors group-hover:text-brand-orange"
            aria-hidden
          />
        </span>
      </a>
    </li>
  );
}

function FormCategory({
  title,
  description,
  items,
  delay,
  hexIndex,
}: {
  title: string;
  description: string;
  items: FormItem[];
  delay: number;
  hexIndex: number;
}) {
  const patternId = `sg-forms-hex-${hexIndex}`;
  return (
    <FadeIn direction="up" delay={delay}>
      <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80"
          aria-hidden
        />
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="60"
              height="34.64"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="0.55"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
        <div className="relative z-10 p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand-blue md:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
            {description}
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <FormLink key={item.file} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

export function SGFormsDocuments() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <FormCategory
            title="Engagement Forms"
            description="Core agreements and disclosures for establishing and operating your relationship with SuperGuardian."
            items={engagementForms}
            delay={0.05}
            hexIndex={0}
          />
          <FormCategory
            title="Event-based Forms"
            description="Use these when a specific event applies to your fund or pension."
            items={eventBasedForms}
            delay={0.1}
            hexIndex={1}
          />
        </div>
      </div>
    </section>
  );
}
