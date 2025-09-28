got it — du willst, dass **CodecCLI** dir eine **bahnbrechende, perfekt abgestimmte UI** baut. Aktuell wirken die Sektionen unharmonisch, zu verspielt und „passen nicht zusammen“.
Hier sind zwei Dinge, die ich dir direkt liefere:

1. **Ein fertig formulierter Auftrag („Master-Brief“) für CodecCLI** – einfach reinkopieren.
2. **Konkrete technische Leitplanken** (Design-System, Tailwind-Tokens, Grid, Typo, Beispiel-Sektionen mit shadcn/ui), damit das Ergebnis konsistent und produktionstauglich wird.

---

## 1) Master-Brief für CodecCLI (zum Einsetzen)

> **Ziel:** Entwickle für **k2-energie** eine moderne, ruhige und hochwertige UI, die **präzise und konsistent** wirkt – nicht verspielt.
> **Stilworte:** klar, technisch-vertraulich, nachhaltig, vertrauenswürdig, minimalistisch, editorial touch.
> **Prioritäten:** visuelle Kohärenz > Lesbarkeit > Hierarchie > Eleganz > Verspieltheit (0%).
> **Kontrast & Zugänglichkeit:** min. WCAG AA; kein „low contrast“ Flächen-Text.
> **Layout-Rhythmus:** durchgehendes 12-Spalten-Grid, konsistente Container-Breiten, einheitliche vertikale Abstände.
> **Komponenten:** Hero, Value/Features, Referenzen/Logos, Stats, Blog/Insights, FAQ, CTA, Footer – **alle** strikt nach Design-System-Tokens.
> **Vermeidungen:** wechselnde Fontgrößen ohne System, bunte Illustrations-Mischung, „Kartensalat“, inkonsistente Paddings/Margins, Schatten-Zufall.
> **Abnahme:** siehe „Acceptance Criteria & Review-Checkliste“ unten (muss erfüllt sein).

**Lieferobjekte von CodecCLI**

* UI-Design mit systematischen **Design-Tokens** (Farben, Typo, Radius, Spacing, Shadows).
* Komponentenbibliothek (shadcn/ui-konform).
* Responsive Layouts inkl. States (hover/focus/active/disabled) und Dark Mode.
* Dokumentation (1-Pager) zur Anwendung der Tokens & Sektionen.

---

## 2) Technische Leitplanken (Next.js + Tailwind + shadcn/ui)

