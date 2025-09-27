import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const socialLinks = defineField({
  name: "socialLinks",
  title: "Social Media Links",
  description: "Links zu euren sozialen Profilen",
  type: "object",
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      description:
        "Vollständige URL zum LinkedIn-Profil oder -Unternehmensseite",
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      description: "Vollständige URL zur Facebook-Seite",
      type: "string",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      description: "Vollständige URL zum Twitter/X-Profil",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      description: "Vollständige URL zum Instagram-Profil",
      type: "string",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      description: "Vollständige URL zum YouTube-Kanal",
      type: "string",
    }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Globale Einstellungen",
  description: "Zentrale Einstellungen und Stammdaten der Website.",
  icon: CogIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Site Settings",
      title: "Label",
      description: "Interner Name der Einstellungen im Studio",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Seitentitel",
      description:
        "Titel der Website, erscheint u. a. im Browser-Tab und für SEO.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: "Beschreibung",
      description: "Kurze Beschreibung für SEO-Zwecke (50–160 Zeichen).",
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      description: "Logo-Datei der Website",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Kontakt-E-Mail",
      description: "Primäre Kontaktadresse der Website",
      validation: (rule) => rule.email(),
    }),
    socialLinks,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Site Settings",
      media: CogIcon,
    }),
  },
});
