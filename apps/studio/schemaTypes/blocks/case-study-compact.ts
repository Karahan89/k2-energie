import { BriefcaseIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudyCompact = defineType({
  name: "caseStudyCompact",
  type: "object",
  title: "Referenz (Kompakt)",
  icon: BriefcaseIcon,
  description: "Kompakte Fallstudie mit Kennzahlen und Ergebnis",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Referenzprojekt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde",
      type: "string",
    }),
    defineField({
      name: "sector",
      title: "Branche",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Zusammenfassung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "metrics",
      title: "Kennzahlen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          title: "Kennzahl",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Wert",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "results",
      title: "Ergebnisse",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          title: "Ergebnis",
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Zitat",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Zitattext",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "author",
          title: "Autor",
          type: "string",
        }),
        defineField({
          name: "role",
          title: "Position",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call-to-Action",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button-Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
    },
    prepare: ({ title, client }) => ({
      title: title || "Referenz",
      subtitle: client ? `Kunde: ${client}` : "Ohne Kundennennung",
      media: BriefcaseIcon,
    }),
  },
});
