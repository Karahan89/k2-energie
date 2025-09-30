# Getting Started

Schnellstart-Anleitung für die k2-energie Entwicklungsumgebung.

## 🚀 Voraussetzungen

- **Node.js**: Version 20 oder höher
- **pnpm**: Package Manager (empfohlen)
- **Git**: Für Versionskontrolle

## 📦 Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd k2-energie-1
   ```

2. **Dependencies installieren**
   ```bash
   pnpm install
   ```

3. **Environment Variables konfigurieren**
   ```bash
   # Kopiere die Beispiel-Umgebungsvariablen
   cp .env.example .env.local
   ```

4. **Sanity Studio konfigurieren**
   ```bash
   cd apps/studio
   npx sanity login
   npx sanity init
   ```

## 🏃‍♂️ Entwicklung starten

```bash
# Startet beide Apps parallel (Web + Studio)
pnpm run dev
```

**Verfügbare URLs:**
- **Web App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📝 Erste Schritte

### 1. Content erstellen
1. Öffne das Sanity Studio (http://localhost:3333)
2. Erstelle deine erste Homepage
3. Füge Services und Projekte hinzu

### 2. Seed Data laden
```bash
cd apps/studio
npx sanity exec scripts/seed-energy-consulting.ts --with-user-token
```

### 3. Content bearbeiten
- Nutze das Visual Editing im Studio
- Ändere Inhalte und sehe Live-Updates in der Web App

## 🛠️ Nützliche Befehle

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

## 🔧 Troubleshooting

### Häufige Probleme

**Port bereits belegt:**
```bash
# Prüfe welche Prozesse die Ports verwenden
lsof -i :3000
lsof -i :3333

# Beende die Prozesse oder ändere die Ports
```

**Sanity Login Probleme:**
```bash
# Logge dich neu ein
npx sanity logout
npx sanity login
```

**Dependencies Probleme:**
```bash
# Lösche node_modules und installiere neu
rm -rf node_modules
rm -rf apps/*/node_modules
pnpm install
```

## 📚 Nächste Schritte

- [Projektarchitektur verstehen](./architecture.md)
- [Development Setup](./development/setup.md)
- [Content Management](./content/sanity-studio.md)
