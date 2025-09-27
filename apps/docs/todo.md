// /sanity/migrate-from-demo.ts
/**
 * Idempotente Migration vom Demo-Setup zur Ziel-Struktur:
 * - legt fehlende Singletons mit stabilen IDs an
 * - erzeugt (falls nicht vorhanden) Beispiel-Listenitems für services, projects, team, jobs
 * - erzeugt Header/Footer-Navigation gemäß neuem Modell
 *
 * Ausführen:
 *   SANITY_WRITE_TOKEN=xxx ts-node sanity/migrate-from-demo.ts
 */
import {createClient} from '@sanity/client'
import {v4 as uuid} from 'uuid'

const projectId = process.env.SANITY_PROJECT_ID || 'yourProjectId'
const dataset = process.env.SANITY_DATASET || 'yourDataset'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
})

const singletonIds = {
  homePage: 'homePage',
  companyPage: 'companyPage',
  jobsIndexPage: 'jobsIndexPage',
  contactPage: 'contactPage',
  siteSettings: 'siteSettings',
}

async function ensure(doc: any) {
  const existing = await client.fetch(`*[_id==$id][0]`, {id: doc._id})
  if (existing) return existing
  return client.create(doc)
}

async function ensureByType(type: string, querySlug: string, doc: any) {
  const existing = await client.fetch(`*[_type==$t && slug.current==$s][0]`, {t: type, s: querySlug})
  if (existing) return existing
  return client.create(doc)
}

