# Code Standards

Richtlinien und Standards für die Code-Entwicklung im k2-energie Projekt.

## 🎯 Allgemeine Prinzipien

### Code Quality
- **Readability**: Code sollte selbsterklärend sein
- **Consistency**: Einheitliche Code-Struktur
- **Maintainability**: Einfach zu warten und zu erweitern
- **Performance**: Optimierte Performance

### TypeScript First
- Alle neuen Dateien in TypeScript
- Strikte Type-Checking aktiviert
- Explizite Typen statt `any`
- Interface-basierte Architektur

## 📁 Datei- und Ordnerstruktur

### Naming Conventions
```
components/
├── sections/           # Page Builder Sektionen
│   ├── hero.tsx
│   └── contact-form.tsx
├── elements/           # Wiederverwendbare Elemente
│   ├── rich-text.tsx
│   └── button.tsx
└── ui/                 # UI-spezifische Komponenten
    ├── navbar.tsx
    └── footer.tsx
```

### Dateinamen
- **Komponenten**: PascalCase (`HeroBlock.tsx`)
- **Hooks**: camelCase mit `use` Prefix (`useSlug.ts`)
- **Utilities**: camelCase (`helper.ts`)
- **Types**: PascalCase (`types.ts`)

## ⚛️ React Standards

### Komponenten-Struktur
```typescript
// 1. Imports (externe, interne, types)
import { Button } from "@workspace/ui/components/button";
import { RichText } from "../elements/rich-text";
import type { HeroBlockProps } from "@/types";

// 2. Types und Interfaces
interface CustomProps {
  title: string;
  description?: string;
}

// 3. Komponente
export function HeroBlock({ title, description }: HeroBlockProps) {
  // 4. Hooks
  const [isVisible, setIsVisible] = useState(false);
  
  // 5. Event Handlers
  const handleClick = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  // 6. Render
  return (
    <section className="hero-section">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
```

### Hooks Guidelines
- **Custom Hooks**: Immer mit `use` Prefix
- **Dependencies**: Vollständige Dependency Arrays
- **Memoization**: `useMemo` und `useCallback` bei Bedarf

```typescript
// ✅ Gut
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ❌ Schlecht
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, []); // Fehlende Dependencies
```

## 🎨 Styling Standards

### Tailwind CSS
- **Utility-First**: Tailwind Klassen bevorzugen
- **Custom Properties**: Für Design Tokens
- **Responsive**: Mobile-First Ansatz

```typescript
// ✅ Gut
<div className="flex flex-col gap-4 md:flex-row md:gap-8">
  <h1 className="text-2xl font-bold text-primary-strong">
    {title}
  </h1>
</div>

// ❌ Schlecht
<div style={{ display: 'flex', gap: '1rem' }}>
  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
    {title}
  </h1>
</div>
```

### CSS Custom Properties
```css
/* Design Tokens definieren */
:root {
  --primary-strong: #1a1a1a;
  --primary-soft: #f5f5f5;
  --accent: #3b82f6;
  --space-4: 1rem;
  --space-8: 2rem;
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

## 🏗️ Sanity Schema Standards

### Schema Definition
```typescript
// ✅ Gut
export const service = defineType({
  name: "service",
  type: "document",
  title: "Leistung",
  icon: SparklesIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => rule.required(),
    }),
    // ...
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => ({
      title: title || "Leistung",
      subtitle: slug || "slug fehlt",
    }),
  },
});
```

### Field Validation
```typescript
// Konsistente Validierung
validation: (rule) => [
  rule.required().error("Titel ist erforderlich"),
  rule.max(100).warning("Titel sollte unter 100 Zeichen bleiben"),
  rule.custom((value) => {
    if (value && value.includes("test")) {
      return "Test-Wörter sind nicht erlaubt";
    }
    return true;
  }),
]
```

## 📊 TypeScript Standards

### Type Definitions
```typescript
// ✅ Explizite Types
interface HeroBlockProps {
  readonly title: string;
  readonly description?: string;
  readonly buttons?: SanityButtonProps[];
}

// ✅ Generic Types
interface PageBuilderProps<T = PageBuilderBlock> {
  readonly pageBuilder?: T[];
  readonly id: string;
  readonly type: string;
}

// ❌ Vermeide any
function processData(data: any): any {
  // ...
}
```

### Import/Export
```typescript
// ✅ Named Exports bevorzugen
export function HeroBlock() { }
export const heroSchema = defineType({ });

// ✅ Type-only Imports
import type { HeroBlockProps } from "@/types";

// ✅ Re-exports
export { HeroBlock } from "./hero";
export type { HeroBlockProps } from "./types";
```

## 🧪 Testing Standards

### Test Structure
```typescript
// Komponenten Tests
describe("HeroBlock", () => {
  it("renders title correctly", () => {
    render(<HeroBlock title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("handles missing description gracefully", () => {
    render(<HeroBlock title="Test" />);
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});
```

### Test Naming
- **Describe**: Komponenten- oder Funktionsname
- **It**: Sollte-Verhalten beschreiben
- **Test Files**: `.test.tsx` oder `.spec.tsx`

## 📝 Dokumentation

### Code Comments
```typescript
/**
 * Hero-Komponente mit Energie-Analyse-Card
 * 
 * @param title - Haupttitel der Sektion
 * @param description - Optionale Beschreibung
 * @param energyCard - Konfiguration für Energie-Card
 */
export function HeroBlock({
  title,
  description,
  energyCard,
}: HeroBlockProps) {
  // Implementation...
}
```

### README Files
- Jede Komponente sollte dokumentiert sein
- Beispiele für Verwendung
- Props-Dokumentation

## 🔍 Code Review Checklist

### Vor dem Commit
- [ ] TypeScript Errors behoben
- [ ] ESLint Warnings behoben
- [ ] Tests geschrieben/aktualisiert
- [ ] Dokumentation aktualisiert
- [ ] Performance überprüft

### Code Review
- [ ] Code ist lesbar und verständlich
- [ ] Keine Code-Duplikation
- [ ] Proper Error Handling
- [ ] Accessibility berücksichtigt
- [ ] Mobile Responsiveness

## 🚀 Performance Standards

### Bundle Size
- Komponenten sollten < 50KB sein
- Lazy Loading für große Komponenten
- Tree Shaking optimiert

### Runtime Performance
- `useMemo` für teure Berechnungen
- `useCallback` für Event Handler
- Vermeide unnötige Re-Renders

```typescript
// ✅ Performance optimiert
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

## 🔒 Sicherheitsstandards

### Input Validation
```typescript
// Sanitize User Input
const sanitizedTitle = title?.trim() || "";
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

### Environment Variables
```typescript
// ✅ Sichere Environment Variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID");
}
```

## 📋 Git Standards

### Commit Messages
```
feat: neue Hero-Komponente mit Energie-Card
fix: Sanity Query Performance verbessert
docs: README für Page Builder aktualisiert
style: Code Formatting nach Prettier
refactor: Hero-Komponente in kleinere Teile aufgeteilt
test: Unit Tests für Hero-Komponente hinzugefügt
chore: Dependencies aktualisiert
```

### Branch Naming
- `feature/hero-component`
- `fix/sanity-query-performance`
- `docs/page-builder-readme`
- `refactor/hero-component-split`
