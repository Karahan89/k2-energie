import { PanelsTopLeftIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const processGrid = defineType({
  name: "processGrid",
  type: "object",
  title: "Anlagen & Prozesse",
  icon: PanelsTopLeftIcon,
  description:
    "Grid mit typischen Anlagen- und Prozessbereichen für Nichtwohngebäude",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Anlagen & Prozesse im Fokus",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      description: "Kurzer Überblick über die behandelten Anlagen und Prozesse",
    }),
    defineField({
      name: "items",
      title: "Bereiche",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "processItem",
          title: "Bereich",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Druckluft", value: "air" },
                  { title: "Kälte/Klima", value: "snowflake" },
                  { title: "Lüftung", value: "wind" },
                  { title: "Beleuchtung", value: "light" },
                  { title: "Abwärme", value: "heat" },
                  { title: "MSR", value: "control" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "kpi",
              title: "Kennzahl",
              type: "string",
              description: "Optional: KPI oder typischer Einsparwert",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "cta",
      title: "Call-to-Action",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Link-Text",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Link-Ziel",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: title || "Anlagen & Prozesse",
      subtitle: items?.length
        ? `${items.length} Bereiche`
        : "Keine Bereiche definiert",
      media: PanelsTopLeftIcon,
    }),
  },
});
