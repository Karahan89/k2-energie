# Page Builder System

Dokumentation des modularen Page Builder Systems für k2-energie.

## 🏗️ Übersicht

Das Page Builder System ermöglicht es Content-Managern, Seiten dynamisch aus wiederverwendbaren Blöcken zusammenzusetzen. Jeder Block ist eine eigenständige React-Komponente mit definiertem Schema.

## 📦 Verfügbare Blöcke

**Fokus**: Schlanke, professionelle Blöcke ohne Newsletter für maximale Klarheit

### Hero Block (`hero`)
**Hauptsektion mit optionaler Energie-Analyse-Card**

```typescript
interface HeroBlockProps {
  variant?: "full" | "simple";
  title: string;
  titleHighlights?: string[];
  richText: RichTextBlock[];
  buttons?: SanityButtonProps[];
  features?: string[];
  energyCard?: EnergyCardProps; // Nur bei variant="full"
  badge?: string;
}
```

**Features:**
- **Varianten**: `full` (mit Energie-Card) für Startseite, `simple` für Unterseiten
- Dynamische Titel-Hervorhebung
- Call-to-Action Buttons
- Energie-Analyse-Card mit CO₂-Daten (nur bei `full`)
- Responsive Design mit zentrierter Ausrichtung bei `simple`

### Feature Cards Icon (`featureCardsIcon`)
**Feature-Karten mit Icons**

```typescript
interface FeatureCardsIconProps {
  eyebrow?: string;
  title: string;
  richText: RichTextBlock[];
  cards: FeatureCardProps[];
}
```

**Features:**
- Konfigurierbare Anzahl von Karten
- Icon-Support
- Rich Text Content

### Image Link Cards (`imageLinkCards`)
**Bild-Link-Karten für Navigation**

```typescript
interface ImageLinkCardsProps {
  eyebrow?: string;
  title: string;
  richText: RichTextBlock[];
  cards: ImageLinkCardProps[];
  buttons?: SanityButtonProps[];
}
```

**Features:**
- Interne und externe Links
- Bild-Optimierung
- Hover-Effekte

### FAQ Accordion (`faqAccordion`)
**Häufige Fragen mit Akkordeon**

```typescript
interface FaqAccordionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  faqs: FaqReference[];
  link?: LinkProps;
}
```

**Features:**
- Referenzierte FAQ-Dokumente
- Smooth Accordion Animation
- SEO-optimiert

### Contact Form (`contactForm`)
**Mehrstufiges Kontaktformular**

```typescript
interface ContactFormProps {
  eyebrow?: string;
  title: string;
  intro?: RichTextBlock[];
  fields: FormFieldProps[];
  privacyNotice: RichTextBlock[];
  submitLabel: string;
  successMessage?: string;
}
```

**Features:**
- Konfigurierbare Formularfelder
- Validierung
- Privacy Notice
- Success/Error States

### Project Gallery (`projectGallery`)
**Referenzprojekte-Galerie**

```typescript
interface ProjectGalleryProps {
  title: string;
  intro?: RichTextBlock[];
  projects: ProjectReference[];
  buttons?: SanityButtonProps[];
}
```

**Features:**
- Projekt-Referenzen
- Filterbare Galerie
- Detailansicht

### CTA Block (`cta`)
**Call-to-Action Sektionen**

```typescript
interface CTAProps {
  eyebrow?: string;
  title: string;
  richText: RichTextBlock[];
  buttons: SanityButtonProps[];
}
```

**Features:**
- Mehrere Buttons
- Rich Text Content
- Flexible Styling


## 🔧 Technische Implementierung

### Page Builder Komponente
```typescript
export function PageBuilder({
  pageBuilder: initialBlocksProp,
  id,
  type,
}: PageBuilderProps) {
  const initialBlocks = initialBlocksProp ?? [];
  const blocks = useOptimisticPageBuilder(initialBlocks, id);
  const { renderBlock } = useBlockRenderer(id, type);

  return (
    <div data-sanity={containerDataAttribute}>
      {blocks.map(renderBlock)}
    </div>
  );
}
```

### Block Rendering
```typescript
function useBlockRenderer(id: string, type: string) {
  const renderBlock = useCallback((block: PageBuilderBlock) => {
    switch (block._type) {
      case "hero":
        return <HeroBlock {...block} />;
      case "featureCardsIcon":
        return <FeatureCardsWithIcon {...block} />;
      // ... weitere Blöcke
      default:
        return <UnknownBlockError blockType={block._type} />;
    }
  }, []);

  return { renderBlock };
}
```

