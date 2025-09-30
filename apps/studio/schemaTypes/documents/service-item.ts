import { SparklesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const serviceItem = defineType({
  name: "serviceItem",
  type: "document",
  title: "Einzelne Leistung",
  icon: SparklesIcon,
  description:
    "Erstellen Sie eine neue einzelne Dienstleistung. Diese erscheint als Detailseite unter der Hauptseite 'Leistungen'.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel der Leistung",
      description:
        "z.B. 'Energieberatung für Wohngebäude' oder 'Energetische Sanierung'",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required().error("Ein Titel ist erforderlich"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-Slug",
      description:
        "Die Web-Adresse für diese Leistung (z.B. '/leistungen/energieberatung-wohngebaeude')",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) =>
        rule.required().error("Ein URL-Slug ist erforderlich"),
    }),
    defineField({
      name: "teaser",
      type: "text",
      title: "Kurzbeschreibung",
      description:
        "Eine kurze Beschreibung der Leistung, die in Übersichten angezeigt wird",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule
          .max(320)
          .warning("Kurzbeschreibung sollte maximal 320 Zeichen haben"),
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Wählen Sie ein passendes Icon für diese Leistung",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "⚡ Energie", value: "zap" },
          { title: "🏠 Gebäude", value: "home" },
          { title: "🌱 Nachhaltigkeit", value: "leaf" },
          { title: "📊 Analyse", value: "trending-up" },
          { title: "🔧 Beratung", value: "wrench" },
          { title: "💡 Innovation", value: "lightbulb" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "audience",
      type: "array",
      title: "Zielgruppe",
      description: "Für welche Zielgruppen ist diese Leistung relevant?",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Wohngebäude (WG)", value: "wg" },
          { title: "Nichtwohngebäude (NWG)", value: "nwg" },
        ],
      },
      validation: (rule) =>
        rule.required().min(1).error("Mindestens eine Zielgruppe auswählen"),
    }),
    defineField({
      name: "domain",
      type: "array",
      title: "Bereich (v.a. NWG)",
      description: "In welchen Bereichen ist diese Leistung angesiedelt?",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Gebäude", value: "gebaeude" },
          { title: "Anlagen", value: "anlagen" },
          { title: "Prozesse", value: "prozesse" },
        ],
      },
    }),
    defineField({
      name: "lifecycle",
      type: "array",
      title: "Lebenszyklus",
      description:
        "In welcher Phase des Gebäudelebenszyklus ist diese Leistung relevant?",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Neubau", value: "neubau" },
          { title: "Bestand", value: "bestand" },
        ],
      },
    }),
    defineField({
      name: "serviceType",
      type: "array",
      title: "Leistungstyp",
      description: "Welche Art von Leistung ist das?",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Beratung", value: "beratung" },
          { title: "Nachweis", value: "nachweis" },
          { title: "Förderung", value: "foerderung" },
          { title: "Audit", value: "audit" },
          { title: "Zertifizierung", value: "zertifizierung" },
        ],
      },
    }),
    defineField({
      name: "categoryRef",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      title: "Primäre Kategorie",
      description: "Hauptkategorie für die Navigation",
      group: GROUP.MAIN_CONTENT,
      options: {
        disableNew: true,
      },
      validation: (rule) =>
        rule.required().error("Bitte eine primäre Kategorie auswählen"),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      description: "Zusätzliche Schlagwörter für bessere Auffindbarkeit",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Legacy Kategorie",
      description: "Alte Kategorie (wird durch categoryRef ersetzt)",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "🏠 Wohngebäude", value: "residential" },
          { title: "🏢 Gewerbegebäude", value: "commercial" },
          { title: "🏭 Industriegebäude", value: "industrial" },
          { title: "🏫 Öffentliche Gebäude", value: "public" },
          { title: "🏘️ Quartiersentwicklung", value: "district" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Hervorheben",
      description: "Diese Leistung auf der Hauptseite hervorheben",
      group: GROUP.MAIN_CONTENT,
      initialValue: false,
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      teaser: "teaser",
      category: "category",
      featured: "featured",
    },
    prepare: ({ title, slug, teaser, category, featured }) => {
      const categoryLabels = {
        residential: "🏠 Wohngebäude",
        commercial: "🏢 Gewerbe",
        industrial: "🏭 Industrie",
        public: "🏫 Öffentlich",
        district: "🏘️ Quartier",
      };

      const featuredText = featured ? " ⭐" : "";

      return {
        title: `${title || "Neue Leistung"}${featuredText}`,
        subtitle: `${slug || "kein-slug"} • ${categoryLabels[category as keyof typeof categoryLabels] || "Unbekannt"} • ${teaser ? teaser.substring(0, 50) + "..." : "Keine Beschreibung"}`,
        media: SparklesIcon,
      };
    },
  },
});
