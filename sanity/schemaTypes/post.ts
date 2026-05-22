import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description:
        "Optional. When set, the Insights tile links directly to this page (e.g. a press article on SMSF Adviser) instead of opening an on-site article.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "externalSource",
      title: "External Source",
      type: "string",
      description:
        'Publisher name shown on the tile CTA, e.g. "SMSF Adviser". Only used when External URL is set.',
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description:
        "Optional when External URL is set — leave empty for press links that open on another website.",
      of: [
        { type: "block" },
        { type: "richTableBlock" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Primary Tag",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Main tag shown on the Insights card and at the top of the article.",
    }),
    defineField({
      name: "secondaryCategory",
      title: "Secondary Tag",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Optional second tag. Only shown next to the primary tag on the article detail page — not on the Insights card grid or filter bar.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        },
        { name: "ogImage", title: "Open Graph Image", type: "image" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      externalSource: "externalSource",
      externalUrl: "externalUrl",
      media: "mainImage",
    },
    prepare({ title, subtitle, externalSource, externalUrl, media }) {
      return {
        title,
        subtitle: externalUrl
          ? `External${externalSource ? `: ${externalSource}` : ""}`
          : subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
