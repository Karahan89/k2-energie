import { createClient, type SanityClient } from "@sanity/client";

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

const key = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

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

const externalUrl = ({
  href,
  newTab = false,
}: {
  href: string;
  newTab?: boolean;
}) => ({
  _type: "customUrl" as const,
  type: "external" as const,
  href,
  external: href,
  openInNewTab: newTab,
});

const internalUrl = ({
  ref,
  slug,
  newTab = false,
}: {
  ref: string;
  slug: string;
  newTab?: boolean;
}) => ({
  _type: "customUrl" as const,
  type: "internal" as const,
  href: slug,
  internal: { _type: "reference" as const, _ref: ref },
  openInNewTab: newTab,
});

type ButtonExternalLink = {
  href: string;
  internalRef?: undefined;
  internalSlug?: undefined;
};

type ButtonInternalLink = {
  internalRef: string;
  internalSlug: string;
  href?: undefined;
};

type ButtonLink = ButtonExternalLink | ButtonInternalLink;

const button = ({
  text,
  variant = "default",
  newTab = false,
  ...link
}: {
  text: string;
  variant?: "default" | "secondary" | "outline" | "link";
  newTab?: boolean;
} & ButtonLink) => {
  if ("internalRef" in link && typeof link.internalRef === "string") {
    const { internalRef, internalSlug } = link as ButtonInternalLink;
    return {
      _type: "button" as const,
      _key: key("btn"),
      text,
      variant,
      url: internalUrl({ ref: internalRef, slug: internalSlug, newTab }),
    };
  }

  return {
    _type: "button" as const,
    _key: key("btn"),
    text,
    variant,
    url: externalUrl({ href: link.href, newTab }),
  };
};

const heroBlock = ({
  variant = "full",
  badge,
  title,
  highlights,
  body,
  features,
  primaryCta,
}: {
  variant?: "full" | "simple";
  badge?: string;
  title: string;
  highlights?: string[];
  body: string;
  features?: string[];
  primaryCta?: ReturnType<typeof button>;
}) => ({
  _type: "hero" as const,
  _key: key("hero"),
  variant,
  badge,
  title,
  titleHighlights: highlights ?? [],
  richText: [block(body)],
  features: features ?? [],
  buttons: primaryCta ? [primaryCta] : [],
  ...(variant === "full" && {
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
  }),
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
  cards: (
    | {
        title: string;
        description: string;
        href: string;
        internalRef?: undefined;
        internalSlug?: undefined;
      }
    | {
        title: string;
        description: string;
        internalRef: string;
        internalSlug: string;
        href?: undefined;
      }
  )[];
}) => ({
  _type: "imageLinkCards" as const,
  _key: key("image-cards"),
  eyebrow,
  title,
  richText: [block(description)],
  buttons: [],
  cards: cards.map((card) => {
    if ("internalRef" in card && typeof card.internalRef === "string") {
      const { internalRef, internalSlug, title, description } = card as {
        internalRef: string;
        internalSlug: string;
        title: string;
        description: string;
      };
      return {
        _type: "imageLinkCard" as const,
        _key: key("link"),
        title,
        description,
        url: internalUrl({ ref: internalRef, slug: internalSlug }),
      };
    }

    return {
      _type: "imageLinkCard" as const,
      _key: key("link"),
      title: card.title,
      description: card.description,
      url: externalUrl({ href: card.href }),
    };
  }),
});

const contactFormBlock = ({
  eyebrow,
  title,
  intro,
  successMessage,
  submitLabel = "Nachricht senden",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  successMessage?: string;
  submitLabel?: string;
}) => ({
  _type: "contactForm" as const,
  _key: key("contact-form"),
  eyebrow,
  title,
  intro: intro ? [block(intro)] : [],
  fields: [
    {
      _type: "field" as const,
      _key: key("field"),
      label: "Ihr Name",
      name: "name",
      fieldType: "text" as const,
      placeholder: "Max Mustermann",
      required: true,
    },
    {
      _type: "field" as const,
      _key: key("field"),
      label: "Unternehmen / Organisation",
      name: "company",
      fieldType: "text" as const,
      placeholder: "Firmenname (optional)",
      required: false,
    },
    {
      _type: "field" as const,
      _key: key("field"),
      label: "E-Mail-Adresse",
      name: "email",
      fieldType: "email" as const,
      placeholder: "hallo@beispiel.de",
      required: true,
    },
    {
      _type: "field" as const,
      _key: key("field"),
      label: "Telefon",
      name: "phone",
      fieldType: "tel" as const,
      placeholder: "+49 531 123456",
      required: false,
    },
    {
      _type: "field" as const,
      _key: key("field"),
      label: "Projektbeschreibung",
      name: "message",
      fieldType: "textarea" as const,
      placeholder: "Um welche Immobilie oder Maßnahme geht es?",
      required: true,
    },
  ],
  privacyNotice: [
    block(
      "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu. Wir verwenden sie ausschließlich zur Bearbeitung Ihrer Anfrage.",
    ),
  ],
  submitLabel,
  successMessage:
    successMessage ??
    "Vielen Dank für Ihre Nachricht! Unser Team meldet sich spätestens am nächsten Werktag.",
});

