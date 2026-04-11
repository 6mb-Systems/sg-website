import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check - if this field has a value, it's likely a bot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // reCAPTCHA verification (skipped in development)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && process.env.NODE_ENV !== "development") {
      const token = body.recaptchaToken;
      if (!token) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }

      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`,
        { method: "POST" }
      );
      const verifyData = await verifyRes.json();
      console.log("reCAPTCHA result (webinar-notify):", verifyData);

      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const { fullName, organisation, email, phone, hearAboutUs } = body as {
      fullName?: string;
      organisation?: string;
      email?: string;
      phone?: string;
      hearAboutUs?: string;
    };

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = "education@superguardian.com.au";
    const fromEmail =
      process.env.CONTACT_EMAIL_FROM || "noreply@superguardian.com.au";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
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
        <p style="color:#888;font-size:12px;margin-top:24px;">Submitted at ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} AEST</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you — we'll let you know about upcoming webinars.",
    });
  } catch (error) {
    console.error("Webinar notify error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
