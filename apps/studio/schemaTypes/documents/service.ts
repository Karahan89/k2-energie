import { SparklesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const service = defineType({
  name: "service",
  type: "document",
  title: "Leistung",
  icon: SparklesIcon,
  description: "Einzelne Dienstleistung inklusive Teaser und Beschreibung.",
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
      name: "teaser",
      type: "text",
      title: "Teaser",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.max(320),
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => ({
      title: title || "Leistung",
      subtitle: slug || "slug fehlt",
      media: SparklesIcon,
    }),
  },
});