const projectGalleryBlock = ({
  title,
  intro,
  projectIds,
  buttons,
}: {
  title: string;
  intro?: string;
  projectIds: string[];
  buttons?: ReturnType<typeof button>[];
}) => ({
  _type: "projectGallery" as const,
  _key: key("project-gallery"),
  title,
  intro: intro ? [block(intro)] : [],
  projects: projectIds.map((projectId) => ({
    _type: "reference" as const,
    _ref: projectId,
  })),
  buttons: buttons ?? [],
});

const navLink = ({
  name,
  url,
}: {
  name: string;
  url: ReturnType<typeof internalUrl> | ReturnType<typeof externalUrl>;
}) => ({
  _type: "navbarLink" as const,
  _key: key("nav-link"),
  name,
  url,
});

const footerLink = ({
  name,
  url,
}: {
  name: string;
  url: ReturnType<typeof internalUrl> | ReturnType<typeof externalUrl>;
}) => ({
  _type: "footerColumnLink" as const,
  _key: key("footer-link"),
  name,
  url,
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

async function seed() {
  console.info("Seeding energy consulting sample content...");

  const deletionQueries = [
    '*[_type == "navbar"]',
    '*[_type == "footer"]',
    '*[_type == "navigationItem"]',
    '*[_type == "page"]',
    '*[_type == "project"]',
    '*[_type in ["homePage", "companyPage"]]',
    '*[_type == "service"]',
    '*[_type == "faq"]',
    '*[_type == "contactPage"]',
    '*[_type == "legalPage"]',
    '*[_type == "siteSettings"]',
  ];

  console.info("Removing existing documents for seed types...");
  for (const query of deletionQueries) {
    await client.delete({ query });
    console.info(`Deleted documents matching query: ${query}`);
  }
  console.info("Existing seed documents removed.");

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

  const homePageId = "homePage";
  const companyPageId = "companyPage";
  const contactPageId = "contactPage";
  const referencesPageId = "page-referenzen";

  const serviceBeratungId = "service-beratung";
  const serviceSanierungsplanId = "service-sanierungsfahrplan";

  const projectDocs = [
    {
      _id: "project-referenz-sonnenpark",
      _type: "project",
      title: "Quartier Sonnenpark Lengede",
      summary:
        "Energetisches Gesamtkonzept für zwölf Mehrfamilienhäuser inklusive iSFP, Wärmepumpenverbund und fortlaufendem Monitoring.",
      slug: {
        _type: "slug",
        current: "/referenzen/quartier-sonnenpark-lengede",
      },
      date: "2025-04-15",
      pageBuilder: [
        heroBlock({
          variant: "simple",
          badge: "Wohnungswirtschaft",
          title: "Quartier Sonnenpark effizient und förderfähig",
          highlights: ["iSFP", "Förderquote 45 %"],
          body: "Für die Wohnungsbaugenossenschaft Sonnenpark entwickelten wir einen vollständigen Sanierungsfahrplan mit Wärmepumpenverbund, PV-Dachanlagen und Mieterstromkonzept.",
          features: [
            "12 Mehrfamilienhäuser",
            "45 % Zuschuss gesichert",
            "Digitale Fortschrittsberichte",
          ],
          primaryCta: button({
            text: "Projekt anfragen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        }),
        featureCardsBlock({
          eyebrow: "Projektumfang",
          title: "Leistungen im Überblick",
          intro:
            "Wir begleiteten die Genossenschaft von der Bestandsaufnahme bis zur Förderauszahlung und übernahmen die komplette Kommunikation mit BAFA und KfW.",
          cards: [
            {
              title: "Gebäude-Scan",
              body: "3D-Laserscan und Thermografie aller Gebäude inklusive Lastganganalyse der bestehenden Wärmeerzeugung.",
            },
            {
              title: "Sanierungsfahrplan",
              body: "Phasenmodell mit Budget- und Terminplanung sowie jährlicher CO₂-Minderung von 380 Tonnen.",
            },
            {
              title: "Fördermanagement",
              body: "Kombination aus BEG EM, Landesmitteln und Kommunalkrediten – Nachweisführung und Auszahlung inklusive.",
            },
          ],
        }),
        ctaBlock({
          eyebrow: "Ähnliche Gebäude?",
          title: "Wir prüfen Ihr Quartier",
          body: "In einem 30-minütigen Gespräch klären wir Bestand, Zeithorizont und Förderrouten für Ihre Objektgruppe.",
          ctas: [
            button({
              text: "Beratung anfragen",
              internalRef: contactPageId,
              internalSlug: "/kontakt",
            }),
          ],
        }),
      ],
      seoTitle: "Referenz Quartier Sonnenpark Lengede | k2-energie",
      seoDescription:
        "Quartier Sonnenpark Lengede: iSFP, Wärmepumpenverbund und 45 % Förderquote – umgesetzt durch k2-energie.",
    },
    {
      _id: "project-referenz-campus-braunschweig",
      _type: "project",
      title: "Technologie-Campus Braunschweig",
      summary:
        "Energiemonitoring und Reallaborkonzept für einen Technologie-Campus mit hybrider Wärmeversorgung und PV-Carports.",
      slug: {
        _type: "slug",
        current: "/referenzen/technologie-campus-braunschweig",
      },
      date: "2024-11-08",
      pageBuilder: [
        heroBlock({
          variant: "simple",
          badge: "Gewerbe",
          title: "Technologie-Campus mit Reallabor-Charakter",
          highlights: ["Monitoring", "Sektorkopplung"],
          body: "Für einen privaten Campus entwickelten wir ein Reallabor aus PV-Carports, smarter Speichertechnik und Lastmanagement für Labore und Büros.",
          features: [
            "Echtzeit-Lastmanagement",
            "CO₂-Reduktion 52 %",
            "Sektorkopplung Strom & Wärme",
          ],
          primaryCta: button({
            text: "Projekt besprechen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        }),
        featureCardsBlock({
          eyebrow: "Kernleistungen",
          title: "Was wir umgesetzt haben",
          intro:
            "Der Campus nutzt jetzt ein automatisiertes Energiemanagement, das Produktionsspitzen abfedert und Fördermittel optimal kombiniert.",
          cards: [
            {
              title: "Energiemonitoring",
              body: "Aufbau eines Dashboards mit 64 Messpunkten für Wärme, Strom und Prozesskälte.",
            },
            {
              title: "Förderstrategie",
              body: "Bundesförderung für Energie- und Ressourceneffizienz plus Innovationsprogramm des Landes Niedersachsen.",
            },
            {
              title: "Betriebsführung",
              body: "Servicevereinbarung für Monitoring, Wartung und jährlichen Fördermittel-Check.",
            },
          ],
        }),
        ctaBlock({
          eyebrow: "Nächste Schritte",
          title: "Wir analysieren Ihren Campus",
          body: "Ob Rechenzentrum oder Laborgebäude – wir identifizieren Potentiale und erstellen eine Investitionsstrategie.",
          ctas: [
            button({
              text: "Termin vereinbaren",
              internalRef: contactPageId,
              internalSlug: "/kontakt",
            }),
          ],
        }),
      ],
      seoTitle: "Referenz Technologie-Campus Braunschweig | k2-energie",
      seoDescription:
        "Technologie-Campus Braunschweig: Energiemonitoring, PV-Carports und intelligentes Lastmanagement von k2-energie.",
    },
    {
      _id: "project-referenz-rathaus-salzgitter",
      _type: "project",
      title: "Rathaus Salzgitter",
      summary:
        "Kommunaler Sanierungsfahrplan für das Rathaus Salzgitter mit Wärmeerzeugung, Fassadendämmung und Beleuchtungsumbau.",
      slug: { _type: "slug", current: "/referenzen/rathaus-salzgitter" },
      date: "2023-09-20",
      pageBuilder: [
        heroBlock({
          variant: "simple",
          badge: "Kommunen",
          title: "Rathaus Salzgitter fit für die Klimaziele",
          highlights: ["Kommunalverwaltung", "Energieeffizienz"],
          body: "Für die Stadt Salzgitter entwickelten wir einen mehrstufigen Sanierungsfahrplan samt Beschlussvorlage und Förderkulisse.",
          features: [
            "CO₂-Einsparung 61 %",
            "Amortisation 8 Jahre",
            "Förderquote 50 %",
          ],
          primaryCta: button({
            text: "Beratung für Kommunen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        }),
        featureCardsBlock({
          eyebrow: "Maßnahmen",
          title: "Was umgesetzt wurde",
          intro:
            "Das Ergebnis: politisch tragfähige Beschlüsse, klare Kostensicherheit und umsetzungsfertige Maßnahmenpakete.",
          cards: [
            {
              title: "Anlagentechnik",
              body: "Umstellung auf Wärmepumpe mit Spitzenlastkessel sowie hydraulischer Abgleich aller Heizkreise.",
            },
            {
              title: "Gebäudehülle",
              body: "Neue Fassadendämmung inklusive Fenstertausch mit Sonnenschutz und Lichtsensorik.",
            },
            {
              title: "Innenbeleuchtung",
              body: "LED-Umrüstung mit Präsenzsteuerung für Sitzungssäle und Verwaltungsbereiche.",
            },
          ],
        }),
        ctaBlock({
          eyebrow: "Förderquote sichern",
          title: "Wir begleiten Ihre Kommune",
          body: "Vom Ratsbeschluss bis zur Nachweisführung – wir übernehmen das Fördermanagement und die Qualitätssicherung.",
          ctas: [
            button({
              text: "Gespräch vereinbaren",
              internalRef: contactPageId,
              internalSlug: "/kontakt",
            }),
          ],
        }),
      ],
      seoTitle: "Referenz Rathaus Salzgitter | k2-energie",
      seoDescription:
        "Rathaus Salzgitter: Kommunaler Sanierungsfahrplan mit 61 % CO₂-Einsparung und 50 % Förderquote von k2-energie.",
    },
  ];

  const projectIds = projectDocs.map((project) => project._id);

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
          variant: "simple",
          badge: "BAFA-gelistet",
          title: "Vor-Ort Energieberatung für Gebäude mit Zukunft",
          highlights: ["Energieberatung", "Sanierungsfahrplan"],
          body: "Wir analysieren Gebäudehülle, Anlagentechnik und Förderpotenziale, um Sanierungen wirtschaftlich und nachhaltig umzusetzen.",
          features: [
            "Förderfähiger iSFP inklusive",
            "Digitale Dokumentation & BIM-kompatibel",
            "Transparente Kostenschätzung",
          ],
          primaryCta: button({
            text: "Erstberatung buchen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        }),
        featureCardsBlock({
          title: "Was Sie von uns erwarten dürfen",
          eyebrow: "Unser Vorgehen",
          intro:
            "Wir begleiten Eigentümer:innen und Projektentwickler:innen vom ersten Audit bis zur förderfähigen Umsetzung.",
          cards: [
            {
              title: "Ganzheitliche Analyse",
              body: "Gebäudeaufnahme, thermografische Auswertung und Verbrauchsanalyse bilden die Grundlage.",
            },
            {
              title: "Fördermittel-Mapping",
              body: "Wir prüfen BAFA, KfW und regionale Programme und bereiten die Antragsunterlagen vor.",
            },
            {
              title: "Sanierungsfahrplan",
              body: "Klare Prioritäten, Zeitachsen und Budgetempfehlungen inklusive CO₂- und Kostenwirkung.",
            },
          ],
        }),
        ctaBlock({
          eyebrow: "Nächster Schritt",
          title: "Starten Sie mit einer Bestandsaufnahme",
          body: "In einem 30-minütigen Gespräch klären wir Projektziele, Gebäudetyp und verfügbare Förderprogramme.",
          ctas: [
            button({
              text: "Unverbindlichen Termin sichern",
              internalRef: contactPageId,
              internalSlug: "/kontakt",
            }),
          ],
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
          variant: "simple",
          badge: "iSFP inklusive",
          title: "Sanierungsfahrplan mit klarer Investitionsstrategie",
          highlights: ["Sanierungsfahrplan", "Fördermanagement"],
          body: "Wir priorisieren Maßnahmen nach Energie- und Wirtschaftlichkeitskennzahlen und begleiten die Umsetzung bis zur Auszahlung.",
          features: [
            "Transparente Fördermatrix",
            "Monitoring der CO₂-Effekte",
            "Baubegleitende Qualitätssicherung",
          ],
          primaryCta: button({
            text: "Projekt anfragen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
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

  const legalImpressumId = "legalPage-impressum";
  const legalDatenschutzId = "legalPage-datenschutz";
  const legalAgbId = "legalPage-agb";

  const legalDocs = [
    {
      _id: legalImpressumId,
      _type: "legalPage",
      title: "Impressum",
      slug: { _type: "slug", current: "impressum" },
      category: "impressum",
      content: [
        block(
          "Bitte hinterlegen Sie hier Ihr vollständiges Impressum samt Anbieterkennzeichnung, Vertretungsberechtigten und Aufsichtsbehörden.",
        ),
      ],
    },
    {
      _id: legalDatenschutzId,
      _type: "legalPage",
      title: "Datenschutz",
      slug: { _type: "slug", current: "datenschutz" },
      category: "datenschutz",
      content: [
        block(
          "Beschreiben Sie hier Ihre Datenschutzrichtlinien, insbesondere Umgang mit personenbezogenen Daten, Rechtsgrundlagen und Betroffenenrechte.",
        ),
      ],
    },
    {
      _id: legalAgbId,
      _type: "legalPage",
      title: "Allgemeine Geschäftsbedingungen",
      slug: { _type: "slug", current: "agb" },
      category: "agb",
      content: [
        block(
          "Ergänzen Sie hier Ihre Allgemeinen Geschäftsbedingungen inklusive Leistungsbeschreibung, Zahlungsmodalitäten und Haftungsregelungen.",
        ),
      ],
    },
  ];

  const referencesPageDoc = {
    _id: referencesPageId,
    _type: "page",
    title: "Referenzen",
    description:
      "Referenzen von k2-energie: Quartiere, Kommunen und Gewerbeimmobilien, die wir mit Sanierungsfahrplänen, Monitoring und Fördermanagement erfolgreich begleitet haben.",
    slug: { _type: "slug", current: "/referenzen" },
    pageBuilder: [
      heroBlock({
        variant: "simple",
        badge: "Referenzen",
        title: "Erfolgreiche Energieprojekte aus Wohnungswirtschaft & Kommunen",
        highlights: ["iSFP", "Förderquoten"],
        body: "Von Mehrfamilienhäusern über Technologie-Campi bis zu kommunalen Liegenschaften – wir entwickeln praxisnahe Konzepte mit messbaren Effekten.",
        features: [
          "45 % durchschnittliche Förderquote",
          "350+ Projekte",
          "Monitoring über 24 Monate",
        ],
        primaryCta: button({
          text: "Projekt besprechen",
          internalRef: contactPageId,
          internalSlug: "/kontakt",
        }),
      }),
      projectGalleryBlock({
        title: "Ausgewählte Referenzen",
        intro:
          "Ein Auszug aus Projekten, die wir in den letzten Jahren begleitet haben. Gerne zeigen wir Ihnen weitere Referenzen aus Ihrer Branche.",
        projectIds,
        buttons: [
          button({
            text: "Weitere Referenzen anfragen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
            variant: "secondary",
          }),
        ],
      }),
      ctaBlock({
        eyebrow: "Nächster Schritt",
        title: "Lassen Sie uns über Ihr Vorhaben sprechen",
        body: "In einem unverbindlichen Erstgespräch prüfen wir Gebäude, Zeithorizont und die passende Förderstrategie.",
        ctas: [
          button({
            text: "Kontakt aufnehmen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        ],
      }),
    ],
    seoTitle: "Referenzen & Projekte | k2-energie",
    seoDescription:
      "Referenzen von k2-energie: Erfolgreiche Energie- und Förderprojekte für Wohnungswirtschaft, Gewerbe und Kommunen – inklusive messbarer Einsparungen.",
  };

  const companyPageDoc = {
    _id: companyPageId,
    _type: "companyPage",
    title: "Über k2-energie",
    description:
      "Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und klimaneutrale Quartiersentwicklung in Niedersachsen.",
    slug: { _type: "slug", current: "/unternehmen" },
    pageBuilder: [
      heroBlock({
        variant: "simple",
        badge: "Unser Team",
        title: "Ingenieur:innen mit Energie für morgen",
        highlights: ["Ingenieur:innen", "Lengede"],
        body: "Wir sind ein interdisziplinäres Team aus Gebäudeenergieberater:innen, Versorgungstechnikern und Bauphysiker:innen – seit 2014 in Lengede zu Hause.",
        features: [
          "Zertifiziert nach DIN EN 16247",
          "Erfahrung aus 350+ Projekten",
          "Regional verwurzelt, bundesweit aktiv",
        ],
      }),
      featureCardsBlock({
        title: "Was uns auszeichnet",
        intro:
          "Wir kombinieren Ingenieurwissen mit pragmatischer Umsetzungserfahrung.",
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
    description:
      "Wir freuen uns auf Ihr Projekt. Sprechen Sie mit unserem Beratungsteam.",
    slug: { _type: "slug", current: "/kontakt" },
    pageBuilder: [
      heroBlock({
        variant: "simple",
        title: "Persönlich beraten in Lengede & digital deutschlandweit",
        highlights: ["Kontakt", "Team"],
        body: "Rufen Sie uns an unter +49 5344 984 92 10 oder schreiben Sie an hallo@k2-energie.de – wir antworten werktags innerhalb von 24 Stunden.",
        features: [
          "Bürozeiten: Mo–Do 8–17 Uhr, Fr 8–15 Uhr",
          "Vor-Ort-Termine in Niedersachsen & Sachsen-Anhalt",
          "Digitale Beratung bundesweit",
        ],
        primaryCta: button({
          text: "Termin vereinbaren",
          href: "mailto:hallo@k2-energie.de",
        }),
      }),
      contactFormBlock({
        eyebrow: "Kontakt aufnehmen",
        title: "Wie können wir Sie unterstützen?",
        intro:
          "Beschreiben Sie Ihr Gebäude, geplante Maßnahmen und Ihren Zeithorizont. Wir melden uns werktags innerhalb eines Tages mit Terminvorschlägen.",
        successMessage:
          "Vielen Dank! Unser Team setzt sich spätestens am nächsten Werktag mit Ihnen in Verbindung.",
      }),
      ctaBlock({
        eyebrow: "Direkter Draht",
        title: "Sie erreichen uns auch telefonisch",
        body: "Montag bis Donnerstag 8–17 Uhr, Freitag 8–15 Uhr. Wir freuen uns auf den Austausch mit Ihnen.",
        ctas: [
          button({
            text: "Anrufen",
            href: "tel:+4953449849210",
            variant: "outline",
          }),
          button({
            text: "E-Mail schreiben",
            href: "mailto:hallo@k2-energie.de",
          }),
        ],
      }),
    ],
  };

  const homePageDoc = {
    _id: homePageId,
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
        body: "Wir entwickeln energetische Gesamtkonzepte, sichern maximale Förderquoten und begleiten die Umsetzung bis zur Abnahme.",
        features: [
          "> 350 Projekte erfolgreich umgesetzt",
          "iSFP & Fördermanagement aus einer Hand",
          "Messbare CO₂- und Kosteneffekte",
        ],
        primaryCta: button({
          text: "Kostenloses Erstgespräch",
          internalRef: contactPageId,
          internalSlug: "/kontakt",
        }),
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
            description:
              "Portfoliostrategien, Quartierslösungen und Mieterkommunikation.",
            internalRef: serviceBeratungId,
            internalSlug: "/leistungen/beratung",
          },
          {
            title: "Gewerbe & Industrie",
            description:
              "Effizienzsteigerung in Produktion, Abwärmenutzung und Lastmanagement.",
            internalRef: serviceSanierungsplanId,
            internalSlug: "/leistungen/sanierungsfahrplan",
          },
          {
            title: "Kommunen",
            description:
              "Integrierte Klimaschutzkonzepte und Gebäudebestand im öffentlichen Bereich.",
            internalRef: companyPageId,
            internalSlug: "/unternehmen",
          },
        ],
      }),
      {
        _type: "faqAccordion" as const,
        _key: key("faq"),
        eyebrow: "Fragen aus der Praxis",
        title: "Häufige Fragen zur Energieberatung",
        subtitle: "Transparente Antworten für Entscheider:innen",
        faqs: faqDocs.map((faq) => ({
          _type: "reference" as const,
          _ref: faq._id,
        })),
        link: {
          title: "Noch Fragen?",
          description: "Wir beraten Sie gerne persönlich.",
          url: internalUrl({ ref: contactPageId, slug: "/kontakt" }),
        },
      },
      ctaBlock({
        eyebrow: "Bereit für den nächsten Schritt?",
        title: "Wir entwickeln Ihren Sanierungsfahrplan",
        body: "Sichern Sie sich ein unverbindliches Erstgespräch mit unseren Energieingenieur:innen.",
        ctas: [
          button({
            text: "Projekt anfragen",
            internalRef: contactPageId,
            internalSlug: "/kontakt",
          }),
        ],
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

  const navbarDoc = {
    _id: "navbar",
    _type: "navbar",
    label: "Hauptnavigation",
    columns: [
      navLink({
        name: "Start",
        url: internalUrl({ ref: homePageId, slug: "/" }),
      }),
      navLink({
        name: "Leistungen",
        url: internalUrl({
          ref: serviceBeratungId,
          slug: "/leistungen/beratung",
        }),
      }),
      navLink({
        name: "Sanierungsfahrplan",
        url: internalUrl({
          ref: serviceSanierungsplanId,
          slug: "/leistungen/sanierungsfahrplan",
        }),
      }),
      navLink({
        name: "Referenzen",
        url: internalUrl({ ref: referencesPageId, slug: "/referenzen" }),
      }),
      navLink({
        name: "Unternehmen",
        url: internalUrl({ ref: companyPageId, slug: "/unternehmen" }),
      }),
      navLink({
        name: "Kontakt",
        url: internalUrl({ ref: contactPageId, slug: "/kontakt" }),
      }),
    ],
    buttons: [
      button({
        text: "Kostenloses Erstgespräch",
        internalRef: contactPageId,
        internalSlug: "/kontakt",
      }),
    ],
  };

  const footerDoc = {
    _id: "footer",
    _type: "footer",
    label: "Footer",
    subtitle:
      "Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und Fördermanagement in Lengede.",
    columns: [
      {
        _type: "footerColumn" as const,
        _key: key("footer-column"),
        title: "Navigation",
        links: [
          footerLink({
            name: "Start",
            url: internalUrl({ ref: homePageId, slug: "/" }),
          }),
          footerLink({
            name: "Leistungen",
            url: internalUrl({
              ref: serviceBeratungId,
              slug: "/leistungen/beratung",
            }),
          }),
          footerLink({
            name: "Sanierungsfahrplan",
            url: internalUrl({
              ref: serviceSanierungsplanId,
              slug: "/leistungen/sanierungsfahrplan",
            }),
          }),
          footerLink({
            name: "Referenzen",
            url: internalUrl({ ref: referencesPageId, slug: "/referenzen" }),
          }),
          footerLink({
            name: "Unternehmen",
            url: internalUrl({ ref: companyPageId, slug: "/unternehmen" }),
          }),
          footerLink({
            name: "Kontakt",
            url: internalUrl({ ref: contactPageId, slug: "/kontakt" }),
          }),
        ],
      },
      {
        _type: "footerColumn" as const,
        _key: key("footer-column"),
        title: "Kontakt",
        links: [
          footerLink({
            name: "Telefon",
            url: externalUrl({ href: "tel:+4953449849210" }),
          }),
          footerLink({
            name: "E-Mail",
            url: externalUrl({ href: "mailto:hallo@k2-energie.de" }),
          }),
        ],
      },
      {
        _type: "footerColumn" as const,
        _key: key("footer-column"),
        title: "Rechtliches",
        links: [
          footerLink({
            name: "Impressum",
            url: internalUrl({ ref: legalImpressumId, slug: "/impressum" }),
          }),
          footerLink({
            name: "Datenschutz",
            url: internalUrl({ ref: legalDatenschutzId, slug: "/datenschutz" }),
          }),
          footerLink({
            name: "AGB",
            url: internalUrl({ ref: legalAgbId, slug: "/agb" }),
          }),
        ],
      },
    ],
  };

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
    ...projectDocs,
    ...legalDocs,
    companyPageDoc,
    contactPageDoc,
    referencesPageDoc,
    homePageDoc,
    siteSettingsDoc,
    navbarDoc,
    footerDoc,
  ];

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc as any));
  await tx.commit();
  console.info("Seed data imported successfully.\nDocs created:", docs.length);
}

seed().catch((error) => {
  console.error("Failed to seed energy consulting content:\n", error);
  process.exit(1);
});
