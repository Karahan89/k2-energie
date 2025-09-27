import {createClient} from "@sanity/client";
import {config as loadEnv} from "dotenv";
import {resolve} from "node:path";
import {v4 as uuid} from "uuid";

const envFiles = [
  ".env",
  ".env.local",
  "apps/web/.env",
  "apps/web/.env.local",
  "apps/studio/.env",
  "apps/studio/.env.local",
];

for (const file of envFiles) {
  loadEnv({path: resolve(process.cwd(), file), override: true});
}

type EnsureArgs = Parameters<typeof createClient>[0];

type NavigationLocation = "header" | "footer";

type NavigationItem = {
  _type: "navigationItem";
  title: string;
  kind: "internal";
  internal: {_type: "reference"; _ref: string};
  location: NavigationLocation;
  order: number;
};

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "yourProjectId";
const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "yourDataset";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("❌ Missing SANITY_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
} satisfies EnsureArgs);

const singletonIds = {
  homePage: "homePage",
  companyPage: "companyPage",
  jobsIndexPage: "jobsIndexPage",
  contactPage: "contactPage",
  siteSettings: "siteSettings",
} as const;

type SingletonId = (typeof singletonIds)[keyof typeof singletonIds];

async function ensure(doc: {_id: SingletonId; _type: string; [key: string]: unknown}) {
  const existing = await client.fetch("*[_id==$id][0]", {id: doc._id});
  if (existing) return existing;
  return client.create(doc);
}

async function ensureByType<T extends {_type: string; slug?: {current: string}}>(
  type: string,
  querySlug: string,
  doc: T,
) {
  const existing = await client.fetch(
    "*[_type==$t && slug.current==$s][0]",
    {t: type, s: querySlug},
  );
  if (existing) return existing;
  return client.create(doc);
}

async function ensureNavigation(item: NavigationItem) {
  const existing = await client.fetch(
    '*[_type=="navigationItem" && title==$t && location==$l][0]',
    {t: item.title, l: item.location},
  );

  if (existing) {
    return existing;
  }

  return client.create(item);
}

