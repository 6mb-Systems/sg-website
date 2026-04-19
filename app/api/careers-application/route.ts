import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  sanitizeEmail,
  sanitizeString,
  verifyRecaptcha,
} from "@/lib/api-security";

const MAX_NAME = 200;
const MAX_MESSAGE = 5000;
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function extensionAllowed(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx");
}

function isAllowedResume(file: File): boolean {
  if (!extensionAllowed(file.name)) return false;
  if (!file.type || file.type === "application/octet-stream") return true;
  return ALLOWED_MIME.has(file.type);
}

function safeResumeFilename(original: string): string {
  const base = original.split(/[/\\]/).pop() ?? "resume.pdf";
  const cleaned = base.replace(/[^\w.\- ()]/g, "_").slice(0, 120);
  return cleaned.length > 0 ? cleaned : "resume.pdf";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Request body too large or invalid." },
        { status: 400 }
      );
    }

    const website = formData.get("website");
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const recaptchaToken = formData.get("recaptchaToken");
    const recaptcha = await verifyRecaptcha(
      typeof recaptchaToken === "string" ? recaptchaToken : undefined,
      "careers_application"
    );
    if (!recaptcha.ok) {
      return NextResponse.json(
        { error: recaptcha.error },
        { status: recaptcha.status }
      );
    }

    const name = sanitizeString(formData.get("name"), MAX_NAME);
    const email = sanitizeEmail(formData.get("email"));
    const message = sanitizeString(formData.get("message"), MAX_MESSAGE, {
      multiline: true,
    });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Please attach your resume (PDF or Word)." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Resume file must be 4MB or smaller." },
        { status: 400 }
      );
    }

    if (!isAllowedResume(resume)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = "mark.ma@jaqminns.com.au";
    const fromEmail =
      process.env.CONTACT_EMAIL_FROM || "noreply@superguardian.com.au";

    if (!resendApiKey) {
      console.error("[security] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await resume.arrayBuffer());
    const resend = new Resend(resendApiKey);
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      message: escapeHtml(message),
    };
    const filename = safeResumeFilename(resume.name);

    const submittedAt = new Date().toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
    });

    const subjectLine = `Careers application: ${name.replace(/[\r\n]/g, "")}`;

    await resend.emails.send({
      from: `SuperGuardian Careers <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: subjectLine.slice(0, 200),
      html: `
        <h2>New careers application</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;font-weight:bold;width:160px;">Name</td><td style="padding:8px;">${safe.name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;white-space:pre-wrap;">${safe.message}</td></tr>
        </table>
        <p style="color:#666;font-size:13px;margin-top:16px;">Resume attached: ${escapeHtml(filename)}</p>
        <p style="color:#888;font-size:12px;margin-top:24px;">Submitted at ${submittedAt} AEST</p>
      `,
      attachments: [
        {
          filename,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your application. We'll be in touch if your experience is a match.",
    });
  } catch (error) {
    console.error("[security] Careers application error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
