# Implementierungs‑Prompt: K2 Styleguide 1.3.0 (Umsetzung)

> **Ziel:** Lies das gesamte Projekt, analysiere es vollständig und setze den **Styleguide K2 Energieberatung v1.3.0** konsequent um. Erstelle dazu eine klare Migrationsstrategie, führe Tokenisierung & Theming ein, refaktoriere Komponenten, härte A11y & Tooling und liefere nachvollziehbare Artefakte (Berichte, PRs, Storybook, Checks).
>
> **Update 1.3.3:**
> - Spacing-Scale vollständig auf `--space-0` bis `--space-32` ausrollen und in Tailwind via `@theme inline` spiegeln.
> - `--color-text-brand` als Markup-Ziel im Richtext `brand`-Decorator nutzen; direkte HEX/Neutral-Werte in Komponenten vermeiden.
> - `--color-border-muted`/`--color-border-strong` so setzen, dass Non-Text-Kontraste ≥ 3:1 bleiben und UI-Komponenten ausschließlich semantische Tokens konsumieren.

---

## 0) Rolle, Arbeitsweise & Definition of Done

* **Rolle:** Du handelst als *Senior Frontend Engineer & Design‑System Implementer* mit Fokus auf **CSS‑Architektur, Design Tokens, A11y (WCAG 2.2 AA)**, **Storybook** und **Tooling**.
* **Arbeitsweise:**

  1. **Lesen & Inventarisieren**, 2) **Planen & Vorschlagen**, 3) **Automatisiert migrieren**, 4) **Manuell verfeinern**, 5) **Absichern (Tests/A11y/Docs)**.
* **Definition of Done (DoD):**

  * Alle UI‑Farben, Abstände, Typo‑Größen, Schatten, Motion sind über **semantische Tokens** referenziert (keine Rohwerte in Komponenten).
  * **Light/Dark Mode** per `.dark` oder Media Query sauber gemappt; Non‑Text‑Kontrast ≥ 3:1, Textkontrast gemäß WCAG AA erfüllt.
  * **Kernkomponenten** (Buttons, Inputs, Cards, Modals) sind refaktoriert, dokumentiert (Storybook), mit Zuständen & A11y‑Verhalten.
  * **Linting/CI** erzwingt Token‑Nutzung; **axe/Lighthouse** prüfen A11y/Performance; **Chromatic/Visuelle Tests** aktiv.
  * **Changelog & Migration Guide** sind aktualisiert; Version bump gemäß **SemVer**.

---

## 1) Eingangsdaten & Annahmen

* **Styleguide‑Version:** 1.3.0 (SemVer). Du setzt alle Vorgaben aus v1.3.0 um.
* **Technologie‑agnostisch:** Passe Beispiele ggf. an das Projekt an (React/Vue/Next/Angular/Vanilla).
* **Nicht verändern:** Funktionale Logik. Fokus auf UI/Styles, Semantik, A11y, Build/Tooling.

---

## 2) Phasenplan (ausführen)

### Phase A — Vollständige Analyse (Read‑Everything)

1. **Repository‑Scan:** Ermittele Stack, Build‑System, Styling‑Methode(n) (CSS, SCSS, CSS‑in‑JS, Tailwind, Utility‑Klassen), theming, Dark‑Mode‑Mechanik, Komponentenbibliotheken.
2. **Inventar‑Berichte (generieren als Markdown in `/reports`):**

   * `colors.md`: Alle vorkommenden Farbwerte (HEX/RGB/HSL) mit Häufigkeit & Einsatzorten.
   * `typography.md`: Schriftfamilien, Größen, Line‑Heights, Letter‑Spacing.
   * `spacing.md`: Abstände/Grids, Margin/Padding‑Cluster.
   * `components.md`: Komponentenliste inkl. Zustände & A11y‑Auffälligkeiten.
   * `a11y.md`: Erste Findings (Fokus‑Reihenfolge, Kontraste, ARIA, Reduced‑Motion).

