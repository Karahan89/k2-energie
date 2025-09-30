import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Der Haupttitel der CTA-Sektion",
      validation: (Rule) => Rule.required().max(100),
    }),
    richTextField,
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "CTA Block",
      subtitle: "Call-to-Action Sektion",
    }),
  },
});
