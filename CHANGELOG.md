# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.3.3] - 2025-09-28

### Added
- **Rich Text Brand-Mark:** Sanity-Richtext erlaubt jetzt das Markup `brand` und rendert es als `--color-text-brand`.

### Changed
- **Design Tokens:** Spacing-Skala auf `--space-0` bis `--space-32` erweitert und `--color-text-brand` ergänzt; Border-Tokens (`base/muted/strong`) verdunkelt für ≥3:1 Non-Text-Kontrast.
- **Globale Styles:** `globals.css` von Legacy-Variablen (`--brand-*`, `--accent-*`, `--neutral-*`) befreit und auf semantische `--color-*` Tokens gemappt; Dark-Mode-Overrides angepasst.
- **UI-Komponenten:** Navbar, Mode Toggle, Footer, FAQ-, Projekt- und Kontakt-Module greifen nun auf semantische Tokens zurück statt historischer Farbwerte.
- **OG-Renderer:** Fallback-Farbton auf `#1E3D2E` (entspricht `--green-900`) umgestellt.

### Fixed
- **WCAG 1.4.11:** Form-Border (`--color-border-muted`) und CTA-Hover (`--color-interactive-cta-hover`) erfüllen jetzt 3:1 Kontrast, Storybook-Textarea nutzt Token-basierte Borders.

## [1.3.2] - 2024-12-19

### Added
- **Grid-Fixes für K2:** Diagnose, Codemods & Absicherung implementiert
- **Neue Grid-Utilities:** `.grid-cards` und `.layout-grid` für responsive Layouts
- **Storybook Stories:** Grid-Tests mit verschiedenen Content-Längen
- **Generische Fixes:** `min-width: 0` für Grid/Flex-Kinder
- **Word Breaking:** Intelligente Textumbrüche in Grid-Karten

### Changed
- **Feature Cards with Icon:** Migriert zu `.grid-cards` (--card-min: 280px)
- **Image Link Cards:** Migriert zu `.layout-grid` mit responsive Spans
- **Project Gallery:** Migriert zu `.grid-cards` (--card-min: 300px)
- **Grid-System:** Erweitert um Card-Grid und Layout-Grid Utilities

### Fixed
- **Keine zeichenweisen Umbrüche** mehr in Cards/Spalten
- **Grids füllen Breite sinnvoll** aus ohne "leere Wüste"
- **Responsive Breakpoints:** 1 Spalte (≤640px), 2 Spalten (≤1024px), 3-4 Spalten (Desktop)
- **`gap` statt Margins** zwischen Grid-Kindern für konsistente Abstände
- **Content-Overflow** durch `min-width: 0` verhindert

## [1.3.1] - 2025-09-28

### Added
- **Token-Architektur:** Vollständige 3-stufige Token-Hierarchie implementiert
  - Primitive Tokens (Ebene 1): Rohwerte für Farben, Spacing, Typography, etc.
  - Semantische Tokens (Ebene 2): Kontext-bezogene Tokens für Light/Dark Mode
  - Komponenten-Tokens (Ebene 3): Spezifische Tokens für UI-Komponenten
- **Primitive Color Tokens:** Vollständige Farbpalette nach Style Guide 1.3.1
  - Greens: `--green-50` bis `--green-900` (Brand Primary)
  - Amber: `--amber-50` bis `--amber-900` (Interactive/CTA)
  - Status Colors: `--red-500`, `--green-status-500`, `--blue-500`
  - Greys: `--grey-0` bis `--grey-900` (Neutral Palette)
- **Semantische Color Tokens:** Kontext-bezogene Farb-Tokens
  - Background: `--color-background-base`, `--color-background-subtle`, `--color-background-muted`
  - Text: `--color-text-base`, `--color-text-muted`, `--color-text-subtle`
  - Brand: `--color-brand-primary`, `--color-brand-secondary`
  - Interactive: `--color-interactive-cta`
  - Status: `--color-status-error`, `--color-status-success`, `--color-status-info`
