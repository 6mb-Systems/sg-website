---
name: sanity-blog
description: Implement a blog using Sanity CMS with Next.js App Router, ISR, and optional preview support.
---

# Sanity Blog

Guidance for building and maintaining a Sanity-powered blog integrated with Next.js.

## When to Use

- Implementing `/blog` or `/blog/[slug]`
- Setting up or modifying Sanity schemas
- Fetching content from Sanity using GROQ
- Adding revalidation or preview functionality

## Instructions

- Use **Sanity as the source of truth** for blog content.
- Define a `post` schema with:
  - title, slug, excerpt
  - publishedAt
  - mainImage (with alt text)
  - body (portable text)
  - optional author, categories/tags
  - SEO fields (meta title, description, OG image)
- Filter out drafts for public pages unless preview mode is active.
- Render blog pages as **static-first** with revalidation.
- Prefer time-based ISR unless precise webhook revalidation is required.
- Never expose Sanity **write tokens** to the client.
- Use read-only tokens for frontend data fetching.
- Implement preview/visual editing only if requested.
- Ask clarifying questions if preview, scheduling, or revalidation behavior is ambiguous.
