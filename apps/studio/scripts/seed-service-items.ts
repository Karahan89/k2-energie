import path from "node:path";
import { randomUUID } from "node:crypto";

import { createClient, type SanityClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });
loadEnv({ path: path.resolve(process.cwd(), "..", ".env") });

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;

const token =
  process.env.SANITY_WRITE_TOKEN ??
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_STUDIO_WRITE_TOKEN ??
  process.env.SANITY_EXEC_USER_TOKEN ??
  process.env.SANITY_CLI_USER_TOKEN ??
  process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET environment variables.",
  );
}

if (!token) {
  throw new Error(
    "Missing Sanity write token. Configure SANITY_WRITE_TOKEN before seeding.",
  );
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-08-29",
  token,
  useCdn: false,
});

const key = (prefix: string) => `${prefix}-${randomUUID().slice(0, 8)}`;

const block = (
  text: string,
  style: "normal" | "h2" | "h3" | "blockquote" = "normal",
) => ({
  _type: "block" as const,
  _key: key("block"),
  style,
  markDefs: [] as unknown[],
  children: [
    {
      _type: "span" as const,
      _key: key("span"),
      text,
      marks: [] as string[],
    },
  ],
});

const button = ({
  text,
  href,
  variant = "default",
}: {
  text: string;
  href: string;
  variant?: "default" | "secondary" | "outline" | "link";
}) => ({
  _type: "button" as const,
  _key: key("button"),
  text,
  variant,
  url: {
    _type: "customUrl" as const,
    type: "external" as const,
    href,
    external: href,
    openInNewTab: false,
  },
});

const heroBlock = ({
  badge,
  title,
  body,
  highlights,
  features,
  primaryCta,
}: {
  badge?: string;
  title: string;
  body: string;
  highlights?: string[];
  features?: string[];
  primaryCta?: { text: string; href: string; variant?: "default" | "secondary" };
}) => ({
  _type: "hero" as const,
  _key: key("hero"),
  badge,
  title,
  titleHighlights: highlights ?? [],
  richText: [block(body)],
  features: features ?? [],
  buttons: [
    button(
      primaryCta ?? {
        text: "Beratung anfragen",
        href: "/kontakt",
        variant: "default",
      },
    ),
  ],
});

const standardsBadgeBlock = ({
  title = "Relevante Normen & Standards",
  intro,
  norms,
  notes,
}: {
  title?: string;
  intro?: string;
  norms: Array<{
    title: string;
    code?: string;
    summary?: string;
    mandatory?: boolean;
    link?: string;
  }>;
  notes?: string[];
}) => ({
  _type: "standardsBadge" as const,
  _key: key("standards"),
  title,
  intro,
  norms: norms.map((norm) => ({
    _key: key("norm"),
    title: norm.title,
    code: norm.code,
    summary: norm.summary,
    mandatory: norm.mandatory ?? false,
    link: norm.link,
  })),
  notes: notes ?? [],
});

const fundingTeaserBlock = ({
  title = "Förderprogramme & Zuschüsse",
  description,
  items,
  sources,
}: {
  title?: string;
  description?: string;
  items: Array<{
    title: string;
    fundingRate?: string;
    summary?: string;
    eligible?: string;
  }>;
  sources?: Array<{ label: string; url: string }>;
}) => ({
  _type: "fundingTeaser" as const,
  _key: key("funding"),
  title,
  description,
  items: items.map((item) => ({
    _key: key("funding-item"),
    title: item.title,
    fundingRate: item.fundingRate,
    summary: item.summary,
    eligible: item.eligible,
  })),
  sources: (sources ?? []).map((source) => ({
    _key: key("funding-source"),
    label: source.label,
    url: source.url,
  })),
});

const processGridBlock = ({
  title = "Anlagen & Prozess-Schwerpunkte",
  description,
  items,
  cta,
}: {
  title?: string;
  description?: string;
  items: Array<{
    title: string;
    description?: string;
    icon?: "air" | "snowflake" | "wind" | "light" | "heat" | "control";
    kpi?: string;
  }>;
  cta?: { label: string; href: string };
}) => ({
  _type: "processGrid" as const,
  _key: key("process"),
  title,
  description,
  items: items.map((item) => ({
    _key: key("process-item"),
    title: item.title,
    description: item.description,
    icon: item.icon,
    kpi: item.kpi,
  })),
  cta,
});

const caseStudyCompactBlock = ({
  title = "Referenzprojekt",
  client,
  sector,
  summary,
  metrics,
  results,
  quote,
  cta,
}: {
  title?: string;
  client?: string;
  sector?: string;
  summary?: string;
  metrics?: Array<{ label: string; value: string }>;
  results?: string[];
  quote?: { text: string; author?: string; role?: string };
  cta?: { label: string; href: string };
}) => ({
  _type: "caseStudyCompact" as const,
  _key: key("case-study"),
  title,
  client,
  sector,
  summary,
  metrics: (metrics ?? []).map((metric) => ({
    _key: key("metric"),
    label: metric.label,
    value: metric.value,
  })),
  results: results ?? [],
  quote,
  cta,
});

const faqAccordionBlock = ({
  title,
  subtitle,
  faqRefs,
}: {
  title: string;
  subtitle?: string;
  faqRefs: Array<{ _type: "reference"; _ref: string }>;
}) => ({
  _type: "faqAccordion" as const,
  _key: key("faq"),
  title,
  subtitle,
  faqs: faqRefs,
});

const contactCtaBlock = () => ({
  _type: "contactCta" as const,
  _key: key("contact"),
  title: "Jetzt Erstgespräch vereinbaren",
  description:
    "Wir analysieren Ihr Projekt innerhalb von 48 Stunden und geben eine klare Empfehlung für das passende Vorgehen.",
  contactName: "Lena Hoffmann",
  contactRole: "Leitung Energieberatung",
  phone: "+49 30 403 640 10",
  email: "beratung@k2-energie.de",
  cta: {
    label: "Termin anfragen",
    href: "/kontakt",
  },
  secondaryCta: {
    label: "Direkt anrufen",
    href: "tel:+493040364010",
  },
});

const serviceListBlock = ({
  title,
  description,
  presetAudience,
  presetDomain,
}: {
  title: string;
  description: string;
  presetAudience: string[];
  presetDomain?: string[];
}) => ({
  _type: "serviceList" as const,
  _key: key("service-list"),
  title,
  description,
  showCategories: false,
  maxItems: 0,
  showFeaturedOnly: false,
  layout: "grid" as const,
  showIcons: true,
  showTeaser: true,
  presetAudience,
  presetDomain: presetDomain ?? [],
  presetLifecycle: [],
  presetServiceType: [],
  presetTags: [],
  enableClientFilters: true,
});

interface CategorySeed {
  slug: "wohngebaeude" | "nichtwohngebaeude" | "anlagen-prozesse";
  title: string;
  description: string;
  icon: string;
  order: number;
  color: string;
  pageBuilder: unknown[];
}

