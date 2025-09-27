import { CalendarIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const project = defineType({
  name: "project",
  type: "document",
  title: "Projekt",
  icon: CalendarIcon,
  description: "Referenzprojekt mit Beschreibung und Datum.",
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
      title: "URL",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Kurzbeschreibung",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Projektabschluss",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      group: GROUP.MAIN_CONTENT,
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
    },
    prepare: ({ title, date }) => ({
      title: title || "Projekt",
      subtitle: date || "Datum unbekannt",
      media: CalendarIcon,
    }),
  },
});
