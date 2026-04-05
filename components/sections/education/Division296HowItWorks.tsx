import { TSB_THRESHOLD_3M, TSB_THRESHOLD_10M } from "@/lib/division296";

const rows: { label: string; detail: string }[] = [
  {
    label: "Realised Earnings",
    detail: "Dividends, interest, rent and realised capital gains",
  },
  {
    label: "Proportion of TSB over $3m threshold",
    detail: `(End of year TSB − $${(TSB_THRESHOLD_3M / 1_000_000).toFixed(0)}m) / End of year TSB`,
  },
  {
    label: "Proportion of TSB over $10m threshold",
    detail: `(End of year TSB − $${(TSB_THRESHOLD_10M / 1_000_000).toFixed(0)}m) / End of year TSB`,
  },
  {
    label: "Taxable Earnings over $3m",
    detail: "Earnings × Proportion of TSB above the $3m threshold",
  },
  {
    label: "Taxable Earnings over $10m",
    detail: "Earnings × Proportion of TSB above the $10m threshold",
  },
  {
    label: "Estimated Division 296 Tax Payable",
    detail: "(Taxable Earnings over $3m × 15%) + (Taxable Earnings over $10m × 10%)",
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
