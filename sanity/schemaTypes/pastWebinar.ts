import { defineField, defineType } from "sanity";

export const pastWebinar = defineType({
  name: "pastWebinar",
  title: "Past Webinar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube video ID",
      type: "string",
      description:
        "The ID from the YouTube URL. For https://www.youtube.com/watch?v=vY6WciZMt_I use vY6WciZMt_I.",
      validation: (rule) => rule.required().min(6).max(20),
    }),
    defineField({
      name: "displayDate",
      title: "Display date",
      type: "string",
      description: 'Shown in the playlist, e.g. "April 2026".',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Sort date",
      type: "datetime",
      description: "Used to order the playlist (newest first).",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "displayDate",
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
