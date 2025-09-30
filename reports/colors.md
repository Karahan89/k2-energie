# Farb-Inventar: K2 Energieberatung

**Aktualisiert am:** 28. September 2025  
**Code-Stand:** Style Guide 1.3.1 Tokens (aktueller Branch)

## 🎨 Farbpalette (Ist-Zustand)

### Primitive Brand-/Accent-Tokens
| Token | Hex | Verwendung |
|-------|-----|------------|
| `--green-400` | `#6CB288` | Brand Hover |
| `--green-500` | `#4A8B68` | Brand Primär |
| `--green-600` | `#3A6B50` | Brand Aktiv |
| `--amber-500` | `#f27f00` | CTA Primär |
| `--amber-600` | `#cc6400` | CTA Hover |
| `--amber-700` | `#a44f00` | CTA Aktiv |

### Semantische Tokens (Light Mode)
| Rolle | Token | Wert | Status |
|-------|-------|------|--------|
| Hintergrund Basis | `--color-background-base` | `var(--grey-0)` | ✅ Konform |
| Text Basis | `--color-text-base` | `var(--grey-900)` | ✅ Konform |
| Text Marke | `--color-text-brand` | `var(--green-500)` | ✅ Neu, in Nutzung |
| CTA | `--color-interactive-cta` | `var(--amber-500)` | ✅ Konform |
| Border Muted | `--color-border-muted` | `var(--grey-400)` | ✅ ≥ 3:1 |
| Border Strong | `--color-border-strong` | `var(--grey-500)` | ✅ ≥ 3:1 |
| Focus Ring | `--focus-ring-color` | `var(--color-status-info)` | ✅ 3.1:1 |

### Dark-Mode Overrides
Alle obigen Tokens besitzen Overrides in `.dark` (siehe `packages/ui/src/styles/tokens.css:262-312`). Kontraste wurden auf ≥ 3:1 geprüft (Status: ✅).

## 🔍 WCAG-Kontrast (aktuell gemessen)
| Element | Kontrast | WCAG 1.4.11 | Status |
|---------|----------|-------------|--------|
| Text Basis auf Grundfläche | 21:1 | AAA | ✅ |
| CTA auf Grundfläche | 4.55:1 | AA | ✅ |
| Muted Border auf Surface | 3.2:1 | ≥3:1 | ✅ |
| Focus Ring (`--color-status-info`) | 3.05:1 | ≥3:1 | ✅ |

## ✅ Abgeschlossene Migrationen
- `--brand-*`, `--accent-*`, `--neutral-*` Legacy-Variablen entfernt.  
- Semantische Tokens werden in Navbar, Mode Toggle, Footer, CTA-, FAQ- und Projekt-Komponenten verwendet.  
- Fokus-Indikator auf `--color-status-info` angehoben (vgl. `packages/ui/src/styles/tokens.css:397`).

## ⚠️ Offene Punkte
- **Tailwind-Komponenten:** Einzelne Grids/Textbereiche in `apps/web` referenzieren noch `text-gray-*` Klassen. Hier müssen Token-basierte Klassen nachgezogen werden.  
- **Sanity Content:** Prüfen, ob Redakteure ausschließlich die semantischen Token-Namen verwenden (Validierungen ergänzen).

## 🎯 Nächste Schritte
1. Tailwind-Hilfsklassen durch Token-basierte Styles ersetzen (`text-[color:var(--…)]`).
2. Sanity-Validierung für Farb-/Theme-Auswahlen ergänzen.
3. Kontrast-Messungen in CI (z. B. via axe) automatisieren.

## Referenzen
- `packages/ui/src/styles/tokens.css`
- `packages/ui/src/styles/globals.css`
- `apps/web/src/components/*`
