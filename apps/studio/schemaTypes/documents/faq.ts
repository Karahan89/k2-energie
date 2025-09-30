import { MessageCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

import { parseRichTextToString } from "../../utils/helper";
import { richTextField } from "../common";

export const faq = defineType({
  name: "faq",
  type: "document",
  title: "Häufige Frage",
  description:
    "Erstellen Sie eine neue FAQ für Ihr Ingenieurbüro. Beantworten Sie häufige Fragen Ihrer Kunden zu Energieberatung, Sanierung und Förderungen.",
  icon: MessageCircle,
  fields: [
    defineField({
      name: "title",
      title: "Frage",
      type: "string",
      description:
        "Formulieren Sie die Frage so, wie sie ein Kunde stellen würde. z.B. 'Welche Förderungen gibt es für energetische Sanierung?'",
      validation: (Rule) =>
        Rule.required().error("Eine Frage ist erforderlich"),
    }),
    defineField({
      ...richTextField,
      title: "Antwort",
      description:
        "Geben Sie eine klare, verständliche Antwort, die direkt auf die Frage eingeht. Verwenden Sie einfache Sprache und konkrete Beispiele.",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Kategorie",
      description: "Ordnen Sie die Frage einer Kategorie zu",
      options: {
        list: [
          { title: "💰 Förderungen", value: "funding" },
          { title: "🏠 Sanierung", value: "renovation" },
          { title: "⚡ Energieberatung", value: "consulting" },
          { title: "📋 Verfahren", value: "process" },
          { title: "🌱 Nachhaltigkeit", value: "sustainability" },
          { title: "📊 Gutachten", value: "reports" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "priority",
      type: "number",
      title: "Priorität",
      description: "Höhere Zahlen erscheinen weiter oben in der FAQ-Liste",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      richText: "richText",
      category: "category",
    },
    prepare: ({ title, richText, category }) => {
      const categoryLabels = {
        funding: "💰 Förderungen",
        renovation: "🏠 Sanierung",
        consulting: "⚡ Beratung",
        process: "📋 Verfahren",
        sustainability: "🌱 Nachhaltigkeit",
        reports: "📊 Gutachten",
      };

      const subtitle = `${parseRichTextToString(richText, 30)}`;
      const categoryLabel =
        categoryLabels[category as keyof typeof categoryLabels] ||
        "❓ Allgemein";

      return {
        title: `❓ ${title || "Neue Frage"}`,
        subtitle: `${categoryLabel} • ${subtitle}`,
        media: MessageCircle,
      };
    },
  },
});
