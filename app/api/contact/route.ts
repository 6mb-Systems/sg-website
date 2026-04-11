import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  readJsonBody,
  sanitizeEmail,
  sanitizeString,
  verifyRecaptcha,
} from "@/lib/api-security";

const enquiryLabels: Record<string, string> = {
  "establish-smsf": "I would like to establish an SMSF",
  "transfer-smsf": "I would like to transfer an SMSF",
  "financial-adviser":
    "I am a Financial Adviser looking to work with SuperGuardian",
  accountant: "I am an Accountant looking to work with SuperGuardian",
  "demo-online-reports": "I would like a demo of Online Reports",
  "demo-hive": "I would like a demo of Hive",
  "something-else": "Something else",
};

// Field length budgets. These are intentionally generous enough for real
// submissions but small enough to bound email-service abuse.
const MAX_NAME = 100;
const MAX_PHONE = 40;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 5000;

export async function POST(request: NextRequest) {
  try {
    // ---- Rate limit ----
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ---- Parse body (bounded size, bounded error surface) ----
    const parsed = await readJsonBody<Record<string, unknown>>(request);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const body = parsed.data;

    // ---- Honeypot: if the hidden 'website' field is filled, pretend success ----
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // ---- reCAPTCHA (fail-closed in production) ----
    const recaptcha = await verifyRecaptcha(body.recaptchaToken, "contact_form");
    if (!recaptcha.ok) {
      return NextResponse.json(
        { error: recaptcha.error },
        { status: recaptcha.status }
      );
    }

    // ---- Validate + sanitize each input ----
    const firstName = sanitizeString(body.firstName, MAX_NAME);
    const lastName = sanitizeString(body.lastName, MAX_NAME);
    const email = sanitizeEmail(body.email);
    const phone = sanitizeString(body.phone, MAX_PHONE);
    const company = sanitizeString(body.company, MAX_COMPANY);
    const message = sanitizeString(body.message, MAX_MESSAGE, { multiline: true });
    const enquiryTypeRaw = sanitizeString(body.enquiryType, 50);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !message ||
      phone === null ||
      company === null ||
      !enquiryTypeRaw
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields." },
        { status: 400 }
      );
    }

    // Whitelist enquiry type — it ends up in the email subject.
    if (!Object.prototype.hasOwnProperty.call(enquiryLabels, enquiryTypeRaw)) {
      return NextResponse.json(
        { error: "Invalid enquiry type." },
        { status: 400 }
      );
    }
    const enquiryLabel = enquiryLabels[enquiryTypeRaw];

    // ---- Email service config ----
    const resendApiKey = process.env.RESEND_API_KEY;
    // Always route enquiries to the shared inbox.
    const toEmail = "info@superguardian.com.au";
    const fromEmail =
      process.env.CONTACT_EMAIL_FROM || "noreply@superguardian.com.au";

    if (!resendApiKey) {
      console.error("[security] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // ---- Build email body with every user-supplied value escaped ----
    const safe = {
      firstName: escapeHtml(firstName),
      lastName: escapeHtml(lastName),
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : "",
      company: company ? escapeHtml(company) : "",
      enquiryLabel: escapeHtml(enquiryLabel),
      message: escapeHtml(message),
    };

    const submittedAt = new Date().toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
    });

    await resend.emails.send({
      from: `SuperGuardian Contact Form <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry: ${enquiryLabel}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Name</td><td style="padding:8px;">${safe.firstName} ${safe.lastName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
          ${safe.phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${safe.phone}</td></tr>` : ""}
          ${safe.company ? `<tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${safe.company}</td></tr>` : ""}
          <tr${safe.company ? "" : ' style="background:#f9f9f9;"'}><td style="padding:8px;font-weight:bold;">Enquiry Type</td><td style="padding:8px;">${safe.enquiryLabel}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;white-space:pre-wrap;">${safe.message}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px;">Submitted at ${submittedAt} AEST</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your message. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("[security] Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