const categorySeeds: CategorySeed[] = [
  {
    slug: "wohngebaeude",
    title: "Wohngebäude",
    description:
      "Energieberatung, Sanierungsfahrpläne und Fördermittelberatung für Ein- und Mehrfamilienhäuser.",
    icon: "home",
    order: 1,
    color: "blue",
    pageBuilder: [
      heroBlock({
        badge: "Effizienz ab dem ersten Gespräch",
        title: "Leistungen für Wohngebäude",
        body: "Wir begleiten Eigentümer:innen, Hausverwaltungen und Wohnungsunternehmen von der Erstaufnahme bis zur Förderung – inklusive iSFP, BEG-Anträgen und Umsetzung.",
        features: [
          "80 % BAFA-Zuschuss für Energieberatung",
          ">250 Wohngebäude begleitet",
          "iSFP & BEG aus einer Hand",
        ],
      }),
      serviceListBlock({
        title: "Unsere Services für Wohngebäude",
        description:
          "Von der Bestandsaufnahme über die Heizlastberechnung bis zur Fördermittelbeantragung – alle Leistungen für Wohngebäude in der Übersicht.",
        presetAudience: ["wg"],
      }),
      contactCtaBlock(),
    ],
  },
  {
    slug: "nichtwohngebaeude",
    title: "Nichtwohngebäude",
    description:
      "Ganzheitliche Energie- und ESG-Strategien für Büro-, Industrie- und öffentliche Gebäude inklusive DIN V 18599 Nachweisen und Audits.",
    icon: "building-2",
    order: 2,
    color: "green",
    pageBuilder: [
      heroBlock({
        badge: "ESG-konforme Energieeffizienz",
        title: "Leistungen für Nichtwohngebäude",
        body: "Wir analysieren Gebäudehülle, TGA und Prozesse nach DIN V 18599, strukturieren Fördermittel und setzen Energieaudits nach DIN EN 16247 oder ISO 50001 auf.",
        features: [
          "100 % Audit-konform",
          "ISO 50001-ready",
          "Förderquote bis 55 %",
        ],
      }),
      serviceListBlock({
        title: "Services für Gewerbe, Industrie & öffentliche Hand",
        description:
          "Gebäude- und Prozessoptimierung, Fördermittelberatung und Zertifizierungen für Nichtwohngebäude.",
        presetAudience: ["nwg"],
        presetDomain: ["gebaeude", "anlagen", "prozesse"],
      }),
      contactCtaBlock(),
    ],
  },
  {
    slug: "anlagen-prozesse",
    title: "Anlagen & Prozesse",
    description:
      "Effizienzprogramme für Druckluft, Kälte, Wärme und MSR – von der Messkampagne bis zur Umsetzung inklusive Fördermittel.",
    icon: "factory",
    order: 3,
    color: "orange",
    pageBuilder: [
      heroBlock({
        badge: "Prozessenergie smart optimiert",
        title: "Anlagen & Prozesse",
        body: "Wir identifizieren Einsparpotenziale in Anlagen, Maschinen und Prozessketten, reduzieren Lastspitzen und nutzen Fördermittel wie dem BAFA EEW-Programm.",
        features: [
          "Messkampagne & Datenanalyse",
          "BAFA EEW förderfähig",
          "Monitoring in Echtzeit",
        ],
      }),
      processGridBlock({
        title: "Typische Schwerpunkte",
        description:
          "Unsere Ingenieur:innen optimieren Querschnittstechnologien und Prozessenergie – modular kombinierbar je nach Standort.",
        items: [
          {
            title: "Druckluft",
            description: "Leckage-Ortung, Wärmerückgewinnung und bedarfsgerechte Regelung.",
            icon: "air",
            kpi: "Ø 25 % Einsparung",
          },
          {
            title: "Kälte & Klima",
            description: "F-Gase-Strategie, Freikühlung und hocheffiziente Kälteerzeugung.",
            icon: "snowflake",
            kpi: "COP > 6,0",
          },
          {
            title: "Lüftung & Wärmerückgewinnung",
            description: "Bedarfsgesteuerte Volumenströme und Hochleistungs-WRG-Module.",
            icon: "wind",
            kpi: "WRG bis 85 %",
          },
          {
            title: "Beleuchtung",
            description: "Human-Centric Lighting, Präsenz- und Tageslichtsensorik.",
            icon: "light",
            kpi: "LED-Umrüstung < 3 Jahre Amortisation",
          },
          {
            title: "Abwärme",
            description: "Prozesswärmerückgewinnung für Heizung, TWW oder Dampf.",
            icon: "heat",
            kpi: "bis 1,5 MW nutzbar",
          },
          {
            title: "GA & MSR",
            description: "Lastmanagement, Energiemonitoring und ISO 50001-konformes Reporting.",
            icon: "control",
            kpi: "Live-Transparenz",
          },
        ],
        cta: { label: "Workshop anfragen", href: "/kontakt" },
      }),
      contactCtaBlock(),
    ],
  },
];

interface FundingInfo {
  items: Array<{
    title: string;
    fundingRate?: string;
    summary?: string;
    eligible?: string;
  }>;
  sources: Array<{ label: string; url: string }>;
  description?: string;
}

interface CaseStudyInfo {
  title: string;
  client?: string;
  sector?: string;
  summary?: string;
  metrics?: Array<{ label: string; value: string }>;
  results?: string[];
  quote?: { text: string; author?: string; role?: string };
  cta?: { label: string; href: string };
}

interface ProcessInfo {
  title?: string;
  description?: string;
  items: Array<{
    title: string;
    description?: string;
    icon?: "air" | "snowflake" | "wind" | "light" | "heat" | "control";
    kpi?: string;
  }>;
  cta?: { label: string; href: string };
}

interface FaqEntry {
  question: string;
  answer: string;
  category: "funding" | "renovation" | "consulting" | "process" | "sustainability" | "reports";
}

interface ServiceSeed {
  slug: string;
  title: string;
  teaser: string;
  icon: "zap" | "home" | "leaf" | "trending-up" | "wrench" | "lightbulb";
  audience: Array<"wg" | "nwg">;
  domain?: Array<"gebaeude" | "anlagen" | "prozesse">;
  lifecycle?: Array<"neubau" | "bestand">;
  serviceType: Array<"beratung" | "nachweis" | "foerderung" | "audit" | "zertifizierung">;
  tags?: string[];
  featured?: boolean;
  categorySlug: CategorySeed["slug"];
  seoTitle?: string;
  seoDescription?: string;
  hero: {
    badge?: string;
    body: string;
    features?: string[];
  };
  standards: Parameters<typeof standardsBadgeBlock>[0];
  funding: FundingInfo;
  caseStudy?: CaseStudyInfo;
  process?: ProcessInfo;
  faqs: FaqEntry[];
}

