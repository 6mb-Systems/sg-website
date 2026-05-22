import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink, FileText } from "lucide-react";
import {
  articleCardHref,
  articleCtaLabel,
  isExternalArticle,
  type ArticleLinkFields,
} from "@/lib/article-link";
import { cn } from "@/lib/utils";

interface InsightArticleCardProps extends ArticleLinkFields {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  patternId: string;
  className?: string;
  sourceTab?: "articles" | "webinars";
  page?: number;
  internalHref?: string;
}

export function InsightArticleCard({
  category,
  title,
  excerpt,
  date,
  imageUrl,
  imageAlt,
  patternId,
  className,
  sourceTab,
  page,
  internalHref,
  slug,
  externalUrl,
  externalSource,
}: InsightArticleCardProps) {
  const external = isExternalArticle({ slug, externalUrl, externalSource });
  const href = articleCardHref(
    { slug, externalUrl, externalSource },
    { sourceTab, page, internalHref }
  );
  const ctaLabel = external
    ? articleCtaLabel(externalSource)
    : "Read article";

  const cardClassName = cn(
    "relative flex h-full min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
    className
  );

  const content = (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80"
        aria-hidden
      />
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="60"
            height="34.64"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {imageUrl ? (
        <div className="relative z-10 h-[210px] w-full overflow-hidden bg-brand-blue/5">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <article className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue">
            {category}
          </span>
          <span className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 line-clamp-2 flex-grow text-sm text-gray-600">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center pt-4 text-xs text-gray-500">
          <span className="inline-flex items-center text-sm font-medium text-brand-orange">
            {external ? (
              <ExternalLink className="mr-1 h-4 w-4" aria-hidden />
            ) : (
              <FileText className="mr-1 h-4 w-4" aria-hidden />
            )}
            {ctaLabel}
          </span>
        </div>
      </article>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        aria-label={`Open external article: ${title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cardClassName}
      aria-label={`Open article: ${title}`}
    >
      {content}
    </Link>
  );
}
