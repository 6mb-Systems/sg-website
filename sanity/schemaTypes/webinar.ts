import { defineField, defineType } from "sanity";

export const webinar = defineType({
  name: "webinar",
  title: "Webinar",
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
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Live", value: "live" },
          { title: "Replay Available", value: "replay" },
        ],
      },
    }),
    defineField({
      name: "presenter",
      title: "Presenter",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "role", title: "Role", type: "string" },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
    }),
    defineField({
      name: "attendeeCount",
      title: "Attendee Count",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
    },
  },
  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
