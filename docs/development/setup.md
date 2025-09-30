# Development Setup

Detaillierte Anleitung für die Entwicklungsumgebung.

## 🛠️ Entwicklungsumgebung

### Voraussetzungen
- **Node.js**: Version 20+ (empfohlen: LTS)
- **pnpm**: Version 8+ (Package Manager)
- **Git**: Für Versionskontrolle
- **VS Code**: Empfohlener Editor

### VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "sanity-io.vscode-sanity",
    "ms-vscode.vscode-eslint"
  ]
}
```

## 📦 Installation

### 1. Repository Setup
```bash
# Repository klonen
git clone <repository-url>
cd k2-energie-1

# Dependencies installieren
pnpm install
```

### 2. Environment Variables
```bash
# .env.local erstellen
cp .env.example .env.local
```

**Erforderliche Variablen:**
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

### 3. Sanity Studio Setup
```bash
cd apps/studio

# Bei Sanity anmelden
npx sanity login

# Studio initialisieren (falls noch nicht geschehen)
npx sanity init
```

## 🚀 Development Server

### Alle Apps starten
```bash
# Startet Web App + Studio parallel
pnpm run dev
```

**Verfügbare URLs:**
- **Web App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

### Einzelne Apps starten
```bash
# Nur Web App
cd apps/web
pnpm run dev

# Nur Studio
cd apps/studio
npx sanity start
```

## 🧪 Testing & Quality

### Linting
```bash
# Alle Apps linten
pnpm run lint

# Nur Web App
cd apps/web
pnpm run lint

# Auto-fix
pnpm run lint:fix
```

### Type Checking
```bash
# TypeScript Check für alle Apps
pnpm run check-types

# Nur Web App
cd apps/web
pnpm run typecheck
```

### Code Formatting
```bash
# Prettier für alle Dateien
pnpm run format

# Format Check
cd apps/web
pnpm run format:check
```

## 📝 Content Development

### Seed Data laden
```bash
cd apps/studio
npx sanity exec scripts/seed-energy-consulting.ts --with-user-token
```

### Content Migration
```bash
# Demo-Content migrieren
pnpm run migrate
```

### Sanity Studio Commands
```bash
cd apps/studio

# Studio starten
npx sanity start

# Studio deployen
npx sanity deploy

# Schema validieren
npx sanity schema extract

# TypeScript Types generieren
npx sanity typegen generate
```

## 🔧 Development Tools

### Turborepo Dashboard
```bash
# Turborepo Dashboard öffnen
pnpm run dev -- --ui
```

### Bundle Analysis
```bash
cd apps/web
pnpm run build
pnpm run analyze
```

### Sanity Vision
- Öffne Sanity Studio
- Gehe zu "Vision" Tab
- Führe GROQ Queries aus

## 🐛 Debugging

### Web App Debugging
```bash
# Debug Mode
cd apps/web
NODE_OPTIONS='--inspect' pnpm run dev

# Oder mit Turborepo
NODE_OPTIONS='--inspect' pnpm run dev --filter=web
```

### Sanity Studio Debugging
```bash
cd apps/studio
DEBUG=sanity:* npx sanity start
```

### Common Issues

**Port bereits belegt:**
```bash
# Ports prüfen
lsof -i :3000
lsof -i :3333

# Prozesse beenden
kill -9 <PID>
```

**Sanity Login Probleme:**
```bash
# Token zurücksetzen
npx sanity logout
npx sanity login
```

**Dependencies Probleme:**
```bash
# Clean Install
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install
```

**TypeScript Errors:**
```bash
# Types neu generieren
cd apps/studio
npx sanity typegen generate

cd apps/web
pnpm run typecheck
```

## 📊 Performance Monitoring

### Web Vitals
- Öffne Chrome DevTools
- Gehe zu "Lighthouse" Tab
- Führe Performance Audit durch

### Bundle Size
```bash
cd apps/web
pnpm run build
# Bundle Size wird in der Konsole angezeigt
```

### Sanity Performance
- Nutze Sanity Vision für Query-Performance
- Überwache API Calls im Network Tab

## 🔄 Git Workflow

### Branch Strategy
```bash
# Feature Branch erstellen
git checkout -b feature/neue-funktion

# Commits erstellen
git add .
git commit -m "feat: neue Funktion hinzugefügt"

# Push und Pull Request
git push origin feature/neue-funktion
```

### Commit Convention
- `feat:` Neue Features
- `fix:` Bug Fixes
- `docs:` Dokumentation
- `style:` Code Formatting
- `refactor:` Code Refactoring
- `test:` Tests
- `chore:` Maintenance

## 📚 Nützliche Ressourcen

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
