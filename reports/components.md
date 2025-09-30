# Komponenten-Inventar: K2 Energieberatung

**Aktualisiert am:** 28. September 2025  
**Code-Stand:** Style Guide 1.3.1 Tokens + aktuelle Komponenten

## 🧩 UI-Komponenten (packages/ui)
| Komponente | Datei | Status | A11y-Score | Token-Nutzung |
|------------|-------|--------|------------|---------------|
| Button | `button.tsx` | ✅ Konform | 8/10 | ✅ (`--button-*`) |
| Accordion | `accordion.tsx` | ✅ Konform | 9/10 | ✅ |
| Badge | `badge.tsx` | ✅ Konform | 8/10 | ✅ |
| Dropdown Menu | `dropdown-menu.tsx` | ✅ Konform | 8/10 | ✅ |
| Navigation Menu | `navigation-menu.tsx` | ✅ Konform | 9/10 | ✅ |
| Sheet | `sheet.tsx` | ✅ Konform | 8/10 | ✅ |
| Input | `input.tsx` | ✅ Konform | 8/10 | ✅ (`--input-*`) |
| Card | `card.tsx` | ✅ Konform | 8/10 | ✅ (`--card-*`) |
| Dialog | `dialog.tsx` | ✅ Konform | 8/10 | ✅ (`--modal-*`) |

## 🧱 Page Builder (apps/web)
| Komponente | Status | Token-Nutzung | A11y |
|------------|--------|---------------|------|
| Hero | ⚠️ Teilweise | Texte & Buttons ✅, Grid (Tailwind) ⚠️ | Focus/Motion ✅ |
| Feature Cards (Icon) | ✅ Konform | `grid-cards`, Tokens | ✅ |
| Image Link Cards | ⚠️ Teilweise | Tailwind-Grid mit festen Breakpoints | ✅ |
| CTA | ✅ Konform | Token-basierte Farben | ✅ |
| Contact Form | ✅ Konform | Tokens + `aria-*` | ✅ |
| FAQ Accordion | ✅ Konform | Tokens + ARIA | ✅ |
| Project Gallery | ✅ Konform | `grid-cards` + Tokens | ✅ |
| Footer | ⚠️ Teilweise | Tokens, aber Tailwind-Grid | ✅ |
| Navbar | ✅ Konform | Tokens, Fokus verbessert | ✅ |
| PageBuilder | ✅ Konform | Tokens + Slot-Komponenten | ✅ |

## 🔄 Änderungen (seit letztem Bericht)
- Tokens vollständig in Navbar, Mode Toggle, Footer, CTA, FAQ, Projekt-Galerie, Contact Form integriert.  
- Dialog Stories refaktoriert (Hooks in Komponenten, Token-Border).  
- Grid-Stories und Input-Stories typisiert (`cardMinStyle`, HTML-Entities).  
- Sanity-Studio Komponenten (Tree Menu, Structure) lint-frei.

## ⚠️ Offene Aufgaben
1. **Tailwind-Layouts** (`hero.tsx`, `image-link-cards.tsx`, Footer): Token-basierte Bruchpunkte/`min-w-0` ergänzen.  
2. **Storybook**: Weitere A11y-Szenarien dokumentieren (Loading/Error).  
3. **Form-UX**: Optional aria-live/Inline-Validation nachrüsten.

## ✅ Definition of Done (aktualisiert)
- Semantische Tokens in Core UI-Komponenten (✅).  
- A11y-Kontrast (Focus + Borders) erfüllt (✅).  
- Modals auf `<dialog>` migriert (✅).  
- Page Builder konsumiert Tokens (Teilweise: Tailwind-Layouts).  
- Storybook-Stories vorhanden; weitere QA-Szenarien geplant.

## Nächste Schritte
- Tailwind-Grids auf Utilities (`layout-grid`, `grid-cards`, `min-w-0`) umstellen.  
- Lint-Warnungen in neuen Next-Seiten (`apps/web/src/app/...`) eliminieren.  
- Storybook-A11y Addon/axe in CI aktivieren.
