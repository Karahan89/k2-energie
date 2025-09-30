// Vereinfachtes Script zum Aktualisieren der Sanity-Inhalte
// Dieses Script kann über die Sanity Vision Tool ausgeführt werden

// Startseite aktualisieren
const homePageUpdate = {
  _id: "homePage",
  _type: "homePage",
  title: "Ihr Ingenieurbüro für Energieberatung & Sanierungsplanung",
  description: "Wir entwickeln energetische Gesamtkonzepte, sichern maximale Förderquoten und begleiten die Umsetzung bis zur Abnahme.",
  slug: { current: "/" },
  pageBuilder: [
    {
      _type: "hero",
      _key: "hero-1",
      variant: "full",
      eyebrow: "BAFA-zertifiziert",
      title: "Ihr Ingenieurbüro für Energieberatung & Sanierungsplanung",
      description: "Wir entwickeln energetische Gesamtkonzepte, sichern maximale Förderquoten und begleiten die Umsetzung bis zur Abnahme.",
      primaryButton: {
        _type: "button",
        text: "Kostenloses Erstgespräch",
        url: {
          _type: "customUrl",
          type: "internal",
          href: "/kontakt",
          internal: { _type: "reference", _ref: "contactPage" }
        }
      },
      secondaryButton: {
        _type: "button",
        text: "Referenzen ansehen",
        url: {
          _type: "customUrl",
          type: "internal",
          href: "/projekte",
          internal: { _type: "reference", _ref: "project" }
        }
      },
      features: [
        {
          number: "500+",
          description: "> 350 Projekte erfolgreich umgesetzt"
        },
        {
          number: "30%",
          description: "iSFP & Fördermanagement aus einer Hand"
        },
        {
          number: "15+",
          description: "Messbare CO₂- und Kosteneffekte"
        }
      ],
      energyCard: {
        title: "Energie-Analyse",
        metrics: [
          {
            icon: "zap",
            label: "Energieeffizienz",
            value: "78%",
            change: "+12%"
          },
          {
            icon: "leaf",
            label: "CO₂-Reduktion",
            value: "-6.3 t",
            change: "+18%"
          },
          {
            icon: "trending-up",
            label: "Jährliche Einsparung",
            value: "4.200 €",
            change: "+25%"
          },
          {
            icon: "users",
            label: "Projekte",
            value: "127",
            change: "+8%"
          }
        ],
        lastUpdated: "vor 2 Minuten"
      }
    }
  ],
  seoTitle: "Energieberatung & Sanierungsplanung | k2-energie",
  seoDescription: "Professionelle Energieberatung, Sanierungsfahrpläne und Fördermanagement. BAFA-zertifiziert für Wohngebäude, Gewerbe und Industrie."
};

// Leistungen-Seite aktualisieren
const servicePageUpdate = {
  _id: "service",
  _type: "service",
  title: "Leistungen",
  description: "Unsere Leistungen im Bereich Energieberatung und Sanierungsplanung",
  slug: { current: "/leistungen" },
  pageBuilder: [
    {
      _type: "hero",
      _key: "hero-1",
      variant: "simple",
      eyebrow: "Unsere Leistungen",
      title: "Energieberatung & Sanierungsplanung",
      description: "Wir bieten umfassende Beratungsleistungen für energetische Gebäudesanierung und Fördermanagement.",
      primaryButton: {
        _type: "button",
        text: "Kostenloses Erstgespräch",
        url: {
          _type: "customUrl",
          type: "internal",
          href: "/kontakt",
          internal: { _type: "reference", _ref: "contactPage" }
        }
      }
    }
  ],
  seoTitle: "Leistungen | k2-energie",
  seoDescription: "Unsere Leistungen im Bereich Energieberatung, Sanierungsplanung und Fördermanagement für Wohngebäude, Gewerbe und Industrie."
};

// Projekte-Seite aktualisieren
const projectPageUpdate = {
  _id: "project",
  _type: "project",
  title: "Projekte & Referenzen",
  description: "Unsere erfolgreich umgesetzten Projekte und Referenzen im Bereich Energieberatung",
  slug: { current: "/projekte" },
  pageBuilder: [
    {
      _type: "hero",
      _key: "hero-1",
      variant: "simple",
      eyebrow: "Unsere Projekte",
      title: "Projekte & Referenzen",
      description: "Erfolgreich umgesetzte Energieberatungsprojekte für Wohngebäude, Gewerbe und Industrie.",
      primaryButton: {
        _type: "button",
        text: "Projekt anfragen",
        url: {
          _type: "customUrl",
          type: "internal",
          href: "/kontakt",
          internal: { _type: "reference", _ref: "contactPage" }
        }
      }
    }
  ],
  seoTitle: "Projekte & Referenzen | k2-energie",
  seoDescription: "Unsere erfolgreich umgesetzten Projekte und Referenzen im Bereich Energieberatung und Sanierungsplanung."
};

// FAQ-Seite aktualisieren
const faqPageUpdate = {
  _id: "faq",
  _type: "faq",
  title: "Häufige Fragen",
  description: "Antworten auf häufige Fragen zur Energieberatung und Sanierungsplanung",
  slug: { current: "/faq" },
  pageBuilder: [
    {
      _type: "hero",
      _key: "hero-1",
      variant: "simple",
      eyebrow: "FAQ",
      title: "Häufige Fragen zur Energieberatung",
      description: "Transparente Antworten für Entscheider:innen rund um Energieberatung und Fördermanagement.",
      primaryButton: {
        _type: "button",
        text: "Persönliche Beratung",
        url: {
          _type: "customUrl",
          type: "internal",
          href: "/kontakt",
          internal: { _type: "reference", _ref: "contactPage" }
        }
      }
    }
  ],
  seoTitle: "Häufige Fragen | k2-energie",
  seoDescription: "Antworten auf häufige Fragen zur Energieberatung, Sanierungsplanung und Fördermanagement."
};

console.log("Sanity Content Updates bereit:");
console.log("1. Startseite:", homePageUpdate);
console.log("2. Leistungen:", servicePageUpdate);
console.log("3. Projekte:", projectPageUpdate);
console.log("4. FAQ:", faqPageUpdate);

// Diese Daten können über das Sanity Vision Tool in das Studio eingefügt werden