### Phase B — Tokenisierung & Theming

3. **Token‑Architektur anlegen:**

   * **Primitive Tokens**: Rohwerte (Farben, Spacing, Border, Shadow, Motion).
   * **Semantische Tokens**: Kontext (Text, Hintergrund, Border, Surface, CTA, Status, Focus, Shadow‑Level, Motion‑Preset).
4. **CSS‑Variablen erstellen:** Lege zentrale Dateien an (z. B. `/src/styles/tokens.css`).

**Primitive Farben (Ausschnitt)**

```css
:root {
  /* Greens */
  --green-500: #4A8B68; /* Kontrast 4.81:1 auf Weiß */
  --green-600: #3A6B50; /* Kontrast 6.69:1 auf Weiß */

  /* Amber (Accent) */
  --amber-500: #f27f00; /* 4.55:1 */
  --amber-600: #cc6400; /* 6.45:1 */

  /* Status */
  --red-500: #dc2626;      /* Error */
  --green-status-500: #16a34a; /* Success */
  --blue-500: #2563eb;     /* Info */

  /* Greys */
  --grey-0: #ffffff;
  --grey-100: #f5f5f5;
  --grey-200: #e5e7eb;
  --grey-700: #374151;
  --grey-900: #1a1a1a;
}
```

**Semantische Farben & Dark‑Overrides**

```css
:root {
  --color-background-base: var(--grey-0);
  --color-text-base: var(--grey-900);
  --color-border-muted: var(--grey-200);
  --color-surface-base: var(--grey-0);
  --color-surface-subtle: #F2F7F2; /* Sekundär Hell */
  --color-brand-primary: var(--green-500);
  --color-interactive-cta: var(--amber-500);
  --color-status-error: var(--red-500);
  --color-status-success: var(--green-status-500);
  --color-status-info: var(--blue-500);
}

.dark {
  --color-background-base: var(--grey-900);
  --color-text-base: #f1f1f1;
  --color-border-muted: #4b5563;
  --color-surface-base: #0e0e0e;
  --color-surface-subtle: #131313;
  --color-brand-primary: var(--green-500); /* beibehalten für Recognition */
  --color-interactive-cta: var(--amber-500);
}
```

**Spacing/Typo/Motion/Border/Shadow Tokens**

```css
:root {
  /* Spacing (4px‑Raster) */
  --spacing-unit: 4px;
  --space-1: calc(var(--spacing-unit) * 1);
  --space-2: calc(var(--spacing-unit) * 2);
  --space-4: calc(var(--spacing-unit) * 4);
  --space-6: calc(var(--spacing-unit) * 6);
  --space-8: calc(var(--spacing-unit) * 8);
  --space-12: calc(var(--spacing-unit) * 12);

  /* Typo (clamp) */
  --font-size-5: clamp(2rem, 5vw, 2.25rem);
  --font-size-4: clamp(1.6rem, 4vw, 1.875rem);
  --font-size-3: clamp(1.3rem, 3vw, 1.5rem);
  --font-size-0: clamp(1rem, 2vw, 1.125rem);
  --line-tight: 1.15; --line-base: 1.6;

  /* Borders */
  --border-1: 1px; --border-2: 2px;
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;

  /* Shadows */
  --shadow-soft: 0 2px 10px rgba(0,0,0,.06);
  --shadow-medium: 0 8px 24px rgba(0,0,0,.09);

  /* Motion */
  --motion-duration-1: 120ms;
  --motion-duration-2: 200ms;
  --motion-ease-standard: ease-in-out;
}
```

5. **Theming‑Schalter:** Implementiere `.dark` (Root) *oder* `@media (prefers-color-scheme)`; stelle sicher, dass Text/Borders/Surfaces Kontraste erfüllen (AA) und Non‑Text ≥ 3:1.

### Phase C — Layout & Grid

6. **12‑Spalten‑Grid** bereitstellen und referenzieren:

