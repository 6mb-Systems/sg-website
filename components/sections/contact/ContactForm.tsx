"use client";

import * as React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/** Chevron for enquiry select — inset from right edge for clearer tap target vs border */
const ENQUIRY_SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

const enquiryTypeOptions = [
  { value: "", label: "Please choose one" },
  { value: "establish-smsf", label: "I would like to establish an SMSF" },
  { value: "transfer-smsf", label: "I would like to transfer an SMSF" },
  { value: "financial-adviser", label: "I am a Financial Adviser looking to work with SuperGuardian" },
  { value: "accountant", label: "I am an Accountant looking to work with SuperGuardian" },
  { value: "demo-online-reports", label: "I would like a demo of Online Reports" },
  { value: "demo-hive", label: "I would like a demo of Hive" },
  { value: "something-else", label: "Something else" },
];

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [enquiryType, setEnquiryType] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("Something went wrong. Please try again or call us directly.");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      setErrorMessage("Security check is still loading. Please wait a moment and try again.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const recaptchaToken = await executeRecaptcha("contact_form");

    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      enquiryType,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      recaptchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("success");
        form.reset();
        setEnquiryType("");
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMessage(json.error || "Something went wrong. Please try again or call us directly.");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again or call us directly.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeIn direction="up">
      <div className="relative overflow-hidden rounded-xl border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
          <defs>
            <pattern id="contact-form-hex" x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-form-hex)" />
        </svg>
        <div className="relative z-10 p-8">
        <h2 className="text-xl font-semibold text-gray-900">Send Us a Message</h2>
        <p className="mt-2 text-sm text-gray-600">
          Fill out the form below and we&apos;ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="First Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email Address"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company / Practice Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company / Practice Name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="enquiryType" className="block text-sm font-medium text-gray-700">
              How can we help you? <span className="text-red-500">*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              required
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
              className={cn(
                "mt-1 block h-[42px] w-full appearance-none rounded-md border border-gray-300 bg-white bg-[length:1.125rem] bg-[position:right_0.875rem_center] bg-no-repeat pl-4 pr-11 text-base leading-[42px] shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue",
                enquiryType === "" ? "text-gray-400" : "text-gray-900"
              )}
              style={{ backgroundImage: ENQUIRY_SELECT_CHEVRON }}
            >
              {enquiryTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your SMSF needs..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          {/* Honeypot field for spam protection */}
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {submitStatus === "success" && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              Thank you for your message, we will be in contact with you shortly.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
        </div>
      </div>
    </FadeIn>
  );
}