const serviceSeeds: ServiceSeed[] = [
  {
    slug: "sanierungsfahrplan-wohngebaeude",
    title: "Sanierungsfahrplan (iSFP) für Wohngebäude",
    teaser:
      "Individueller Sanierungsfahrplan (iSFP) einschließlich Ortstermin, Maßnahmenplanung und Zuschussbeantragung.",
    icon: "home",
    audience: ["wg"],
    domain: ["gebaeude"],
    lifecycle: ["bestand"],
    serviceType: ["beratung", "foerderung"],
    tags: ["isfp", "beg", "wohngebaeude"],
    categorySlug: "wohngebaeude",
    seoTitle: "Sanierungsfahrplan (iSFP) für Wohngebäude | K2 Energieberatung",
    seoDescription:
      "Wir erstellen Ihren iSFP inklusive Vor-Ort-Termin, Wirtschaftlichkeitsanalyse und BAFA-Zuschuss von bis zu 80 %.",
    hero: {
      badge: "80 % Zuschuss sichern",
      body: "Von der Datenaufnahme bis zur iSFP-Übergabe – wir liefern realistische Maßnahmenpakete, CO₂- und Kostenbilanz inklusive Fahrplan für Umsetzung und Förderung.",
      features: ["BAFA-EBW anerkannt", "Digitales iSFP-Portal", "Förderbonus 5 % nutzbar"],
    },
    standards: {
      intro: "Unsere Planung erfüllt alle Anforderungen der Bundesförderung für Energieberatung für Wohngebäude (EBW).",
      norms: [
        {
          title: "Energieberatung für Wohngebäude",
          code: "BAFA EBW 2024",
          summary:
            "Richtlinie des BAFA für geförderte Energieberatung mit iSFP-Bonus.",
          link: "https://www.bafa.de/DE/Energie/Energieberatung_Wohngebaeude/energieberatung_wohngebaeude_node.html",
        },
        {
          title: "Gebäudeenergiegesetz",
          code: "GEG 2024",
          summary:
            "Rechtsrahmen für energetische Mindestanforderungen und Austauschpflichten.",
          link: "https://www.gesetze-im-internet.de/geg_2020/",
        },
        {
          title: "Bilanzierung nach DIN V 18599",
          code: "DIN V 18599",
          summary:
            "Energetische Bewertung von Wohngebäuden als Grundlage für den iSFP.",
        },
      ],
      notes: [
        "Der iSFP-Bonus von 5 % setzt eine BEG-Förderung innerhalb von 15 Jahren voraus.",
      ],
    },
    funding: {
      description:
        "Wir bereiten alle Unterlagen vor und begleiten Sie durch den kompletten Förderprozess.",
      items: [
        {
          title: "BAFA Energieberatung für Wohngebäude (EBW)",
          fundingRate: "Bis zu 80 % Zuschuss, max. 1.300 €",
          summary: "Förderung der Beratungskosten inkl. iSFP-Erstellung.",
          eligible: "Eigentümer:innen von Ein- und Zweifamilienhäusern, WEGs",
        },
        {
          title: "iSFP-Bonus in der BEG EM",
          fundingRate: "+5 Prozentpunkte",
          summary: "Erhöhter Zuschuss bei Umsetzung von Maßnahmen aus dem Fahrplan.",
          eligible: "Förderberechtigte BEG EM Antragsteller",
        },
      ],
      sources: [
        {
          label: "BAFA – Energieberatung für Wohngebäude",
          url: "https://www.bafa.de/DE/Energie/Energieberatung_Wohngebaeude/energieberatung_wohngebaeude_node.html",
        },
        {
          label: "BMWK – Individueller Sanierungsfahrplan",
          url: "https://www.energiewechsel.de/KAENEF/Redaktion/DE/Standardartikel/isfp.html",
        },
      ],
    },
    caseStudy: {
      title: "iSFP für Mehrfamilienhaus in Hamburg",
      client: "Wohnungsbaugesellschaft Elbe",
      sector: "Mehrfamilienhaus (12 WE)",
      summary:
        "Aufnahme aller Bauteile, Variantenvergleich Gas-Brennwert vs. Wärmepumpe, PV-Konzept und priorisierte Maßnahmen.",
      metrics: [
        { label: "CO₂-Reduktion", value: "6,3 t/Jahr" },
        { label: "Investitionsvolumen", value: "420.000 €" },
        { label: "Zuschuss", value: "74.000 €" },
      ],
      results: [
        "Abgestimmter Sanierungsfahrplan mit 4 Maßnahmenpaketen",
        "Bewilligung BAFA iSFP-Bonus und BEG EM Heizungsoptimierung",
      ],
      quote: {
        text: "Das K2-Team hat uns innerhalb von sechs Wochen vom Erstgespräch bis zum fertigen iSFP geführt.",
        author: "Laura Peters",
        role: "Leitung Immobilienmanagement",
      },
      cta: { label: "Projekt anfragen", href: "/projekte" },
    },
    faqs: [
      {
        question: "Wie lange ist der iSFP gültig?",
        answer: "Der iSFP bleibt 15 Jahre gültig. Innerhalb dieses Zeitraums können Sie Maßnahmen mit iSFP-Bonus gefördert umsetzen.",
        category: "consulting",
      },
      {
        question: "Welche Unterlagen brauche ich für den iSFP?",
        answer: "Grundrisse, Baubeschreibung (falls vorhanden), Heiz- und Stromabrechnungen der letzten zwei Jahre und Angaben zur Gebäude- und Anlagentechnik.",
        category: "process",
      },
      {
        question: "Bekomme ich Unterstützung bei der BEG-Förderung?",
        answer: "Ja, wir übernehmen die technische Projektbeschreibung (TPB) und begleiten die Antragstellung inklusive Verwendungsnachweis.",
        category: "funding",
      },
    ],
  },
  {
    slug: "foerderberatung-neubau-wohngebaeude",
    title: "Fördermittelberatung Klimafreundlicher Neubau (Wohngebäude)",
    teaser:
      "Förderfähige Neubau- oder Kaufprojekte planen und KfW-Kredite mit Tilgungszuschuss optimal nutzen.",
    icon: "leaf",
    audience: ["wg"],
    domain: ["gebaeude"],
    lifecycle: ["neubau"],
    serviceType: ["beratung", "foerderung"],
    tags: ["kfw", "neubau", "qng"],
    categorySlug: "wohngebaeude",
    seoTitle: "Fördermittelberatung Klimafreundlicher Neubau",
    seoDescription:
      "Wir strukturieren Klimafreundlicher Neubau (KFN) und QNG-Förderung inklusive QNG-Ready Nachweis und Verwendungsnachweis.",
    hero: {
      badge: "Klimafreundlicher Neubau",
      body: "Wir führen Sie durch KfW-Programme wie Klimafreundlicher Neubau (KFN) und Familienförderung, koordinieren QNG-Nachweise und binden Fördermittel in die Finanzplanung ein.",
      features: [
        "KFW 298 / 299 vollständig",
        "QNG-Ready Nachweis",
        "Bauherrencoaching",
      ],
    },
    standards: {
      intro: "Wir kombinieren energetische Planung mit Nachhaltigkeitszertifizierung.",
      norms: [
        {
          title: "Förderrichtlinie Klimafreundlicher Neubau",
          code: "KfW 298/299",
          summary:
            "Bundesförderung für effiziente Wohngebäude – Klimafreundlicher Neubau mit Tilgungszuschuss.",
          link: "https://www.kfw.de/programme/klimafreundlicher-neubau/",
        },
        {
          title: "Qualitätssiegel Nachhaltiges Gebäude (QNG)",
          code: "QNG 2024",
          summary:
            "Nachhaltigkeitsanforderungen für klimafreundliche Neubauten und Voraussetzung für höhere Zuschüsse.",
          link: "https://www.nachhaltigesbauen.de/qng",
        },
        {
          title: "DIN V 18599",
          code: "DIN V 18599",
          summary:
            "Energetische Bilanzierung des Neubaus als Grundlage für Effizienzhausnachweise.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "KfW Klimafreundlicher Neubau (298)",
          fundingRate: "Tilgungszuschuss bis 15 %",
          summary: "Zinsgünstiger Kredit mit Zuschuss für klimafreundliche Wohngebäude.",
          eligible: "Bauherren, Bauträger, WEGs",
        },
        {
          title: "KfW Wohngebäude – Kredit 297",
          fundingRate: "Tilgungszuschuss bis 25 % bei QNG",
          summary: "Zusätzlicher Zuschuss bei QNG Klassik oder Plus.",
          eligible: "Private Bauherr:innen, Wohnungsunternehmen",
        },
        {
          title: "Regionale Programme",
          fundingRate: " abhängig vom Bundesland",
          summary: "Wir identifizieren kommunale Förderprogramme (z. B. Landesbanken).",
          eligible: "Kommunale oder landesspezifische Zielgruppen",
        },
      ],
      sources: [
        {
          label: "KfW – Klimafreundlicher Neubau",
          url: "https://www.kfw.de/programme/klimafreundlicher-neubau/",
        },
        {
          label: "BMWSB – Bundesförderung effiziente Gebäude",
          url: "https://www.klimaschutz.de/beg",
        },
      ],
    },
    caseStudy: {
      title: "QNG-Ready Reihenhausquartier",
      client: "Projektentwickler Rhein-Main",
      sector: "6 Reihenhäuser",
      summary:
        "KfW-Kreditstrukturierung, QNG-Ready Nachweis und Monitoring-Konzept für Klimafreundlicher Neubau.",
      metrics: [
        { label: "KfW-Kreditvolumen", value: "2,1 Mio. €" },
        { label: "Tilgungszuschuss", value: "315.000 €" },
        { label: "Primärenergie", value: "−55 % gegenüber GEG" },
      ],
      results: [
        "Frühzeitige Förderzusage der KfW",
        "QNG-Ready Dokumentation für spätere Zertifizierung",
      ],
      quote: {
        text: "K2 hat unser Projektteam durch den Förderdschungel geführt und Termine mit der KfW vorbereitet.",
        author: "Jonas Riedl",
        role: "Geschäftsführer",
      },
    },
    faqs: [
      {
        question: "Wann brauche ich ein QNG-Zertifikat?",
        answer: "Für den maximalen Tilgungszuschuss muss entweder QNG-Ready oder QNG Klassik/Plus nachgewiesen werden. Wir organisieren Auditor:in und Dokumentation.",
        category: "consulting",
      },
      {
        question: "Welche Unterlagen fordert die KfW?",
        answer: "Wir erstellen die technische Projektbeschreibung (TPB), das Ausstattungskonzept sowie die energetische Bilanz nach DIN V 18599.",
        category: "process",
      },
      {
        question: "Kann ich Förderprogramme kombinieren?",
        answer: "Ja, häufig lassen sich KfW-Kredite mit Landesprogrammen oder Zuschüssen für PV und Speicher kombinieren. Wir prüfen Kombinationsmöglichkeiten.",
        category: "funding",
      },
    ],
  },
  {
    slug: "heizlastberechnung-din-en-12831",
    title: "Heizlastberechnung nach DIN EN 12831",
    teaser:
      "Auslegung der Heizungsanlage nach aktueller Norm inklusive Raumheizlast, Gebäudeheizlast und hydraulischem Abgleich.",
    icon: "trending-up",
    audience: ["wg", "nwg"],
    domain: ["gebaeude", "anlagen"],
    lifecycle: ["neubau", "bestand"],
    serviceType: ["nachweis", "beratung"],
    tags: ["heizlast", "din12831", "hydraulischer-abgleich"],
    categorySlug: "wohngebaeude",
    hero: {
      badge: "Normgerechte Auslegung",
      body: "Wir liefern belastbare Heizlastberechnungen als Grundlage für Neubau und Sanierung, inklusive Abgleich der Wärmequelle und Dokumentation für BEG-Förderung.",
      features: ["DIN EN 12831-1 & -3", "Hydraulischer Abgleich", "Integration Wärmepumpe"],
    },
    standards: {
      norms: [
        {
          title: "Heizlastberechnung",
          code: "DIN EN 12831-1",
          summary:
            "Berechnung der Norm-Heizlast von Gebäuden – Grundlage für Anlagenauslegung.",
        },
        {
          title: "Gebäudeenergiegesetz",
          code: "GEG 2024",
          summary:
            "Heizungsmodernisierung und Nachrüstpflichten gemäß § 60ff.",
        },
        {
          title: "VDI 2073",
          summary: "Hydraulischer Abgleich von Heizungsanlagen.",
        },
      ],
      notes: [
        "Für BEG EM Anträge ist die Heizlastberechnung inkl. hydraulischem Abgleich Pflicht.",
      ],
    },
    funding: {
      items: [
        {
          title: "BEG EM Heizungsoptimierung",
          fundingRate: "Bis 20 % Zuschuss",
          summary: "Förderung für Heizungsoptimierung inkl. hydraulischem Abgleich.",
          eligible: "Wohn- und Nichtwohngebäude",
        },
        {
          title: "BAFA Wärmepumpenförderung",
          fundingRate: "Bis 35 % Zuschuss",
          summary: "Nachweis der Heizlast ist Voraussetzung für einen Wärmepumpenzuschuss.",
          eligible: "Eigentümer:innen, Unternehmen, Kommunen",
        },
      ],
      sources: [
        {
          label: "BAFA – Bundesförderung für effiziente Gebäude",
          url: "https://www.bafa.de/DE/Energie/Heizen_mit_Erneuerbaren_Energien/",
        },
        {
          label: "BMWK – Heizungsoptimierung",
          url: "https://www.energiewechsel.de/KAENEF/Navigation/foerderung/foerderung.html",
        },
      ],
    },
    caseStudy: {
      title: "Heizlast & Wärmepumpenauslegung EFH",
      client: "Privater Bauherr",
      sector: "Einfamilienhaus, Baujahr 1995",
      summary:
        "Heizlastberechnung mit Bestandsaufnahme, Simulation verschiedener Vorlauftemperaturen und Empfehlung für 10 kW Wärmepumpe.",
      metrics: [
        { label: "Gebäudeheizlast", value: "9,4 kW" },
        { label: "JAZ Prognose", value: "4,1" },
        { label: "Förderquote", value: "30 % BAFA" },
      ],
      results: [
        "Dokumentation für BEG EM eingereicht",
        "Hydraulischer Abgleich dokumentiert Stufe B",
      ],
    },
    faqs: [
      {
        question: "Warum brauche ich eine Heizlastberechnung?",
        answer: "Sie stellt sicher, dass Wärmeerzeuger und Heizflächen optimal ausgelegt werden – Grundlage für effiziente Wärmepumpen.",
        category: "consulting",
      },
      {
        question: "Welche Daten werden benötigt?",
        answer: "Gebäudepläne, Bauteilaufbauten, Heizflächen, U-Werte oder Baujahr, ggf. Raumtemperaturen laut Nutzerwunsch.",
        category: "process",
      },
      {
        question: "Wie lange dauert die Erstellung?",
        answer: "Je nach Gebäudekomplexität 1–2 Wochen ab vollständiger Datenlieferung.",
        category: "process",
      },
    ],
  },
  {
    slug: "energieausweis-wohngebaeude",
    title: "Energieausweis für Wohngebäude",
    teaser:
      "Bedarfs- oder Verbrauchsausweis nach GEG inklusive Registriernummer und Modernisierungsempfehlungen.",
    icon: "lightbulb",
    audience: ["wg"],
    domain: ["gebaeude"],
    lifecycle: ["bestand"],
    serviceType: ["nachweis", "beratung"],
    categorySlug: "wohngebaeude",
    hero: {
      badge: "GEG-konform",
      body: "Wir erstellen Energieausweise für Ein- und Mehrfamilienhäuser, inklusive staatlicher Registrierung und konkreter Maßnahmenempfehlungen.",
      features: ["GEG 2024", "Registrierung beim DIBt", "Maßnahmenpakete inklusive"],
    },
    standards: {
      norms: [
        {
          title: "Gebäudeenergiegesetz",
          code: "GEG 2024",
          summary: "Rechtliche Grundlage für Energieausweise.",
          link: "https://www.gesetze-im-internet.de/geg_2020/",
          mandatory: true,
        },
        {
          title: "DIN V 18599",
          summary: "Bilanzierungsverfahren für Energiebedarfsberechnungen.",
        },
        {
          title: "DIBt Registrierungsstelle",
          summary: "Ausstellung und Verwaltung der Ausweis-Registriernummern.",
        },
      ],
    },
    funding: {
      description: "Bei anschließender Umsetzung nutzen wir BEG-Zuschüsse.",
      items: [
        {
          title: "BEG EM Effizienzhaus",
          fundingRate: "Bis 45 % Zuschuss",
          summary: "Maßnahmen aus dem Energieausweis qualifizieren für BEG-Zuschüsse.",
          eligible: "Eigentümer:innen Wohngebäude",
        },
      ],
      sources: [
        {
          label: "DIBt – Energieausweis Registrierung",
          url: "https://www.dibt.de/de/zulassungen/bereich-energieausweise",
        },
      ],
    },
    caseStudy: {
      title: "Energieausweis Mehrfamilienhaus Köln",
      client: "Hausverwaltung Rhein",
      sector: "8-Parteien-Haus",
      summary:
        "Bedarfsausweis mit Maßnahmenempfehlungen für Dämmung und Heizungstausch.",
      metrics: [
        { label: "Effizienzklasse", value: "F → C" },
        { label: "CO₂-Einsparung", value: "4,8 t/Jahr" },
      ],
      results: [
        "Modernisierungsempfehlung für BEG EM",
        "Registrierung beim DIBt abgeschlossen",
      ],
    },
    faqs: [
      {
        question: "Wann ist ein Energieausweis Pflicht?",
        answer: "Bei Verkauf, Vermietung oder größeren Renovierungen. Der Ausweis ist 10 Jahre gültig.",
        category: "consulting",
      },
      {
        question: "Bedarfs- vs. Verbrauchsausweis?",
        answer: "Wir empfehlen Bedarfsausweise, da sie bauliche Qualität berücksichtigen und nicht vom Nutzerverhalten abhängen.",
        category: "reports",
      },
      {
        question: "Wie lange dauert die Ausstellung?",
        answer: "Je nach Unterlagenlage 3–5 Werktage nach Vor-Ort-Termin.",
        category: "process",
      },
    ],
  },
  {
    slug: "oekobilanz-qng-wohngebaeude",
    title: "Ökobilanz & QNG-Nachweis für Wohngebäude",
    teaser:
      "Erstellung der Lebenszyklusanalyse (LCA) inklusive Ökobilanzbericht für QNG- und DGNB-Anforderungen.",
    icon: "leaf",
    audience: ["wg", "nwg"],
    domain: ["gebaeude"],
    lifecycle: ["neubau", "bestand"],
    serviceType: ["nachweis", "zertifizierung"],
    categorySlug: "wohngebaeude",
    hero: {
      badge: "QNG & ESG ready",
      body: "Wir bewerten CO₂-Emissionen und Umweltwirkungen über den gesamten Lebenszyklus und erstellen die Nachweise für QNG und ESG-Reporting.",
      features: ["Ökobilanz EN 15978", "QNG-Kriterien erfüllt", "ESG-Reporting"],
    },
    standards: {
      norms: [
        {
          title: "Bewertung der Umweltwirkungen",
          code: "DIN EN 15978",
          summary: "Methodik zur Ökobilanzierung von Gebäuden.",
        },
        {
          title: "QNG-Kriterienkatalog",
          summary: "Grenzwerte für Treibhausgasemissionen und Primärenergie.",
          link: "https://www.nachhaltigesbauen.de/qng",
        },
        {
          title: "DGNB System Version 2023",
          summary: "Bewertungssystem Nachhaltiges Bauen.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "KfW Klimafreundlicher Neubau",
          fundingRate: "Tilgungszuschuss bis 25 %",
          summary: "QNG-Nachweis Voraussetzung für den höchsten Zuschuss.",
          eligible: "Bauherren Wohngebäude",
        },
        {
          title: "KfW 461 – Nachhaltige Kommunen",
          fundingRate: "Bis 75 % Zuschuss",
          summary: "Förderung kommunaler Gebäude mit Nachhaltigkeitszertifikat.",
          eligible: "Kommunen",
        },
      ],
      sources: [
        { label: "BMWSB – QNG", url: "https://www.nachhaltigesbauen.de/qng" },
        { label: "KfW – Kommunale Förderung", url: "https://www.kfw.de/461" },
      ],
    },
    caseStudy: {
      title: "Ökobilanz Holz-Hybrid Wohnbau",
      client: "GreenLiving GmbH",
      sector: "Mehrgeschossiger Holzbau",
      summary:
        "Ökobilanzierung und QNG Nachweis mit Benchmarking gegen Referenzgebäude.",
      metrics: [
        { label: "GWP A1-A3", value: "−350 kg CO₂e/m²" },
        { label: "Primärenergie", value: "−30 % ggü. Referenz" },
      ],
      results: [
        "QNG-Ready erreicht",
        "DGNB Vorzertifikat in Silber",
      ],
    },
    faqs: [
      {
        question: "Welche Software nutzt ihr für die LCA?",
        answer: "Wir arbeiten mit anerkannten Tools wie eLCA bzw. OneClick LCA und hinterlegen Transparenzberichte.",
        category: "reports",
      },
      {
        question: "Wie lange dauert die Erstellung?",
        answer: "Für typische Wohnbauten dauert die Ökobilanz je nach Datenlage 3–4 Wochen.",
        category: "process",
      },
      {
        question: "Welche Daten braucht ihr?",
        answer: "Materiallisten, Mengen, Konstruktionen, Haustechnik-Spezifikationen sowie geplante Nutzungsdauer.",
        category: "process",
      },
    ],
  },
  {
    slug: "energieberatung-din-v-18599",
    title: "Energieberatung DIN V 18599 für Nichtwohngebäude",
    teaser:
      "Ganzheitliche Gebäude- und TGA-Analyse für Nichtwohngebäude inklusive energetischem Sanierungskonzept.",
    icon: "wrench",
    audience: ["nwg"],
    domain: ["gebaeude", "anlagen"],
    lifecycle: ["bestand"],
    serviceType: ["beratung", "nachweis", "foerderung"],
    tags: ["din18599", "beg", "nwg"],
    categorySlug: "nichtwohngebaeude",
    hero: {
      badge: "Ganzheitlicher Blick",
      body: "Wir bewerten Gebäudehülle, Technische Gebäudeausrüstung und Prozesse, entwickeln Roadmaps nach DIN V 18599 und BEG NWG.",
      features: ["360° Gebäudecheck", "Lastmanagement", "Förderfähig BAFA/BEG"],
    },
    standards: {
      norms: [
        {
          title: "Energetische Bewertung von Gebäuden",
          code: "DIN V 18599",
          summary: "Bilanzierungssystematik für Nichtwohngebäude.",
          mandatory: true,
        },
        {
          title: "Gebäudeenergiegesetz",
          code: "GEG 2024",
          summary: "Mindestanforderungen an Nichtwohngebäude.",
        },
        {
          title: "VDI 6022",
          summary: "Hygieneanforderungen an Raumlufttechnik – relevant bei Sanierung.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "BAFA Energieberatung für Nichtwohngebäude",
          fundingRate: "Bis 80 % Zuschuss, max. 15.000 €",
          summary: "Gefördert werden Energieberatungen für KMU und Kommunen.",
          eligible: "Unternehmen, Kommunen, gemeinnützige Träger",
        },
        {
          title: "BEG NWG Effizienzgebäude",
          fundingRate: "Bis 50 % Zuschuss",
          summary: "Sanierungsfahrpläne bilden die Basis für BEG Förderanträge.",
          eligible: "Eigentümer:innen Nichtwohngebäude",
        },
      ],
      sources: [
        {
          label: "BAFA – Energieberatung Nichtwohngebäude",
          url: "https://www.bafa.de/DE/Energie/Energieberatung_Nichtwohngebaeude/",
        },
        {
          label: "BEG NWG",
          url: "https://www.klimaschutz.de/beg",
        },
      ],
    },
    caseStudy: {
      title: "Energieberatung Bürokomplex",
      client: "TechCampus GmbH",
      sector: "Bürogebäude 12.000 m²",
      summary:
        "Analyse von Hülle und TGA, Simulation von Sanierungsvarianten und Erstellung eines Maßnahmenkatalogs.",
      metrics: [
        { label: "Einsparpotenzial", value: "38 % Primärenergie" },
        { label: "CO₂-Reduktion", value: "420 t/Jahr" },
      ],
      results: [
        "Maßnahmenfahrplan mit Priorisierung",
        "BEG NWG Antrag vorbereitet",
      ],
    },
    faqs: [
      {
        question: "Welche Daten müsst ihr aufnehmen?",
        answer: "Gebäude- und TGA-Unterlagen, Zählerdaten, Betriebszeiten sowie Prozessverbräuche.",
        category: "process",
      },
      {
        question: "Wie lange dauert das Projekt?",
        answer: "Je nach Komplexität 8–12 Wochen inklusive Vor-Ort-Termin und Bericht.",
        category: "process",
      },
      {
        question: "Ist die Beratung förderfähig für Nicht-KMU?",
        answer: "Ja, über das BAFA EEW-Programm oder BEG NWG lassen sich auch Großunternehmen fördern.",
        category: "funding",
      },
    ],
  },
  {
    slug: "energieaudit-din-en-16247",
    title: "Energieaudit DIN EN 16247-1",
    teaser:
      "Pflichtaudit für Nicht-KMU sowie strategische Energieaudits für ISO 50001 Systeme.",
    icon: "zap",
    audience: ["nwg"],
    domain: ["gebaeude", "prozesse"],
    lifecycle: ["bestand"],
    serviceType: ["audit", "beratung"],
    categorySlug: "nichtwohngebaeude",
    hero: {
      badge: "Pflicht erfüllt, Potenziale gehoben",
      body: "Wir führen Energieaudits nach DIN EN 16247-1 durch, identifizieren Lastspitzen und Maßnahmen in Gebäude, Anlagen und Prozessen.",
      features: ["DIN EN 16247-1", "SpaEfV-konform", "ISO 50001 ready"],
    },
    standards: {
      norms: [
        {
          title: "Energieaudits",
          code: "DIN EN 16247-1",
          summary: "Norm für systematische Energieaudits in Unternehmen.",
          mandatory: true,
        },
        {
          title: "Spitzenausgleich-Effizienzsystemverordnung",
          code: "SpaEfV",
          summary: "Regelt steuerlichen Spitzenausgleich, Audit Pflicht für Nicht-KMU.",
        },
        {
          title: "ISO 50001",
          summary:
            "Energiemanagementsystem – optionale Weiterentwicklung nach Audit.",
        },
      ],
      notes: ["Pflicht für Unternehmen > 250 Mitarbeitende oder > 50 Mio. € Umsatz / 43 Mio. € Bilanzsumme."],
    },
    funding: {
      items: [
        {
          title: "BAFA Energieaudit DIN EN 16247",
          fundingRate: "Bis 80 % Zuschuss, max. 15.000 €",
          summary: "Förderung für KMU, Nicht-KMU steuerlich absetzbar.",
          eligible: "KMU",
        },
        {
          title: "EEW – Modul 1",
          fundingRate: "Bis 30 % Zuschuss",
          summary: "Investitionen aus dem Audit lassen sich über EEW fördern.",
          eligible: "Unternehmen mit Sitz in Deutschland",
        },
      ],
      sources: [
        {
          label: "BAFA – Energieaudit DIN EN 16247",
          url: "https://www.bafa.de/DE/Energie/Energieaudits/",
        },
        {
          label: "BfEE",
          url: "https://www.bfee-online.de",
        },
      ],
    },
    caseStudy: {
      title: "Audit Produktionsstandort",
      client: "Druckguss GmbH",
      sector: "Metallverarbeitung",
      summary:
        "Energieaudit mit Fokus auf Druckluft, Wärme und Beleuchtung. Umsetzung eines ISO 50001 Konzeptes.",
      metrics: [
        { label: "Einsparpotenzial", value: "12 % Endenergie" },
        { label: "Investitionen", value: "320.000 €" },
      ],
      results: [
        "SpaEfV-Pflicht erfüllt",
        "EEW-Förderantrag Modul 1 & 4 gestellt",
      ],
    },
    process: {
      items: [
        {
          title: "Druckluft",
          description: "Leckageortung, bedarfsgerechte Kompressorsteuerung.",
          icon: "air",
        },
        {
          title: "Kälte & Klima",
          description: "Optimierung von Kälteanlagen und Rückkühlwerken.",
          icon: "snowflake",
        },
        {
          title: "Lastmanagement",
          description: "Transparenz bei Lastspitzen, Einführung eines Energie-Monitorings.",
          icon: "control",
        },
      ],
    },
    faqs: [
      {
        question: "Wer muss ein Energieaudit durchführen?",
        answer: "Nicht-KMU gemäß EDL-G sind alle vier Jahre auditpflichtig. Wir prüfen, ob Bagatellregelungen greifen.",
        category: "consulting",
      },
      {
        question: "Welche Datenbasis wird benötigt?",
        answer: "Verbrauchsdaten Strom/Gas/Wärme, Betriebszeiten, Anlagenlisten, Produktionsdaten.",
        category: "process",
      },
      {
        question: "Wie geht es nach dem Audit weiter?",
        answer: "Wir priorisieren Maßnahmen, begleiten EEW-Förderanträge und führen Monitoring ein.",
        category: "funding",
      },
    ],
  },
  {
    slug: "energieausweis-nichtwohngebaeude",
    title: "Energieausweis Nichtwohngebäude",
    teaser:
      "Erstellung von Bedarfsausweisen für Büro-, Handels- und Produktionsgebäude inklusive DIBt-Registrierung.",
    icon: "lightbulb",
    audience: ["nwg"],
    domain: ["gebaeude"],
    lifecycle: ["bestand"],
    serviceType: ["nachweis", "beratung"],
    categorySlug: "nichtwohngebaeude",
    hero: {
      badge: "GEG-konform",
      body: "Wir übernehmen Aufmaß, Datenerhebung und Bilanzierung nach DIN V 18599 – inklusive Modernisierungsempfehlungen für BEG-Förderung.",
      features: ["DIN V 18599", "DIBt Registrierung", "Modernisierungsempfehlungen"],
    },
    standards: {
      norms: [
        {
          title: "Gebäudeenergiegesetz",
          code: "GEG 2024",
          summary: "Rechtliche Anforderungen für Nichtwohngebäude.",
          mandatory: true,
        },
        {
          title: "DIN V 18599",
          summary:
            "Bilanzierung von Energiebedarf und Endenergie für Nichtwohngebäude.",
        },
        {
          title: "DIBt-Ausweisregister",
          summary: "Registrierungspflicht für Energieausweise.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "BAFA Energieberatung Nichtwohngebäude",
          fundingRate: "Bis 80 % Zuschuss",
          summary: "Energieausweise sind Bestandteil der geförderten Beratung.",
          eligible: "Unternehmen, Kommunen",
        },
      ],
      sources: [
        {
          label: "DIBt – Energieausweise",
          url: "https://www.dibt.de/de/zulassungen/bereich-energieausweise",
        },
      ],
    },
    caseStudy: {
      title: "Energieausweis Büropark",
      client: "OfficePark AG",
      summary:
        "Aufnahme von 8 Gebäuden, Bedarfsausweise und Maßnahmenpakete für Fassaden, RLT und MSR.",
      metrics: [
        { label: "Fläche", value: "28.000 m²" },
        { label: "Energieklasse", value: "G → D" },
      ],
    },
    faqs: [
      {
        question: "Wie unterscheiden sich Bedarf und Verbrauch?",
        answer: "Verbrauchsausweise basieren auf historischen Daten, Bedarfsausweise auf einer Bilanzierung – rechtssicher insbesondere bei Nutzungswechsel.",
        category: "reports",
      },
      {
        question: "Welche Unterlagen sind nötig?",
        answer: "Pläne, Bauteilaufbauten, technische Daten der Anlagen, Nutzungsprofile und Zählerstände.",
        category: "process",
      },
      {
        question: "Wie lange dauert die Erstellung?",
        answer: "Je nach Gebäudebestand 2–4 Wochen inkl. Vor-Ort-Termin.",
        category: "process",
      },
    ],
  },
  {
    slug: "oekobilanz-nwg-esg",
    title: "ESG & Ökobilanz für Nichtwohngebäude",
    teaser:
      "Lebenszyklusanalyse, ESG-Reporting und EU-Taxonomie Prüfungen für Gewerbe- und Industrieimmobilien.",
    icon: "leaf",
    audience: ["nwg"],
    domain: ["gebaeude", "prozesse"],
    lifecycle: ["bestand", "neubau"],
    serviceType: ["zertifizierung", "nachweis", "beratung"],
    categorySlug: "nichtwohngebaeude",
    hero: {
      badge: "ESG-Reporting aus einer Hand",
      body: "Wir quantifizieren Treibhausgasemissionen, Primärenergie und Zirkularitätskennzahlen nach EU-Taxonomie und CSRD.",
      features: ["EN 15978", "EU-Taxonomie", "CSRD-Reporting"],
    },
    standards: {
      norms: [
        {
          title: "DIN EN 15978",
          summary: "Bewertung der Umweltwirkungen von Bauwerken.",
        },
        {
          title: "EU Taxonomie",
          summary: "Technische Bewertungskriterien für klimafreundliche Wirtschaftsaktivitäten.",
          link: "https://finance.ec.europa.eu/sustainable-finance/tools-and-standards/eu-taxonomy-sustainable-activities_de",
        },
        {
          title: "ESRS E1",
          summary: "CSRD-Standard für Klimaschutzberichte.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "KfW 452 – Klimafreundliche Gewerbegebäude",
          fundingRate: "Tilgungszuschuss bis 20 %",
          summary: "Nachhaltigkeitsnachweis Voraussetzung.",
          eligible: "Unternehmen, Contractoren",
        },
        {
          title: "EEW Modul 5",
          fundingRate: "Bis 40 % Zuschuss",
          summary: "Transformationskonzepte inkl. Ökobilanz werden gefördert.",
          eligible: "Unternehmen"
        },
      ],
      sources: [
        { label: "EU Taxonomie", url: "https://finance.ec.europa.eu/" },
        { label: "BMWK – EEW Modul 5", url: "https://www.bafa.de/EEW" },
      ],
    },
    caseStudy: {
      title: "ESG-Portfolioanalyse Logistics",
      client: "LogiPark Real Estate",
      summary:
        "Ökobilanz und EU-Taxonomie Check für fünf Logistikimmobilien.",
      metrics: [
        { label: "Scope 1+2 Emissionen", value: "−28 %" },
        { label: "EU-Taxonomie konform", value: "80 % Portfolio" },
      ],
      quote: {
        text: "Mit K2 konnten wir unser Nachhaltigkeits-Reporting auf ein prüfbares Niveau heben.",
        author: "Mara Schulz",
        role: "Head of ESG",
      },
    },
    faqs: [
      {
        question: "Welche Datentiefe fordert die CSRD?",
        answer: "Wir erfassen bauteilbasierte Materialmengen, Energieverbräuche und berechnen Indikatoren wie GWP, PEF und Zirkularität.",
        category: "reports",
      },
      {
        question: "Wie lange dauert ein EU-Taxonomie Check?",
        answer: "Für einzelne Gebäude rechnen wir 4–6 Wochen inklusive Datenerhebung und Prüfbericht.",
        category: "process",
      },
      {
        question: "Können mehrere Gebäude gebündelt werden?",
        answer: "Ja, wir bilden Cluster nach Nutzungstyp und Baujahr, um Benchmarking zu ermöglichen.",
        category: "consulting",
      },
    ],
  },
  {
    slug: "foerdermittelberatung-nwg",
    title: "Fördermittelberatung Nichtwohngebäude",
    teaser:
      "Strategische Fördermittelplanung für Gebäude, Prozesse und erneuerbare Energien – von BAFA EEW bis KfW.",
    icon: "trending-up",
    audience: ["nwg"],
    domain: ["gebaeude", "anlagen", "prozesse"],
    lifecycle: ["bestand", "neubau"],
    serviceType: ["beratung", "foerderung"],
    categorySlug: "nichtwohngebaeude",
    hero: {
      badge: "Fördermix optimieren",
      body: "Wir identifizieren Zuschüsse und Kredite, erstellen technische Beschreibungen und übernehmen die Korrespondenz mit BAFA, KfW und Landesbanken.",
      features: ["EEW, BEG, KfW", "Förderquote > 40 %", "TPB & Nachweis"],
    },
    standards: {
      norms: [
        {
          title: "EEW Richtlinie",
          summary: "Bundesförderung für Energie- und Ressourceneffizienz in der Wirtschaft.",
          link: "https://www.bafa.de/EEW",
        },
        {
          title: "BEG NWG",
          summary: "Bundesförderung effiziente Gebäude für Nichtwohngebäude.",
        },
        {
          title: "De-minimis/AGVO",
          summary: "Beihilferechtliche Grundlagen für Förderungen.",
        },
      ],
      notes: ["Wir prüfen Beihilfegrenzen und Kumulierbarkeit."],
    },
    funding: {
      description: "Auszug der häufigsten Programme, die wir strukturiert einsetzen.",
      items: [
        {
          title: "EEW Modul 1 – Querschnittstechnologien",
          fundingRate: "Bis 30 % Zuschuss",
          summary: "Fördert effiziente Technik wie Druckluft, Pumpen, Lüftung.",
          eligible: "Unternehmen",
        },
        {
          title: "EEW Modul 4 – Transformationskonzepte",
          fundingRate: "Bis 50 % Zuschuss",
          summary: "Fördert Roadmaps zur Klimaneutralität inkl. Bilanzierung.",
          eligible: "Unternehmen aller Größen",
        },
        {
          title: "BEG NWG",
          fundingRate: "Bis 50 % Zuschuss",
          summary: "Sanierung und Einzelmaßnahmen an Gebäuden.",
          eligible: "Immobilieneigentümer",
        },
      ],
      sources: [
        { label: "BAFA – EEW", url: "https://www.bafa.de/EEW" },
        { label: "KfW – Bundesförderung", url: "https://www.kfw.de/beg" },
      ],
    },
    caseStudy: {
      title: "Förderkonzept Produktionshalle",
      client: "ProzessTech AG",
      summary:
        "Kombination aus EEW Modul 1 (Druckluft), Modul 4 (Transformationskonzept) und BEG NWG Gebäudehülle.",
      metrics: [
        { label: "Zuschussvolumen", value: "1,2 Mio. €" },
        { label: "CO₂-Reduktion", value: "2.800 t" },
      ],
      results: [
        "Genehmigte Förderanträge",
        "Zeitplan für Umsetzung bis 2028",
      ],
    },
    faqs: [
      {
        question: "Wie lange dauern Förderanträge?",
        answer: "BAFA-Bescheide dauern aktuell 6–12 Wochen, KfW Kredite ca. 4 Wochen nach Antragstellung.",
        category: "process",
      },
      {
        question: "Können Programme kombiniert werden?",
        answer: "Ja, z. B. EEW Transformationskonzept + BEG für Gebäude. Wir achten auf Beihilfeobergrenzen.",
        category: "funding",
      },
      {
        question: "Übernehmt ihr die Nachweisführung?",
        answer: "Wir erstellen technische Projektbeschreibungen, Verwendungsnachweise und Monitoringberichte.",
        category: "process",
      },
    ],
  },
  {
    slug: "effizienzprogramm-druckluft",
    title: "Effizienzprogramm Druckluftsysteme",
    teaser:
      "Analyse und Optimierung von Druckluftanlagen inklusive Messkampagne, Leckageortung und BAFA-Förderung.",
    icon: "wrench",
    audience: ["nwg"],
    domain: ["anlagen", "prozesse"],
    lifecycle: ["bestand"],
    serviceType: ["beratung", "foerderung", "audit"],
    categorySlug: "anlagen-prozesse",
    hero: {
      badge: "Querschnittstechnologie",
      body: "Wir reduzieren Energiekosten Ihrer Druckluftversorgung durch Messkampagnen, intelligente Steuerung und Wärmerückgewinnung.",
      features: ["Messkampagne", "Wärmerückgewinnung", "EEW förderfähig"],
    },
    standards: {
      norms: [
        {
          title: "Druckluft – Energetische Bewertung",
          code: "DIN EN ISO 11011",
          summary: "Leitfaden für Analyse und Verbesserung von Druckluftsystemen.",
        },
        {
          title: "EEW Richtlinie Modul 1",
          summary: "Förderung effizienter Querschnittstechnologien.",
          link: "https://www.bafa.de/EEW",
        },
        {
          title: "VDI 2047",
          summary: "Richtlinie für Kühlturmanlagen – relevant bei Wärmerückgewinnung.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "EEW Modul 1",
          fundingRate: "Bis 30 % Zuschuss",
          summary: "Fördert Kompressoren, Wärmerückgewinnung, Leckagemanagement.",
          eligible: "Unternehmen",
        },
        {
          title: "EEW Modul 4",
          fundingRate: "Bis 50 %",
          summary: "Transformationskonzept inklusive Druckluftmaßnahmen.",
          eligible: "Unternehmen",
        },
      ],
      sources: [
        { label: "BAFA EEW Modul 1", url: "https://www.bafa.de/EEW" },
      ],
    },
    process: {
      description: "Typische Bausteine unseres Programms",
      items: [
        {
          title: "Messkampagne",
          description: "Lastprofile, Druckbandbreiten und Energiebedarf erfassen.",
          icon: "air",
          kpi: "Transparenz < 2 Wochen",
        },
        {
          title: "Leckage-Management",
          description: "Leckagen identifizieren, bewerten und beheben.",
          icon: "control",
          kpi: "Ø 20 % Einsparung",
        },
        {
          title: "Wärmerückgewinnung",
          description: "Abwärme der Kompressoren für Heizzwecke nutzen.",
          icon: "heat",
          kpi: "Bis 80 % Wärme nutzbar",
        },
      ],
      cta: { label: "Workshop buchen", href: "/kontakt" },
    },
    caseStudy: {
      title: "Druckluftoptimierung Automotive",
      client: "AutoParts SE",
      summary:
        "Messkampagne, Leckagebeseitigung und neue Wärmerückgewinnung brachten 32 % Einsparung.",
      metrics: [
        { label: "Energiekostensenkung", value: "−145.000 €/a" },
        { label: "EEW Zuschuss", value: "420.000 €" },
      ],
    },
    faqs: [
      {
        question: "Welche Amortisationszeiten sind üblich?",
        answer: "Leckagebeseitigung amortisiert sich oft in < 1 Jahr, Wärmerückgewinnung in 2–4 Jahren.",
        category: "consulting",
      },
      {
        question: "Wie läuft eine Messkampagne ab?",
        answer: "Wir installieren Datenlogger an Haupt- und Unterverteilungen, werten Lastprofile aus und leiten Maßnahmen ab.",
        category: "process",
      },
      {
        question: "Welche Förderquote ist realistisch?",
        answer: "Über EEW Modul 1 erreichen wir 30 %, bei Transformationskonzepten bis 50 %.",
        category: "funding",
      },
    ],
  },
  {
    slug: "kaelte-klima-effizienzprogramm",
    title: "Effizienzprogramm Kälte- und Klimasysteme",
    teaser:
      "Planung und Optimierung von Kälte- und Klimaanlagen inklusive Kältemittelstrategie und Monitoring.",
    icon: "leaf",
    audience: ["nwg"],
    domain: ["anlagen", "prozesse"],
    lifecycle: ["bestand", "neubau"],
    serviceType: ["beratung", "foerderung", "nachweis"],
    categorySlug: "anlagen-prozesse",
    hero: {
      badge: "F-Gase im Griff",
      body: "Wir analysieren Kälteerzeugung, Verteilung und Rückkühlung, entwickeln Sanierungsfahrpläne und sichern EEW-/BEG-Förderung.",
      features: ["F-Gase Verordnung", "Freikühlung", "Monitoring"],
    },
    standards: {
      norms: [
        {
          title: "DIN EN 378",
          summary: "Sicherheitstechnische Anforderungen an Kälteanlagen.",
        },
        {
          title: "F-Gase-Verordnung",
          code: "EU 517/2014",
          summary: "Kältemittelstrategie für Treibhausgasreduktion.",
        },
        {
          title: "VDI 2047",
          summary: "Hygiene bei Verdunstungskühlanlagen.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "EEW Modul 1",
          fundingRate: "Bis 30 %",
          summary: "Fördert hocheffiziente Kälteanlagen, Freikühlung und Steuerung.",
          eligible: "Unternehmen",
        },
        {
          title: "BEG NWG",
          fundingRate: "Bis 40 %",
          summary: "Fördert Kälte- und Klimatechnik bei Nichtwohngebäuden.",
          eligible: "Eigentümer Nichtwohngebäude",
        },
      ],
      sources: [
        { label: "BAFA – EEW", url: "https://www.bafa.de/EEW" },
        { label: "BEG NWG", url: "https://www.klimaschutz.de/beg" },
      ],
    },
    process: {
      items: [
        {
          title: "Bestandsanalyse",
          description: "Aufnahme von Kälteerzeugern, Rückkühlung und Steuerung.",
          icon: "snowflake",
          kpi: "Transparenz über EER/COP",
        },
        {
          title: "Kältemittelstrategie",
          description: "Umstieg auf Low-GWP Kältemittel und Leckagekontrolle.",
          icon: "light",
        },
        {
          title: "Monitoring",
          description: "Echtzeitüberwachung von Leistungszahlen und Energieverbrauch.",
          icon: "control",
        },
      ],
    },
    caseStudy: {
      title: "Kälteoptimierung Lebensmittelproduktion",
      client: "FreshFood SE",
      summary:
        "Optimierung einer NH₃/CO₂ Kälteanlage mit Freikühlung und Monitoring.",
      metrics: [
        { label: "COP Verbesserung", value: "+0,8" },
        { label: "EEW Zuschuss", value: "650.000 €" },
      ],
    },
    faqs: [
      {
        question: "Welche Kältemittel sind zukunftssicher?",
        answer: "Wir empfehlen natürliche Kältemittel wie NH₃, CO₂ oder Propan abhängig von Anwendung und Sicherheitsanforderungen.",
        category: "consulting",
      },
      {
        question: "Was fördert EEW Modul 1 bei Kälteanlagen?",
        answer: "Hocheffiziente Verdichter, Regelungen, Freikühlung, Wärmerückgewinnung und Monitoring.",
        category: "funding",
      },
      {
        question: "Wie lange dauert das Programm?",
        answer: "Analyse, Konzept und Antragstellung etwa 6 Wochen, Umsetzung je nach Umfang 3–12 Monate.",
        category: "process",
      },
    ],
  },
  {
    slug: "led-beleuchtung-beratung",
    title: "LED- und Lichtsteuerungskonzept",
    teaser:
      "Planung von LED-Umrüstungen inklusive Tageslicht- und Präsenzsteuerung für Hallen, Büros und Produktionsstätten.",
    icon: "lightbulb",
    audience: ["nwg"],
    domain: ["anlagen"],
    lifecycle: ["bestand"],
    serviceType: ["beratung", "foerderung"],
    categorySlug: "anlagen-prozesse",
    hero: {
      badge: "Bis zu 60 % Strom sparen",
      body: "Wir erfassen Bestandsbeleuchtung, planen LED-Konzepte mit Human-Centric Lighting und sorgen für EEW-Förderung.",
      features: ["Lichtberechnung", "HCL", "EEW Modul 1"],
    },
    standards: {
      norms: [
        {
          title: "Beleuchtung von Arbeitsstätten",
          code: "DIN EN 12464-1",
          summary: "Normative Anforderungen an Beleuchtungsstärken.",
        },
        {
          title: "Arbeitsstättenverordnung",
          summary: "Sicherheit und Gesundheitsschutz am Arbeitsplatz.",
        },
      ],
    },
    funding: {
      items: [
        {
          title: "EEW Modul 1",
          fundingRate: "Bis 25 %",
          summary: "Fördert LED-Umrüstung und intelligente Steuerung.",
          eligible: "Unternehmen",
        },
        {
          title: "Kommunalrichtlinie",
          fundingRate: "Bis 60 %",
          summary: "Förderung für kommunale Beleuchtung.",
          eligible: "Kommunen, öffentliche Einrichtungen",
        },
      ],
      sources: [
        { label: "BAFA EEW", url: "https://www.bafa.de/EEW" },
        { label: "UBA Kommunalrichtlinie", url: "https://www.klimaschutz.de/kommunalrichtlinie" },
      ],
    },
    caseStudy: {
      title: "LED-Umrüstung Logistikzentrum",
      client: "LogServ GmbH",
      summary:
        "Umrüstung von 1.200 Leuchten mit Präsenz- und Tageslichtsteuerung.",
      metrics: [
        { label: "Einsparung Strom", value: "−58 %" },
        { label: "EEW Zuschuss", value: "210.000 €" },
      ],
    },
    faqs: [
      {
        question: "Welche Beleuchtungsstärke ist vorgeschrieben?",
        answer: "Wir richten uns nach DIN EN 12464-1 und passen Konzepte an Arbeitsbereiche an.",
        category: "process",
      },
      {
        question: "Wie läuft die Förderung ab?",
        answer: "Wir erstellen die technische Projektbeschreibung und begleiten den EEW- bzw. Kommunalrichtlinie-Antrag.",
        category: "funding",
      },
      {
        question: "Wie schnell amortisiert sich LED?",
        answer: "Bei Logistik und Produktion zwischen 2–4 Jahren, durch Förderungen oft schneller.",
        category: "consulting",
      },
    ],
  },
];

