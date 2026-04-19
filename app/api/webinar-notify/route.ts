import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  readJsonBody,
  sanitizeEmail,
  sanitizeString,
  verifyOrigin,
  verifyRecaptcha,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME = 120;
const MAX_ORGANISATION = 200;
const MAX_PHONE = 40;
const MAX_HEAR_ABOUT_US = 2000;

export async function POST(request: NextRequest) {
  try {
    // ---- Origin check ----
    if (!verifyOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    // ---- Rate limit ----
    const ip = getClientIp(request);
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ---- Parse body ----
    const parsed = await readJsonBody<Record<string, unknown>>(request);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const body = parsed.data;

    // ---- Honeypot ----
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // ---- reCAPTCHA (fail-closed in production) ----
    const recaptcha = await verifyRecaptcha(body.recaptchaToken, "webinar_notify");
    if (!recaptcha.ok) {
      return NextResponse.json(
        { error: recaptcha.error },
        { status: recaptcha.status }
      );
    }

    // ---- Validate + sanitize each input ----
    const fullName = sanitizeString(body.fullName, MAX_NAME);
    const organisation = sanitizeString(body.organisation, MAX_ORGANISATION);
    const email = sanitizeEmail(body.email);
    const phone = sanitizeString(body.phone, MAX_PHONE);
    const hearAboutUs = sanitizeString(body.hearAboutUs, MAX_HEAR_ABOUT_US, {
      multiline: true,
    });

    // `sanitizeString` returns null for invalid input and "" for a missing
    // optional field. Name + email are required; the other three are optional
    // but must still be well-formed if supplied.
    if (
      !fullName ||
      !email ||
      organisation === null ||
      phone === null ||
      hearAboutUs === null
    ) {
      return NextResponse.json(
        { error: "Please check your details and try again." },
        { status: 400 }
      );
    }

    // ---- Email service config ----
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = "education@superguardian.com.au";
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

    const safe = {
      fullName: escapeHtml(fullName),
      organisation: organisation ? escapeHtml(organisation) : "",
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : "",
      hearAboutUs: hearAboutUs ? escapeHtml(hearAboutUs) : "",
    };

    const submittedAt = new Date().toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
    });

    await resend.emails.send({
      from: `SuperGuardian Webinar Signup <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Webinar mailing list signup: ${fullName}`,
      html: `
        <h2>New Webinar Mailing List Signup</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;font-weight:bold;width:200px;">Full Name</td><td style="padding:8px;">${safe.fullName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
          ${safe.organisation ? `<tr><td style="padding:8px;font-weight:bold;">Organisation</td><td style="padding:8px;">${safe.organisation}</td></tr>` : ""}
          ${safe.phone ? `<tr${safe.organisation ? ' style="background:#f9f9f9;"' : ""}><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${safe.phone}</td></tr>` : ""}
          ${safe.hearAboutUs ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top;">How did you hear about us?</td><td style="padding:8px;white-space:pre-wrap;">${safe.hearAboutUs}</td></tr>` : ""}
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px;">Submitted at ${submittedAt} AEST</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you — we'll let you know about upcoming webinars.",
    });
  } catch (error) {
    console.error("[security] Webinar notify error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
