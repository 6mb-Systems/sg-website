---
name: nextjs-vercel-website
description: Build and maintain a Next.js App Router website optimised for Vercel hosting.
---

# Next.js + Vercel Website

Detailed guidance for building a production-ready website using Next.js App Router on Vercel.

## When to Use

- Creating or modifying pages in the `app/` directory
- Adding layouts, metadata, loading, or error boundaries
- Making decisions that affect performance or deployment on Vercel

## Instructions

- Use **Next.js App Router** (`app/` directory).
- Prefer **Server Components** by default.
- Add `"use client"` only when interactivity or browser APIs are required.
- Assume **Vercel serverless runtime**:
  - Stateless execution
  - No runtime filesystem writes
  - No long-running background processes
- Use `next/image` and `next/font` for performance.
- Prefer static generation and caching; only add revalidation when needed.
- Place shared utilities in `lib/`, UI in `components/`.
- Run lint and typecheck after changes and fix all issues.
- Ask clarifying questions if routing, rendering strategy, or runtime behavior is unclear.
