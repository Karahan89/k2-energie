import { defineField, defineType } from "sanity";

const fieldTypeOptions = [
  { title: "Text (einzeilig)", value: "text" },
  { title: "E-Mail", value: "email" },
  { title: "Telefon", value: "tel" },
  { title: "Mehrzeiliger Text", value: "textarea" },
];

export const contactForm = defineType({
  name: "contactForm",
  title: "Kontaktformular",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Kurzer Hinweis oberhalb der Überschrift.",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      type: "richText",
      title: "Einleitungstext",
      description: "Kurze Einleitung mit Hinweisen zum Kontaktformular.",
    }),
    defineField({
      name: "fields",
      type: "array",
      title: "Formularfelder",
      validation: (rule) => rule.min(1).required(),
      of: [
        defineField({
          name: "field",
          type: "object",
          title: "Feld",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Label",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "name",
              type: "string",
              title: "Feldname",
              description:
                "Wird als HTML-Name verwendet. Nur Kleinbuchstaben, Zahlen und Bindestriche.",
              validation: (rule) =>
                rule
                  .required()
                  .regex(/^[a-z][a-z0-9-]*$/, { name: "slug" })
                  .error(
                    "Nur Kleinbuchstaben, Zahlen und Bindestriche. Muss mit einem Buchstaben starten.",
                  ),
            }),
            defineField({
              name: "fieldType",
              type: "string",
              title: "Feldtyp",
              options: {
                list: fieldTypeOptions,
                layout: "radio",
              },
              validation: (rule) => rule.required(),
              initialValue: fieldTypeOptions[0].value,
            }),
            defineField({
              name: "placeholder",
              type: "string",
              title: "Platzhalter",
            }),
            defineField({
              name: "required",
              type: "boolean",
              title: "Pflichtfeld",
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "privacyNotice",
      type: "richText",
      title: "Hinweis zum Datenschutz",
      description:
        "Optionaler Text unterhalb des Formulars, z. B. zu Datenschutz- und Einwilligungshinweisen.",
    }),
    defineField({
      name: "submitLabel",
      type: "string",
      title: "Button-Text",
      initialValue: "Nachricht senden",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      rows: 3,
      title: "Bestätigungstext",
      description: "Wird nach erfolgreicher Formularübermittlung angezeigt.",
    }),
  ],
});
