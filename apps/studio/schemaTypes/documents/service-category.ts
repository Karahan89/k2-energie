import { Building2Icon } from "lucide-react";
import { defineField, defineType } from "sanity";
import slugify from "slugify";

import { GROUP, GROUPS } from "../../utils/constant";
import { pageBuilderField } from "../common";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { isUnique } from "../../utils/slug";

export const serviceCategory = defineType({
  name: "serviceCategory",
  type: "document",
  title: "Service-Kategorie",
  icon: Building2Icon,
  description:
    "Kategorien für die Leistungsübersicht (WG, NWG, Anlagen & Prozesse)",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description:
        "z.B. 'Wohngebäude', 'Nichtwohngebäude', 'Anlagen & Prozesse'",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required().error("Ein Titel ist erforderlich"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-Slug",
      description:
        "URL-freundlicher Slug (z.B. 'wohngebaeude', 'nichtwohngebaeude')",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: (value: string) =>
          slugify(
            (value ?? "")
              .trim()
              .toLowerCase()
              .replace(/ä/g, "ae")
              .replace(/ö/g, "oe")
              .replace(/ü/g, "ue")
              .replace(/ß/g, "ss"),
            {
              lower: true,
              strict: true,
            },
          ),
        isUnique,
      },
      validation: (rule) =>
        rule.required().error("Ein URL-Slug ist erforderlich"),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Beschreibung",
      description: "Kurze Beschreibung der Kategorie",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Icon für die Kategorie",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Haus (Wohngebäude)", value: "home" },
          { title: "Gebäude (Nichtwohngebäude)", value: "building-2" },
          { title: "Fabrik (Anlagen & Prozesse)", value: "factory" },
          { title: "Einstellungen", value: "settings" },
          { title: "Blatt (Nachhaltigkeit)", value: "leaf" },
          { title: "Blitz (Energie)", value: "zap" },
        ],
      },
      initialValue: "building-2",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Sortierung",
      description: "Reihenfolge in der Navigation (niedrigere Zahlen zuerst)",
      group: GROUP.MAIN_CONTENT,
      initialValue: 0,
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Farbe",
      description: "Farbe für die Kategorie",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Blau", value: "blue" },
          { title: "Grün", value: "green" },
          { title: "Orange", value: "orange" },
          { title: "Lila", value: "purple" },
          { title: "Pink", value: "pink" },
          { title: "Grau", value: "gray" },
        ],
      },
      initialValue: "blue",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Aktiv",
      description: "Kategorie in Navigation anzeigen",
      group: GROUP.MAIN_CONTENT,
      initialValue: true,
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      icon: "icon",
      order: "order",
    },
    prepare: ({ title, slug, icon, order }) => ({
      title: `${title || "Neue Kategorie"} (${order || 0})`,
      subtitle: slug || "kein-slug",
      media: Building2Icon,
    }),
  },
});
