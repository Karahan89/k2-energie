import { SparklesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const serviceList = defineType({
  name: "serviceList",
  type: "object",
  title: "Leistungen Übersicht",
  icon: SparklesIcon,
  description: "Zeigt eine Übersicht aller verfügbaren Leistungen an",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Unsere Leistungen",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      initialValue: "Entdecken Sie unser umfassendes Leistungsspektrum im Bereich Energieberatung und energetische Sanierung.",
    }),
    defineField({
      name: "showCategories",
      title: "Kategorien anzeigen",
      type: "boolean",
      initialValue: true,
      description: "Zeigt die Leistungen nach Kategorien gruppiert an",
    }),
    defineField({
      name: "maxItems",
      title: "Maximale Anzahl",
      type: "number",
      initialValue: 6,
      validation: (rule) => rule.min(1).max(20),
      description: "Maximale Anzahl der anzuzeigenden Leistungen (0 = alle)",
    }),
    defineField({
      name: "showFeaturedOnly",
      title: "Nur hervorgehobene Leistungen",
      type: "boolean",
      initialValue: false,
      description: "Zeigt nur Leistungen an, die als 'hervorgehoben' markiert sind",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid (3 Spalten)", value: "grid" },
          { title: "Liste (vertikal)", value: "list" },
          { title: "Karten (2 Spalten)", value: "cards" },
        ],
      },
      initialValue: "grid",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showIcons",
      title: "Icons anzeigen",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTeaser",
      title: "Kurzbeschreibung anzeigen",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "presetAudience",
      title: "Zielgruppe voreinstellen",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wohngebäude (WG)", value: "wg" },
          { title: "Nichtwohngebäude (NWG)", value: "nwg" },
        ],
        layout: "tags",
      },
      description: "Filtert Services nach Zielgruppe (serverseitig)",
    }),
    defineField({
      name: "presetDomain",
      title: "Bereich voreinstellen",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gebäude", value: "gebaeude" },
          { title: "Anlagen", value: "anlagen" },
          { title: "Prozesse", value: "prozesse" },
        ],
        layout: "tags",
      },
      description: "Filtert Services nach Bereich (serverseitig)",
    }),
    defineField({
      name: "presetLifecycle",
      title: "Lebenszyklus voreinstellen",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Neubau", value: "neubau" },
          { title: "Bestand", value: "bestand" },
        ],
        layout: "tags",
      },
      description: "Filtert Services nach Lebenszyklus (serverseitig)",
    }),
    defineField({
      name: "presetServiceType",
      title: "Leistungstyp voreinstellen",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Beratung", value: "beratung" },
          { title: "Nachweis", value: "nachweis" },
          { title: "Förderung", value: "foerderung" },
          { title: "Audit", value: "audit" },
          { title: "Zertifizierung", value: "zertifizierung" },
        ],
        layout: "tags",
      },
      description: "Filtert Services nach Leistungstyp (serverseitig)",
    }),
    defineField({
      name: "presetTags",
      title: "Tags voreinstellen",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Filtert Services nach Tags (serverseitig)",
    }),
    defineField({
      name: "enableClientFilters",
      title: "Client-Filter aktivieren",
      type: "boolean",
      initialValue: false,
      description: "Zeigt Filter-Chips für Benutzer an",
    }),
  ],
  preview: {
    select: {
      title: "title",
      layout: "layout",
      maxItems: "maxItems",
    },
    prepare: ({ title, layout, maxItems }) => ({
      title: title || "Leistungen Übersicht",
      subtitle: `${layout || "grid"} • ${maxItems || "alle"} Leistungen`,
      media: SparklesIcon,
    }),
  },
});
