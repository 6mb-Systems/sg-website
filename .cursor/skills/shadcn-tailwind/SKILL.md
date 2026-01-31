---
name: shadcn-tailwind-ui
description: Build consistent, accessible UI using shadcn/ui and Tailwind CSS.
---

# shadcn/ui + Tailwind UI

Instructions for building UI components and layouts using shadcn/ui and Tailwind.

## When to Use

- Creating UI components, forms, navigation, or layouts
- Styling landing page sections
- Ensuring accessibility and responsive behavior

## Instructions

- Use **shadcn/ui components** wherever possible.
- Extend components with Tailwind classes instead of introducing new UI libraries.
- Follow consistent spacing and layout patterns:
  - Section padding: `py-16 md:py-24`
  - Container width: `max-w-6xl` or `max-w-7xl`
- Use semantic HTML (`h1–h3`, `p`, `ul/li`, `section`).
- Ensure accessibility:
  - Inputs must have labels
  - Buttons must have clear text
  - Focus states must remain visible
- Build mobile-first and test small screens first.
- Keep components reusable and stateless when possible.
- Ask clarifying questions if design intent or visual hierarchy is unclear.
