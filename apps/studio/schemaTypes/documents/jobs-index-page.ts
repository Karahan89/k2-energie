import { BriefcaseIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug } from "../../utils/slug";
import { createSlugValidator } from "../../utils/slug-validation";
import { pageBuilderField } from "../common";

export const jobsIndexPage = defineType({
  name: "jobsIndexPage",
  type: "document",
  title: "Karriereseite",
  icon: BriefcaseIcon,
  description:
    "Übersichtsseite für Stellenangebote inkl. Page-Builder-Inhalten.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Kurzbeschreibung",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (Rule) =>
        Rule.required().custom(
          createSlugValidator({
            documentType: "Karriereseite",
            requiredPrefix: "/karriere",
            sanityDocumentType: "jobsIndexPage",
          }),
        ),
    }),
    defineField({
      name: "openApplicationEmail",
      type: "string",
      title: "E-Mail für Initiativbewerbungen",
      description: "Adresse für Initiativbewerbungen",
      validation: (rule) => rule.email(),
      group: GROUP.MAIN_CONTENT,
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => ({
      title: title || "Karriereseite",
      subtitle: slug ? `/${slug.replace(/^\//, "")}` : "/karriere",
      media: BriefcaseIcon,
    }),
  },
});
