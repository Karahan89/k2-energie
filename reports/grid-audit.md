# Grid-Audit: K2 Energieberatung

**Aktualisiert am:** 28. September 2025  
**Scope:** CSS Grid / Layout-Utilities / Tailwind-Grids

## ✅ Was bereits erledigt ist
- `packages/ui/src/styles/grid.css` stellt 12-Spalten-Layout, Auto-Fit-Utilities sowie `min-width: 0` für sämtliche Grid-/Flex-Kinder bereit (Zeilen 123–140).  
- Utility-Komponenten (`grid-cards`, `layout-grid`) werden in Feature Cards, Project Gallery und CTA-Sektionen eingesetzt.  
- Storybook (`grid.stories.tsx`) demonstriert alle Utilities mit typisierten Inline-Styles (`cardMinStyle`).

## ⚠️ Wo noch Handlungsbedarf besteht
| Bereich | Datei | Problem | Empfehlung |
|---------|-------|---------|------------|
| Hero Layout | `apps/web/src/components/sections/hero.tsx` | Tailwind-Grid mit `lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]`, kein `min-w-0` | Auf `layout-grid`/Utilities umstellen oder `min-w-0` + responsive Tokens ergänzen |
| Image Link Cards | `sections/image-link-cards.tsx` | Tailwind `xl:grid-cols-4` → sehr schmale Karten, kein `min-w-0` | `grid-cards` mit `--card-min` nutzen, Token-Breakpoints (z. B. `layout-grid`) einsetzen |
| Footer Links | `components/footer.tsx` | Tailwind-`grid-cols-2` + `max-w-3xl`, kein `min-w-0` | Utility-Container (`layout-shell` + `layout-grid`) verwenden |
| Projektseiten (`/app/...`) | `apps/web/src/app/[...slug]/page.tsx` u. a. | Prettier/Lint-Warnungen weisen auf Format- und Typisierungslücken hin | Formatieren + tokenisierte Helfer (`cardMinStyle`) übernehmen |

## Beobachtete Muster
- **Utility-Grids:** Alle Komponenten, die `grid-cards`/`layout-grid` verwenden, erfüllen G4 (min-width), G5 (gap) und G7 (Breakpoints).  
- **Tailwind-Only Grids:** Ältere Abschnitte setzen Hard-Breakpoints (`xl:grid-cols-*`) und benötigen Migration auf Utility-Ansatz.  
- **Sanity-Driven Layouts:** Für dynamische Seiten (FAQ/Leistungen/Projekte) sollten Utility-Komponenten eingesetzt werden, um Redakteurs-Inhalte robust darzustellen.

## Priorisierte Tasks
1. **Hero / Image Link Cards** auf Token-basierte Utilities refaktorieren.  
2. **Footer Grid** auf `layout-grid` migrieren (`min-w-0` + Token-Gaps).  
3. **Next.js Seiten** formatieren (`pnpm lint --filter web -- --fix`) und `cardMinStyle` nutzen statt `as any`.  
4. Storybook Screenshots aktualisieren, sobald Tailwind-Grids migriert sind.

## Qualitätskriterien (aktuell)
| Kriterium | Status |
|-----------|--------|
| `min-width: 0` auf Grid-Kindern | ✅ für Utilities, ⚠️ für Tailwind-Abschnitte |
| `gap` statt Margin | ✅ |
| Responsive Breakpoints (1/2/3-4 Spalten) | ✅ Utilities, ⚠️ Tailwind |
| Kontrast & A11y | ✅ (Tokens) |

## Nächste Schritte
- Utility-Migration einplanen (Hero, Footer, Image Link Cards).  
- Lint-/Prettier-Warnungen in `apps/web/src/app` beseitigen.  
- Anschließend Report erneut validieren (Screenshots + axe).