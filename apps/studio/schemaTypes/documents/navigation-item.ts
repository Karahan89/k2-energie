import { CompassIcon, ExternalLinkIcon, LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const internalTargets = [
  { type: "homePage", title: "Startseite" },
  { type: "companyPage", title: "Über uns" },
  { type: "contactPage", title: "Kontakt" },
  { type: "service", title: "Leistungen" },
  { type: "serviceCategory", title: "Leistungskategorie" },
  { type: "project", title: "Projekte" },
  { type: "page", title: "Seite" },
  { type: "serviceItem", title: "Leistung" },
  { type: "projectItem", title: "Projekt" },
  { type: "legalPage", title: "Rechtliches" },
  { type: "faq", title: "FAQ" },
];

export const navigationItem = defineType({
  name: "navigationItem",
  type: "document",
  title: "Navigationseintrag",
  icon: CompassIcon,
  groups: [
    { name: "content", title: "Inhalt" },
    { name: "settings", title: "Einstellungen" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      group: "content",
      description: "Der Text, der in der Navigation angezeigt wird",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Platzierung",
      group: "settings",
      options: {
        list: [
          { title: "Header (Hauptnavigation)", value: "header" },
          { title: "Footer (Fußzeile)", value: "footer" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Reihenfolge",
      group: "settings",
      description:
        "Kleinere Zahlen erscheinen weiter vorne (0 = ganz links/oben)",
      initialValue: 0,
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "kind",
      type: "string",
      title: "Verlinkung",
      group: "content",
      options: {
        list: [
          { title: "Interner Link (zu einer Seite)", value: "internal" },
          { title: "Externer Link (zu einer Website)", value: "external" },
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
      group: "content",
      to: internalTargets,
      hidden: ({ parent }) => parent?.kind !== "internal",
      description:
        "Wählen Sie eine Seite oder Leistungskategorie aus, zu der verlinkt werden soll",
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
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "external",
      description:
        "Geben Sie die vollständige URL ein (z.B. https://example.com)",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "In neuem Tab öffnen",
      group: "settings",
      description: "Link wird in einem neuen Browser-Tab geöffnet",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      kind: "kind",
      order: "order",
      internalTitle: "internal.title",
      externalUrl: "external",
    },
    prepare: ({
      title,
      location,
      kind,
      order,
      internalTitle,
      externalUrl,
    }) => ({
      title: title || "Unbenannter Navigationseintrag",
      subtitle: `${location === "header" ? "Header" : "Footer"} • ${kind === "internal" ? `→ ${internalTitle || "Seite"}` : `→ ${externalUrl || "URL"}`} • Reihenfolge: ${order || 0}`,
      media: kind === "internal" ? LinkIcon : ExternalLinkIcon,
    }),
  },
});
