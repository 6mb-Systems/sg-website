/** Division 296 (BTSC) estimate - illustrative only; not personal advice. */

export const TSB_THRESHOLD_3M = 3_000_000;
export const TSB_THRESHOLD_10M = 10_000_000;

export type Division296Result = {
  proportionOver3m: number;
  proportionOver10m: number;
  earningsOver3m: number;
  earningsOver10m: number;
  taxPayable: number;
};

export function parseCurrencyInput(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned === "" || cleaned === "-") return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
}

/** Whole-dollar AUD for calculator inputs, e.g. $4,000,000 */
export function formatWholeAudInput(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function calculateDivision296(
  tsb: number,
  realisedEarnings: number
): Division296Result | null {
  if (!Number.isFinite(tsb) || !Number.isFinite(realisedEarnings)) return null;
  if (tsb <= 0) return null;

  const earnings = Math.max(0, realisedEarnings);

  const proportionOver3m = Math.max(0, (tsb - TSB_THRESHOLD_3M) / tsb);
  const proportionOver10m = Math.max(0, (tsb - TSB_THRESHOLD_10M) / tsb);

  const earningsOver3m = earnings * proportionOver3m;
  const earningsOver10m = earnings * proportionOver10m;

  const taxPayable = earningsOver3m * 0.15 + earningsOver10m * 0.1;

  return {
    proportionOver3m,
    proportionOver10m,
    earningsOver3m,
    earningsOver10m,
    taxPayable,
  };
}
