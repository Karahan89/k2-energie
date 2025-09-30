# Typography-Inventar: K2 Energieberatung (Update)

**Aktualisiert am:** 28. September 2025  
**Scope:** Tokens, Komponenten, offene Punkte

## 📝 Tokens (Ist)
```css
:root {
  --font-family-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  --font-family-serif: "Source Serif 4", "Georgia", "Times New Roman", serif;

  --font-size-5: clamp(2rem, 5vw, 2.25rem);
  --font-size-4: clamp(1.6rem, 4vw, 1.875rem);
  --font-size-3: clamp(1.3rem, 3vw, 1.5rem);
  --font-size-2: clamp(1.1rem, 2.5vw, 1.25rem);
  --font-size-1: clamp(1rem, 2vw, 1.125rem);
  --font-size-0: clamp(0.875rem, 1.5vw, 1rem);
  --font-size--1: clamp(0.75rem, 1vw, 0.875rem);

  --line-tight: 1.15;
  --line-base: 1.6;
  --tracking-tight: -0.015em;
  --tracking-wide: 0.08em;
}
```
- Clamp-basierte Größen bereits aktiv (`globals.css:100 ff.`).  
- Heading-Styles mit `text-wrap: balance`, `font-feature-settings` gesetzt.

## Komponenten-Status
| Komponente | Status | Kommentar |
|------------|--------|-----------|
| Global Headings (`globals.css`) | ✅ | Nutzen `--font-size-*`, `--line-*` |
| Buttons | ✅ | `text-[length:var(--font-size--1)]` etc. |
| Inputs/Card | ✅ | Token-basierte Schriftgrößen |
| Hero/CTA | ⚠️ | Teilweise Tailwind-Klassen („text-3xl“) – Migration geplant |
| RichText (Portable Text) | ✅ | Standardisierte Headings H2–H6 |

## A11y & Lesbarkeit
- `--max-readable: clamp(45ch, 60ch, 68ch)` aktiv.  
- `-webkit-font-smoothing: antialiased` gesetzt.  
- Fokus-Indikatoren mit ausreichendem Abstand (`outline-offset`).

## ⚠️ Offene Aufgaben
1. **Tailwind Text-Klassen** in Hero/CTA auf Token-Klassen umstellen (`text-[length:var(--font-size-…)]`).  
2. **Sanity RichText**: Brand-Dekorator (`brand`) bereits aktiv → Redaktionsleitfaden aktualisieren.  
3. **Animationen**: Hero/CTA Typo-Animationen optional an `prefers-reduced-motion` koppeln.

## Nächste Schritte
- Suche nach `text-` Tailwind-Klassen in `apps/web/src/components/**/*` und sukzessive durch Token-basierte Klassen ersetzen.  
- Storybook-Docs um Token-Beispiele ergänzen (Heading, Paragraph, Quote).  
- Optional: Font-Subsetting/Preload prüfen (Performance).

## Referenzen
- `packages/ui/src/styles/tokens.css`  
- `packages/ui/src/styles/globals.css`  
- `apps/web/src/components/elements/rich-text.tsx`
