import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

export const revalidate = 60;

const fallbackArticle = {
  title: "2024 SMSF Compliance Update",
  category: "Compliance",
  excerpt:
    "Latest regulatory changes affecting SMSF trustees and administrators",
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
};

function renderFallbackHtml(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## "))
        return `<h2 class="text-2xl font-bold text-brand-blue mt-8 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("### "))
        return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("- "))
        return `<li class="text-gray-600">${line.slice(2)}</li>`;
      if (line.trim())
        return `<p class="text-gray-600 mb-4">${line}</p>`;
      return "";
    })
    .join("");
}

const tableCellPortableTextComponents: PortableTextComponents = {
  block: {
    // Render cell content as paragraphs so separate blocks appear on new lines
    normal: ({ children }) => <p className="m-0 text-gray-700">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-brand-blue underline hover:text-brand-blue-600"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 my-1 space-y-1 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 my-1 space-y-1 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

type RichTableBlockValue = {
  _type: "richTableBlock" | "richTable";
  rows?: Array<{
    _key?: string;
    title?: string;
    cells?: Array<{
      _key?: string;
      content?: unknown[];
    }>;
  }>;
  columnHeaders?: Array<{
    _key?: string;
    title?: string;
    cellIndex: number;
  }>;
  hasColumnTitles?: boolean;
  hasRowTitles?: boolean;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-brand-blue mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-blue pl-4 italic text-gray-500 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-brand-blue underline hover:text-brand-blue-600"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    richTableBlock: ({ value }) => {
      const table = value as RichTableBlockValue;
      const rows = table.rows ?? [];
      if (!rows.length) return null;

      const showColumnTitles = table.hasColumnTitles !== false;
      // Only render a row-title column if the table actually uses row titles.
      const showRowTitles =
        table.hasRowTitles === true &&
        rows.some((r) => Boolean(r.title && r.title.trim().length > 0));

      const headersByIndex = new Map<number, { _key?: string; title?: string; cellIndex: number }>();
      for (const h of table.columnHeaders ?? []) {
        const existing = headersByIndex.get(h.cellIndex);
        // Prefer the header that actually has a title (guards against plugins producing empty duplicates)
        if (!existing || (!existing.title && h.title)) headersByIndex.set(h.cellIndex, h);
      }
      const headers = Array.from(headersByIndex.values()).sort(
        (a, b) => a.cellIndex - b.cellIndex
      );
      const hasAnyHeaderTitle = headers.some((h) => Boolean(h.title && h.title.trim().length > 0));

      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {showColumnTitles && headers.length > 0 && hasAnyHeaderTitle && (
              <thead>
                <tr>
                  {showRowTitles && (
                    <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-900">
                      {/* Row title header */}
                    </th>
                  )}
                  {headers.map((h) => (
                    <th
                      key={h._key ?? String(h.cellIndex)}
                      className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-900"
                    >
                      {h.title ?? ""}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={row._key ?? String(rowIdx)}>
                  {showRowTitles && (
                    <th className="border border-gray-200 bg-gray-50 px-3 py-2 align-top font-semibold text-gray-900">
                      {row.title ?? ""}
                    </th>
                  )}
                  {(row.cells ?? []).map((cell, cellIdx) => (
                    <td
                      key={cell._key ?? `${rowIdx}-${cellIdx}`}
                      className="border border-gray-200 px-3 py-2 align-top"
                    >
                      {cell.content?.length ? (
                        <PortableText
                          value={cell.content as any}
                          components={tableCellPortableTextComponents}
                        />
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (post) {
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
    };
  }

  if (slug === "2024-smsf-compliance-update") {
    return {
      title: fallbackArticle.title,
      description: fallbackArticle.excerpt,
    };
  }

  return { title: "Article Not Found" };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (post) {
    const categoryTitle =
      typeof post.category === "object" && post.category
        ? post.category.title
        : "General";
    const postSlug =
      typeof post.slug === "string" ? post.slug : post.slug?.current;
    const dateFormatted = new Date(post.publishedAt).toLocaleDateString(
      "en-AU",
      { month: "long", year: "numeric" }
    );
    const readTimeStr = post.readTime
      ? `${post.readTime} min read`
      : "5 min read";

    return (
      <article className="section-padding">
        <div className="container-width">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/education"
              className="inline-flex items-center text-sm text-gray-600 hover:text-brand-blue"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Education Hub
            </Link>

            <header className="mt-8">
              <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue">
                {categoryTitle}
              </span>
              <h1 className="mt-4 text-4xl font-bold text-gray-900">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-xl text-gray-600">{post.excerpt}</p>
              )}
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTimeStr}
                </span>
              </div>
            </header>

            {post.mainImage?.asset && (
              <div className="mt-8 overflow-hidden rounded-lg">
                <Image
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.mainImage.alt || post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}

            {post.body && (
              <div className="mt-12 prose prose-lg max-w-none">
                <PortableText
                  value={post.body as any}
                  components={portableTextComponents}
                />
              </div>
            )}

            <div className="mt-16 rounded-xl bg-brand-blue-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-blue">
                Need Help With {categoryTitle}?
              </h2>
              <p className="mt-2 text-gray-600">
                Our expert team can review your SMSF and ensure you meet all
                requirements.
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

  if (slug === "2024-smsf-compliance-update") {
    return (
      <article className="section-padding">
        <div className="container-width">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/education"
              className="inline-flex items-center text-sm text-gray-600 hover:text-brand-blue"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Education Hub
            </Link>

            <header className="mt-8">
              <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue">
                {fallbackArticle.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold text-gray-900">
                {fallbackArticle.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {fallbackArticle.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {fallbackArticle.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {fallbackArticle.readTime}
                </span>
              </div>
            </header>

            <div
              className="mt-12 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderFallbackHtml(fallbackArticle.content),
              }}
            />

            <div className="mt-16 rounded-xl bg-brand-blue-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-blue">
                Need Help With Compliance?
              </h2>
              <p className="mt-2 text-gray-600">
                Our expert team can review your SMSF and ensure you meet all
                requirements.
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

  notFound();
}
