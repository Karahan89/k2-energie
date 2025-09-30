# Environment Variables

Übersicht aller Environment Variables für das k2-energie Projekt.

## 🔧 Lokale Entwicklung

### .env.local (Root-Verzeichnis)
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
SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000
```

### .env.example
```env
# Kopieren Sie diese Datei zu .env.local und füllen Sie die Werte aus

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

# Sanity Studio (für Development)
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000

# Optional: Sanity Tokens (für Scripts)
SANITY_WRITE_TOKEN=your_write_token
SANITY_API_TOKEN=your_api_token
```

## 🚀 Production Environment

### Vercel Environment Variables
```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=https://k2-energie.sanity.studio

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=k2-energie.de
```

### Sanity Studio Environment Variables
```env
# Sanity Studio Configuration
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=https://k2-energie.de
SANITY_STUDIO_PRODUCTION_HOSTNAME=k2-energie

# Sanity Deploy Token
SANITY_DEPLOY_TOKEN=your_deploy_token
```

## 🔐 GitHub Secrets

### Für GitHub Actions
```bash
# Sanity Configuration
SANITY_DEPLOY_TOKEN=your_deploy_token
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=k2-energie Studio
SANITY_STUDIO_PRESENTATION_URL=https://k2-energie.de
SANITY_STUDIO_PRODUCTION_HOSTNAME=k2-energie

# Vercel Configuration (falls verwendet)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 📊 Environment-spezifische Konfiguration

### Development
```typescript
// config/development.ts
export const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-10',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
    useCdn: false, // Immer false für Development
  },
  app: {
    url: 'http://localhost:3000',
    environment: 'development',
  },
};
```

### Production
```typescript
// config/production.ts
export const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-10',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    useCdn: true, // CDN für Production
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://k2-energie.de',
    environment: 'production',
  },
};
```

## 🔧 Environment Validation

### Validation Schema
```typescript
// lib/env-validation.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string().url(),
  SANITY_STUDIO_PROJECT_ID: z.string().min(1),
  SANITY_STUDIO_DATASET: z.string().min(1),
  SANITY_STUDIO_TITLE: z.string().min(1),
});

export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}
```

### Environment Check Script
```typescript
// scripts/check-env.ts
import { validateEnv } from '../lib/env-validation';

function checkEnvironment() {
  console.log('🔍 Checking environment variables...');
  
  const env = validateEnv();
  
  console.log('✅ Environment variables valid:');
  console.log(`  - Sanity Project ID: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`  - Sanity Dataset: ${env.NEXT_PUBLIC_SANITY_DATASET}`);
  console.log(`  - Studio URL: ${env.NEXT_PUBLIC_SANITY_STUDIO_URL}`);
  
  return env;
}

checkEnvironment();
```

## 🚨 Troubleshooting

### Häufige Probleme

#### Environment Variables nicht geladen
```bash
# .env.local prüfen
cat .env.local

# Environment Variables anzeigen
node -e "console.log(process.env)"
```

#### Sanity Connection Issues
```bash
# Sanity Client testen
node -e "
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
client.fetch('*[_type == \"homePage\"][0]').then(console.log);
"
```

#### Build Failures
```bash
# Environment Variables prüfen
pnpm run check-env

# Build mit Debug
DEBUG=* pnpm run build
```

### Debug Commands
```bash
# Alle Environment Variables anzeigen
env | grep SANITY

# Spezifische Variable prüfen
echo $NEXT_PUBLIC_SANITY_PROJECT_ID

# Sanity Debug
npx sanity debug --secrets
```

## 🔒 Security Best Practices

### Sensitive Data
- **Niemals** Environment Variables in Git committen
- **Niemals** .env Dateien in Repository
- **Immer** .env.example für Template verwenden
- **Regelmäßig** Tokens rotieren

### Token Management
```bash
# Token Rotation
# 1. Neuen Token erstellen
# 2. Alten Token deaktivieren
# 3. Environment Variables aktualisieren
# 4. Deployment testen
```

### Access Control
- **Minimale Berechtigungen** für Tokens
- **Separate Tokens** für Development/Production
- **Regelmäßige Audit** der Berechtigungen

## 📋 Environment Checklist

### Development Setup
- [ ] `.env.local` erstellt
- [ ] Alle erforderlichen Variablen gesetzt
- [ ] Sanity Connection funktioniert
- [ ] Studio startet ohne Fehler
- [ ] Web App lädt korrekt

### Production Setup
- [ ] Vercel Environment Variables konfiguriert
- [ ] Sanity Studio Environment Variables gesetzt
- [ ] GitHub Secrets konfiguriert
- [ ] Deployment erfolgreich
- [ ] Alle Features funktionieren

### Security Review
- [ ] Keine sensiblen Daten in Git
- [ ] Tokens haben minimale Berechtigungen
- [ ] Regelmäßige Token-Rotation geplant
- [ ] Access Logs überwacht

## 🔄 Environment Migration

### Von Development zu Production
```bash
# 1. Environment Variables exportieren
vercel env pull .env.production

# 2. Prüfen und anpassen
cat .env.production

# 3. Deployen
vercel --prod
```

### Environment Reset
```bash
# Alle Environment Variables zurücksetzen
rm .env.local
cp .env.example .env.local

# Neue Werte eintragen
nano .env.local
```

## 📚 Nützliche Ressourcen

### Sanity Documentation
- [Environment Variables](https://www.sanity.io/docs/environment-variables)
- [API Configuration](https://www.sanity.io/docs/api-versioning)
- [Studio Configuration](https://www.sanity.io/docs/sanity-studio-configuration)

### Next.js Documentation
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration)

### Vercel Documentation
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Secrets Management](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)
