import { ClipboardIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";

const employmentTypes = [
  { title: "Vollzeit", value: "Full-time" },
  { title: "Teilzeit", value: "Part-time" },
  { title: "Werkstudent:in", value: "Working Student" },
  { title: "Freelance", value: "Freelance" },
];

export const jobPosting = defineType({
  name: "jobPosting",
  type: "document",
  title: "Stellenanzeige",
  icon: ClipboardIcon,
  description: "Offene Position inkl. Beschreibung und Metadaten.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Standort",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "employmentType",
      type: "string",
      title: "Anstellungsart",
      options: {
        list: employmentTypes,
      },
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "published",
      type: "boolean",
      title: "Veröffentlicht",
      initialValue: true,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "richText",
      title: "Beschreibung",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "applyUrl",
      type: "url",
      title: "Bewerbungslink",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      published: "published",
    },
    prepare: ({ title, location, published }) => ({
      title: title || "Stellenanzeige",
      subtitle: [location, published ? "veröffentlicht" : "entwurf"]
        .filter(Boolean)
        .join(" • "),
      media: ClipboardIcon,
    }),
  },
});
