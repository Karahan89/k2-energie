# Projektarchitektur

Übersicht über die technische Architektur des k2-energie Projekts.

## 🏗️ Monorepo-Struktur

```
k2-energie-1/
├── apps/
│   ├── web/                 # Next.js Frontend
│   └── studio/              # Sanity CMS Studio
├── packages/
│   ├── ui/                  # Shared UI Components
│   ├── typescript-config/   # TypeScript Konfiguration
│   └── eslint-config/       # ESLint Konfiguration
├── docs/                    # Zentrale Dokumentation
└── turbo.json              # Turborepo Konfiguration
```

## 🎯 Apps

### Web App (`apps/web`)
**Next.js 15 Frontend mit App Router**

- **Framework**: Next.js 15, React 19
- **Styling**: Tailwind CSS, CSS Custom Properties
- **UI**: Shadcn UI Komponenten
- **CMS Integration**: Sanity Client, Visual Editing
- **Features**: SSR, ISR, SEO-optimiert

**Wichtige Verzeichnisse:**
- `src/app/` - App Router Seiten
- `src/components/` - React Komponenten
- `src/lib/` - Utilities und Sanity Integration
- `src/hooks/` - Custom React Hooks

### Studio App (`apps/studio`)
**Sanity CMS v3 mit Visual Editing**

- **Framework**: Sanity Studio v3
- **Schema**: TypeScript-definierte Content-Schemas
- **Features**: Visual Editing, Live Preview, Asset Management

**Wichtige Verzeichnisse:**
- `schemaTypes/` - Content-Schema Definitionen
- `components/` - Custom Studio Komponenten
- `scripts/` - Migration und Seed Scripts
- `utils/` - Helper Functions

## 📦 Shared Packages

### UI Package (`packages/ui`)
**Wiederverwendbare UI-Komponenten**

- Shadcn UI Komponenten
- Custom Design System
- TypeScript Support

### TypeScript Config (`packages/typescript-config`)
**Geteilte TypeScript-Konfiguration**

- Base Konfiguration
- Next.js spezifische Einstellungen
- React Library Konfiguration

### ESLint Config (`packages/eslint-config`)
**Geteilte Linting-Regeln**

- Base ESLint Regeln
- Next.js spezifische Regeln
- React-spezifische Regeln

## 🔄 Build System

### Turborepo
**Monorepo Build Orchestrierung**

- **Caching**: Intelligentes Caching zwischen Builds
- **Parallelisierung**: Parallele Ausführung von Tasks
- **Dependencies**: Automatische Abhängigkeitsauflösung

**Konfiguration:**
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".sanity/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 🎨 Design System

### CSS Custom Properties
**Konsistente Design-Tokens**

```css
:root {
  --primary-strong: #1a1a1a;
  --primary-soft: #f5f5f5;
  --accent: #3b82f6;
  --secondary: #10b981;
  --surface-strong: #ffffff;
  --surface-subtle: #f8fafc;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
}
```

### Responsive Design
- Mobile-First Ansatz
- Breakpoints: sm, md, lg, xl
- Fluid Typography mit CSS Custom Properties

## 📊 Content Management

### Sanity Schema
**TypeScript-definierte Content-Struktur**

**Hauptdokumenttypen:**
- `homePage` - Startseite
- `service` - Leistungen
- `project` - Referenzprojekte
- `companyPage` - Unternehmensseite
- `contactPage` - Kontaktseite
- `faq` - Häufige Fragen
- `legalPage` - Rechtliche Seiten

**Fokus**: Schlanke, professionelle Struktur ohne Blog oder Newsletter für maximale Klarheit

### Page Builder System
**Modulares Content-System**

**Verfügbare Blöcke:**
- `hero` - Hero-Sektion mit Varianten (full mit Energie-Card für Startseite, simple für Unterseiten)
- `featureCardsIcon` - Feature-Karten mit Icons
- `imageLinkCards` - Bild-Link-Karten
- `faqAccordion` - FAQ-Akkordeon
- `contactForm` - Kontaktformular
- `projectGallery` - Projektgalerie
- `cta` - Call-to-Action Blöcke

**Fokus**: Kernfunktionen ohne Newsletter für schlanke, professionelle Präsentation

## 🔌 Integrationen

### Sanity Integration
- **Client**: `@sanity/client` für Datenabfragen
- **Visual Editing**: `@sanity/visual-editing` für Live-Preview
- **Image URL**: `@sanity/image-url` für optimierte Bilder
- **Asset Utils**: `@sanity/asset-utils` für Asset-Verarbeitung

### Next.js Features
- **App Router**: Moderne Routing-Architektur
- **Server Components**: Server-seitiges Rendering
- **Metadata API**: Automatische SEO-Metadaten
- **Image Optimization**: Automatische Bildoptimierung

## 🚀 Performance

### Optimierungen
- **Code Splitting**: Automatische Code-Aufteilung
- **Image Optimization**: Next.js Image-Komponente
- **Caching**: Turborepo Build-Caching
- **Bundle Analysis**: Automatische Bundle-Analyse

### Monitoring
- **Core Web Vitals**: Automatische Überwachung
- **Error Tracking**: Fehlerbehandlung
- **Analytics**: Nutzungsstatistiken

## 🔒 Sicherheit

### Content Security
- **Sanity Tokens**: Sichere API-Zugriffe
- **Environment Variables**: Sichere Konfiguration
- **CORS**: Cross-Origin Resource Sharing

### Code Security
- **ESLint Security**: Automatische Sicherheitsprüfungen
- **Dependency Scanning**: Automatische Abhängigkeitsprüfung
- **Type Safety**: TypeScript für Typsicherheit

## 📈 Skalierbarkeit

### Monorepo Vorteile
- **Code Sharing**: Geteilte Komponenten und Utilities
- **Consistent Tooling**: Einheitliche Entwicklungstools
- **Atomic Changes**: Atomare Änderungen über Apps hinweg

### Content Skalierung
- **Schema Evolution**: Flexible Content-Schemas
- **Multi-Language**: Vorbereitet für Mehrsprachigkeit
- **Custom Fields**: Erweiterbare Feldtypen
