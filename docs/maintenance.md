# Wartung

Anleitungen für Updates, Backups und allgemeine Wartung des k2-energie Projekts.

## 🔄 Regelmäßige Wartung

### Wöchentlich
- [ ] **Dependencies prüfen**: `pnpm outdated`
- [ ] **Security Updates**: `pnpm audit`
- [ ] **Performance Monitoring**: Core Web Vitals prüfen
- [ ] **Error Logs**: Sanity und Next.js Logs überprüfen

### Monatlich
- [ ] **Dependencies aktualisieren**: Major Updates prüfen
- [ ] **Backup erstellen**: Sanity Dataset exportieren
- [ ] **Performance Review**: Bundle Size und Ladezeiten
- [ ] **Content Review**: SEO und Content-Qualität

### Quartalsweise
- [ ] **Security Audit**: Vollständige Sicherheitsprüfung
- [ ] **Performance Optimization**: Code und Assets optimieren
- [ ] **Documentation Update**: Docs auf Aktualität prüfen
- [ ] **User Feedback**: Feedback sammeln und auswerten

## 📦 Dependencies Updates

### Automatische Updates
```bash
# Dependencies prüfen
pnpm outdated

# Security Updates
pnpm audit

# Automatische Updates (vorsichtig!)
pnpm update
```

### Manuelle Updates
```bash
# Spezifische Package aktualisieren
pnpm update @sanity/client

# Major Updates prüfen
pnpm update --latest

# Lockfile aktualisieren
pnpm install
```

### Update-Strategie
1. **Patch Updates**: Sofort installieren
2. **Minor Updates**: Innerhalb von 2 Wochen
3. **Major Updates**: Nach Tests und Dokumentation

## 💾 Backup-Strategie

### Sanity Dataset Backup
```bash
# Vollständiges Dataset exportieren
cd apps/studio
npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# Spezifische Dokumenttypen exportieren
npx sanity exec scripts/export-content.ts --with-user-token
```

### Code Backup
```bash
# Git Repository sichern
git push origin main

# Lokales Backup erstellen
tar -czf k2-energie-backup-$(date +%Y%m%d).tar.gz .
```

### Automatische Backups
```yaml
# .github/workflows/backup.yml
name: Weekly Backup
on:
  schedule:
    - cron: '0 2 * * 0'  # Jeden Sonntag um 2 Uhr

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Export Sanity Dataset
        run: |
          cd apps/studio
          npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

## 🔧 Performance Monitoring

### Core Web Vitals
```bash
# Lighthouse CI
npx lighthouse-ci autorun

# Web Vitals prüfen
npx web-vitals
```

### Bundle Analysis
```bash
# Bundle Size analysieren
cd apps/web
pnpm run build
npx @next/bundle-analyzer
```

### Sanity Performance
```bash
# Query Performance prüfen
cd apps/studio
npx sanity vision

# API Calls überwachen
npx sanity debug --api
```

## 🚨 Error Monitoring

### Next.js Errors
```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context?: any) {
  // Error Tracking Service Integration
  console.error('Error:', error, context);
  
  // Optional: Sentry, LogRocket, etc.
  // Sentry.captureException(error, { extra: context });
}
```

### Sanity Errors
```bash
# Sanity Logs anzeigen
npx sanity logs

# Debug Mode
DEBUG=sanity:* npx sanity start
```

### Monitoring Setup
```typescript
// next.config.ts
const nextConfig = {
  // Error Tracking
  onError: (error) => {
    console.error('Next.js Error:', error);
  },
  
  // Performance Monitoring
  experimental: {
    instrumentationHook: true,
  },
};
```

## 🔒 Security Updates

### Security Audit
```bash
# Vulnerabilities prüfen
pnpm audit

# Automatische Fixes
pnpm audit --fix

# Detaillierte Analyse
pnpm audit --audit-level moderate
```

### Dependencies Security
```bash
# Security Updates
pnpm update --audit

# Spezifische Vulnerabilities
pnpm audit --audit-level high
```

### Environment Security
```bash
# Environment Variables prüfen
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_STUDIO_PROJECT_ID

# Secrets Rotation
# Regelmäßige Token-Erneuerung
```

## 📊 Analytics & Monitoring

### Web Analytics
```typescript
// lib/analytics.ts
export function trackPageView(url: string) {
  // Google Analytics, Plausible, etc.
  console.log('Page view:', url);
}

