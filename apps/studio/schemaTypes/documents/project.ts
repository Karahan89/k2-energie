import { Landmark } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const project = defineType({
  name: "project",
  type: "document",
  title: "Projekte & Referenzen",
  icon: Landmark,
  description:
    "Konfigurieren Sie die Hauptseite für alle Ihre Projekt-Referenzen. Hier können Sie die Übersicht und Struktur Ihrer Projekte verwalten.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Haupttitel",
      description:
        "Der Haupttitel der Projekte-Seite (z.B. 'Unsere Projekte & Referenzen')",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule.required().error("Ein Haupttitel ist erforderlich"),
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "text",
      description:
        "Eine kurze Beschreibung Ihrer Projektarbeit. Diese hilft auch bei der Suchmaschinenoptimierung.",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule
          .min(140)
          .warning(
            "Die Beschreibung sollte mindestens 140 Zeichen haben für optimale SEO-Sichtbarkeit",
          ),
        rule
          .max(160)
          .warning(
            "Die Beschreibung sollte maximal 160 Zeichen haben, da sie in Suchergebnissen abgeschnitten wird",
          ),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL-Slug",
      description:
        "Die Web-Adresse für die Projekte-Hauptseite (normalerweise '/projekte')",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) =>
        rule.required().error("Ein URL-Slug ist erforderlich"),
    }),
    pageBuilderField,
    defineField({
      name: "featuredProjects",
      title: "Hervorgehobene Projekte",
      type: "array",
      description:
        "Wählen Sie bis zu 6 Projekte aus, die auf der Hauptseite hervorgehoben werden",
      of: [
        {
          type: "reference",
          to: [{ type: "projectItem" }],
        },
      ],
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule.max(6).warning("Maximal 6 Projekte werden angezeigt"),
    }),
    ...seoFields.filter(
      (field) => !["seoNoIndex", "seoHideFromLists"].includes(field.name),
    ),
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      slug: "slug.current",
    },
    prepare: ({ title, description, slug }) => ({
      title: title || "Projekte & Referenzen",
      media: Landmark,
      subtitle: description
        ? description.substring(0, 60) + "..."
        : "Keine Beschreibung",
    }),
  },
});