async function run() {
  console.log("➡️  Running migration seed for demo content...");

  await ensure({
    _id: singletonIds.homePage,
    _type: "homePage",
    title: "Startseite",
    slug: { current: "/" },
  });
  await ensure({
    _id: singletonIds.companyPage,
    _type: "companyPage",
    title: "Unternehmen",
    description:
      "Alles über K2 Energieberatung – Team, Werte und unsere Arbeitsweise.",
    slug: { current: "/unternehmen" },
  });
  await ensure({
    _id: singletonIds.jobsIndexPage,
    _type: "jobsIndexPage",
    title: "Karriere",
    description:
      "Aktuelle Stellenangebote, Einstiegsmöglichkeiten und Informationen zur Arbeit bei K2 Energieberatung.",
    slug: { current: "/karriere" },
    openApplicationEmail: "jobs@example.com",
  });
  await ensure({
    _id: singletonIds.contactPage,
    _type: "contactPage",
    title: "Kontakt",
    description:
      "Nehmen Sie Kontakt auf für Beratung, Support oder Projektanfragen.",
    slug: { current: "/kontakt" },
  });
  await ensure({
    _id: singletonIds.siteSettings,
    _type: "siteSettings",
    label: "Site Settings",
    siteTitle: "Demo Site",
    siteDescription:
      "K2 Energieberatung – Beispielkonfiguration für die Migration vom Demo-Setup zur Zielstruktur.",
    contactEmail: "info@example.com",
  });

  const services = await Promise.all([
    ensureByType("service", "beratung", {
      _type: "service",
      title: "Beratung",
      slug: { current: "/leistungen/beratung" },
      teaser: "Wir beraten kompetent.",
    }),
    ensureByType("service", "entwicklung", {
      _type: "service",
      title: "Entwicklung",
      slug: { current: "/leistungen/entwicklung" },
      teaser: "Wir entwickeln Lösungen.",
    }),
    ensureByType("service", "support", {
      _type: "service",
      title: "Support",
      slug: { current: "/leistungen/support" },
      teaser: "Wir unterstützen Sie.",
    }),
  ]);

  const projects = await Promise.all([
    ensureByType("project", "projekt-alpha", {
      _type: "project",
      title: "Projekt Alpha",
      slug: { current: "/projekte/projekt-alpha" },
      summary: "Ein Beispielprojekt.",
      date: "2024-01-15",
    }),
    ensureByType("project", "projekt-beta", {
      _type: "project",
      title: "Projekt Beta",
      slug: { current: "/projekte/projekt-beta" },
      summary: "Noch ein Beispiel.",
      date: "2024-06-20",
    }),
    ensureByType("project", "projekt-gamma", {
      _type: "project",
      title: "Projekt Gamma",
      slug: { current: "/projekte/projekt-gamma" },
      summary: "Drittes Beispiel.",
      date: "2025-03-05",
    }),
  ]);

  await Promise.all([
    ensureByType("teamMember", "max-mustermann", {
      _type: "teamMember",
      name: "Max Mustermann",
      slug: { current: "/team/max-mustermann" },
      role: "CEO",
    }),
    ensureByType("teamMember", "erika-muster", {
      _type: "teamMember",
      name: "Erika Muster",
      slug: { current: "/team/erika-muster" },
      role: "CTO",
    }),
    ensureByType("teamMember", "lukas-beispiel", {
      _type: "teamMember",
      name: "Lukas Beispiel",
      slug: { current: "/team/lukas-beispiel" },
      role: "Designer",
    }),
  ]);

  await Promise.all([
    ensureByType("jobPosting", "frontend-developer", {
      _type: "jobPosting",
      title: "Frontend Developer (m/w/d)",
      slug: { current: "/jobs/frontend-developer" },
      location: "Remote",
      employmentType: "Full-time",
      published: true,
    }),
    ensureByType("jobPosting", "backend-developer", {
      _type: "jobPosting",
      title: "Backend Developer (m/w/d)",
      slug: { current: "/jobs/backend-developer" },
      location: "Berlin",
      employmentType: "Full-time",
      published: true,
    }),
    ensureByType("jobPosting", "werkstudent", {
      _type: "jobPosting",
      title: "Werkstudent:in",
      slug: { current: "/jobs/werkstudent" },
      location: "Berlin",
      employmentType: "Part-time",
      published: true,
    }),
  ]);

  async function ensureLegal(
    slug: string,
    title: string,
    category: "impressum" | "datenschutz" | "agb",
  ) {
    return ensureByType("legalPage", slug, {
      _type: "legalPage",
      title,
      slug: {current: slug},
      category,
      content: [
        {
          _type: "block",
          _key: uuid(),
          children: [{_type: "span", text: `${title} Platzhalter.`}],
        },
      ],
    });
  }

  const [impressum, datenschutz, agb] = await Promise.all([
    ensureLegal("impressum", "Impressum", "impressum"),
    ensureLegal("datenschutz", "Datenschutz", "datenschutz"),
    ensureLegal("agb", "AGB", "agb"),
  ]);

  const [serviceBeratung, serviceEntwicklung, serviceSupport] = services;
  const [projectAlpha, projectBeta, projectGamma] = projects;

  const singletonRef = (id: SingletonId) => ({_type: "reference", _ref: id});
  const docRef = (id: string) => ({_type: "reference", _ref: id});

  await Promise.all([
    ensureNavigation({
      _type: "navigationItem",
      title: "Home",
      kind: "internal",
      internal: singletonRef(singletonIds.homePage),
      location: "header",
      order: 0,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Leistungen",
      kind: "internal",
      internal: docRef(serviceBeratung._id),
      location: "header",
      order: 1,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Projekte",
      kind: "internal",
      internal: docRef(projectAlpha._id),
      location: "header",
      order: 2,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Unternehmen",
      kind: "internal",
      internal: singletonRef(singletonIds.companyPage),
      location: "header",
      order: 3,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Karriere",
      kind: "internal",
      internal: singletonRef(singletonIds.jobsIndexPage),
      location: "header",
      order: 4,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Kontakt",
      kind: "internal",
      internal: singletonRef(singletonIds.contactPage),
      location: "header",
      order: 5,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Impressum",
      kind: "internal",
      internal: docRef(impressum._id),
      location: "footer",
      order: 0,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "Datenschutz",
      kind: "internal",
      internal: docRef(datenschutz._id),
      location: "footer",
      order: 1,
    }),
    ensureNavigation({
      _type: "navigationItem",
      title: "AGB",
      kind: "internal",
      internal: docRef(agb._id),
      location: "footer",
      order: 2,
    }),
  ]);

  await client
    .patch(singletonIds.homePage)
    .setIfMissing({
      featuredServices: [],
      featuredProjects: [],
    })
    .set({
      featuredServices: services.map((service) => docRef(service._id)),
      featuredProjects: projects.map((project) => docRef(project._id)),
    })
    .commit({autoGenerateArrayKeys: true});

  console.log("✅ Migration/Seed ergänzt.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
