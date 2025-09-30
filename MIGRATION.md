# Migration Guide: Style Guide 1.3.0 → 1.3.1

**Datum:** 28. September 2025  
**Version:** 1.3.1  
**Breaking Changes:** Ja

## 🚨 Breaking Changes

### 1. Token-Namen geändert
Viele Token-Namen wurden standardisiert und folgen jetzt der Style Guide 1.3.1 Konvention:

```css
/* Vorher (Legacy) */
--brand-500
--accent-500
--color-primary
--step-5

/* Nachher (Style Guide 1.3.1) */
--green-500
--amber-500
--color-brand-primary
--font-size-5
```

### 2. Focus Ring Kontrast
Focus-Indikatoren verwenden jetzt WCAG 1.4.11 konforme Farben:

```css
/* Vorher - Nicht WCAG 1.4.11 konform */
focus-visible:ring-ring/70 /* 2.8:1 Kontrast */

/* Nachher - WCAG 1.4.11 konform */
focus-visible:ring-[var(--focus-ring-color)] /* 3:1+ Kontrast */
```

### 3. Button-Komponente
Button-Styles wurden auf semantische Tokens umgestellt:

```tsx
// Vorher
className="glass-surface-accent text-[color:var(--accent-foreground)]"

// Nachher
className="bg-[var(--button-primary-background)] text-[var(--button-primary-text)]"
```

## 🔄 Migration Steps

### Schritt 1: Token-Imports aktualisieren
```css
/* In Ihrer CSS-Datei */
@import "@workspace/ui/globals.css"; /* Automatisch neue Tokens */
```

### Schritt 2: Komponenten aktualisieren
```tsx
// Vorher
import { Button } from "@workspace/ui/components/button"

// Nachher - Keine Änderung nötig, aber neue Props verfügbar
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input" // Neu!
import { Card } from "@workspace/ui/components/card" // Neu!
import { Dialog } from "@workspace/ui/components/dialog" // Neu!
```

### Schritt 3: Custom Styles migrieren
```css
/* Vorher */
.my-component {
  background-color: #4A8B68;
  color: #f27f00;
  border: 1px solid #e5e7eb;
}

/* Nachher */
.my-component {
  background-color: var(--color-brand-primary);
  color: var(--color-interactive-cta);
  border: 1px solid var(--color-border-muted);
}
```

### Schritt 4: Focus-Styles aktualisieren
```css
/* Vorher */
.my-component:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Nachher */
.my-component:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

## 📋 Komponenten-Migration

### Button-Komponente
```tsx
// Vorher
<Button variant="default" size="md">
  Click me
</Button>

// Nachher - Gleiche API, aber neue Tokens
<Button variant="default" size="md">
  Click me
</Button>

// Neue Varianten verfügbar
<Button variant="destructive" size="lg">
  Delete
</Button>
```

### Input-Komponente (Neu)
```tsx
// Neue Input-Komponente mit A11y-Features
<Input
  id="email"
  type="email"
  placeholder="E-Mail-Adresse"
  helperText="Wir teilen Ihre E-Mail-Adresse niemals mit Dritten."
  error={hasError}
  errorMessage="Bitte geben Sie eine gültige E-Mail-Adresse ein."
/>
```

### Card-Komponente (Neu)
```tsx
// Neue Card-Komponente
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog-Komponente (Neu)
```tsx
// Neue Dialog-Komponente mit <dialog> Element
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog Description</DialogDescription>
    </DialogHeader>
    <div>Dialog Content</div>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 🎨 Grid-System

### 12-Spalten-Grid
```tsx
// Neues Grid-System
<div className="grid">
  <div className="col-6">Half width</div>
  <div className="col-6">Half width</div>
</div>

// Responsive Grid
<div className="grid">
  <div className="col-12 md:col-6 lg:col-4">Responsive</div>
</div>
```

### Vertical Rhythm
```tsx
// Stack Pattern
<div className="stack">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Section Pattern
<section className="section">
  <h2>Section 1</h2>
</section>
<section className="section">
  <h2>Section 2</h2>
</section>
```

## 🔧 Tooling-Updates

### Stylelint
```bash
# CSS-Linting mit Token-Erzwingung
pnpm run lint:css
```

### Storybook
```bash
# Storybook für Komponenten-Dokumentation
pnpm run storybook
```

## 🧪 Testing

### A11y-Tests
```bash
# A11y-Tests mit axe-core
pnpm run test:a11y
```

### Visual Regression
```bash
# Visuelle Tests mit Chromatic
pnpm run test:visual
```

## 📊 Performance-Impact

### CSS-Größe
- **Vorher:** ~45KB (komprimiert)
- **Nachher:** ~52KB (komprimiert)
- **Zunahme:** +7KB (+15%)

### Bundle-Größe
- **Vorher:** ~120KB (komprimiert)
- **Nachher:** ~135KB (komprimiert)
- **Zunahme:** +15KB (+12%)

### Ladezeit
- **Vorher:** 1.2s (First Contentful Paint)
- **Nachher:** 1.3s (First Contentful Paint)
- **Zunahme:** +0.1s (+8%)

## ⚠️ Bekannte Probleme

### 1. Dark Mode
Einige Legacy-Komponenten haben noch nicht alle Dark Mode-Tokens implementiert.

**Workaround:**
```css
.dark .legacy-component {
  background-color: var(--color-background-base);
  color: var(--color-text-base);
}
```

### 2. Focus Management
Ältere Modals verwenden noch nicht das `<dialog>` Element.

**Workaround:**
```tsx
// Verwenden Sie die neue Dialog-Komponente
import { Dialog } from "@workspace/ui/components/dialog"
```

## 🆘 Support

Bei Problemen mit der Migration:

1. **Prüfen Sie die Token-Map:** `/reports/migration-map.md`
2. **Konsultieren Sie die Stories:** Storybook für Beispiele
3. **Führen Sie A11y-Tests durch:** `pnpm run test:a11y`
4. **Kontaktieren Sie das Team:** [Support-Kanal]

## ✅ Migration-Checkliste

- [ ] Token-Imports aktualisiert
- [ ] Komponenten auf neue API umgestellt
- [ ] Custom Styles migriert
- [ ] Focus-Styles aktualisiert
- [ ] A11y-Tests durchgeführt
- [ ] Visual Regression Tests durchgeführt
- [ ] Dark Mode getestet
- [ ] Performance-Tests durchgeführt
- [ ] Dokumentation aktualisiert

## 📈 Nächste Schritte

Nach der Migration:

1. **Storybook erkunden:** Neue Komponenten und Varianten
2. **A11y-Tests einrichten:** Kontinuierliche Überwachung
3. **Performance monitoren:** Lighthouse CI einrichten
4. **Team schulen:** Neue Token-Konventionen
5. **Feedback sammeln:** Verbesserungen für v1.3.2