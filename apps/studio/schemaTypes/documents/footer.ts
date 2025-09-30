import { PanelBottomIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const contactInfo = defineField({
  name: "contactInfo",
  title: "Kontaktinformationen",
  type: "object",
  fields: [
    defineField({
      name: "companyName",
      title: "Firmenname",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
  ],
});


const socialLinks = defineField({
  name: "socialLinks",
  title: "Social Media Links",
  type: "object",
  fields: [
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
    }),
  ],
});

const footerLinks = defineField({
  name: "footerLinks",
  title: "Footer Links",
  type: "object",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Schnellzugriff Links",
      description: "Links zu Hauptseiten der Website",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "openInNewTab",
              title: "In neuem Tab öffnen",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "href",
            },
          },
        },
      ],
    }),
  ],
});

const copyrightLinks = defineField({
  name: "copyrightLinks",
  title: "Copyright-Zeile Links",
  description: "Links die in der Copyright-Zeile angezeigt werden (z.B. Impressum, Datenschutz)",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titel",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "openInNewTab",
          title: "In neuem Tab öffnen",
          type: "boolean",
          initialValue: false,
        }),
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "href",
        },
      },
    },
  ],
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer-Konfiguration mit Newsletter, Kontakt und Links",
  icon: PanelBottomIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "Footer",
      validation: (rule) => rule.required(),
    }),
    contactInfo,
    socialLinks,
    footerLinks,
    copyrightLinks,
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      initialValue: "Alle Rechte vorbehalten.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      companyName: "contactInfo.companyName",
    },
    prepare: ({ title, companyName }) => ({
      title: title || "Footer",
      subtitle: companyName ? `Firma: ${companyName}` : "Footer-Konfiguration",
      media: PanelBottomIcon,
    }),
  },
});
