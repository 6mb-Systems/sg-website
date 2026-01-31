import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

// Placeholder data - will be replaced with Sanity data
const articles: Record<string, {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "2024-smsf-compliance-update": {
    title: "2024 SMSF Compliance Update",
    category: "Compliance",
    excerpt: "Latest regulatory changes affecting SMSF trustees and administrators",
    date: "December 2024",
    readTime: "5 min read",
    content: `
## Overview

The 2024 financial year brought significant changes to SMSF compliance requirements. This guide covers the key updates that trustees and their advisers need to be aware of.

## Key Changes

### 1. Contribution Caps

The concessional contribution cap increased to $27,500 for the 2024 financial year. The non-concessional cap also increased to $110,000.

### 2. Transfer Balance Cap

The general transfer balance cap increased to $1.9 million, indexed to inflation.

### 3. Total Superannuation Balance

Members with a total superannuation balance over $1.9 million cannot make non-concessional contributions.

## What This Means for Trustees

As an SMSF trustee, you need to:

- Review your contribution strategy
- Check your transfer balance cap
- Ensure investment strategy compliance
- Update your member statements

## Next Steps

Contact SuperGuardian for a compliance review to ensure your SMSF meets all current requirements.
    `,
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="section-padding">
      <div className="container-width">
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Link
            href="/education"
            className="inline-flex items-center text-sm text-gray-600 hover:text-brand-blue"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Education Hub
          </Link>

          {/* Header */}
          <header className="mt-8">
            <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue">
              {article.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {article.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600">{article.excerpt}</p>
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </header>

          {/* Download Button */}
          <div className="mt-8">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {/* Content */}
          <div className="mt-12 prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split("\n")
                  .map((line) => {
                    if (line.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold text-brand-blue mt-8 mb-4">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith("### ")) {
                      return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${line.slice(4)}</h3>`;
                    }
                    if (line.startsWith("- ")) {
                      return `<li class="text-gray-600">${line.slice(2)}</li>`;
                    }
                    if (line.trim()) {
                      return `<p class="text-gray-600 mb-4">${line}</p>`;
                    }
                    return "";
                  })
                  .join(""),
              }}
            />
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-xl bg-brand-blue-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-brand-blue">
              Need Help With Compliance?
            </h2>
            <p className="mt-2 text-gray-600">
              Our expert team can review your SMSF and ensure you meet all requirements.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
