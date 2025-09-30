import { defineField, defineType } from "sanity";

export const projectGallery = defineType({
  name: "projectGallery",
  title: "Referenzen-Galerie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      type: "richText",
      title: "Einleitung",
      description: "Optionaler Text über der Referenzenliste.",
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Referenzen",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "Buttons",
      of: [{ type: "button" }],
      validation: (rule) => rule.max(2),
    }),
  ],
});
