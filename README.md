# k2-energie

**Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und klimaneutrale Quartiersentwicklung**

Ein modernes, full-stack Monorepo mit Next.js App Router, Sanity CMS, Shadcn UI und Turborepo.

## 🚀 Quick Start

```bash
# Repository klonen
git clone <repository-url>
cd k2-energie-1

# Dependencies installieren
pnpm install

# Development Server starten
pnpm run dev
```

**Verfügbare URLs:**
- **Web App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📚 Dokumentation

Die vollständige Dokumentation finden Sie im [`docs/`](./docs/) Verzeichnis:

- **[Getting Started](./docs/getting-started.md)** - Schnellstart-Anleitung
- **[Projektarchitektur](./docs/architecture.md)** - Technische Übersicht
- **[Development](./docs/development/)** - Entwicklungsumgebung und Code-Standards
- **[Content Management](./docs/content/)** - Sanity Studio und Content-Strategie
- **[Deployment](./docs/deployment/)** - Deployment-Anleitungen

## 🏗️ Projektstruktur

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

## 🎯 Über k2-energie

**k2-energie** ist ein Ingenieurbüro für Energieberatung mit Sitz in Lengede, das sich auf folgende Bereiche spezialisiert hat:

- **Energieberatung** (BAFA-konform)
- **Sanierungsfahrpläne** (iSFP)
- **Fördermanagement** für BAFA, KfW und regionale Programme
- **Zielgruppen**: Wohnungswirtschaft, Kommunen, Gewerbe & Industrie

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio v3 mit Visual Editing
- **UI**: Shadcn UI Komponenten
- **Build**: Turborepo für optimierte Builds
- **Styling**: CSS Custom Properties, responsive Design

## 🚀 Features

### Monorepo Structure
- Apps: web (Next.js frontend) und studio (Sanity Studio)
- Shared packages: UI components, TypeScript config, ESLint config
- Turborepo für Build-Orchestrierung und Caching

### Frontend (Web)
- Next.js App Router mit TypeScript
- Shadcn UI components mit Tailwind CSS
- Server Components und Server Actions
- SEO-Optimierung mit Metadaten
- Page Builder System für dynamische Inhalte
- Responsive Layouts
- **Schlanke Struktur** ohne Blog oder Newsletter für maximale Klarheit

### Content Management (Studio)
- Sanity Studio v3
- Custom document types (Services, Projects, Pages)
- Visual editing integration
- Strukturierte Inhalte mit Schemas
- Live preview capabilities
- Asset management

## 📦 Verfügbare Scripts

```bash
# Development
pnpm run dev          # Startet beide Apps
pnpm run build        # Baut beide Apps
pnpm run lint         # Lintet alle Apps
pnpm run check-types  # TypeScript Check

# Sanity Studio
cd apps/studio
npx sanity start      # Nur Studio starten
npx sanity deploy     # Studio deployen
npx sanity exec       # Scripts ausführen

# Web App
cd apps/web
pnpm run dev          # Nur Web App starten
pnpm run build        # Nur Web App bauen
```

## 🔧 Environment Setup

Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

# Sanity Studio (für Development)
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
```

## 📝 Content erstellen

### Seed Data laden
```bash
cd apps/studio
npx sanity exec scripts/seed-energy-consulting.ts --with-user-token
```

### Content bearbeiten
1. Öffnen Sie das Sanity Studio (http://localhost:3333)
2. Erstellen Sie Ihre erste Homepage
3. Fügen Sie Services und Projekte hinzu
4. Nutzen Sie das Visual Editing für Live-Updates

## 🚀 Deployment

### Sanity Studio
- **Automatisch**: GitHub Actions bei Push auf `main`
- **Manuell**: `npx sanity deploy` im `apps/studio` Verzeichnis

### Next.js App
- **Vercel** (empfohlen): Automatisches Deployment
- **Netlify**: Mit `netlify.toml` Konfiguration
- **Eigener Server**: Docker-basiertes Deployment

Detaillierte Anleitungen finden Sie in der [Deployment-Dokumentation](./docs/deployment/).

## 🤝 Contributing

Wir freuen uns über Beiträge! Bitte lesen Sie unsere [Contributing Guidelines](./docs/legal/contributing.md) und den [Code of Conduct](./docs/legal/code-of-conduct.md).

## 📞 Support

- **E-Mail**: hallo@k2-energie.de
- **Telefon**: +49 5344 984 92 10
- **Bürozeiten**: Mo-Do 8-17 Uhr, Fr 8-15 Uhr

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](./LICENSE) für Details.

## 🔗 Links

- **Website**: https://k2-energie.de
- **Sanity Studio**: https://k2-energie.sanity.studio
- **Dokumentation**: [docs/](./docs/)

---

*Entwickelt mit ❤️ für nachhaltige Energieberatung*