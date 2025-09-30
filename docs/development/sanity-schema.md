# Sanity Schema

Dokumentation der Sanity CMS Schema-Struktur für k2-energie.

## 🏗️ Schema-Übersicht

Das Sanity Schema ist in verschiedene Kategorien unterteilt:

- **Documents**: Hauptinhaltstypen (Seiten, Services, etc.)
- **Blocks**: Page Builder Komponenten
- **Definitions**: Wiederverwendbare Feldtypen
- **Common**: Geteilte Felder und Utilities

## 📄 Document Types

### Home Page (`homePage`)
**Startseite mit Page Builder**

```typescript
export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home Page",
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule.min(140).warning("Mindestens 140 Zeichen für SEO"),
        rule.max(160).warning("Maximal 160 Zeichen für SEO"),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (Rule) => Rule.required().custom(
        createSlugValidator({
          documentType: "Home page",
          requiredPrefix: "/",
          sanityDocumentType: "homePage",
        }),
      ),
    }),
    pageBuilderField,
    defineField({
      name: "featuredServices",
      title: "Hervorgehobene Leistungen",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "featuredProjects",
      title: "Hervorgehobene Projekte",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
});
```

### Service (`service`)
**Leistungen/Dienstleistungen**

```typescript
export const service = defineType({
  name: "service",
  type: "document",
  title: "Leistung",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teaser",
      type: "text",
      title: "Teaser",
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
});
```

### Project (`project`)
**Referenzprojekte**

```typescript
export const project = defineType({
  name: "project",
  type: "document",
  title: "Referenz",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Kurzbeschreibung",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Titelbild",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Projektabschluss",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
});
```

### Company Page (`companyPage`)
**Unternehmensseite**

```typescript
export const companyPage = defineType({
  name: "companyPage",
  type: "document",
  title: "Unternehmen",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (rule) => rule.required(),
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
});
```

### Contact Page (`contactPage`)
**Kontaktseite**

```typescript
export const contactPage = defineType({
  name: "contactPage",
  type: "document",
  title: "Kontakt",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (rule) => rule.required(),
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
});
```

### FAQ (`faq`)
**Häufige Fragen**

```typescript
export const faq = defineType({
  name: "faq",
  type: "document",
  title: "FAQ",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Frage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "richText",
      type: "array",
      title: "Antwort",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
```

### Legal Page (`legalPage`)
**Rechtliche Seiten (Impressum, Datenschutz, AGB)**

```typescript
export const legalPage = defineType({
  name: "legalPage",
  type: "document",
  title: "Rechtliche Seite",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Impressum", value: "impressum" },
          { title: "Datenschutz", value: "datenschutz" },
          { title: "AGB", value: "agb" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
```

## 🧩 Block Types

**Fokus**: Schlanke, professionelle Blöcke ohne Newsletter für maximale Klarheit

### Hero Block (`hero`)
**Hauptsektion mit optionaler Energie-Analyse-Card**

```typescript
export const hero = defineType({
  name: "hero",
  type: "object",
  title: "Hero Sektion",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      title: "Hero Variant",
      description: "Choose the hero style - full with energy card for homepage, simple for other pages",
      options: {
        list: [
          { title: "Full (with Energy Card)", value: "full" },
          { title: "Simple (without Energy Card)", value: "simple" },
        ],
      },
      initialValue: "full",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      type: "string",
      title: "Badge",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleHighlights",
      type: "array",
      title: "Titel-Hervorhebungen",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "richText",
      type: "array",
      title: "Beschreibung",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "Buttons",
      of: [{ type: "button" }],
    }),
    defineField({
      name: "energyCard",
      type: "object",
      title: "Energie-Analyse-Card",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Titel",
        }),
        defineField({
          name: "subtitle",
          type: "string",
          title: "Untertitel",
        }),
        defineField({
          name: "badge",
          type: "string",
          title: "Badge",
        }),
        defineField({
          name: "annualSavings",
          type: "string",
          title: "Jährliche Einsparung",
        }),
        defineField({
          name: "co2Reduction",
          type: "string",
          title: "CO₂-Reduktion",
        }),
        defineField({
          name: "efficiencyFrom",
          type: "string",
          title: "Effizienz von",
        }),
        defineField({
          name: "efficiencyTo",
          type: "string",
          title: "Effizienz zu",
        }),
        defineField({
          name: "efficiencyScore",
          type: "number",
          title: "Effizienz-Score",
          validation: (rule) => rule.min(0).max(100),
        }),
      ],
    }),
  ],
});
```

### Feature Cards Icon (`featureCardsIcon`)
**Feature-Karten mit Icons**

```typescript
export const featureCardsIcon = defineType({
  name: "featureCardsIcon",
  type: "object",
  title: "Feature-Karten",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow Text",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "richText",
      type: "array",
      title: "Beschreibung",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "cards",
      type: "array",
      title: "Karten",
      of: [{ type: "featureCardIcon" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
```

### Contact Form (`contactForm`)
**Kontaktformular**

```typescript
export const contactForm = defineType({
  name: "contactForm",
  type: "object",
  title: "Kontaktformular",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow Text",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      type: "array",
      title: "Einführung",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "fields",
      type: "array",
      title: "Formularfelder",
      of: [{ type: "field" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "privacyNotice",
      type: "array",
      title: "Datenschutzhinweis",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submitLabel",
      type: "string",
      title: "Submit Button Text",
      initialValue: "Nachricht senden",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      title: "Erfolgsmeldung",
      rows: 3,
    }),
  ],
});
```

