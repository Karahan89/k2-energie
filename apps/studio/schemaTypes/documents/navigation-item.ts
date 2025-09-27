import { CompassIcon, ExternalLinkIcon, LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const internalTargets = [
  { type: "homePage" },
  { type: "companyPage" },
  { type: "jobsIndexPage" },
  { type: "contactPage" },
  { type: "page" },
  { type: "service" },
  { type: "project" },
  { type: "legalPage" },
];

export const navigationItem = defineType({
  name: "navigationItem",
  type: "document",
  title: "Navigationseintrag",
  icon: CompassIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Platzierung",
      options: {
        list: [
          { title: "Header", value: "header" },
          { title: "Footer", value: "footer" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Reihenfolge",
      description: "Kleinere Zahlen erscheinen weiter vorne.",
      initialValue: 0,
    }),
    defineField({
      name: "kind",
      type: "string",
      title: "Verlinkung",
      options: {
        list: [
          { title: "Interner Link", value: "internal" },
          { title: "Externer Link", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internal",
      type: "reference",
      title: "Ziel (intern)",
      to: internalTargets,
      hidden: ({ parent }) => parent?.kind !== "internal",
      validation: (rule) =>
        rule.custom((value, context) => {
          const kind = (context.parent as { kind?: string })?.kind;
          if (kind === "internal" && !value?._ref) {
            return "Bitte ein internes Ziel wählen.";
          }
          return true;
        }),
    }),
    defineField({
      name: "external",
      type: "url",
      title: "Externe URL",
      hidden: ({ parent }) => parent?.kind !== "external",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "In neuem Tab öffnen",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      kind: "kind",
    },
    prepare: ({ title, location, kind }) => ({
      title: title || "Navigationseintrag",
      subtitle: `${location ?? ""} • ${kind ?? ""}`.trim(),
      media: kind === "external" ? ExternalLinkIcon : LinkIcon,
    }),
  },
});
