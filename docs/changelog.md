# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Geplant
- Blog-System für regelmäßige Inhalte
- Erweiterte SEO-Features
- Performance-Optimierungen
- Mobile App für Content-Management

## [1.0.0] - 2025-01-XX

### Hinzugefügt
- **Monorepo-Struktur** mit Turborepo
- **Next.js 15** Frontend mit App Router
- **Sanity Studio v3** für Content Management
- **Page Builder System** für dynamische Inhalte
- **Responsive Design** mit Tailwind CSS
- **SEO-Optimierung** mit Metadaten
- **Visual Editing** Integration
- **TypeScript** für Type Safety
- **ESLint & Prettier** für Code Quality

### Features
- **Hero-Sektionen** mit Energie-Analyse-Card
- **Feature-Karten** mit Icons
- **Kontaktformular** mit Validierung
- **Projektgalerie** für Referenzen
- **FAQ-Akkordeon** für häufige Fragen
- **Newsletter-Anmeldung**
- **Call-to-Action** Blöcke

### Content-Typen
- **Home Page** mit Page Builder
- **Services** (Leistungen)
- **Projects** (Referenzen)
- **Company Page** (Unternehmen)
- **Contact Page** (Kontakt)
- **FAQ** (Häufige Fragen)
- **Legal Pages** (Impressum, Datenschutz, AGB)

### Technische Features
- **Server Components** für bessere Performance
- **Image Optimization** mit Next.js
- **Bundle Splitting** für optimale Ladezeiten
- **Caching-Strategien** für statische Inhalte
- **Error Boundaries** für robuste Fehlerbehandlung

### Deployment
- **GitHub Actions** für automatisches Deployment
- **Vercel** Integration für Frontend
- **Sanity** Hosting für CMS
- **Environment Variables** Management

## [0.9.0] - 2025-01-XX

### Hinzugefügt
- **Dokumentationsstruktur** mit zentraler docs/
- **Code Standards** und Guidelines
- **Development Setup** Anleitungen
- **Deployment Guides** für verschiedene Plattformen

### Geändert
- **README** mit Verweis auf neue Dokumentation
- **Alte .md Dateien** entfernt und konsolidiert
- **Dokumentationsstruktur** vereinfacht

### Entfernt
- **Verstreute README-Dateien** in verschiedenen Verzeichnissen
- **Doppelte Dokumentation** in verschiedenen Apps
- **Veraltete Anleitungen** und veraltete Informationen

## [0.8.0] - 2025-01-XX

### Hinzugefügt
- **Seed Data** für Energieberatung
- **Sanity Schema** für alle Content-Typen
- **Page Builder Blöcke** implementiert
- **Responsive Design** optimiert

### Geändert
- **Hero-Komponente** mit Energie-Analyse-Card
- **Content-Struktur** für deutsche Inhalte
- **SEO-Felder** für bessere Suchmaschinenoptimierung

## [0.7.0] - 2025-01-XX

### Hinzugefügt
- **Turborepo** für Monorepo-Management
- **Shared Packages** für UI und Konfiguration
- **TypeScript** Konfiguration
- **ESLint** Konfiguration

### Geändert
- **Projektstruktur** zu Monorepo umorganisiert
- **Build-Prozess** mit Turborepo optimiert
- **Code-Sharing** zwischen Apps implementiert

## [0.6.0] - 2025-01-XX

### Hinzugefügt
- **Next.js 15** mit App Router
- **Sanity Studio v3** Integration
- **Tailwind CSS** für Styling
- **Shadcn UI** Komponenten

### Geändert
- **Frontend** von Create React App zu Next.js migriert
- **CMS** von WordPress zu Sanity migriert
- **Styling** von CSS zu Tailwind CSS migriert

## [0.5.0] - 2025-01-XX

### Hinzugefügt
- **Projekt-Initialisierung**
- **Git Repository** Setup
- **Grundlegende Projektstruktur**

### Geändert
- **Template** von Sanity Clean Content Studio angepasst
- **Branding** auf k2-energie angepasst
- **Content-Struktur** für Energieberatung optimiert

---

## Versionsrichtlinien

### Major (X.0.0)
- Breaking Changes
- Große Architektur-Änderungen
- Neue Hauptfunktionen

### Minor (0.X.0)
- Neue Features
- Verbesserungen
- Neue Content-Typen

### Patch (0.0.X)
- Bug Fixes
- Performance-Verbesserungen
- Dokumentations-Updates

## Migration Guide

### Von 0.8.0 zu 1.0.0
- **Breaking Change**: Sanity Schema-Änderungen
- **Migration**: Führen Sie `npx sanity exec scripts/migrate-schema.ts` aus
- **Update**: Dependencies aktualisieren mit `pnpm install`

### Von 0.7.0 zu 0.8.0
- **Breaking Change**: Monorepo-Struktur
- **Migration**: Repository neu klonen
- **Update**: Environment Variables anpassen

## Bekannte Probleme

### Version 1.0.0
- **Issue #1**: Sanity Visual Editing funktioniert nicht in Safari
- **Issue #2**: Performance-Probleme bei großen Bildern
- **Issue #3**: TypeScript Errors bei bestimmten Sanity-Queries

### Geplante Fixes
- **v1.0.1**: Safari Visual Editing Fix
- **v1.0.2**: Image Optimization Verbesserungen
- **v1.0.3**: TypeScript Query-Fixes

## Support

Bei Fragen zu Updates oder Migrationen:

- **E-Mail**: hallo@k2-energie.de
- **Telefon**: +49 5344 984 92 10
- **GitHub Issues**: [Repository Issues](https://github.com/k2-energie/k2-energie-1/issues)
