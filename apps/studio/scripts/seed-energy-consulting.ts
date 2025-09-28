import { createClient, type SanityClient } from "@sanity/client";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_WRITE_TOKEN ??
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_STUDIO_WRITE_TOKEN ??
  process.env.SANITY_EXEC_USER_TOKEN ??
  process.env.SANITY_CLI_USER_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET environment variables.",
  );
}

if (!token) {
  throw new Error(
    "Missing Sanity write token. Pass --with-user-token or configure SANITY_WRITE_TOKEN.",
  );
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-10",
  useCdn: false,
});

const key = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const block = (text: string, style: "normal" | "h2" | "h3" = "normal") => ({
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
  newTab = false,
}: {
  text: string;
  href: string;
  variant?: "default" | "secondary" | "outline" | "link";
  newTab?: boolean;
}) => ({
  _type: "button" as const,
  _key: key("btn"),
  text,
  variant,
  url: {
    _type: "customUrl" as const,
    type: "external" as const,
    external: href,
    href,
    openInNewTab: newTab,
  },
});

const heroBlock = ({
  badge,
  title,
  highlights,
  body,
  features,
  primaryCta,
}: {
  badge?: string;
  title: string;
  highlights?: string[];
  body: string;
  features?: string[];
  primaryCta?: ReturnType<typeof button>;
}) => ({
  _type: "hero" as const,
  _key: key("hero"),
  badge,
  title,
  titleHighlights: highlights ?? [],
  richText: [block(body)],
  features: features ?? [],
  buttons: primaryCta ? [primaryCta] : [],
  energyCard: {
    title: "Energie-Analyse",
    subtitle: "Beispiel-Berechnung Mehrfamilienhaus",
    badge: "BAFA-konform",
    annualSavings: "4.200 €",
    annualSavingsLabel: "Jährliche Einsparung",
    costReduction: "↓ 62% Energiekosten",
    co2Reduction: "-6.3 t",
    co2ReductionLabel: "CO₂ pro Jahr",
    emissionReduction: "↓ 58% Emissionen",
    efficiencyLabel: "Energieeffizienz",
    efficiencyFrom: "E",
    efficiencyTo: "A+",
    efficiencyScore: 78,
    temperature: "21°C",
    temperatureLabel: "Optimale Raumtemperatur",
    amortization: "7-11",
    amortizationLabel: "Jahre Amortisation",
  },
});

const featureCardsBlock = ({
  title,
  eyebrow,
  intro,
  cards,
}: {
  title: string;
  eyebrow?: string;
  intro: string;
  cards: {
    title: string;
    body: string;
  }[];
}) => ({
  _type: "featureCardsIcon" as const,
  _key: key("features"),
  eyebrow,
  title,
  richText: [block(intro)],
  cards: cards.map((card) => ({
    _type: "featureCardIcon" as const,
    _key: key("card"),
    title: card.title,
    richText: [block(card.body)],
  })),
});

const imageLinkCardsBlock = ({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  cards: {
    title: string;
    description: string;
    href: string;
  }[];
}) => ({
  _type: "imageLinkCards" as const,
  _key: key("image-cards"),
  eyebrow,
  title,
  richText: [block(description)],
  buttons: [],
  cards: cards.map((card) => ({
    _type: "imageLinkCard" as const,
    _key: key("link"),
    title: card.title,
    description: card.description,
    url: {
      _type: "customUrl" as const,
      type: "external" as const,
      external: card.href,
      href: card.href,
      openInNewTab: false,
    },
  })),
});

const ctaBlock = ({
  eyebrow,
  title,
  body,
  ctas,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  ctas: ReturnType<typeof button>[];
}) => ({
  _type: "cta" as const,
  _key: key("cta"),
  eyebrow,
  title,
  richText: [block(body)],
  buttons: ctas,
});

const subscribeBlock = ({
  title,
  subtitle,
  helper,
}: {
  title: string;
  subtitle: string;
  helper: string;
}) => ({
  _type: "subscribeNewsletter" as const,
  _key: key("newsletter"),
  title,
  subTitle: [block(subtitle)],
  helperText: [block(helper)],
});

