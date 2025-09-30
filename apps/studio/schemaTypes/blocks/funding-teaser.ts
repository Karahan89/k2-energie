import { PiggyBankIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fundingTeaser = defineType({
  name: "fundingTeaser",
  type: "object",
  title: "Fördermittel Teaser",
  icon: PiggyBankIcon,
  description:
    "Hebt relevante Förderprogramme und Zuschüsse hervor, inklusive Quellen",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Fördermittel & Zuschüsse",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "items",
      title: "Förderprogramme",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fundingItem",
          title: "Förderprogramm",
          fields: [
            defineField({
              name: "title",
              title: "Programmname",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "fundingRate",
              title: "Förderquote",
              type: "string",
              description: "z.B. 'bis zu 80 % Zuschuss'",
            }),
            defineField({
              name: "summary",
              title: "Kurzbeschreibung",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "eligible",
              title: "Zielgruppe",
              type: "string",
              description: "Wer ist förderberechtigt?",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "sources",
      title: "Quellen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "source",
          title: "Quelle",
          fields: [
            defineField({
              name: "label",
              title: "Anzeigename",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      description: "Offizielle Links zu Programmen (BAFA, KfW, etc.)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: title || "Fördermittel",
      subtitle: items?.length
        ? `${items.length} Programme`
        : "Keine Programme definiert",
      media: PiggyBankIcon,
    }),
  },
});
