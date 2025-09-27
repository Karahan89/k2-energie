import { UsersIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";

export const teamMember = defineType({
  name: "teamMember",
  type: "document",
  title: "Teammitglied",
  icon: UsersIcon,
  description: "Personenprofil mit Rolle und Kurzvita.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "name",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Rolle",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Portrait",
      options: { hotspot: true },
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "bio",
      type: "richText",
      title: "Kurzvita",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Teammitglied",
      subtitle: subtitle || "",
      media,
    }),
  },
});
