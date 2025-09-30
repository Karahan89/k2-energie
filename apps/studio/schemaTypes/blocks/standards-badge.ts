import { ShieldCheckIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const standardsBadge = defineType({
  name: "standardsBadge",
  type: "object",
  title: "Normen & Standards",
  icon: ShieldCheckIcon,
  description:
    "Liste relevanter Normen, Standards und Richtlinien für diese Leistung",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Relevante Normen & Standards",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Einführung",
      type: "text",
      rows: 3,
      description: "Kurzer einleitender Text, warum diese Normen wichtig sind",
    }),
    defineField({
      name: "norms",
      title: "Normen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "normItem",
          title: "Norm",
          fields: [
            defineField({
              name: "title",
              title: "Bezeichnung",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "code",
              title: "Normnummer",
              type: "string",
              description: "z.B. DIN EN 16247-1",
            }),
            defineField({
              name: "summary",
              title: "Kurzbeschreibung",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "mandatory",
              title: "Verpflichtend",
              type: "boolean",
              initialValue: false,
              description:
                "Markiert Normen, die gesetzlich vorgeschrieben sind",
            }),
            defineField({
              name: "link",
              title: "Verweis",
              type: "url",
              description: "Optionaler Link zu weiterführenden Informationen",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "notes",
      title: "Hinweise",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          title: "Hinweis",
        }),
      ],
      description: "Optional: weitere Hinweise zu Normen und Richtlinien",
    }),
  ],
  preview: {
    select: {
      title: "title",
      norms: "norms",
    },
    prepare: ({ title, norms }) => ({
      title: title || "Normen & Standards",
      subtitle: norms?.length
        ? `${norms.length} Norm${norms.length === 1 ? "" : "en"}`
        : "Keine Normen ausgewählt",
      media: ShieldCheckIcon,
    }),
  },
});
