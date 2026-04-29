"use client";

import * as React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function CareersApplicationForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Please try again or email us directly."
  );

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
    const recaptchaToken = await executeRecaptcha("careers_application");

    const formData = new FormData(form);
    formData.append("recaptchaToken", recaptchaToken);

    try {
      const res = await fetch("/api/careers-application", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMessage(
          typeof json.error === "string"
            ? json.error
            : "Something went wrong. Please try again or email us directly."
        );
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again or email us directly.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeIn direction="up">
      <div className="relative overflow-hidden rounded-xl border border-gray-200">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60"
          aria-hidden
        />
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
          <defs>
            <pattern
              id="careers-form-hex"
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
          <rect width="100%" height="100%" fill="url(#careers-form-hex)" />
        </svg>
        <div className="relative z-10 p-8">
          <h2 className="text-xl font-semibold text-gray-900">Join Our Team</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tell us a little about yourself and attach your resume.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="careers-name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="careers-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your full name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="careers-email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="careers-email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="careers-message" className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="careers-message"
                name="message"
                rows={4}
                required
                placeholder="A short note about the role you are interested in, or your background..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="careers-resume" className="block text-sm font-medium text-gray-700">
                Resume <span className="text-red-500">*</span>
              </label>
              <input
                id="careers-resume"
                name="resume"
                type="file"
                required
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="mt-1 block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-blue/90"
              />
              <p className="mt-1 text-xs text-gray-500">PDF or Word, up to 4MB.</p>
            </div>

            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {submitStatus === "success" && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                Thank you for your application. We&apos;ll be in touch if your experience is a
                match.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Submit application"}
            </Button>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}
