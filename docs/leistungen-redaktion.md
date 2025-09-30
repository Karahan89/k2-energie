# Redaktionsleitfaden Leistungen (WG / NWG / Anlagen & Prozesse)

Dieser Leitfaden unterstützt Redakteur:innen dabei, neue Leistungen in Sanity anzulegen und bestehende Inhalte zu pflegen. Grundlage sind die neuen Inhalte für Wohngebäude (WG), Nichtwohngebäude (NWG) sowie den Spezialbereich Anlagen & Prozesse.

## 1. Grundstruktur prüfen

- **Service-Kategorien** (`serviceCategory`): Wohngebäude, Nichtwohngebäude, Anlagen & Prozesse.
  - Jede Kategorie enthält einen Hero-Block, eine `serviceList` mit passenden Preset-Filtern und ein `contactCta`.
  - Änderungen an Beschreibung/Hero werden sofort auf den Kategorie-Seiten ausgespielt (`/leistungen/...`).
- **Services** werden als `serviceItem` gepflegt. Jede Detailseite rendert automatisch die in Sanity hinterlegten PageBuilder-Blöcke.

## 2. Checkliste: neuen Service anlegen

1. **Dokument erstellen:** `serviceItem` → „Neu“.
2. **Pflichtfelder ausfüllen:**
   - Titel, Slug (kebab-case, Umlaute ae/oe/ue, ß → ss).
   - Kurzbeschreibung (Teaser).
   - Icon (optional, für Kartenansicht).
   - Zielgruppe (`audience`: `wg` und/oder `nwg`).
   - Bereich (`domain`: `gebaeude`, `anlagen`, `prozesse`) – besonders wichtig für Anlagen & Prozesse.
   - Lebenszyklus (`neubau`, `bestand`) falls relevant.
   - Leistungstyp (`beratung`, `nachweis`, `foerderung`, `audit`, `zertifizierung`).
   - Kategorie-Referenz (`categoryRef`) auf Wohn-, Nichtwohn- oder Anlagen-/Prozesse-Kategorie.
   - Optional: Tags (SEO/Filter), „Hervorheben“ (für Teaser auf Übersichtsseiten).
3. **PageBuilder aufbauen** (reihenfolgeempfehlung):
   1. `hero` – kurze Nutzenargumentation, Features, Call-to-Action (Kontakt-Link `mailto:` oder `/kontakt`).
   2. `standardsBadge` – Normen, Gesetze, Richtlinien.
   3. `fundingTeaser` – Förderprogramme inkl. Quellenlink (BAFA/KfW).
   4. Optional: `processGrid` (für Anlagen & Prozesse) mit typischen Teilbereichen.
   5. Optional: `caseStudyCompact` – Referenzprojekt mit Kennzahlen.
   6. `faqAccordion` – FAQ-Dokumente auswählen (mind. drei). Neue FAQs können direkt im Studio angelegt werden.
   7. `contactCta` – Ansprechpartner:in, Telefon, Mail.
   > **Hinweis:** Alle genannten Blöcke bringen den korrekten Abschnitts-Wrapper (`AuroraSection`, `layout-shell`, `content-readable`) bereits mit. Bitte keine zusätzlichen manuellen Container im Richtext ergänzen.
4. **SEO-Felder:** `seoTitle`, `seoDescription` (falls nicht gesetzt → Title/Teaser fallback).
5. **Speichern** und ggf. zur Veröffentlichung freigeben.

## 3. FAQs verwalten

- Dokumenttyp `faq` enthält Frage (Titel), Antwort (Richtext), Kategorie (z. B. Förderung, Verfahren).
- FAQs können mehrfach verwendet werden. Beim Anlegen eines neuen Services lohnt es, bestehende FAQs wiederzuverwenden.

## 4. Kategorie-Seiten kuratieren

- In `serviceCategory` können zusätzliche Blöcke ergänzt werden (z. B. `caseStudyCompact`, `fundingTeaser`).
- Der `serviceList`-Block filtert serverseitig anhand der Preset-Felder:
  - Wohngebäude → `presetAudience: ["wg"]`
  - Nichtwohngebäude → `presetAudience: ["nwg"]`, `presetDomain: ["gebaeude","anlagen","prozesse"]`
  - Anlagen & Prozesse → `presetAudience: ["nwg"]`, `presetDomain: ["anlagen","prozesse"]`

## 5. Navigation & Footer

- Navigationseinträge pflegt das Dokument `navigationItem`. Für Unterpunkte z. B. „Wohngebäude“ → interner Link auf `serviceCategory` wählen (Slug wird automatisch gemappt).
- Footer-Quicklinks sollten mindestens Startseite, Leistungen, Wohngebäude, Nichtwohngebäude, Projekte, FAQ, Kontakt enthalten.

## 6. Seed-Skripte & Automatisierung

Zur lokalen Befüllung oder als Referenz können die Skripte im Studio-Projekt verwendet werden:

```bash
# Service-Kategorien + Services (WG/NWG/Anlagen & Prozesse) seeden
pnpm --filter studio exec tsx apps/studio/scripts/seed-service-items.ts
```

Das Skript legt/aktualisiert Kategorien, erstellt 12 Service-Dokumente inklusive PageBuilder-Blöcke (Hero, StandardsBadge, FundingTeaser, ggf. ProcessGrid, CaseStudy, FAQ, ContactCTA) sowie die zugehörigen FAQ-Dokumente.

> Hinweis: Vor dem Ausführen sicherstellen, dass `SANITY_WRITE_TOKEN` in `.env` hinterlegt ist. Die Seeds sind idempotent und überschreiben bestehende Inhalte mit denselben Slugs.

## 7. Qualitätssicherung

- Seiten regelmäßig in der Vorschau (`/?preview`) prüfen, ISR ist auf 60 Sekunden eingestellt.
- API `/api/services` bietet Filtermöglichkeiten (`audience`, `domain`, `lifecycle`, `serviceType`, `tags`, `featured`, `limit`).
- Bei neuen Services immer prüfen, ob die gewünschten Filter auf `/leistungen/...` greifen.

Viel Erfolg bei der Redaktion!