async function run() {
  // --- Singletons ---
  await ensure({_id: singletonIds.homePage, _type: 'homePage', title: 'Startseite'})
  await ensure({_id: singletonIds.companyPage, _type: 'companyPage', title: 'Unternehmen'})
  await ensure({_id: singletonIds.jobsIndexPage, _type: 'jobsIndexPage', title: 'Karriere', openApplicationEmail: 'jobs@example.com'})
  await ensure({_id: singletonIds.contactPage, _type: 'contactPage', title: 'Kontakt'})
  await ensure({_id: singletonIds.siteSettings, _type: 'siteSettings', siteTitle: 'Demo Site', siteDescription: 'Placeholder'})

  // --- Services (3 Beispiel) ---
  const s1 = await ensureByType('service', 'beratung', {_type: 'service', title: 'Beratung', slug: {current: 'beratung'}, teaser: 'Wir beraten kompetent.'})
  const s2 = await ensureByType('service', 'entwicklung', {_type: 'service', title: 'Entwicklung', slug: {current: 'entwicklung'}, teaser: 'Wir entwickeln Lösungen.'})
  const s3 = await ensureByType('service', 'support', {_type: 'service', title: 'Support', slug: {current: 'support'}, teaser: 'Wir unterstützen Sie.'})

  // --- Projects (3 Beispiel) ---
  const p1 = await ensureByType('project', 'projekt-alpha', {_type: 'project', title: 'Projekt Alpha', slug: {current: 'projekt-alpha'}, summary: 'Ein Beispielprojekt.', date: '2024-01-15'})
  const p2 = await ensureByType('project', 'projekt-beta', {_type: 'project', title: 'Projekt Beta', slug: {current: 'projekt-beta'}, summary: 'Noch ein Beispiel.', date: '2024-06-20'})
  const p3 = await ensureByType('project', 'projekt-gamma', {_type: 'project', title: 'Projekt Gamma', slug: {current: 'projekt-gamma'}, summary: 'Drittes Beispiel.', date: '2025-03-05'})

  // --- Team (3 Beispiel) ---
  await ensureByType('teamMember', 'max-mustermann', {_type: 'teamMember', name: 'Max Mustermann', slug: {current: 'max-mustermann'}, role: 'CEO'})
  await ensureByType('teamMember', 'erika-muster', {_type: 'teamMember', name: 'Erika Muster', slug: {current: 'erika-muster'}, role: 'CTO'})
  await ensureByType('teamMember', 'lukas-beispiel', {_type: 'teamMember', name: 'Lukas Beispiel', slug: {current: 'lukas-beispiel'}, role: 'Designer'})

  // --- Jobs (3 Beispiel) ---
  await ensureByType('jobPosting', 'frontend-developer', {_type: 'jobPosting', title: 'Frontend Developer (m/w/d)', slug: {current: 'frontend-developer'}, location: 'Remote', employmentType: 'Full-time', published: true})
  await ensureByType('jobPosting', 'backend-developer', {_type: 'jobPosting', title: 'Backend Developer (m/w/d)', slug: {current: 'backend-developer'}, location: 'Berlin', employmentType: 'Full-time', published: true})
  await ensureByType('jobPosting', 'werkstudent', {_type: 'jobPosting', title: 'Werkstudent:in', slug: {current: 'werkstudent'}, location: 'Berlin', employmentType: 'Part-time', published: true})

  // --- Legal pages ---
  const ensureLegal = async (slug: string, title: string, category: 'impressum'|'datenschutz'|'agb') =>
    ensureByType('legalPage', slug, {
      _type: 'legalPage',
      title,
      slug: {current: slug},
      category,
      content: [{_type: 'block', _key: uuid(), children: [{_type: 'span', text: `${title} Platzhalter.`}]}],
    })

  const lp1 = await ensureLegal('impressum', 'Impressum', 'impressum')
  const lp2 = await ensureLegal('datenschutz', 'Datenschutz', 'datenschutz')
  const lp3 = await ensureLegal('agb', 'AGB', 'agb')

  // --- Navigation (Header & Footer) ---
  // Duplikate vermeiden: existierende nach Titel/Location prüfen
  const navBy = async (title: string, location: 'header'|'footer') =>
    client.fetch(`*[_type=="navigationItem" && title==$t && location==$l][0]`, {t: title, l: location})

  async function ensureNav(item: any) {
    const ex = await navBy(item.title, item.location)
    if (ex) return ex
    return client.create(item)
  }

  await ensureNav({_type: 'navigationItem', title: 'Home', kind: 'internal', internal: {_type: 'reference', _ref: singletonIds.homePage}, location: 'header', order: 0})
  await ensureNav({_type: 'navigationItem', title: 'Leistungen', kind: 'internal', internal: {_type: 'reference', _ref: s1._id}, location: 'header', order: 1})
  await ensureNav({_type: 'navigationItem', title: 'Projekte', kind: 'internal', internal: {_type: 'reference', _ref: p1._id}, location: 'header', order: 2})
  await ensureNav({_type: 'navigationItem', title: 'Unternehmen', kind: 'internal', internal: {_type: 'reference', _ref: singletonIds.companyPage}, location: 'header', order: 3})
  await ensureNav({_type: 'navigationItem', title: 'Karriere', kind: 'internal', internal: {_type: 'reference', _ref: singletonIds.jobsIndexPage}, location: 'header', order: 4})
  await ensureNav({_type: 'navigationItem', title: 'Kontakt', kind: 'internal', internal: {_type: 'reference', _ref: singletonIds.contactPage}, location: 'header', order: 5})

  await ensureNav({_type: 'navigationItem', title: 'Impressum', kind: 'internal', internal: {_type: 'reference', _ref: lp1._id}, location: 'footer', order: 0})
  await ensureNav({_type: 'navigationItem', title: 'Datenschutz', kind: 'internal', internal: {_type: 'reference', _ref: lp2._id}, location: 'footer', order: 1})
  await ensureNav({_type: 'navigationItem', title: 'AGB', kind: 'internal', internal: {_type: 'reference', _ref: lp3._id}, location: 'footer', order: 2})

  // --- Home: featured Verknüpfen (non-destructive Patch) ---
  await client
    .patch(singletonIds.homePage)
    .setIfMissing({featuredServices: [], featuredProjects: []})
    .insert('replace', ['featuredServices'], [
      {_type: 'reference', _ref: s1._id},
      {_type: 'reference', _ref: s2._id},
      {_type: 'reference', _ref: s3._id},
    ])
    .insert('replace', ['featuredProjects'], [
      {_type: 'reference', _ref: p1._id},
      {_type: 'reference', _ref: p2._id},
      {_type: 'reference', _ref: p3._id},
    ])
    .commit({autoGenerateArrayKeys: true})

  console.log('✅ Migration/Seed ergänzt.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
```

```json
// package.json – Skripte ergänzen
{
  "scripts": {
    "dev": "sanity dev --cwd sanity",
    "build": "sanity build --cwd sanity",
    "deploy": "sanity deploy --cwd sanity",
    "seed": "ts-node sanity/seed.ts",
    "migrate": "ts-node sanity/migrate-from-demo.ts"
  }
}
```

```env
# .env.local (Beispiel)
SANITY_PROJECT_ID=yourProjectId
SANITY_DATASET=yourDataset
SANITY_WRITE_TOKEN=xxxxxx
```

````md
### Kurzanleitung (wenn Demo bereits läuft)

1. Obige Dateien hinzufügen (`/sanity/migrate-from-demo.ts`, Skripte & .env).
2. Prüfe, dass deine Schemas/Structure bereits den **Singleton-Schutz** enthalten:
   - `templates: (prev) => prev.filter(...)`
   - `document.actions: (prev, ctx) => ...` (duplicate/delete für Singletons filtern)
3. Migration ausführen:
   ```bash
   pnpm migrate
````

4. Studio neustarten:

   ```bash
   pnpm dev
   ```
5. Im Studio: Inhalte unter **Inhalt** & **Einstellungen** prüfen (Header/Footer-Navigation, Singletons geöffnet).

```

Wenn du magst, passe ich das Skript noch so an, dass es vorhandene **Demo-Dokumente** in die neuen Typen **migriert** (z. B. Copy von Feldern), statt nur Platzhalter zu setzen.
```
