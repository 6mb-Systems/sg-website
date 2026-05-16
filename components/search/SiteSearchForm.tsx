"use client";

import * as React from "react";
import { AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, mergeRefs } from "@/lib/utils";

const EMPTY_HELP =
  "Please enter a search term so we can find the right pages and resources for you.";

export interface SiteSearchFormProps {
  variant: "header" | "page";
  inputId: string;
  /** Value after navigation (search page only). */
  defaultValue?: string;
  className?: string;
}

export const SiteSearchForm = React.forwardRef<
  HTMLInputElement,
  SiteSearchFormProps
>(function SiteSearchForm(
  { variant, inputId, defaultValue = "", className },
  forwardedRef
) {
  const [showError, setShowError] = React.useState(false);
  const localRef = React.useRef<HTMLInputElement>(null);
  const mergedRef = React.useMemo(
    () => mergeRefs(localRef, forwardedRef),
    [forwardedRef]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const q = localRef.current?.value?.trim() ?? "";
    if (!q) {
      e.preventDefault();
      setShowError(true);
      localRef.current?.focus();
      return;
    }
    setShowError(false);
  }

  function handleInput() {
    if (showError) setShowError(false);
  }

  const isHeader = variant === "header";
  const errorId = `${inputId}-error`;

  return (
    <form
      action="/search"
      method="GET"
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        "mx-auto flex w-full flex-col gap-2",
        isHeader
          ? "max-w-3xl rounded-xl border border-brand-blue/10 bg-white p-3 shadow-sm"
          : "max-w-4xl rounded-2xl border border-brand-blue/10 bg-white p-4 shadow-sm",
        className
      )}
      role="search"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor={inputId}>
          Search SuperGuardian
        </label>
        <div className="relative flex-1">
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-brand-blue/55",
              isHeader ? "left-3 h-4 w-4" : "left-4 h-5 w-5"
            )}
            aria-hidden
          />
          <input
            ref={mergedRef}
            id={inputId}
            name="q"
            type="search"
            defaultValue={defaultValue}
            autoComplete="off"
            placeholder={
              isHeader ? "Search SuperGuardian..." : "What are you looking for?"
            }
            aria-invalid={showError}
            aria-describedby={showError ? errorId : undefined}
            onInput={handleInput}
            className={cn(
              "w-full rounded-lg border text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/15",
              isHeader
                ? "h-11 rounded-md border-gray-200 bg-gray-50 pl-10 pr-3 text-sm"
                : "h-12 border-gray-200 bg-gray-50 pl-12 pr-4 text-base",
              showError &&
                "border-brand-orange/60 ring-1 ring-brand-orange/25 focus:border-brand-orange focus:ring-brand-orange/20"
            )}
          />
        </div>
        <Button
          type="submit"
          className={cn(isHeader ? "h-11 px-6" : "h-12 px-7")}
        >
          Search
        </Button>
      </div>

      {showError && (
        <div
          id={errorId}
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-brand-orange/35 bg-brand-orange/10 px-3 py-2.5 text-sm leading-snug text-brand-blue shadow-sm"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-orange text-white">
            <AlertCircle className="h-4 w-4" aria-hidden />
          </span>
          <span>
            <span className="font-semibold text-brand-blue">Almost there</span>
            <span className="mt-0.5 block font-normal text-brand-blue/90">
              {EMPTY_HELP}
            </span>
          </span>
        </div>
      )}
    </form>
  );
});

SiteSearchForm.displayName = "SiteSearchForm";