```css
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-6); }
.col-12 { grid-column: span 12; }
.col-6  { grid-column: span 6; }
.col-4  { grid-column: span 4; }
.col-start-2 { grid-column-start: 2; }
```

```tsx
// Section Wrapper & Container – bindet Aurora-Hintergrund + globales Padding ein
<AuroraSection variant="muted" withTopDivider withBottomDivider>
  <div className="layout-shell space-y-[var(--space-8)]">
    <div className="content-readable mx-auto text-center">
      <h2>Section Headline</h2>
      <p>Einführungstext …</p>
    </div>
    <div className="grid gap-[var(--space-4)] md:grid-cols-2">
      {/* Inhalt */}
    </div>
  </div>
</AuroraSection>
```

7. **Vertikaler Rhythmus** als Regeln & Utilities:

```css
.stack > * + * { margin-top: var(--space-4); }
.section + .section { margin-top: var(--space-12); }
```

### Phase D — Komponenten‑Refactor (States & A11y)

8. **Buttons** (Primär/Sekundär) mit allen Zuständen:

```css
.btn { font: inherit; border-radius: var(--radius-md); padding: .625rem 1rem; transition: background-color var(--motion-duration-2) var(--motion-ease-standard), transform var(--motion-duration-1) var(--motion-ease-standard); }
.btn-primary { color: #fff; background: var(--color-interactive-cta); border: none; }
.btn-primary:hover { background: var(--amber-600); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:focus-visible { outline: var(--border-2) solid var(--color-brand-primary); outline-offset: 2px; }
.btn[disabled] { opacity: .5; cursor: not-allowed; }
.btn--loading { position: relative; color: transparent; }
```

9. **Inputs** (Standard/Hover/Focus/Valid/Error) & Non‑Text‑Kontrast:

```css
.form-input { background: var(--color-surface-base); border: var(--border-1) solid var(--color-border-muted); color: var(--color-text-base); }
.form-input:hover { border-color: #9ca3af; }
.form-input:focus-visible { outline: var(--border-2) solid var(--color-status-info); outline-offset: 2px; }
.form-input.is-valid { border-color: var(--color-status-success); }
.form-input.is-error { border-color: var(--color-status-error); }
```

10. **Cards** (Surfaces & Shadow):

```css
.card { background: var(--color-surface-subtle); box-shadow: var(--shadow-soft); padding: var(--space-6); border-radius: var(--radius-lg); }
```

11. **Modals** mit `<dialog>` & Fokusfalle:

```html
<button id="open">Öffnen</button>
<dialog id="modal" aria-labelledby="modal-title">
  <h2 id="modal-title">Titel</h2>
  <p>Inhalt</p>
  <button id="close">Schließen</button>
</dialog>
<script>
  const modal = document.getElementById('modal');
  document.getElementById('open').addEventListener('click', () => modal.showModal());
  document.getElementById('close').addEventListener('click', () => modal.close());
</script>
```

12. **Reduced Motion** global absichern:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Phase E — Tooling, Linting, CI, Doku

13. **Stylelint** (erzwingt Token‑Nutzung):

* Datei `.stylelintrc.json` hinzufügen:

```json
{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [["/color/", "background-color", "border-color"], {"ignoreKeywords": ["transparent", "inherit", "currentColor"]}]
  }
}
```

* Optional: Eigene Regelsets für `font-size`, `box-shadow`, `border-radius` nur via `var(...)` erlauben.

14. **Storybook**: Setup + Stories für Buttons, Inputs, Cards, Modals; Controls für Light/Dark, Disabled/Loading/States; A11y‑Addon aktivieren.

15. **Visuelle Regression**: Chromatic oder Percy anbinden; Schwellen definieren.

16. **A11y‑Checks**: axe + Lighthouse als CI‑Jobs; Fail bei Kontrast/landmarks/Tab‑Reihenfolge Fehlern.

17. **Codemods/Migration**:

