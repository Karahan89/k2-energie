import { PhoneCallIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contactCta = defineType({
  name: "contactCta",
  type: "object",
  title: "Kontakt CTA",
  icon: PhoneCallIcon,
  description: "Auffälliger Kontakt-Call-to-Action mit Ansprechpartner",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Kostenloses Erstgespräch sichern",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Lassen Sie uns gemeinsam Ihr Projekt besprechen. Wir melden uns innerhalb von 24 Stunden.",
    }),
    defineField({
      name: "contactName",
      title: "Ansprechpartner",
      type: "string",
    }),
    defineField({
      name: "contactRole",
      title: "Rolle",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
    }),
    defineField({
      name: "cta",
      title: "Primäre Aktion",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button-Label",
          type: "string",
          initialValue: "Jetzt Termin vereinbaren",
        }),
        defineField({
          name: "href",
          title: "Ziel-URL",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Sekundäre Aktion",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Link-Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Ziel-URL",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      contact: "contactName",
    },
    prepare: ({ title, contact }) => ({
      title: title || "Kontakt CTA",
      subtitle: contact
        ? `Ansprechpartner: ${contact}`
        : "Kein Ansprechpartner",
      media: PhoneCallIcon,
    }),
  },
});
