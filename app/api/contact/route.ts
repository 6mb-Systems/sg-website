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

const enquiryLabels: Record<string, string> = {
  "establish-smsf": "I would like to establish an SMSF",
  "transfer-smsf": "I would like to transfer an SMSF",
  "financial-adviser": "I am a Financial Adviser looking to work with SuperGuardian",
  "accountant": "I am an Accountant looking to work with SuperGuardian",
  "demo-online-reports": "I would like a demo of Online Reports",
  "demo-hive": "I would like a demo of Hive",
  "something-else": "Something else",
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check - if this field has a value, it's likely a bot
    if (body.website) {
      // Silently accept but don't process
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
      console.log("reCAPTCHA result:", verifyData);

      // Score threshold: 0.5 is a reasonable balance (0.0 = bot, 1.0 = human)
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    const { firstName, lastName, email, enquiryType, message } = body;

    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    // Always route enquiries to the shared inbox.
    const toEmail = "info@superguardian.com.au";
    const fromEmail = process.env.CONTACT_EMAIL_FROM || "noreply@superguardian.com.au";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const enquiryLabel = enquiryLabels[enquiryType] || enquiryType;

    await resend.emails.send({
      from: `SuperGuardian Contact Form <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry: ${enquiryLabel}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          ${body.phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${body.phone}</td></tr>` : ""}
          ${body.company ? `<tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${body.company}</td></tr>` : ""}
          <tr${body.company ? "" : ' style="background:#f9f9f9;"'}><td style="padding:8px;font-weight:bold;">Enquiry Type</td><td style="padding:8px;">${enquiryLabel}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px;">Submitted at ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} AEST</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
