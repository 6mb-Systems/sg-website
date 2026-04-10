# SuperGuardian Website

Marketing website for SuperGuardian - SMSF administration services.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Server / API**: Next.js Route Handlers (`app/api/`) on Node.js — no separate Express server
- **CMS**: Sanity (blog/education content)
- **Email**: Resend (contact form)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/markma27/sg-website.git
   cd sg-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` from the example:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables in `.env.local` (see `.env.example`):
   - Sanity project ID, dataset, and API token
   - Google Analytics measurement ID
   - Resend API key and contact email addresses
   - Google reCAPTCHA v3 keys (contact form)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── education/         # Education/Blog pages
│   ├── partnerships/      # Partnerships page
│   ├── pricing/           # Pricing page
│   ├── security/          # Security page
│   ├── what-we-do/        # Services page
│   ├── who-we-are/        # About page
│   ├── who-we-help/       # Audience page
│   └── layout.tsx         # Root layout
├── components/
│   ├── analytics/         # Google Analytics
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── sanity/            # Sanity client & queries
│   ├── constants.ts       # Site configuration
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, testimonials |
| Who We Are | `/who-we-are` | About, what we do (services), and who we help (audiences) |
| Partnerships | `/partnerships` | Technology & industry partners |
| Pricing | `/pricing` | Pricing plans & process |
| Security | `/security` | Security certifications |
| Education | `/education` | Blog/resources hub |
| Contact | `/contact` | Contact form & locations |

## Sanity CMS Setup

The Education section is powered by Sanity CMS. Document schemas live in `sanity/schemaTypes/` and are wired in `sanity.config.ts`.

### Content Types

- **Post**: Articles and fact sheets
- **Webinar**: Video content and recordings
- **Event**: Upcoming events
- **Category**: Content categorisation
- **Author**: Content authors

## Scripts

```bash
npm run dev        # Start development server
npm run studio     # Sanity Studio (standalone, port 3333)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
```

## Deployment

The site is configured for Vercel deployment:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy

## External Links

- **Login**: https://app.class.com.au/my/login
- **Get Started**: https://applications.superguardian.com.au/

## License

Private - SuperGuardian Pty Ltd