### Sanity Integration
```typescript
// GROQ Query für Page Builder
const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    ...,
    _type,
    ${ctaBlock},
    ${heroBlock},
    ${faqAccordionBlock},
    ${featureCardsIconBlock},
    ${subscribeNewsletterBlock},
    ${imageLinkCardsBlock},
    ${contactFormBlock},
    ${projectGalleryBlock}
  }
`;
```

## 🎨 Styling & Design

### CSS Custom Properties
```css
:root {
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  
  --primary-strong: #1a1a1a;
  --primary-soft: #f5f5f5;
  --accent: #3b82f6;
  --secondary: #10b981;
}
```

### Responsive Design
```typescript
// Mobile-First Ansatz
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

### Dark Mode Support
```typescript
// CSS Custom Properties für Dark Mode
<div className="
  bg-surface-strong
  text-foreground
  dark:bg-surface-strong-dark
  dark:text-foreground-dark
">
  Content
</div>
```

## 🔄 State Management

### Optimistic Updates
```typescript
function useOptimisticPageBuilder(
  initialBlocks: PageBuilderBlock[],
  documentId: string,
) {
  return useOptimistic<PageBuilderBlock[], PageBuilderOptimisticAction>(
    initialBlocks,
    (currentBlocks, action) => {
      if (action?.id === documentId && action.document?.pageBuilder) {
        return action.document.pageBuilder;
      }
      return currentBlocks;
    },
  );
}
```

### Visual Editing
```typescript
// Sanity Visual Editing Integration
const dataAttribute = createDataAttribute({
  id,
  baseUrl: studioUrl,
  projectId,
  dataset,
  type,
  path: `pageBuilder[_key=="${blockKey}"]`,
});
```

## 📝 Content Management

### Schema Definition
```typescript
// Sanity Schema für Page Builder
export const pageBuilderField = defineField({
  name: "pageBuilder",
  type: "array",
  title: "Page Builder",
  of: [
    { type: "hero" },
    { type: "featureCardsIcon" },
    { type: "imageLinkCards" },
    { type: "faqAccordion" },
    { type: "contactForm" },
    { type: "projectGallery" },
    { type: "cta" },
    { type: "subscribeNewsletter" },
  ],
});
```

### Block Validation
```typescript
// Beispiel: Hero Block Validation
export const heroBlock = defineType({
  name: "hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "richText",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
```

## 🧪 Testing

### Unit Tests
```typescript
describe("PageBuilder", () => {
  it("renders all block types correctly", () => {
    const blocks = [
      { _type: "hero", title: "Test Hero" },
      { _type: "cta", title: "Test CTA" },
    ];
    
    render(<PageBuilder pageBuilder={blocks} id="test" type="page" />);
    
    expect(screen.getByText("Test Hero")).toBeInTheDocument();
    expect(screen.getByText("Test CTA")).toBeInTheDocument();
  });
});
```

### Integration Tests
```typescript
describe("PageBuilder Integration", () => {
  it("handles missing blocks gracefully", () => {
    render(<PageBuilder pageBuilder={[]} id="test" type="page" />);
    expect(screen.getByRole("main")).toBeEmptyDOMElement();
  });
});
```

## 🚀 Performance

### Code Splitting
```typescript
// Lazy Loading für große Komponenten
const ProjectGallery = lazy(() => import("./project-gallery"));
const ContactForm = lazy(() => import("./contact-form"));
```

### Memoization
```typescript
// Memoize teure Berechnungen
const processedBlocks = useMemo(() => {
  return blocks.map(processBlock);
}, [blocks]);
```

### Bundle Optimization
- Tree Shaking für ungenutzte Blöcke
- Dynamic Imports für große Komponenten
- Image Optimization für Bilder

## 🔧 Erweiterung

### Neuen Block hinzufügen
1. **Schema definieren** in `schemaTypes/blocks/`
2. **React Komponente** in `components/sections/`
3. **GROQ Fragment** in `lib/sanity/query.ts`
4. **Block Renderer** erweitern
5. **Tests** schreiben

### Beispiel: Neuer Block
```typescript
// 1. Schema
export const testimonialBlock = defineType({
  name: "testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

// 2. Komponente
export function TestimonialBlock({ quote, author }: TestimonialProps) {
  return (
    <blockquote className="testimonial">
      <p>"{quote}"</p>
      <cite>— {author}</cite>
    </blockquote>
  );
}

// 3. Renderer erweitern
case "testimonial":
  return <TestimonialBlock {...block} />;
```

## 📊 Monitoring

### Performance Tracking
- Core Web Vitals für jeden Block
- Bundle Size Monitoring
- Render Performance

### Error Tracking
- Block-spezifische Fehlerbehandlung
- Fallback für fehlende Blöcke
- User Feedback Integration
