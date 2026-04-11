"use client";

import * as React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function WebinarNotifyForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Please try again."
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
    const recaptchaToken = await executeRecaptcha("webinar_notify");

    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      organisation: (form.elements.namedItem("organisation") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      hearAboutUs: (form.elements.namedItem("hearAboutUs") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      recaptchaToken,
    };

    try {
      const res = await fetch("/api/webinar-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMessage(json.error || "Something went wrong. Please try again.");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
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
              id="webinar-notify-hex"
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
          <rect width="100%" height="100%" fill="url(#webinar-notify-hex)" />
        </svg>

        <div className="relative z-10 p-8">
          <h2 className="text-2xl font-bold text-brand-blue">
            Join our mailing list and enhance your SMSF expertise
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register your details to receive invitations to our upcoming webinars and stay ahead in the industry with our latest technical updates and insights.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Full Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">
                Name of Organisation
              </label>
              <input
                type="text"
                id="organisation"
                name="organisation"
                placeholder="Name of Organisation"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
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
              <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700">
                How did you hear about us?
              </label>
              <input
                type="text"
                id="hearAboutUs"
                name="hearAboutUs"
                placeholder="How did you hear about us?"
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
                Thanks! You&apos;re on the list — we&apos;ll be in touch with upcoming webinars and technical updates.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div>
              <Button
                type="submit"
                size="lg"
                className="bg-brand-orange text-white hover:bg-brand-orange/90 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Notify Me"}
              </Button>
            </div>

            <p className="text-xs leading-relaxed text-gray-500">
              We value your privacy and take the protection of your personal information seriously. The details you provide will only be used to send invitations to our upcoming webinars and share relevant technical updates, and will never be shared with third parties without your consent. For full details on how we collect, store and handle your information, please read our{" "}
              <a
                href="/PDF/Privacy%20Policy%20-%20April%202026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange underline hover:text-brand-orange-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}
