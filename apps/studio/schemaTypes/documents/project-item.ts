import { Landmark } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const projectItem = defineType({
  name: "projectItem",
  type: "document",
  title: "Einzelnes Projekt",
  icon: Landmark,
  description:
    "Erstellen Sie eine neue einzelne Projekt-Referenz. Diese erscheint als Detailseite unter der Hauptseite 'Projekte & Referenzen'.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Projekttitel",
      description: "z.B. 'Energetische Sanierung Einfamilienhaus Musterstraße'",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule.required().error("Ein Projekttitel ist erforderlich"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-Slug",
      description:
        "Die Web-Adresse für dieses Projekt (z.B. '/projekte/sanierung-musterstrasse')",
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
      name: "summary",
      type: "text",
      title: "Projektzusammenfassung",
      description:
        "Kurze Beschreibung des Projekts und der erzielten Ergebnisse",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule
          .max(500)
          .warning("Zusammenfassung sollte maximal 500 Zeichen haben"),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Projektbild",
      description: "Hauptbild des Projekts (vor/nach Sanierung, Gebäude, etc.)",
      options: {
        hotspot: true,
      },
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Projektabschluss",
      description: "Datum des Projektabschlusses",
      options: {
        dateFormat: "DD.MM.YYYY",
      },
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Standort",
      description: "Stadt oder Region des Projekts",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "projectType",
      type: "string",
      title: "Projekttyp",
      description: "Art des Energieberatungsprojekts",
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
      description: "Dieses Projekt auf der Hauptseite hervorheben",
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
      date: "date",
      location: "location",
      projectType: "projectType",
      coverImage: "coverImage",
      featured: "featured",
    },
    prepare: ({ title, date, location, projectType, coverImage, featured }) => {
      const typeLabels = {
        residential: "Wohngebäude",
        commercial: "Gewerbe",
        industrial: "Industrie",
        public: "Öffentlich",
        district: "Quartier",
      };

      const featuredText = featured ? " ⭐" : "";

      return {
        title: `${title || "Neues Projekt"}${featuredText}`,
        subtitle: `${date ? new Date(date).toLocaleDateString("de-DE") : "Kein Datum"} • ${location || "Kein Standort"} • ${typeLabels[projectType as keyof typeof typeLabels] || "Unbekannt"}`,
        media: coverImage || Landmark,
      };
    },
  },
});
