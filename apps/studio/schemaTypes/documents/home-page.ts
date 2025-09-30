import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug } from "../../utils/slug";
import { createSlugValidator } from "../../utils/slug-validation";
import { pageBuilderField } from "../common";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Startseite",
  icon: HomeIcon,
  description:
    "Konfigurieren Sie die Hauptseite Ihrer Website. Hier können Sie den Hero-Bereich mit Energie-Analyse-Card, hervorgehobene Leistungen und Projekte einrichten.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Haupttitel",
      description:
        "Der Haupttitel, der auf Ihrer Startseite erscheint (z.B. 'Ihr Partner für Energieberatung')",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule.required().error("Ein Haupttitel ist erforderlich"),
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "text",
      description:
        "Eine kurze Beschreibung Ihres Ingenieurbüros. Diese hilft auch bei der Suchmaschinenoptimierung.",
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
        "Die Web-Adresse Ihrer Startseite. Normalerweise ist das '/' für die Hauptseite.",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (Rule) =>
        Rule.required().custom(
          createSlugValidator({
            documentType: "Startseite",
            requiredPrefix: "/",
            sanityDocumentType: "homePage",
          }),
        ),
    }),
    pageBuilderField,
    defineField({
      name: "featuredServices",
      title: "Hervorgehobene Leistungen",
      type: "array",
      description:
        "Wählen Sie bis zu 6 Leistungen aus, die auf der Startseite hervorgehoben werden",
      of: [
        {
          type: "reference",
          to: [{ type: "serviceItem" }],
        },
      ],
      group: GROUP.MAIN_CONTENT,
      validation: (rule) =>
        rule.max(6).warning("Maximal 6 Leistungen werden angezeigt"),
    }),
    defineField({
      name: "featuredProjects",
      title: "Hervorgehobene Projekte",
      type: "array",
      description:
        "Wählen Sie bis zu 6 Projekte aus, die auf der Startseite als Referenzen gezeigt werden",
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
      title: title || "Startseite",
      media: HomeIcon,
      subtitle: description
        ? description.substring(0, 60) + "..."
        : "Keine Beschreibung",
    }),
  },
});
