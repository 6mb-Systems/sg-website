---
name: contact-form-vercel
description: Implement a secure, spam-resistant contact form with optional Mailchimp integration.
---

# Contact Form (Vercel)

Instructions for building a reliable contact form suitable for Vercel serverless environments.

## When to Use

- Creating the `/contact` page
- Implementing `/api/contact`
- Adding newsletter subscription via Mailchimp

## Instructions

- Build form UI using shadcn/ui components.
- Validate all inputs **server-side**.
- Implement spam protection:
  - Honeypot field
  - Basic rate limiting
  - Turnstile or reCAPTCHA
- Send enquiry emails via an email provider (e.g. Mailgun, Postmark, SES).
- Optionally send an auto-reply confirmation email.
- If newsletter checkbox is selected:
  - Add/update subscriber via Mailchimp API
  - Keep Mailchimp failure non-blocking
- Never expose secrets to the client.
- Handle success and error states clearly.
- Ask clarifying questions if delivery expectations or compliance requirements are unclear.