- **Typography Tokens:** Responsive Typography mit clamp()
  - Font Sizes: `--font-size-5` bis `--font-size--1` (clamp-based)
  - Line Heights: `--line-tight`, `--line-base`
  - Letter Spacing: `--tracking-tight`, `--tracking-wide`
- **Spacing Tokens:** 4px-basierte Spacing-Skala
  - Primitive: `--space-1` bis `--space-32` (calc-based)
  - Semantic: `--spacing-xs` bis `--spacing-4xl`
- **Border & Shadow Tokens:** Konsistente UI-Elemente
  - Border Widths: `--border-width-1`, `--border-width-2`, `--border-width-3`
  - Border Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
  - Shadows: `--shadow-1` bis `--shadow-4`, `--shadow-soft`, `--shadow-elevated`
- **Motion Tokens:** Animation und Transition Tokens
  - Duration: `--duration-fast`, `--duration-base`, `--duration-slow`
  - Easing: `--easing-ease-out`, `--easing-ease-in`, `--easing-ease-in-out`
- **12-Spalten-Grid-System:** Vollständiges Grid-System implementiert
  - Grid Container: `.grid` mit 12 Spalten
  - Column Classes: `.col-1` bis `.col-12`
  - Start/End Positions: `.col-start-*`, `.col-end-*`
  - Responsive Grid: Mobile-first mit Breakpoints
  - Auto-fit/auto-fill: `.grid-auto-fit`, `.grid-auto-fill`
- **Vertical Rhythm:** Konsistente Abstände
  - Stack Pattern: `.stack`, `.stack-sm`, `.stack-lg`, `.stack-xl`
  - Section Pattern: `.section`, `.section-sm`, `.section-lg`
- **Button-Komponente:** Vollständig refaktoriert mit neuen Tokens
  - Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
  - Sizes: `xs`, `sm`, `default`, `md`, `lg`, `icon`
  - A11y: Focus Management, Touch Targets ≥44px, ARIA Support
- **Input-Komponente:** Neue Komponente mit A11y-Features
  - Variants: `default`, `error`, `success`
  - Sizes: `sm`, `default`, `lg`
  - A11y: Labels, Error Messages, Helper Text, ARIA Support
- **Card-Komponente:** Neue Komponente mit verschiedenen Varianten
  - Variants: `default`, `elevated`, `outlined`, `ghost`
  - Padding: `none`, `sm`, `default`, `lg`
  - Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Dialog-Komponente:** Native HTML `<dialog>` Element implementiert
  - Sizes: `sm`, `default`, `lg`, `xl`, `full`
  - A11y: Focus Management, ESC-Key, Inert Background, Screen Reader Support
  - Sub-components: `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`
- **Focus Management:** WCAG 1.4.11 konforme Focus-Indikatoren
  - Focus Ring Color: `--focus-ring-color` (3:1+ Kontrast)
  - Focus Ring Width: `--focus-ring-width`
  - Focus Ring Offset: `--focus-ring-offset`
- **Reduced Motion Support:** WCAG 2.2.2 konforme Animation-Kontrolle
  - `@media (prefers-reduced-motion: reduce)` Support
  - Animation-Duration: 0.01ms für reduzierte Bewegung
  - Scroll-behavior: auto für reduzierte Bewegung
- **Dark Mode:** Vollständige Dark Mode-Unterstützung
  - Alle semantischen Tokens haben Dark Mode-Overrides
  - Konsistente Farb-Kontraste in beiden Modi
  - Automatische Theme-Erkennung
- **Stylelint-Konfiguration:** Token-Erzwingung implementiert
  - `stylelint-declaration-strict-value` Plugin
  - Verbot von direkten Farbwerten (HEX, RGB, HSL)
  - Erzwingung von CSS Custom Properties
  - Umfassende Linting-Regeln für Code-Qualität
- **Storybook-Integration:** Komponenten-Dokumentation
  - Stories für alle neuen Komponenten
  - A11y-Addon für Accessibility-Tests
  - Interactive Controls für alle Props
  - Dokumentation mit Code-Beispielen
- **Migration-Dokumentation:** Umfassende Migrationshilfe
  - Token-Mapping-Tabelle
  - Code-Beispiele für Migration
  - Breaking Changes dokumentiert
  - Performance-Impact analysiert

