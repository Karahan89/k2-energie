import { ScaleIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

const categories = [
  { title: "Impressum", value: "impressum" },
  { title: "Datenschutz", value: "datenschutz" },
  { title: "AGB", value: "agb" },
];

export const legalPage = defineType({
  name: "legalPage",
  type: "document",
  title: "Rechtsseite",
  icon: ScaleIcon,
  description: "Seiten für rechtlich verpflichtende Inhalte.",
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
        slugify: (value: string) =>
          value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9-]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Kategorie",
      options: {
        list: categories,
      },
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      type: "richText",
      title: "Inhalt",
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
    },
    prepare: ({ title, category }) => ({
      title: title || "Rechtsseite",
      subtitle: category,
      media: ScaleIcon,
    }),
  },
});