async function seed() {
  console.info("Seeding energy consulting sample content...");

  const faqDocs = [
    {
      _id: "faq-energie-ablauf",
      _type: "faq",
      title: "Wie läuft eine Energieberatung bei k2-energie ab?",
      richText: [
        block(
          "Wir starten mit einem kostenlosen 30-minütigen Erstgespräch. Danach analysieren wir Ihren Bestand vor Ort, erstellen einen digitalen Gebäudemodell und führen alle nötigen Berechnungen für Fördermittel und Sanierungsfahrplan durch.",
        ),
        block(
          "Sie erhalten am Ende einen klaren Maßnahmenplan inklusive Zeit- und Kostenrahmen sowie eine Übersicht aller passenden Förderprogramme.",
        ),
      ],
    },
    {
      _id: "faq-energie-foerderung",
      _type: "faq",
      title: "Welche Förderprogramme werden berücksichtigt?",
      richText: [
        block(
          "Wir prüfen für jedes Projekt die aktuelle BEG-Förderkulisse, regionale Programme wie die Klimaschutz-Offensive des Landes sowie gewerbliche Zuschüsse. Unsere Fördermatrix wird täglich aktualisiert.",
        ),
      ],
    },
    {
      _id: "faq-energie-unterlagen",
      _type: "faq",
      title: "Welche Unterlagen sollten vorbereitet werden?",
      richText: [
        block(
          "Hilfreich sind Grundrisse, frühere Energieausweise, Heizkostenabrechnungen der letzten drei Jahre und – falls vorhanden – Dokumentationen technischer Anlagen. Falls diese nicht vorliegen, erfassen wir die Daten gemeinsam beim Vor-Ort-Termin.",
        ),
      ],
    },
  ];

  const serviceBeratungId = "service-beratung";
  const serviceSanierungsplanId = "service-sanierungsfahrplan";

  const serviceDocs = [
    {
      _id: serviceBeratungId,
      _type: "service",
      title: "Vor-Ort Energieberatung (BAFA-konform)",
      slug: { _type: "slug", current: "/leistungen/beratung" },
      teaser:
        "Ganzheitliche Energieberatung für Wohn- und Nichtwohngebäude inklusive Fördermittelcheck und Maßnahmenplan.",
      pageBuilder: [
        heroBlock({
          badge: "BAFA-gelistet",
          title: "Vor-Ort Energieberatung für Gebäude mit Zukunft",
          highlights: ["Energieberatung", "Sanierungsfahrplan"],
          body:
            "Wir analysieren Gebäudehülle, Anlagentechnik und Förderpotenziale, um Sanierungen wirtschaftlich und nachhaltig umzusetzen.",
          features: [
            "Förderfähiger iSFP inklusive",
            "Digitale Dokumentation & BIM-kompatibel",
            "Transparente Kostenschätzung",
          ],
          primaryCta: button({ text: "Erstberatung buchen", href: "/kontakt" }),
        }),
        featureCardsBlock({
          title: "Was Sie von uns erwarten dürfen",
          eyebrow: "Unser Vorgehen",
          intro:
            "Wir begleiten Eigentümer:innen und Projektentwickler:innen vom ersten Audit bis zur förderfähigen Umsetzung.",
          cards: [
            {
              title: "Ganzheitliche Analyse",
              body:
                "Gebäudeaufnahme, thermografische Auswertung und Verbrauchsanalyse bilden die Grundlage.",
            },
            {
              title: "Fördermittel-Mapping",
              body:
                "Wir prüfen BAFA, KfW und regionale Programme und bereiten die Antragsunterlagen vor.",
            },
            {
              title: "Sanierungsfahrplan",
              body:
                "Klare Prioritäten, Zeitachsen und Budgetempfehlungen inklusive CO₂- und Kostenwirkung.",
            },
          ],
        }),
        ctaBlock({
          eyebrow: "Nächster Schritt",
          title: "Starten Sie mit einer Bestandsaufnahme",
          body:
            "In einem 30-minütigen Gespräch klären wir Projektziele, Gebäudetyp und verfügbare Förderprogramme.",
          ctas: [button({ text: "Unverbindlichen Termin sichern", href: "/kontakt" })],
        }),
      ],
      seoTitle: "Vor-Ort Energieberatung | k2-energie",
      seoDescription:
        "Vor-Ort Energieberatung nach BAFA-Richtlinie: Analyse, Fördermittelcheck und Sanierungsfahrplan für Wohn- und Nichtwohngebäude.",
    },
    {
      _id: serviceSanierungsplanId,
      _type: "service",
      title: "Sanierungsfahrplan & Förderbegleitung",
      slug: { _type: "slug", current: "/leistungen/sanierungsfahrplan" },
      teaser:
        "Individueller Sanierungsfahrplan (iSFP) inklusive Fördermittellogik und Umsetzungshilfe für größere Projekte.",
      pageBuilder: [
        heroBlock({
          badge: "iSFP inklusive",
          title: "Sanierungsfahrplan mit klarer Investitionsstrategie",
          highlights: ["Sanierungsfahrplan", "Fördermanagement"],
          body:
            "Wir priorisieren Maßnahmen nach Energie- und Wirtschaftlichkeitskennzahlen und begleiten die Umsetzung bis zur Auszahlung.",
          features: [
            "Transparente Fördermatrix",
            "Monitoring der CO₂-Effekte",
            "Baubegleitende Qualitätssicherung",
          ],
          primaryCta: button({
            text: "Projekt anfragen",
            href: "/kontakt",
          }),
        }),
        featureCardsBlock({
          title: "Bausteine unseres Fahrplans",
          intro:
            "Wir strukturieren Projekte in klaren Phasen, damit Entscheider:innen jederzeit wissen, wo sie stehen.",
          cards: [
            {
              title: "Potenzialanalyse",
              body: "Energetische Bewertung, Lebenszyklus-Kosten und CO₂-Bilanz für jede Maßnahme.",
            },
            {
              title: "Förderarchitektur",
              body: "Abgleich von Bundes-, Landes- und Kommunalprogrammen inklusive Zeitfenster-Steuerung.",
            },
            {
              title: "Umsetzung & Monitoring",
              body: "Unterstützung bei Ausschreibungen, Baubegleitung und digitalem Reporting der Einsparungen.",
            },
          ],
        }),
      ],
      seoTitle: "Sanierungsfahrplan & Fördermanagement | k2-energie",
      seoDescription:
        "Individueller Sanierungsfahrplan (iSFP) mit Fördermanagement, Monitoring und Umsetzungshilfe für Wohn- und Gewerbeimmobilien.",
    },
  ];

  const companyPageId = "companyPage-ueber-uns";
  const contactPageId = "contactPage-kontakt";

  const companyPageDoc = {
    _id: companyPageId,
    _type: "companyPage",
    title: "Über k2-energie",
    description:
      "Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und klimaneutrale Quartiersentwicklung in Niedersachsen.",
    slug: { _type: "slug", current: "/unternehmen" },
    pageBuilder: [
      heroBlock({
        badge: "Unser Team",
        title: "Ingenieur:innen mit Energie für morgen",
        highlights: ["Ingenieur:innen", "Lengede"],
        body:
          "Wir sind ein interdisziplinäres Team aus Gebäudeenergieberater:innen, Versorgungstechnikern und Bauphysiker:innen – seit 2014 in Lengede zu Hause.",
        features: [
          "Zertifiziert nach DIN EN 16247",
          "Erfahrung aus 350+ Projekten",
          "Regional verwurzelt, bundesweit aktiv",
        ],
      }),
      featureCardsBlock({
        title: "Was uns auszeichnet",
        intro: "Wir kombinieren Ingenieurwissen mit pragmatischer Umsetzungserfahrung.",
        cards: [
          {
            title: "Transparente Zusammenarbeit",
            body: "Sie erhalten klare Entscheidungsvorlagen statt PDFs voller Fachjargon.",
          },
          {
            title: "Digitale Werkzeuge",
            body: "Vom Laserscan bis zum Energie-Monitoring arbeiten wir durchgängig digital.",
          },
          {
            title: "Netzwerk aus Fachplanern",
            body: "Für Heizung, Lüftung, PV oder Speicher binden wir spezialisierte Partner ein.",
          },
        ],
      }),
    ],
  };

  const contactPageDoc = {
    _id: contactPageId,
    _type: "contactPage",
    title: "Kontakt",
    description: "Wir freuen uns auf Ihr Projekt. Sprechen Sie mit unserem Beratungsteam.",
    slug: { _type: "slug", current: "/kontakt" },
    pageBuilder: [
      heroBlock({
        title: "Persönlich beraten in Lengede & digital deutschlandweit",
        highlights: ["Kontakt", "Team"],
        body:
          "Rufen Sie uns an unter +49 5344 984 92 10 oder schreiben Sie an hallo@k2-energie.de – wir antworten werktags innerhalb von 24 Stunden.",
        features: [
          "Bürozeiten: Mo–Do 8–17 Uhr, Fr 8–15 Uhr",
          "Vor-Ort-Termine in Niedersachsen & Sachsen-Anhalt",
          "Digitale Beratung bundesweit",
        ],
        primaryCta: button({ text: "Termin vereinbaren", href: "mailto:hallo@k2-energie.de" }),
      }),
      ctaBlock({
        title: "Projekt anfragen",
        body:
          "Beschreiben Sie kurz Ihr Gebäude, geplante Maßnahmen und Zeithorizont. Wir melden uns mit einem konkreten Vorschlag für die nächsten Schritte.",
        ctas: [
          button({ text: "Anfrageformular öffnen", href: "https://forms.gle/energieberatung" }),
          button({
            text: "Zum Erstgespräch",
            href: "tel:+4953449849210",
            variant: "outline",
          }),
        ],
      }),
    ],
  };

  const homePageDoc = {
    _id: "homePage-energy",
    _type: "homePage",
    title: "k2-energie – Ingenieurbüro für Energieberatung",
    description:
      "Energieberatung, Sanierungsfahrpläne und Fördermanagement aus einer Hand. Wir begleiten Wohnungswirtschaft, Kommunen und Unternehmen auf dem Weg zur klimaneutralen Gebäudestrategie.",
    slug: { _type: "slug", current: "/" },
    pageBuilder: [
      heroBlock({
        badge: "BAFA-zertifiziert",
        title: "Ihr Ingenieurbüro für Energieberatung & Sanierungsplanung",
        highlights: ["Ingenieurbüro", "Energieberatung"],
        body:
          "Wir entwickeln energetische Gesamtkonzepte, sichern maximale Förderquoten und begleiten die Umsetzung bis zur Abnahme.",
        features: [
          "> 350 Projekte erfolgreich umgesetzt",
          "iSFP & Fördermanagement aus einer Hand",
          "Messbare CO₂- und Kosteneffekte",
        ],
        primaryCta: button({ text: "Kostenloses Erstgespräch", href: "/kontakt" }),
      }),
      featureCardsBlock({
        eyebrow: "Unsere Leistungen",
        title: "Nachhaltige Energieberatung mit technischem Fokus",
        intro:
          "Ob Mehrfamilienhaus, Quartier oder Produktionsstandort – wir entwickeln wirtschaftliche und förderfähige Konzepte.",
        cards: [
          {
            title: "Vor-Ort Energieaudit",
            body: "Analyse von Gebäudehülle und Technik inklusive Wirtschaftlichkeitsberechnung.",
          },
          {
            title: "Sanierungsfahrplan",
            body: "Priorisierte Maßnahmenpakete mit Zeit- und Budgetplanung.",
          },
          {
            title: "Fördermanagement",
            body: "Beantragung, Nachweisführung und Monitoring über die komplette Laufzeit.",
          },
        ],
      }),
      imageLinkCardsBlock({
        eyebrow: "Branchen",
        title: "Für wen wir arbeiten",
        description:
          "Wir begleiten Eigentümer:innen, kommunale Wohnungsbaugesellschaften und Unternehmen bei der Dekarbonisierung ihrer Immobilien.",
        cards: [
          {
            title: "Wohnungswirtschaft",
            description: "Portfoliostrategien, Quartierslösungen und Mieterkommunikation.",
            href: "/leistungen/beratung",
          },
          {
            title: "Gewerbe & Industrie",
            description: "Effizienzsteigerung in Produktion, Abwärmenutzung und Lastmanagement.",
            href: "/leistungen/sanierungsfahrplan",
          },
          {
            title: "Kommunen",
            description: "Integrierte Klimaschutzkonzepte und Gebäudebestand im öffentlichen Bereich.",
            href: "/unternehmen",
          },
        ],
      }),
      {
        _type: "faqAccordion" as const,
        _key: key("faq"),
        eyebrow: "Fragen aus der Praxis",
        title: "Häufige Fragen zur Energieberatung",
        subtitle: "Transparente Antworten für Entscheider:innen",
        faqs: faqDocs.map((faq) => ({ _type: "reference" as const, _ref: faq._id })),
        link: {
          title: "Noch Fragen?",
          description: "Wir beraten Sie gerne persönlich.",
          url: {
            _type: "customUrl" as const,
            type: "external" as const,
            external: "/kontakt",
            href: "/kontakt",
            openInNewTab: false,
          },
        },
      },
      subscribeBlock({
        title: "Energie-Update für Entscheider:innen",
        subtitle:
          "Monatliche Insights zu Förderprogrammen, Techniktrends und Best Practices direkt in Ihr Postfach.",
        helper: "Kostenfrei, jederzeit abbestellbar.",
      }),
      ctaBlock({
        eyebrow: "Bereit für den nächsten Schritt?",
        title: "Wir entwickeln Ihren Sanierungsfahrplan",
        body: "Sichern Sie sich ein unverbindliches Erstgespräch mit unseren Energieingenieur:innen.",
        ctas: [button({ text: "Projekt anfragen", href: "/kontakt" })],
      }),
    ],
    featuredServices: [
      { _type: "reference", _ref: serviceBeratungId },
      { _type: "reference", _ref: serviceSanierungsplanId },
    ],
    seoTitle: "k2-energie | Energieberatung & Sanierungsfahrpläne",
    seoDescription:
      "Ingenieurbüro für Energieberatung in Lengede: Vor-Ort Audits, Sanierungsfahrpläne, Fördermanagement und Monitoring für Wohnungswirtschaft, Kommunen und Unternehmen.",
  };

  const navigationItems = [
    {
      _id: "nav-start",
      _type: "navigationItem",
      title: "Start",
      location: "header",
      order: 0,
      kind: "internal",
      internal: { _type: "reference", _ref: homePageDoc._id },
    },
    {
      _id: "nav-leistungen",
      _type: "navigationItem",
      title: "Leistungen",
      location: "header",
      order: 1,
      kind: "internal",
      internal: { _type: "reference", _ref: serviceBeratungId },
    },
    {
      _id: "nav-unternehmen",
      _type: "navigationItem",
      title: "Unternehmen",
      location: "header",
      order: 2,
      kind: "internal",
      internal: { _type: "reference", _ref: companyPageId },
    },
    {
      _id: "nav-kontakt",
      _type: "navigationItem",
      title: "Kontakt",
      location: "header",
      order: 3,
      kind: "internal",
      internal: { _type: "reference", _ref: contactPageId },
    },
    {
      _id: "nav-footer-beratung",
      _type: "navigationItem",
      title: "Energieberatung",
      location: "footer",
      order: 0,
      kind: "internal",
      internal: { _type: "reference", _ref: serviceBeratungId },
    },
    {
      _id: "nav-footer-fahrplan",
      _type: "navigationItem",
      title: "Sanierungsfahrplan",
      location: "footer",
      order: 1,
      kind: "internal",
      internal: { _type: "reference", _ref: serviceSanierungsplanId },
    },
    {
      _id: "nav-footer-unternehmen",
      _type: "navigationItem",
      title: "Über uns",
      location: "footer",
      order: 2,
      kind: "internal",
      internal: { _type: "reference", _ref: companyPageId },
    },
    {
      _id: "nav-footer-kontakt",
      _type: "navigationItem",
      title: "Kontakt",
      location: "footer",
      order: 3,
      kind: "internal",
      internal: { _type: "reference", _ref: contactPageId },
    },
  ];

  const siteSettingsDoc = {
    _id: "siteSettings",
    _type: "siteSettings",
    label: "Site Settings",
    siteTitle: "k2-energie",
    siteDescription:
      "Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und Fördermanagement in Lengede, Braunschweig und Umgebung.",
    contactEmail: "hallo@k2-energie.de",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/k2-energie",
      facebook: "https://www.facebook.com/k2energie",
      twitter: "https://x.com/k2energie",
      instagram: "https://www.instagram.com/k2energie",
      youtube: "https://www.youtube.com/@k2energie",
    },
  };

  const docs = [
    ...faqDocs,
    ...serviceDocs,
    companyPageDoc,
    contactPageDoc,
    homePageDoc,
    siteSettingsDoc,
    ...navigationItems,
  ];

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();
  console.info("Seed data imported successfully.\nDocs created:", docs.length);
}

seed().catch((error) => {
  console.error("Failed to seed energy consulting content:\n", error);
  process.exit(1);
});
