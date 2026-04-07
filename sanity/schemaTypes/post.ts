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
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
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
      name: "isWebinarPost",
      title: "Is Webinar / Event",
      type: "boolean",
      description: "Show this post in the Webinars & Events tab instead of Fact Sheets",
      initialValue: false,
    }),
    defineField({
      name: "isUpcomingEvent",
      title: "Upcoming Event",
      type: "boolean",
      description:
        'When this post is a webinar/event, show the "Upcoming Event" label. Leave off for past events.',
      initialValue: false,
      hidden: ({ document }) => document?.isWebinarPost !== true,
    }),
    defineField({
      name: "videoUrl",
      title: "Video / Registration URL",
      type: "url",
      description: "Zoom registration link or video replay URL for webinar posts",
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
      media: "mainImage",
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
