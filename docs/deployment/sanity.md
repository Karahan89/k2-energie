# Sanity Studio Deployment

Anleitung für das Deployment des Sanity Studios.

## 🚀 Deployment-Übersicht

Das Sanity Studio wird automatisch über GitHub Actions deployed oder kann manuell deployed werden.

### Deployment-URLs
- **Production**: https://k2-energie.sanity.studio
- **Preview**: https://[branch]-k2-energie.sanity.studio

## 🔧 Automatisches Deployment

### GitHub Actions Workflow
Das Studio wird automatisch deployed bei:
- **Push** auf `main` Branch → Production
- **Pull Request** → Preview Deployment

### Workflow-Datei
```yaml
# .github/workflows/deploy-sanity.yml
name: Deploy Sanity Studio

on:
  push:
    branches: [main]
    paths: ['apps/studio/**']
  pull_request:
    branches: [main]
    paths: ['apps/studio/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Deploy Studio
        run: |
          cd apps/studio
          npx sanity deploy
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_DEPLOY_TOKEN }}
```

### Erforderliche Secrets
Folgende Secrets müssen in GitHub konfiguriert werden:

```bash
SANITY_DEPLOY_TOKEN=your_deploy_token
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=https://k2-energie.de
SANITY_STUDIO_PRODUCTION_HOSTNAME=k2-energie
```

## 🛠️ Manuelles Deployment

### Voraussetzungen
```bash
# Sanity CLI installieren
npm install -g @sanity/cli

# Bei Sanity anmelden
npx sanity login
```

### Studio deployen
```bash
# In das Studio-Verzeichnis wechseln
cd apps/studio

# Studio deployen
npx sanity deploy

# Mit spezifischem Hostname
npx sanity deploy --hostname k2-energie
```

### Deployment-Optionen
```bash
# Production Deployment
npx sanity deploy --production

# Preview Deployment
npx sanity deploy --preview

# Mit Custom Hostname
npx sanity deploy --hostname custom-name

# Force Deployment (überschreibt bestehende)
npx sanity deploy --force
```

## 🔐 Environment Variables

### Lokale Entwicklung
```bash
# .env.local
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000
```

### Production
```bash
# GitHub Secrets
SANITY_DEPLOY_TOKEN=your_deploy_token
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=https://k2-energie.de
SANITY_STUDIO_PRODUCTION_HOSTNAME=k2-energie
```

## 📊 Deployment-Monitoring

### Deployment-Status prüfen
```bash
# Status des letzten Deployments
npx sanity projects list

# Studio-URLs anzeigen
npx sanity projects list --json
```

### Logs anzeigen
```bash
# Deployment-Logs
npx sanity logs

# Mit Filter
npx sanity logs --level error
```

## 🔄 Rollback

### Vorherige Version wiederherstellen
```bash
# Verfügbare Versionen anzeigen
npx sanity projects list

# Spezifische Version deployen
npx sanity deploy --version [version-id]
```

### Emergency Rollback
```bash
# Lokale Version deployen
cd apps/studio
npx sanity deploy --force
```

## 🚨 Troubleshooting

### Häufige Probleme

#### Deployment schlägt fehl
```bash
# Token prüfen
npx sanity debug --secrets

# Login erneuern
npx sanity logout
npx sanity login
```

#### Studio lädt nicht
- **URL prüfen**: Korrekte Studio-URL
- **DNS prüfen**: DNS-Propagation abwarten
- **Cache leeren**: Browser-Cache löschen

#### Permission Errors
```bash
# Berechtigungen prüfen
npx sanity projects list

# Token erneuern
npx sanity logout
npx sanity login
```

### Debug-Modus
```bash
# Debug-Informationen
npx sanity debug

# Detaillierte Logs
DEBUG=sanity:* npx sanity deploy
```

## 🔧 Konfiguration

### Studio-Konfiguration
```typescript
// sanity.config.ts
export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [
    presentationTool({
      resolve: { locations },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PRESENTATION_URL,
        previewMode: {
          enable: "/api/presentation-draft",
        },
      },
    }),
    // ... weitere Plugins
  ],
});
```

### Build-Konfiguration
```json
// package.json
{
  "scripts": {
    "build": "sanity build",
    "deploy": "sanity deploy",
    "dev": "sanity dev"
  }
}
```

## 📈 Performance-Optimierung

### Build-Optimierung
```bash
# Production Build
npm run build

# Bundle-Analyse
npm run build -- --analyze
```

### CDN-Konfiguration
- **Sanity CDN**: Automatisch aktiviert
- **Custom CDN**: Optional konfigurierbar
- **Caching**: Optimiert für statische Assets

## 🔒 Sicherheit

### Access Control
```typescript
// studio.config.ts
export default defineConfig({
  // ... andere Konfiguration
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      // Zugriffskontrolle für neue Dokumente
      return prev;
    },
  },
});
```

### API-Sicherheit
- **CORS**: Konfiguriert für erlaubte Domains
- **Rate Limiting**: Schutz vor Missbrauch
- **Authentication**: Sanity Auth für Benutzer

## 📱 Mobile Deployment

### Responsive Studio
- **Mobile-optimiert**: Touch-Interface
- **Progressive Web App**: PWA-Features
- **Offline-Fähigkeit**: Begrenzte Offline-Nutzung

### Mobile Testing
```bash
# Mobile Preview
npx sanity dev --host 0.0.0.0

# Auf Mobile-Gerät testen
# http://[your-ip]:3333
```

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
# Automatisches Deployment bei Push
name: Deploy Studio
on:
  push:
    branches: [main]
    paths: ['apps/studio/**']
```

### Custom CI/CD
```bash
# Custom Deployment Script
#!/bin/bash
set -e

echo "Building Studio..."
cd apps/studio
npm run build

echo "Deploying Studio..."
npx sanity deploy --production

echo "Deployment completed!"
```

## 📊 Monitoring & Analytics

### Studio-Metriken
- **Deployment-Zeit**: Build- und Deploy-Dauer
- **Error-Rate**: Fehlerhäufigkeit
- **Performance**: Ladezeiten und Responsiveness

### User Analytics
- **Benutzer-Aktivität**: Login und Nutzung
- **Content-Änderungen**: Häufigkeit der Bearbeitungen
- **Performance**: Studio-Responsiveness

## 🎯 Best Practices

### Deployment-Workflow
1. **Lokale Tests**: Studio lokal testen
2. **Staging**: Preview-Deployment testen
3. **Production**: Nur getestete Versionen deployen
4. **Monitoring**: Nach Deployment überwachen

### Version Control
- **Git Tags**: Wichtige Versionen markieren
- **Changelog**: Änderungen dokumentieren
- **Rollback-Plan**: Notfall-Wiederherstellung

### Security
- **Token-Rotation**: Regelmäßige Token-Erneuerung
- **Access Review**: Benutzer-Berechtigungen prüfen
- **Audit Logs**: Aktivitäten protokollieren