interface CategoryIdMap {
  [slug: string]: string;
}

async function upsertCategories(): Promise<CategoryIdMap> {
  const ids: CategoryIdMap = {};

  for (const category of categorySeeds) {
    const existing = await client.fetch<
      { _id: string } | null
    >(
      `*[_type == "serviceCategory" && slug.current == $slug][0]{ _id }`,
      { slug: category.slug },
    );

    const _id = existing?._id ?? `serviceCategory-${category.slug}`;

    await client.createOrReplace({
      _id,
      _type: "serviceCategory",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      icon: category.icon,
      order: category.order,
      color: category.color,
      isActive: true,
      pageBuilder: category.pageBuilder,
    });

    ids[category.slug] = _id;
    console.log(`🔁 Category upserted: ${category.title}`);
  }

  return ids;
}

async function upsertFaqs(
  serviceSlug: string,
  faqs: FaqEntry[],
): Promise<Array<{ _type: "reference"; _ref: string }>> {
  const refs: Array<{ _type: "reference"; _ref: string }> = [];

  for (let index = 0; index < faqs.length; index += 1) {
    const faq = faqs[index];
    const faqId = `faq-${serviceSlug}-${index + 1}`;

    await client.createOrReplace({
      _id: faqId,
      _type: "faq",
      title: faq.question,
      richText: [block(faq.answer)],
      category: faq.category,
      priority: index + 1,
    });

    refs.push({ _type: "reference", _ref: faqId });
  }

  return refs;
}

