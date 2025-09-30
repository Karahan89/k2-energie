# **Styleguide: K2 Energieberatung**

**Version: 1.3.2 | Letzte Aktualisierung: 30. September 2025**

### **Änderungsprotokoll (Changelog)**

*   Dieses Protokoll folgt den Konventionen von [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
*   Das Projekt verwendet [Semantic Versioning](https://semver.org/lang/de/) (MAJOR.MINOR.PATCH).

#### **[1.3.2] - 2025-09-30**
##### **Added**
*   **Section Layout Pattern:** Dokumentiert den neuen Stack (`AuroraSection` → `layout-shell` → `content-readable` / Grid).
*   **PageBuilder Leitplanken:** Empfohlene Block-Reihenfolge für Service-Seiten aufgenommen.

##### **Changed**
*   **Neue Blöcke:** `standardsBadge`, `processGrid`, `fundingTeaser`, `caseStudyCompact`, `contactCta`, `serviceList` nutzen nun die globale Typo- und Abstands-Skala.
*   **Service-Detailseiten:** Doppelter Hero entfernt – die Seite zeigt ausschließlich die PageBuilder-Blöcke.

##### **Fixed**
*   Containerbreite & Typografie der neuen Sections entsprechen den Bestandsseiten.

#### **[1.3.1] - 2025-09-28**
##### **Added**
*   **Token-Architektur:** Neue Token-Kategorien für `Elevation/Shadow`, `Border-Widths` und `Motion`.
*   **Accessibility:** Eigener Abschnitt für **Non-Text Contrast (WCAG 1.4.11)** mit Code-Beispiel.
*   **Tools:** Empfehlung des WebAIM Contrast Checkers zur Validierung.

##### **Changed**
*   **Farben:** Farb-Tabelle präzisiert mit expliziten WCAG-Leveln (AA/AAA).
*   **Modals:** Empfehlung und Code-Beispiel auf das native HTML `<dialog>`-Element umgestellt, um `inert` automatisch zu nutzen.
*   **Reduced Motion:** Hinweis auf `Sec-CH-Prefers-Reduced-Motion` und Abgrenzung zu WCAG 2.2.2 ergänzt.

##### **Fixed**
*   Formatierung in allen CSS-Code-Blöcken korrigiert, um Rendering-Probleme zu vermeiden.
*   Token-Nomenklatur vereinheitlicht (durchgehend `--color-*`).

---

## **2. Design Tokens: Die Sprache unseres Designs**

#### **Token-Architektur im Überblick**
Unsere Architektur folgt einer klaren Hierarchie, um maximale Flexibilität und Wartbarkeit zu gewährleisten.

| Ebene | Token-Art | Zweck | Beispiel |
| :--- | :--- | :--- | :--- |
| **1** | **Primitiv** | Roher, kontextloser Wert | `--green-500: #4A8B68;` |
| **2** | **Semantisch**| Beschreibt den Anwendungszweck | `--color-text-brand: var(--green-500);`|
| **3** | **Komponente**| Spezifisch für eine Komponente | `--button-primary-background: var(--color-interactive-cta);`|

### **🎨 Farb-Tokens**

#### **Semantische Farb-Tokens & WCAG-Konformität**
Jeder semantische Token muss im Kontext seines Hintergrunds bewertet werden.

| Rolle | Token | Referenz | Kontrast (auf `--color-background-base`) | WCAG Level |
| :--- | :--- | :--- | :--- | :--- |
| **Text (Basis)** | `--color-text-base` | `var(--grey-900)` | 21:1 | **AAA** |
| **Text (Marke)** | `--color-text-brand` | `var(--green-500)` | 4.81:1 | **AA** |
| **Interaktiv (CTA)**| `--color-interactive-cta`|`var(--amber-500)` | 4.55:1 | **AA** |

**Praxis-Hinweis:** Validieren Sie Farb-Kombinationen immer mit einem Tool wie dem [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), da der tatsächliche Hintergrund entscheidend ist.

#### **Non-Text Contrast (WCAG 1.4.11)**
UI-Elemente wie Ränder von Formularfeldern oder Icons benötigen ein Kontrastverhältnis von **mindestens 3:1** zu ihrer direkten Umgebung.

```css
/* Beispiel: Input-Rahmen für 1.4.11 Non-text Contrast (AA) */
.form-input {
  /* Stellt sicher, dass der Rand sich vom Hintergrund abhebt (≥ 3:1) */
  border: 1px solid var(--color-border-muted);
}
.form-input:focus-visible {
  /* Der Fokus-Indikator muss sich ebenfalls vom Hintergrund abheben (≥ 3:1) */
  outline: 2px solid var(--color-status-info);
  outline-offset: 2px;
}
```

### **Weitere Primitive Token-Kategorien**

#### **Elevation & Schatten Tokens**
Definieren die Tiefe von Elementen.
```css
:root {
  --shadow-1: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-2: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-3: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

#### **Border & Outline Tokens**
Definieren die Stärke von Rändern.
```css
:root {
  --border-width-1: 1px;
  --border-width-2: 2px;
}
```

#### **Motion Tokens**
Definieren die Geschwindigkeit und Art von Animationen.
```css
:root {
  --duration-fast: 0.15s;
  --duration-base: 0.25s;
  --easing-ease-out: cubic-bezier(0.2, 0, 0, 1);
}
```

## **3. Layout & Struktur**

### **Globale Shell-Klassen**

| Ebene | Klasse / Komponente | Aufgabe |
| :--- | :--- | :--- |
| 1 | `.k2-page` | Wird im `RootLayout` gesetzt und definiert Layout-Variablen wie `--section-y`, `--container-x`, Typo- und Shadow-Tokens. |
| 2 | `AuroraSection` | Section-Komponente mit optionalen Aurora-Hintergründen, Dividern und Dark-Mode-Unterstützung. Nutzt `variant` (`hero`, `muted`, `default`). |
| 3 | `.layout-shell` | Zentriert Inhalte, `max-width: var(--page-max-width)` und responsives Padding via `clamp(1rem, 4vw, 2.5rem)`. |
| 4 | `.content-readable` | Begrenzte Textbreite (≈ 68ch) für Copy. Nutzt globale Typo-Skala. |
| 5 | `.grid` / `.k2-split` | 12-Spalten-Aufteilung für Zwei-Spalter und Feature-Cluster. |

```tsx
<AuroraSection variant="muted" withTopDivider withBottomDivider>
  <div className="layout-shell space-y-[var(--space-8)]">
    <div className="content-readable mx-auto text-center space-y-[var(--space-3)]">
      <h2>Relevante Normen</h2>
      <p>Beschreibung …</p>
    </div>
    <div className="grid gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
      {/* Cards */}
    </div>
  </div>
</AuroraSection>
```

> **Faustregel:** Neue Sections erhalten automatisch den richtigen vertikalen Rhythmus, wenn sie `AuroraSection` + `layout-shell` verwenden. Keine zusätzlichen `px-*` oder `max-w-*` Klassen in den Section-Komponenten vergeben.

### **Typografie & Tokens**

* Überschriften (`h1–h3`) nutzen ausschließlich die globalen Steps `var(--step-*)`.
* Fließtexte sollten innerhalb von `.content-readable` oder `text-pretty` leben.
* Buttons/Badges referenzieren semantische Farben (`--color-brand-primary-*`) und nicht harte HEX-Werte.

### **PageBuilder-Blocks**

Die Service-Seiten setzen auf folgende Block-Abfolge:

1. `hero`
2. `standardsBadge`
3. `fundingTeaser`
4. optional `processGrid`
5. optional `caseStudyCompact`
6. `faqAccordion`
7. `contactCta`

Jeder Block bringt seine eigene Section mit. Bitte keine zusätzlichen Wrapper im Richtext pflegen.

## **4. Komponenten**

### **Modals (Dialoge) - Der Standardweg mit `<dialog>`**

Für maximale Barrierefreiheit und minimalen Aufwand ist das native HTML `<dialog>`-Element der empfohlene Standard. Der Browser handhabt die Fokusfalle und macht den Rest der Seite via `inert` automatisch unzugänglich.

```html
<button id="open-modal">Kontakt aufnehmen</button>

<dialog id="contact-modal" aria-labelledby="modal-title">
  <h2 id="modal-title">Kontakt</h2>
  <p>Hier steht der Inhalt des Modals.</p>
  <button id="close-modal">Schließen</button>
</dialog>

<script>
  const modal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');

  openBtn.addEventListener('click', () => {
    modal.showModal(); // Öffnet das Modal und macht den Hintergrund inert
  });

  closeBtn.addEventListener('click', () => {
    modal.close(); // Schließt das Modal
  });
</script>
```
**Hinweis:** Für ältere Browser oder komplexe Custom-Overlays muss das `inert`-Attribut manuell auf die Hintergrundelemente gesetzt werden.

## **5. Barrierefreiheit (Accessibility)**

### **Reduzierte Bewegung**
Unser CSS-Snippet ist die Basis. Beachten Sie zusätzlich:
*   **Server-seitige Hinweise:** Moderne Infrastrukturen können den `Sec-CH-Prefers-Reduced-Motion`-Header nutzen, um serverseitig angepasste, animationsfreie Versionen auszuliefern.
*   **Abgrenzung:** `prefers-reduced-motion` reduziert oder deaktiviert Animationen. Dies ist nicht dasselbe wie WCAG 2.2.2 (Pause, Stop, Hide), welches verlangt, dass Nutzer:innen bewegte Inhalte (z.B. Karussells) explizit stoppen können müssen.

### **Erweiterte A11y-Checkliste**
- [ ] **Textkontrast:** Erfüllt AA (4.5:1) oder AAA (7:1) je nach Anforderung.
- [ ] **Non-Text-Kontrast:** UI-Komponenten (Rahmen, Icons, Schalter) haben ≥ 3:1.
- [ ] **Modals & Overlays:** Fokus ist gefangen, initialer Fokus ist gesetzt, Hintergrund ist `inert`.
- [ ] **Bewegung:** `prefers-reduced-motion` wird respektiert; essenzielle Informationen werden nicht nur durch Bewegung vermittelt.

## **6. Governance & Workflow**

### **Tools & Automatisierung**
*   **Token-Erzwingung mit Stylelint:** Die [stylelint-declaration-strict-value](https://github.com/Andy-set-studio/stylelint-declaration-strict-value)-Regel ist in unserer Konfiguration aktiv.
    *   **Hinweis:** Linting-Regeln, die auf viele Eigenschaften angewendet werden, können die Performance des Build-Prozesses geringfügig beeinflussen. Die Konfiguration sollte gezielt auf Token-relevante Eigenschaften beschränkt werden.
