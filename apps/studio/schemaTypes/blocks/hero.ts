import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { richTextField } from "../common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Eyebrow",
      description:
        "Kurzer Hinweis oberhalb der Überschrift, z. B. ein Erfolgsversprechen oder eine aktuelle Aktion",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      description: "Prägnante Hauptüberschrift der Hero Section",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "titleHighlights",
      type: "array",
      title: "Titel-Highlights",
      description:
        "Optional bis zu drei Wörter oder Phrasen, die innerhalb des Titels visuell hervorgehoben werden sollen.",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(3),
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Hero-Bild",
      description:
        "Großformatiges Visual (idealerweise 16:10), das den Leistungsansatz von K2 Energieberatung unterstützt",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Kennzahlen & Leistungsversprechen",
      description:
        "Kurze Aussagen mit optionalem zweiten Teil, z. B. \"3,2 t CO₂ weniger – pro Jahr\". Maximal vier Einträge.",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "Call-to-Action Buttons",
      description:
        "Maximal zwei Aktionen: der erste Eintrag erscheint als Primär-Button, der zweite als optionale Sekundäraktion.",
      of: [{ type: "button" }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
      badge: "badge",
    },
    prepare: ({ title, badge }) => ({
      title,
      subtitle: badge ? `Hero · ${badge}` : "Hero Section",
    }),
  },
});