## 🔧 Definition Types

### Button (`button`)
**Wiederverwendbare Button-Definition**

```typescript
export const button = defineType({
  name: "button",
  type: "object",
  title: "Button",
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Button Text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Variant",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Link", value: "link" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "URL",
      validation: (rule) => rule.required(),
    }),
  ],
});
```

### Custom URL (`customUrl`)
**Interne und externe URLs**

```typescript
export const customUrl = defineType({
  name: "customUrl",
  type: "object",
  title: "URL",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: "URL Typ",
      options: {
        list: [
          { title: "Intern", value: "internal" },
          { title: "Extern", value: "external" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internal",
      type: "reference",
      title: "Interne Seite",
      to: [
        { type: "page" },
        { type: "service" },
        { type: "project" },
        { type: "homePage" },
        { type: "companyPage" },
        { type: "contactPage" },
      ],
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
    defineField({
      name: "external",
      type: "url",
      title: "Externe URL",
      hidden: ({ parent }) => parent?.type !== "external",
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "In neuem Tab öffnen",
      initialValue: false,
    }),
  ],
});
```

### Form Field (`field`)
**Formularfeld-Definition**

```typescript
export const field = defineType({
  name: "field",
  type: "object",
  title: "Formularfeld",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fieldType",
      type: "string",
      title: "Feldtyp",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Telefon", value: "tel" },
          { title: "Textarea", value: "textarea" },
          { title: "Checkbox", value: "checkbox" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placeholder",
      type: "string",
      title: "Placeholder",
    }),
    defineField({
      name: "required",
      type: "boolean",
      title: "Pflichtfeld",
      initialValue: false,
    }),
  ],
});
```

## 🎨 Common Fields

### SEO Fields
```typescript
export const seoFields = [
  defineField({
    name: "seoTitle",
    type: "string",
    title: "SEO Titel",
    group: GROUP.SEO,
  }),
  defineField({
    name: "seoDescription",
    type: "text",
    title: "SEO Beschreibung",
    group: GROUP.SEO,
    rows: 3,
  }),
  defineField({
    name: "seoNoIndex",
    type: "boolean",
    title: "Nicht indexieren",
    group: GROUP.SEO,
    initialValue: false,
  }),
  defineField({
    name: "seoHideFromLists",
    type: "boolean",
    title: "Aus Listen verstecken",
    group: GROUP.SEO,
    initialValue: false,
  }),
];
```

### Open Graph Fields
```typescript
export const ogFields = [
  defineField({
    name: "ogTitle",
    type: "string",
    title: "Open Graph Titel",
    group: GROUP.SOCIAL,
  }),
  defineField({
    name: "ogDescription",
    type: "text",
    title: "Open Graph Beschreibung",
    group: GROUP.SOCIAL,
    rows: 3,
  }),
  defineField({
    name: "ogImage",
    type: "image",
    title: "Open Graph Bild",
    group: GROUP.SOCIAL,
    options: { hotspot: true },
  }),
];
```

## 🔄 Schema Groups

```typescript
export const GROUPS = [
  { name: "mainContent", title: "Hauptinhalt" },
  { name: "seo", title: "SEO" },
  { name: "social", title: "Social Media" },
];

export const GROUP = {
  MAIN_CONTENT: "mainContent",
  SEO: "seo",
  SOCIAL: "social",
} as const;
```

## 🧪 Validation

### Slug Validation
```typescript
export const createSlugValidator = ({
  documentType,
  requiredPrefix,
  sanityDocumentType,
}: SlugValidatorConfig) => {
  return async (value: string, context: ValidationContext) => {
    if (!value) return "Slug ist erforderlich";
    
    if (requiredPrefix && !value.startsWith(requiredPrefix)) {
      return `Slug muss mit "${requiredPrefix}" beginnen`;
    }
    
    const { document, getClient } = context;
    const client = getClient({ apiVersion: "2025-02-10" });
    
    const existingDoc = await client.fetch(
      `*[_type == "${sanityDocumentType}" && slug.current == $slug && _id != $id][0]`,
      { slug: value, id: document?._id }
    );
    
    if (existingDoc) {
      return "Dieser Slug wird bereits verwendet";
    }
    
    return true;
  };
};
```

### Custom Validations
```typescript
// Email Validation
const emailValidation = (rule: Rule) => [
  rule.required().error("E-Mail ist erforderlich"),
  rule.custom((email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Ungültige E-Mail-Adresse";
  }),
];

// Phone Validation
const phoneValidation = (rule: Rule) => [
  rule.custom((phone) => {
    if (!phone) return true;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone) || "Ungültige Telefonnummer";
  }),
];
```

## 🚀 Schema Migration

### Migration Script
```typescript
// migrate-schema.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2025-02-10",
  useCdn: false,
});

async function migrateSchema() {
  // Schema-Migrationen hier implementieren
  console.log("Schema migration completed");
}

migrateSchema().catch(console.error);
```

### Type Generation
```bash
# TypeScript Types generieren
cd apps/studio
npx sanity typegen generate
```

## 📊 Schema Monitoring

### Schema Health Check
```typescript
// schema-health-check.ts
export async function checkSchemaHealth() {
  const issues = [];
  
  // Prüfe auf fehlende required Felder
  // Prüfe auf ungültige Referenzen
  // Prüfe auf Schema-Konflikte
  
  return issues;
}
```