### 2.1 Design-Tokens (Tailwind Theme)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  content: [
    "./apps/web/app/**/*.{ts,tsx}",
    "./apps/web/components/**/*.{ts,tsx}",
    "./packages/ui/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1320px" }
    },
    extend: {
      colors: {
        // Ruhiges, technisches Schema für k2-energie
        brand: {
          50:"#f1f6f6",100:"#dfeeee",200:"#c0ddde",300:"#95c6c9",
          400:"#63a8ad",500:"#3f8f95",600:"#2f737a",700:"#285e64",
          800:"#234c51",900:"#1f4045"
        },
        accent: {
          50:"#fff7ea",100:"#ffeaca",200:"#ffd394",300:"#ffb75a",
          400:"#ff9a2a",500:"#f27f00",600:"#cc6400",700:"#a44f00",
          800:"#7d3c00",900:"#5f2e00"
        },
        // neutrale Flächen
        neutral: {
          50:"#f7f8f9",100:"#f1f3f5",200:"#e6e9ee",300:"#d6dbe2",
          400:"#aeb6c2",500:"#7c8798",600:"#5a6576",700:"#444e5b",
          800:"#2f3742",900:"#1f252d"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["SF Pro Display", "Inter", "ui-sans-serif", "system-ui"]
      },
      fontSize: {
        // max 5 Hierarchie-Stufen
        xs:["12px","18px"],
        sm:["14px","22px"],
        base:["16px","24px"],
        lg:["18px","28px"],
        xl:["20px","30px"],
        "2xl":["24px","32px"],
        "3xl":["30px","38px"],
        "4xl":["36px","44px"],
      },
      spacing: { // 4er-Raster
        0: "0px", 1:"4px", 2:"8px", 3:"12px", 4:"16px", 6:"24px", 8:"32px",
        10:"40px", 12:"48px", 16:"64px", 20:"80px", 24:"96px", 32:"128px"
      },
      borderRadius: { sm:"6px", md:"10px", lg:"14px", xl:"20px", "2xl":"28px" },
      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.05)",
        card: "0 6px 20px rgba(17,24,39,0.08)",
        focus: "0 0 0 3px rgba(99,168,173,0.35)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config
```

**Regeln**

* **Max. 5 Fontgrößen im Fließlayout** (Base, lg, xl, 2xl, 3xl). 4xl nur für Hero.
* **Ein Schatten-Stil pro Ebene** (z. B. `shadow-card` für Karten, sonst `shadow-none`).
* **Ein Radius-Stil pro Komponententyp** (Buttons `md`, Cards `lg`, Container `xl`).
* **Einheitliche vertikale Abstände** zwischen Sektionen: `py-20` (mobil `py-12`).

---

### 2.2 Layout-Grid & Rhythmus

* **Grid:** 12 Spalten, Gutters 24px (Tailwind `gap-6`).
* **Container:** `container max-w-[1200px]` (2xl: 1320 px) – überall gleich.
* **Sektionen:** Struktur: **Intro → Content → Evidence → CTA**.
* **Vertikale Rhythmen:**

  * Überschrift zu Lead: `mt-4`
  * Lead zu Inhalt: `mt-6`
  * Karten-Rows: `mt-10`
  * Sektion zu Sektion: `mt-20`

---

### 2.3 Harmonisierung der Sektionen (Praxisregeln)

* **Typo-Mix vermeiden**: H1 nur `text-4xl md:text-5xl`, H2 `text-3xl`, H3 `text-2xl`.
* **Farbdisziplin**: Primär = `brand.700/800`, Akzent nur für **CTAs** (`accent.500/600`).
* **Illustrationen/Icons**: konsistenter Stil (Linien-Icons/Lucide; keine gemischten Cartoon-Stile).
* **Whitespace zuerst**: wenn etwas „verspielt“ wirkt, **Abstände reduzieren & Ausrichtung links**.
* **Max. 2 Kartendesigns** site-weit (z. B. „Flat“ & „Outlined“).

---

### 2.4 Beispiel-Sektionen (shadcn/ui + Tailwind)

**Hero (ruhig, fokussiert):**

```tsx
// apps/web/components/sections/Hero.tsx
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="container py-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl text-neutral-900">
            Saubere Energie. Präzise geliefert.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            k2-energie verbindet Technologie mit Verantwortung – für planbare, transparente Energieprojekte.
          </p>
          <div className="mt-8 flex gap-4">
            <Button className="bg-brand-700 hover:bg-brand-800">Jetzt beraten lassen</Button>
            <Button variant="outline" className="border-neutral-300">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Feature-Row (strukturiert, dreispaltig):**

```tsx
// apps/web/components/sections/Features.tsx
import { Leaf, Gauge, LineChart } from "lucide-react"

const items = [
  { icon: Leaf, title: "Nachhaltig geplant", text: "CO₂-Transparenz und Lifecycle-Denken ab Tag 1." },
  { icon: Gauge, title: "Effizient im Betrieb", text: "Messbare KPIs, klare SLAs, geringe OPEX." },
  { icon: LineChart, title: "Skalierbar", text: "Modular, erweiterbar, netzwerkfähig." },
]

export function Features() {
  return (
    <section>
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-neutral-900">Werte, die tragen</h2>
          <p className="mt-4 text-neutral-700">
            Klare Entscheidungen durch verlässliche Daten und robuste Prozesse.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-neutral-200 bg-white p-8 shadow-subtle">
              <Icon className="h-6 w-6 text-brand-700" />
              <h3 className="mt-4 text-xl text-neutral-900">{title}</h3>
              <p className="mt-2 text-neutral-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**CTA (akzentuiert, aber nicht verspielt):**

```tsx
// apps/web/components/sections/CTA.tsx
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="bg-brand-800 text-white">
      <div className="container py-16">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl">Projekt starten?</h3>
            <p className="mt-2 text-white/80">Lassen Sie uns über Ziele, Budget und Roadmap sprechen.</p>
          </div>
          <Button variant="secondary" className="bg-white text-brand-800 hover:bg-neutral-100">
            Termin vereinbaren
          </Button>
        </div>
      </div>
    </section>
  )
}
```

**Sektionseinbindung (Consistency by default):**

```tsx
// apps/web/app/page.tsx
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { CTA } from "@/components/sections/CTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      {/* weitere harmonisierte Sektionen hier */}
      <CTA />
    </>
  )
}
```

---

### 2.5 Acceptance Criteria & Review-Checkliste (gegen „verspielt“)

* **Typografie:** max. 5 Größen im Fluss, konsistente Heading-Abstände (H1/H2/H3).
* **Farben:** Primär = Brand, Akzent nur für CTA/Interaktion, Flächen in Neutral-Tönen.
* **Abstände:** Sektionen `py-20` (mobil `py-12`), interne Vertikalabstände nach Schema.
* **Komponenten:** exakt 1 Card-Stil site-weit (oder 2, wenn dokumentiert).
* **Icons/Illustrationen:** einheitlicher Stil (Lucide-Line), Größen 24–32px.
* **Zugänglichkeit:** Kontrast AA+, Fokus-Ring gut sichtbar (`shadow-focus` oder `outline`).
* **Responsiveness:** Brüche bei `md`, `lg`, `xl` getestet; keine Layout-Sprünge.
* **Dark Mode (optional):** invertierte Paletten mit gleicher Hierarchie.
* **Performance:** CWV-freundlich (Fonts mit `display: swap`, keine übergroßen Bilder).

Wenn ein Punkt nicht erfüllt ist → **Revision**. Erst wenn alle Häkchen gesetzt sind, gilt „passt zusammen“.

---

### 2.6 Sanity-Bezug (Content wirkt oft „verspielt“)

* **Portable Text Richtlinien**:

  * Zulassen: `h2`, `h3`, `normal`, `blockquote`, `ul/ol`, **ohne** Inline-Farbwechsel.
  * Max. Bildbreite und Ratio definieren (z. B. 3:2, 16:9), Caption-Stile festlegen.
* **Rich-Text-Renderer** in Next.js: mappe Stile **auf feste Tailwind-Klassen** (kein Inline-Chaos).
* **Bild-Policy:** nur Sanity-Assets; `next/image` mit erlaubten Domains (siehe `next.config.js`).

---

### 2.7 Mini-Governance (damit es konsistent bleibt)

* **UI-Linting:** Storybook „Design-Token-Enforcer“ (oder einfacher: eine Checkliste in PR-Template).
* **PR-Template**: Abschnitt „UI Consistency“ mit 6 Fragen (Typo/Spacing/Color/Contrast/State/Responsive).
* **Screenshots-Pflicht** in PRs (Desktop + Mobile).

---

## Nächster Schritt (empfohlen)

Ich kann dir jetzt eine **kurze „UI-Harmonisierung“ für eure bestehenden Seiten** liefern:

* Mapping von IST-Sektionen → SOLL-Sektionen (Hero, Value, Evidence, CTA)
* Konkrete Klassenänderungen (vorher/nachher)
* 1-seitiges „Tone & Composition“-Poster (als Markdown oder PDF)

Sag einfach „**Harmonisiere Startseite**“ (oder nenne eine Seite/Route), und ich liefere dir direkt die Änderungen in Codeform.
