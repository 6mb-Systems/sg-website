"use client";

import * as React from "react";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  calculateDivision296,
  formatWholeAudInput,
  parseCurrencyInput,
} from "@/lib/division296";
import { cn } from "@/lib/utils";

function formatAud(n: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatPct(p: number): string {
  return `${(p * 100).toFixed(2)}%`;
}

function InfoDialog({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 rounded-full p-1 text-brand-blue hover:bg-brand-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          aria-label={`More information: ${title}`}
        >
          <Info className="h-4 w-4" aria-hidden />
        </button>
      </DialogTrigger>
      <DialogContent className="border-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-brand-blue">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm leading-relaxed text-gray-600">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function handleAudWholeInputChange(
  value: string,
  setFormatted: (s: string) => void
) {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly === "") {
    setFormatted("");
    return;
  }
  const n = Number(digitsOnly);
  if (!Number.isFinite(n)) return;
  setFormatted(formatWholeAudInput(n));
}

export function Division296Calculator() {
  const [tsbRaw, setTsbRaw] = React.useState("");
  const [earningsRaw, setEarningsRaw] = React.useState("");
  const [result, setResult] = React.useState<ReturnType<typeof calculateDivision296>>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = React.useState(false);

  const runCalculate = () => {
    setError(null);
    const tsb = parseCurrencyInput(tsbRaw);
    const earnings = parseCurrencyInput(earningsRaw);

    if (tsb === null || earnings === null) {
      setError("Enter valid numbers for both fields.");
      setResult(null);
      setHasCalculated(true);
      return;
    }
    if (tsb <= 0) {
      setError("Total Super Balance must be greater than zero.");
      setResult(null);
      setHasCalculated(true);
      return;
    }
    if (earnings < 0) {
      setError("Realised earnings cannot be negative.");
      setResult(null);
      setHasCalculated(true);
      return;
    }

    const out = calculateDivision296(tsb, earnings);
    setResult(out);
    setHasCalculated(true);
  };

  const runReset = () => {
    setTsbRaw("");
    setEarningsRaw("");
    setResult(null);
    setError(null);
    setHasCalculated(false);
  };

  return (
    <div className="w-full font-sans">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80"
          aria-hidden
        />
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
          <defs>
            <pattern
              id="div296-calc-hex"
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
          <rect width="100%" height="100%" fill="url(#div296-calc-hex)" />
        </svg>
        <div className="relative z-10 p-6 md:p-8">
        <div className="space-y-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <label
                htmlFor="div296-tsb"
                className="text-sm font-medium text-gray-800"
              >
                Total Super Balance (TSB) at the End of Year
              </label>
              <InfoDialog title="What does end of year TSB mean?">
                <p>
                  The end of year total super balance (TSB) for the purposes of Division 296 is the
                  individual&apos;s total superannuation balance at the close of the financial year,
                  which is 30 June.
                </p>
              </InfoDialog>
            </div>
            <input
              id="div296-tsb"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="e.g. $5,000,000"
              value={tsbRaw}
              onChange={(e) => handleAudWholeInputChange(e.target.value, setTsbRaw)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-2">
              <label
                htmlFor="div296-earnings"
                className="text-sm font-medium text-gray-800"
              >
                Realised Earnings (eg. dividends, interest, rent and realised capital gains)
              </label>
              <InfoDialog title="What does realised earnings mean?">
                <p>
                  Realised earnings includes dividends, interest, rent and realised capital gains. It
                  will be calculated by the fund and attributed to members with balances above the
                  threshold.
                </p>
              </InfoDialog>
            </div>
            <input
              id="div296-earnings"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="e.g. $200,000"
              value={earningsRaw}
              onChange={(e) => handleAudWholeInputChange(e.target.value, setEarningsRaw)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Button type="button" variant="secondary" onClick={runCalculate}>
              Calculate Now
            </Button>
            <Button type="button" onClick={runReset}>
              Reset Calculator
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "mt-8 rounded-lg px-5 py-4 text-white",
            "bg-gradient-to-br from-brand-blue-900 to-brand-blue-950"
          )}
        >
          <h3 className="text-lg font-semibold">Results</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
              <dt className="text-blue-100/90">Proportion of earnings over $3m</dt>
              <dd className="font-medium tabular-nums">
                {hasCalculated && result ? formatPct(result.proportionOver3m) : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
              <dt className="text-blue-100/90">Proportion of earnings over $10m</dt>
              <dd className="font-medium tabular-nums">
                {hasCalculated && result ? formatPct(result.proportionOver10m) : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
              <dt className="text-blue-100/90">Earnings over $3m</dt>
              <dd className="font-medium tabular-nums">
                {hasCalculated && result ? formatAud(result.earningsOver3m) : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
              <dt className="text-blue-100/90">Earnings over $10m</dt>
              <dd className="font-medium tabular-nums">
                {hasCalculated && result ? formatAud(result.earningsOver10m) : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 pt-1">
              <dt className="font-medium text-white">Estimated Div. 296 Tax Payable</dt>
              <dd className="text-lg font-semibold tabular-nums text-brand-orange">
                {hasCalculated && result ? formatAud(result.taxPayable) : "-"}
              </dd>
            </div>
          </dl>
        </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        If you are looking for more assistance,{" "}
        <Link href="/contact" className="font-medium text-brand-blue underline-offset-4 hover:underline">
          contact us
        </Link>{" "}
        to start a conversation today.
      </p>
    </div>
  );
}
