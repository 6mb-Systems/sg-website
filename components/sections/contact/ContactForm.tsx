"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

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
  const [enquiryType, setEnquiryType] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission - will be replaced with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus("success");
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
                placeholder="John"
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
                placeholder="Smith"
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
              placeholder="john.smith@example.com"
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
              placeholder="0400 000 000"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company/Practice Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="ABC Financial Services"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
              Something went wrong. Please try again or call us directly.
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
