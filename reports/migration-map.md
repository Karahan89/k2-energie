# Migration Map: Style Guide 1.3.1 (Update)

**Aktualisiert am:** 28. September 2025  
**Ziel:** Abgleich Legacy → neue Token-/Komponentenstruktur

## 🔄 Token-Mapping (Ist)

### Farben
| Legacy | Neu | Status | Kommentar |
|--------|-----|--------|-----------|
| `--brand-*` | `--green-*` | ✅ entfernt | Nur noch in `tokens.css` verwendbar |
| `--accent-*` | `--amber-*` | ✅ entfernt | CTA/Buttons nutzen Semantik |
| `--neutral-*` | `--grey-*` | ✅ entfernt | `globals.css` nutzt Semantik |
| `--color-primary` | `--color-brand-primary` | ✅ | Navbar/Footer/CTA aktualisiert |
| `--color-accent` | `--color-interactive-cta` | ✅ | Alle Buttons / Links |
| `ring` Variablen | `--focus-ring-color` | ✅ | ≥3:1 Kontrast |

### Spacing & Typografie
| Alt | Neu | Status |
|-----|-----|--------|
| `--space-0…12` | `--space-0…32` | ✅ Skala erweitert |
| `--step-*` | `--font-size-*` | ✅ Clamp-basiert in Tokens |
| `--font-sans/serif` | unverändert | ✅ bereits konform |

### Komponenten-Tokens
| Komponente | Tokens | Status |
|------------|--------|--------|
| Button | `--button-*` | ✅ |
| Input | `--input-*` | ✅ |
| Card | `--card-*` | ✅ |
| Dialog | `--modal-*` | ✅ |

## Komponenten-Migration
| Bereich | Status | Kommentar |
|---------|--------|-----------|
| Core UI (`packages/ui`) | ✅ | Button, Input, Card, Dialog, Badge etc. nutzen Tokens |
| Hero / CTA / FAQ / Projekt | ✅ | Token- und Utility-basierte Varianten |
| Image Link Cards / Footer (Tailwind) | ⚠️ | Noch Tailwind-Breakpoints, Migration geplant |
| RichText Decorator | ✅ | `brand` Mark rendert `--color-text-brand` |

## Tooling/CI
- ESLint/Prettier: sauber für `studio`, `ui`; `web` zeigt noch Format-/Typwarnungen.  
- Storybook: Token-Stories vorhanden; A11y-Addon/Regression noch einzubauen.  
- CI: axe/Lighthouse Automatisierung offen.

## Nächste Schritte
1. Tailwind-Grids (Hero, Footer, Image Cards) auf Utility-Grids (`layout-grid`, `grid-cards`) migrieren.  
2. `apps/web` linten (`pnpm lint --filter web -- --fix`) und restliche `any`-Typen typisieren.  
3. A11y-Checks in CI (axe, Lighthouse) etablieren.

## Referenzen
- Tokens: `packages/ui/src/styles/tokens.css`  
- Komponenten: `apps/web/src/components/*`  
- Tools: `CHANGELOG.md`, `docs/implementierung.md`
