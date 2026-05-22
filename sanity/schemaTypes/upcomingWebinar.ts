import { defineField, defineType } from "sanity";

export const upcomingWebinar = defineType({
  name: "upcomingWebinar",
  title: "Upcoming Webinar",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "Show on website",
      type: "boolean",
      description:
        "Turn off when there is no upcoming webinar to hide the promo on the Webinars tab.",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateLabel",
      title: "Date",
      type: "string",
      description: 'Display date, e.g. "Tuesday 19th May 2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timeLabel",
      title: "Time",
      type: "string",
      description: 'Display time, e.g. "12:30pm - 1:30pm AEST".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registerUrl",
      title: "Registration URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "learningOutcomes",
      title: "Learning outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "presenterName",
      title: "Presenter name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "presenterTitle",
      title: "Presenter role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "presenterBio",
      title: "Presenter bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "presenterImage",
      title: "Presenter photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({
      name: "experienceBadge",
      title: "Experience badge",
      type: "string",
      description: 'Optional badge text, e.g. "25+" for years of experience.',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateLabel",
      media: "presenterImage",
    },
  },
});
