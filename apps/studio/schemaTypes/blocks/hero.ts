import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Badge",
      description:
        "Optional badge text displayed above the title, useful for highlighting new features or promotions",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "The main heading text for the hero section that captures attention",
    }),
    defineField({
      name: "titleHighlights",
      type: "array",
      title: "Title Highlights",
      description:
        "Optional words within the title that should be highlighted with the brand color (first match wins).",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(3),
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "The main hero image - should be high quality and visually impactful",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Feature Highlights",
      description:
        "Short bullet points that communicate benefits or proof points.",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "energyCard",
      type: "object",
      title: "Energy Analysis Card",
      description:
        "Configure the metrics displayed in the interactive energy analysis card.",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Card Title",
          initialValue: "Energie-Analyse",
        }),
        defineField({
          name: "subtitle",
          type: "string",
          title: "Card Subtitle",
          initialValue: "Beispiel-Berechnung Einfamilienhaus",
        }),
        defineField({
          name: "badge",
          type: "string",
          title: "Badge Label",
          initialValue: "BAFA-konform",
        }),
        defineField({
          name: "annualSavings",
          type: "string",
          title: "Annual Savings Value",
          initialValue: "1.850€",
        }),
        defineField({
          name: "annualSavingsLabel",
          type: "string",
          title: "Annual Savings Label",
          initialValue: "Jährliche Einsparung",
        }),
        defineField({
          name: "costReduction",
          type: "string",
          title: "Cost Reduction",
          initialValue: "↓ 68% Energiekosten",
        }),
        defineField({
          name: "co2Reduction",
          type: "string",
          title: "CO₂ Reduction",
          initialValue: "-3.2t",
        }),
        defineField({
          name: "co2ReductionLabel",
          type: "string",
          title: "CO₂ Reduction Label",
          initialValue: "CO₂ pro Jahr",
        }),
        defineField({
          name: "emissionReduction",
          type: "string",
          title: "Emission Reduction",
          initialValue: "↓ 72% Emissionen",
        }),
        defineField({
          name: "efficiencyLabel",
          type: "string",
          title: "Efficiency Label",
          initialValue: "Energieeffizienz",
        }),
        defineField({
          name: "efficiencyFrom",
          type: "string",
          title: "Efficiency From",
          initialValue: "D",
        }),
        defineField({
          name: "efficiencyTo",
          type: "string",
          title: "Efficiency To",
          initialValue: "A+",
        }),
        defineField({
          name: "efficiencyScore",
          type: "number",
          title: "Efficiency Score (%)",
          description: "Progress bar target value from 0-100.",
          initialValue: 85,
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({
          name: "temperature",
          type: "string",
          title: "Comfort Temperature",
          initialValue: "22°C",
        }),
        defineField({
          name: "temperatureLabel",
          type: "string",
          title: "Temperature Label",
          initialValue: "Optimale Temperatur",
        }),
        defineField({
          name: "amortization",
          type: "string",
          title: "Amortisation Range",
          initialValue: "8-12",
        }),
        defineField({
          name: "amortizationLabel",
          type: "string",
          title: "Amortisation Label",
          initialValue: "Jahre Amortisation",
        }),
      ],
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Hero Block",
    }),
  },
});