* Regex‑Ersetzungen: Roh‑HEX/RGB/HSL → passende **semantische** Tokens (Mapping aus `reports/colors.md`).
* Entferne doppelte Variablen/alten Theming‑Code; deprecatete Klassen markieren.

18. **Dokumentation**:

* `MIGRATION.md`: Breaking Changes, Mappings, Beispieldiffs, „Before/After“ Screenshots.
* `CHANGELOG.md`: nach *Keep a Changelog* Kategorien (Added/Changed/Deprecated/Removed/Fixed/Security).
* `README`/`CONTRIBUTING`: Governance‑Prozess (Issue → Discussion → PR → Review → Release), Versionierung (SemVer), Release‑Prozess.

---

## 3) Akzeptanzkriterien (Checkliste)

* [ ] **Token‑Konformität:** 0 direkte Rohwerte in Komponenten‑Styles (Farben/Abstände/Schriften/Schatten/Motion/Border).
* [ ] **Kontrast:** Text AA (4.5:1), Large Text 3:1, Non‑Text 3:1 erfüllt; dokumentierte Messungen vorhanden.
* [ ] **Dark Mode:** Vollständig gemappt, getestet (Screenshots/Stories), keine Kontrast‑Regressionen.
* [ ] **States:** Buttons/Inputs/Modals haben Hover/Active/Focus‑Visible/Disabled/Loading/Valid/Error.
* [ ] **A11y‑Flows:** Fokusreihenfolge logisch; Modals mit initialem Fokus; ESC schließt; Hintergrund inert; Reduced‑Motion.
* [ ] **Storybook:** Komponenten dokumentiert inkl. Controls & A11y‑Tests; visuelle Snapshots grün.
* [ ] **CI/Tooling:** Stylelint Token‑Regeln scharf; axe/Lighthouse/Chromatic integriert; Build grün.
* [ ] **Dokumente:** `CHANGELOG.md` (SemVer), `MIGRATION.md`, Berichte in `/reports`.

---

## 4) Hinweise zur Projektspezifik

* **Tailwind vorhanden?**: Mappe Tailwind‑Theme auf CSS‑Variablen (z. B. via `:root { --color-... }`, dann in Tailwind `theme.extend.colors` → `rgb(var(--...))`).
* **CSS‑in‑JS?**: Sichere durch ESLint/linters, dass keine Rohwerte in Styles landen (Custom rule/ban‑lists).
* **SSR/Next.js?**: Dark‑Mode‑FOUC vermeiden (SSR‑Klasse am `<html>` vor Hydration setzen); bevorzugt System‑Theme default + Persistenz.

---

## 5) Output & Abgabeformat

* **Pull Request(s)** mit sinnvollen Commits (Conventional Commits).
* **Berichte** in `/reports`.
* **Screenshots** (Before/After, Light/Dark) in `/reports/screens`.
* **Storybook Build** (z. B. `/storybook-static`) als Artefakt.
* **Automatisierte Checks**: CI‑Logs/Artefakte beilegen.

---

## 6) Bonus (optional, wenn passend)

* **Design Token Export** (JSON/Style‑Dictionary) → Cross‑Plattform Nutzung (Web/App).
* **Theming Switcher** Komponente (UI) inkl. persistenter User‑Präferenz.
* **Playwright** E2E‑Smoke für zentrale Flows (inkl. A11y Assertions, Tab‑Order, ESC‑Close Modal).

---

> **Kurzfassung für Start:**
>
> 1. Projekt scannen → `/reports/*.md` erzeugen.
> 2. `/src/styles/tokens.css` (Primitiv+Semantik) + `.dark` anlegen.
> 3. Grid/Utilities bereitstellen.
> 4. Buttons/Inputs/Cards/Modals refaktorieren (States/A11y).
> 5. Stylelint/Storybook/axe/Chromatic integrieren.
> 6. Migration/Changelog/Version bump (SemVer) abschließen.