async function upsertServices(categoryIds: CategoryIdMap) {
  for (const service of serviceSeeds) {
    const faqRefs = await upsertFaqs(service.slug, service.faqs);

    const pageBuilder: unknown[] = [
      heroBlock({
        badge: service.hero.badge,
        title: service.title,
        body: service.hero.body,
        features: service.hero.features,
      }),
      standardsBadgeBlock(service.standards),
      fundingTeaserBlock(service.funding),
    ];

    if (service.process) {
      pageBuilder.push(processGridBlock(service.process));
    }

    if (service.caseStudy) {
      pageBuilder.push(caseStudyCompactBlock(service.caseStudy));
    }

    if (faqRefs.length > 0) {
      pageBuilder.push(
        faqAccordionBlock({
          title: "Häufige Fragen",
          subtitle: "Antworten aus unseren Projekten",
          faqRefs,
        }),
      );
    }

    pageBuilder.push(contactCtaBlock());

    const doc = {
      _id: `serviceItem-${service.slug}`,
      _type: "serviceItem",
      title: service.title,
      slug: { _type: "slug" as const, current: service.slug },
      teaser: service.teaser,
      icon: service.icon,
      audience: service.audience,
      domain: service.domain ?? [],
      lifecycle: service.lifecycle ?? [],
      serviceType: service.serviceType,
      tags: service.tags ?? [],
      featured: service.featured ?? false,
      categoryRef: {
        _type: "reference" as const,
        _ref: categoryIds[service.categorySlug],
      },
      seoTitle: service.seoTitle ?? service.title,
      seoDescription: service.seoDescription ?? service.teaser,
      pageBuilder,
    };

    await client.createOrReplace(doc);
    console.log(`✅ Service upserted: ${service.title}`);
  }
}

async function main() {
  try {
    console.log("🚀 Seeding service categories & items...");
    const categoryIds = await upsertCategories();
    await upsertServices(categoryIds);
    console.log("🎉 Seeding completed successfully.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

void main();