### Changed
- **Button-Komponente:** Vollständige Refaktorierung
  - Legacy `glass-surface-*` Klassen entfernt
  - Neue semantische Token-basierte Styles
  - Verbesserte A11y-Unterstützung
  - Konsistente Focus-Indikatoren
- **Typography-System:** Responsive Typography implementiert
  - `--step-*` Tokens durch `--font-size-*` ersetzt
  - Clamp-basierte responsive Größen
  - Verbesserte Lesbarkeit auf allen Geräten
- **Color-System:** Standardisierte Farb-Nomenklatur
  - `--brand-*` → `--green-*` (Primitive)
  - `--accent-*` → `--amber-*` (Primitive)
  - `--color-primary` → `--color-brand-primary` (Semantic)
  - Konsistente Token-Hierarchie
- **Focus-System:** WCAG 1.4.11 Konformität
  - Alle Focus-Indikatoren haben 3:1+ Kontrast
  - Konsistente Focus-Ring-Implementierung
  - Verbesserte Keyboard-Navigation
- **Grid-System:** Responsive Grid implementiert
  - Mobile-first Ansatz
  - Automatische Spalten-Anpassung
  - Verbesserte Layout-Konsistenz
- **Dark Mode:** Erweiterte Dark Mode-Unterstützung
  - Alle Komponenten haben Dark Mode-Overrides
  - Konsistente Farb-Kontraste
  - Verbesserte Benutzerfreundlichkeit

### Fixed
- **Focus Ring Kontrast:** WCAG 1.4.11 Konformität erreicht
  - Focus-Indikatoren haben jetzt 3:1+ Kontrast
  - Konsistente Implementierung across alle Komponenten
- **Non-Text Contrast:** UI-Elemente erfüllen WCAG 1.4.11
  - Input-Borders haben 3:1+ Kontrast
  - Button-Borders haben 3:1+ Kontrast
  - Konsistente Border-Implementierung
- **Reduced Motion:** WCAG 2.2.2 Konformität implementiert
  - Animationen respektieren `prefers-reduced-motion`
  - Essenzielle Informationen nicht nur durch Bewegung vermittelt
- **Token-Konsistenz:** Inkonsistente Token-Namen standardisiert
  - Einheitliche Nomenklatur across alle Tokens
  - Klare Hierarchie zwischen Primitive, Semantic und Component Tokens
- **Dark Mode FOUC:** Flash of Unstyled Content verhindert
  - SSR-kompatible Dark Mode-Implementierung
  - Konsistente Theme-Erkennung
- **Performance:** CSS-Performance optimiert
  - Effiziente Token-Verwendung
  - Reduzierte CSS-Größe durch bessere Organisation
  - Optimierte Bundle-Größe

### Security
- **CSS Injection:** Verhindert durch Token-Erzwingung
  - Stylelint verhindert direkte Farbwerte
  - Nur CSS Custom Properties erlaubt
  - Sichere Token-Implementierung

## [1.3.0] - 2025-09-15

### Added
- **Initial Style Guide:** Grundlegende Design-Tokens
- **Basic Components:** Button, Input, Card Komponenten
- **Dark Mode:** Grundlegende Dark Mode-Unterstützung
- **Typography:** Basis-Typography-System

### Changed
- **Color System:** Erste Farb-Token-Implementierung
- **Component API:** Grundlegende Komponenten-APIs

### Fixed
- **Basic A11y:** Grundlegende Accessibility-Features
- **Performance:** Erste Performance-Optimierungen

## [1.2.0] - 2025-09-01

### Added
- **Project Setup:** Monorepo-Struktur
- **Next.js Integration:** Web-App Setup
- **Sanity CMS:** Content Management System
- **Basic Styling:** Tailwind CSS Integration

### Changed
- **Architecture:** Monorepo-basierte Architektur
- **Build System:** Turbo-basierter Build-Prozess

### Fixed
- **Initial Setup:** Projekt-Initialisierung
- **Dependencies:** Package-Management mit pnpm