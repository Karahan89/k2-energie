# Spacing-Inventar: K2 Energieberatung (Update)

**Aktualisiert am:** 28. September 2025  
**Scope:** Tokens, Patterns, offene Aufgaben

## 📏 Tokens (Ist)
```css
:root {
  --spacing-unit: 4px;
  --space-0: 0px;
  --space-1: calc(var(--spacing-unit) * 1);   /* 4px */
  --space-2: calc(var(--spacing-unit) * 2);   /* 8px */
  ...
  --space-32: calc(var(--spacing-unit) * 32); /* 128px */
}
```
- Skala 0–32 vollständig implementiert (`packages/ui/src/styles/tokens.css:85-118`).  
- Semantische Ableitungen (`--spacing-xs … --spacing-4xl`) vorhanden (Zeilen 227 ff.).

## 🧱 Patterns
| Pattern | Status | Kommentar |
|---------|--------|-----------|
| `.stack` / `.section` | ✅ | Vertical Rhythm (`grid.css:98-120`) |
| `.layout-shell` | ✅ | Responsive Padding `clamp(1rem, 4vw, 2.5rem)` |
| Buttons | ✅ | `min-h-*` + Token-Padding |
| Formulargruppen | ✅ | `var(--space-4)` Abstände |

## ✅ Erledigt
- Spacing-Tokens erweitern (0–32).  
- Storybook-Grids nutzen typisierte Helper (`cardMinStyle`).  
- Token-basierte Abstände in Navbar, Footer, Contact Form, FAQ.

## ⚠️ Offene Aufgaben
| Bereich | Problem | Empfehlung |
|---------|---------|------------|
| Tailwind-Abschnitte (`hero.tsx`, `image-link-cards.tsx`) | Harte Werte (`mt-[var(--space-8)]`, Breakpoints) | Utility-basierte Layouts einsetzen oder Token-Klassen (`layout-grid`) verwenden |
| `apps/web/src/app/*` | Prettier-Warnungen (Spacing-Format) | `pnpm lint --filter web -- --fix` |
| Responsive Tokens | Aktuell `clamp` in Layout Shell; weitere responsive Spacing-Tokens optional | Prüfen, ob `--space-responsive-*` benötigt werden |

## Nächste Schritte
1. Tailwind-Grids refaktorieren, damit `grid.css`-Utilities greifen.  
2. Redaktionelle Module (Sanity) auf Tokenisierte Abstände beschränken (Validierung).  
3. Optional: responsive Spacing-Tokens definieren (`--space-responsive-*`).

## Referenzen
- `packages/ui/src/styles/tokens.css`  
- `packages/ui/src/styles/grid.css`  
- `apps/web/src/components/*`
