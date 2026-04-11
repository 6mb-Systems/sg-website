import { TSB_THRESHOLD_3M, TSB_THRESHOLD_10M } from "@/lib/division296";

const rows: { label: string; detail: string }[] = [
  {
    label: "Realised Earnings",
    detail:
      "Taxable income attributed to the member, adjusted for assessable contributions, net exempt current pension income and any non-arm's length or pooled superannuation trust components.",
  },
  {
    label: "TSB reference amount",
    detail:
      "The higher of the individual's TSB at the open or close of the relevant financial year, except for the 2026/27 year, which is based on closing balance only.",
  },
  {
    label: "Proportion of TSB over $3m threshold",
    detail: `(TSB reference amount − $${(TSB_THRESHOLD_3M / 1_000_000).toFixed(0)}m) / TSB reference amount`,
  },
  {
    label: "Proportion of TSB over $10m threshold",
    detail: `(TSB reference amount − $${(TSB_THRESHOLD_10M / 1_000_000).toFixed(0)}m) / TSB reference amount`,
  },
  {
    label: "Realised Earnings over $3m",
    detail:
      "Earnings × Proportion of TSB reference amount above the $3m threshold",
  },
  {
    label: "Realised Earnings over $10m",
    detail:
      "Earnings × Proportion of TSB reference amount above the $10m threshold",
  },
  {
    label: "Estimated Division 296 Tax Payable",
    detail:
      "(Realised Earnings over $3m × 15%) + (Realised Earnings over $10m × 10%)",
  },
];

export function Division296HowItWorks() {
  return (
    <section className="section-padding bg-gray-50 font-sans">
      <div className="container-width">
        <div className="w-full">
          <h2 className="text-center text-3xl font-bold text-brand-blue md:text-4xl">
            How is Division 296 calculated?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            The Division 296 tax is calculated based on the following:
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <th className="w-[40%] align-top px-5 py-4 font-semibold text-gray-900 md:w-[38%]">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-gray-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-gray-500">
            This calculator provides general estimates only and does not constitute financial, investment,
            or tax advice. Division 296 rules may change; seek advice tailored to your circumstances.
          </p>
        </div>
      </div>
    </section>
  );
}