export function trackEvent(event: string, properties?: any) {
  // Event Tracking
  console.log('Event:', event, properties);
}
```

### Performance Metrics
```typescript
// lib/performance.ts
export function trackWebVitals(metric: any) {
  console.log('Web Vital:', metric);
  
  // Send to analytics service
  // analytics.track('web-vital', metric);
}
```

## 🔄 Content Maintenance

### Content Review
- [ ] **SEO-Metadaten** prüfen und aktualisieren
- [ ] **Bilder** optimieren und Alt-Texte prüfen
- [ ] **Links** testen und aktualisieren
- [ ] **Content-Qualität** bewerten

### Content Updates
```bash
# Content Migration
cd apps/studio
npx sanity exec scripts/migrate-content.ts --with-user-token

# Schema Updates
npx sanity exec scripts/migrate-schema.ts --with-user-token
```

### SEO Maintenance
- [ ] **Sitemap** aktualisieren
- [ ] **Robots.txt** prüfen
- [ ] **Meta-Tags** optimieren
- [ ] **Structured Data** validieren

## 🛠️ Development Maintenance

### Code Quality
```bash
# Linting
pnpm run lint

# Type Checking
pnpm run check-types

# Code Formatting
pnpm run format
```

### Testing
```bash
# Unit Tests
pnpm run test

# E2E Tests
pnpm run test:e2e

# Coverage Report
pnpm run test:coverage
```

### Documentation
```bash
# Docs generieren
pnpm run docs:generate

# Docs validieren
pnpm run docs:validate
```

## 🚀 Deployment Maintenance

### Pre-Deployment Checklist
- [ ] **Tests** erfolgreich
- [ ] **Build** ohne Fehler
- [ ] **Environment Variables** korrekt
- [ ] **Dependencies** aktuell
- [ ] **Documentation** aktualisiert

### Post-Deployment Monitoring
- [ ] **Health Checks** erfolgreich
- [ ] **Performance** innerhalb der Limits
- [ ] **Error Rate** niedrig
- [ ] **User Feedback** positiv

### Rollback Plan
```bash
# Previous Version deployen
vercel rollback

# Sanity Dataset wiederherstellen
npx sanity dataset import backup-20250101.tar.gz
```

## 📈 Performance Optimization

### Bundle Optimization
```bash
# Bundle Size reduzieren
pnpm run build --analyze

# Unused Code entfernen
npx next-remove-imports

# Tree Shaking optimieren
pnpm run build --tree-shaking
```

### Image Optimization
```bash
# Bilder optimieren
npx @sanity/image-utils optimize

# WebP Conversion
npx imagemin images/* --out-dir=optimized --plugin=webp
```

### Caching Optimization
```typescript
// next.config.ts
const nextConfig = {
  // Aggressive Caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};
```

## 🔍 Troubleshooting

### Häufige Probleme

#### Build Failures
```bash
# Dependencies neu installieren
rm -rf node_modules
rm -rf apps/*/node_modules
pnpm install

# Cache leeren
rm -rf .next
rm -rf apps/web/.next
```

#### Sanity Connection Issues
```bash
# Token prüfen
npx sanity debug --secrets

# Login erneuern
npx sanity logout
npx sanity login
```

#### Performance Issues
```bash
# Bundle analysieren
npx @next/bundle-analyzer

# Lighthouse Audit
npx lighthouse http://localhost:3000
```

### Debug Tools
```bash
# Next.js Debug
DEBUG=* pnpm run dev

# Sanity Debug
DEBUG=sanity:* npx sanity start

# Turborepo Debug
DEBUG=turbo:* pnpm run dev
```

## 📞 Support & Escalation

### Interne Support
- **Development Issues**: GitHub Issues
- **Content Issues**: Sanity Support
- **Performance Issues**: Monitoring Dashboard

### Externe Support
- **Next.js**: Vercel Support
- **Sanity**: Sanity Support
- **Hosting**: Vercel/Netlify Support

### Emergency Contacts
- **Technical Lead**: [Name] - [Email]
- **Content Manager**: [Name] - [Email]
- **DevOps**: [Name] - [Email]

## 📋 Maintenance Checklist

### Daily
- [ ] Error Logs prüfen
- [ ] Performance Metrics überwachen
- [ ] User Feedback sammeln

### Weekly
- [ ] Dependencies prüfen
- [ ] Security Updates installieren
- [ ] Backup erstellen
- [ ] Performance Review

### Monthly
- [ ] Vollständige Security Audit
- [ ] Content Review
- [ ] Documentation Update
- [ ] User Feedback Analysis

### Quarterly
- [ ] Architektur Review
- [ ] Technology Stack Evaluation
- [ ] Performance Optimization
- [ ] Security Penetration Testing
