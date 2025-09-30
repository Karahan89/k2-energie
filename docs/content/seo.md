# SEO & Metadaten

SEO-Strategie und Metadaten-Management für k2-energie.

## 🎯 SEO-Strategie

### Primäre Keywords
- **Hauptkeywords**: Energieberatung, Sanierungsfahrplan, BAFA
- **Lokale Keywords**: Lengede, Braunschweig, Niedersachsen
- **Long-tail Keywords**: BAFA-konforme Energieberatung, iSFP Sanierungsfahrplan
- **Branchen-Keywords**: Wohnungswirtschaft, Kommunen, Gewerbe

### Zielgruppen-spezifische Keywords
- **Wohnungswirtschaft**: Quartierslösungen, Mieterkommunikation, Portfoliostrategien
- **Kommunen**: Klimaschutzkonzepte, kommunale Liegenschaften, Ratsbeschlüsse
- **Gewerbe**: Produktionseffizienz, Abwärmenutzung, Lastmanagement

## 📊 Metadaten-Struktur

### Title Tags
```typescript
// Beispiele für verschiedene Seiten
const titleTemplates = {
  home: "k2-energie | Energieberatung & Sanierungsfahrpläne",
  service: "{serviceTitle} | k2-energie",
  project: "Referenz {projectTitle} | k2-energie",
  company: "Über k2-energie | Ingenieurbüro für Energieberatung",
  contact: "Kontakt | k2-energie - Energieberatung in Lengede",
};
```

### Meta Descriptions
```typescript
// Optimierte Meta Descriptions (140-160 Zeichen)
const metaDescriptions = {
  home: "Ingenieurbüro für Energieberatung in Lengede: Vor-Ort Audits, Sanierungsfahrpläne, Fördermanagement und Monitoring für Wohnungswirtschaft, Kommunen und Unternehmen.",
  service: "BAFA-konforme Energieberatung mit Sanierungsfahrplan und Fördermanagement. Über 350 erfolgreiche Projekte in Niedersachsen und bundesweit.",
  project: "Erfolgreiche Energieprojekte von k2-energie: {projectSummary} mit messbaren CO₂-Einsparungen und Kosteneffekten.",
};
```

### Open Graph Tags
```typescript
// Open Graph Metadaten
const ogMetadata = {
  title: "k2-energie - Ingenieurbüro für Energieberatung",
  description: "Energieberatung, Sanierungsfahrpläne und Fördermanagement aus einer Hand. BAFA-zertifiziert in Lengede.",
  image: "https://k2-energie.de/og-image.jpg",
  url: "https://k2-energie.de",
  type: "website",
  siteName: "k2-energie",
};
```

## 🏗️ Technische SEO

### URL-Struktur
```
# Optimierte URL-Struktur
https://k2-energie.de/                          # Homepage
https://k2-energie.de/leistungen/beratung       # Service
https://k2-energie.de/leistungen/sanierungsfahrplan
https://k2-energie.de/referenzen/projekt-name   # Project
https://k2-energie.de/unternehmen               # Company
https://k2-energie.de/kontakt                   # Contact
```

### Sitemap
```xml
<!-- Automatisch generierte Sitemap -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://k2-energie.de/</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Weitere URLs -->
</urlset>
```

### Robots.txt
```txt
# robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://k2-energie.de/sitemap.xml

# Disallow admin areas
Disallow: /api/
Disallow: /studio/
```

## 📝 Content-SEO

### Heading-Struktur
```html
<!-- Optimierte H1-H6 Struktur -->
<h1>k2-energie – Ingenieurbüro für Energieberatung</h1>
  <h2>Unsere Leistungen</h2>
    <h3>Vor-Ort Energieberatung (BAFA-konform)</h3>
    <h3>Sanierungsfahrplan & Förderbegleitung</h3>
  <h2>Referenzen</h2>
    <h3>Quartier Sonnenpark Lengede</h3>
    <h3>Technologie-Campus Braunschweig</h3>
```

### Keyword-Dichte
- **Primär-Keywords**: 1-2% der Gesamtwörter
- **Sekundär-Keywords**: 0.5-1% der Gesamtwörter
- **Lokale Keywords**: Mindestens 3x pro Seite
- **LSI-Keywords**: 5-10 verwandte Begriffe

### Content-Länge
- **Homepage**: 300-500 Wörter
- **Service-Seiten**: 800-1200 Wörter
- **Projekt-Seiten**: 600-1000 Wörter
- **Blog-Artikel**: 1000-2000 Wörter

## 🖼️ Bild-SEO

### Alt-Texte
```html
<!-- Optimierte Alt-Texte -->
<img src="energieberatung-lengede.jpg" 
     alt="Energieberatung in Lengede: Ingenieur bei der Gebäudeanalyse mit Thermografie-Kamera" />

<img src="sanierungsfahrplan-prozess.jpg" 
     alt="Sanierungsfahrplan-Erstellung: iSFP-Prozess von der Analyse bis zur Umsetzung" />
```

### Bild-Optimierung
- **Dateinamen**: beschreibend und keyword-optimiert
- **Formate**: WebP für moderne Browser, JPEG als Fallback
- **Größen**: Responsive Images mit srcset
- **Lazy Loading**: Für bessere Performance

## 🔗 Interne Verlinkung

### Link-Strategie
```typescript
// Interne Verlinkungsstruktur
const internalLinks = {
  homepage: [
    { to: '/leistungen/beratung', text: 'Energieberatung' },
    { to: '/leistungen/sanierungsfahrplan', text: 'Sanierungsfahrplan' },
    { to: '/referenzen', text: 'Referenzen' },
    { to: '/kontakt', text: 'Kontakt' },
  ],
  service: [
    { to: '/referenzen', text: 'Erfolgreiche Projekte' },
    { to: '/kontakt', text: 'Beratung anfragen' },
  ],
};
```

### Anchor-Texte
- **Beschreibend**: "BAFA-konforme Energieberatung"
- **Keyword-optimiert**: "Sanierungsfahrplan erstellen"
- **Call-to-Action**: "Kostenlose Erstberatung buchen"

## 📱 Mobile SEO

### Responsive Design
```css
/* Mobile-First Ansatz */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .content-readable {
    font-size: 1rem;
    line-height: 1.6;
  }
}
```

### Mobile Performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Page Speed**: Mobile Score > 90
- **Touch Targets**: Mindestens 44px x 44px
- **Readable Text**: Mindestens 16px Schriftgröße

## 🏢 Lokale SEO

### Google My Business
- **Name**: k2-energie - Ingenieurbüro für Energieberatung
- **Adresse**: [Vollständige Adresse in Lengede]
- **Telefon**: +49 5344 984 92 10
- **Website**: https://k2-energie.de
- **Kategorien**: Ingenieurbüro, Energieberatung, Umweltberatung

### Lokale Keywords
- "Energieberatung Lengede"
- "Sanierungsfahrplan Braunschweig"
- "BAFA-Beratung Niedersachsen"
- "Energieberatung Wohnungswirtschaft"

### NAP-Konsistenz
- **Name**: k2-energie
- **Adresse**: [Konsistente Adresse überall]
- **Telefon**: +49 5344 984 92 10

## 📊 SEO-Monitoring

### Tools und Metriken
```typescript
// SEO-Metriken Tracking
const seoMetrics = {
  organicTraffic: 'Google Analytics 4',
  keywordRankings: 'Google Search Console',
  technicalSEO: 'Lighthouse CI',
  backlinks: 'Ahrefs / SEMrush',
  localSEO: 'Google My Business Insights',
};
```

### Wichtige KPIs
- **Organische Sichtbarkeit**: Top 3 Rankings für Hauptkeywords
- **Traffic**: 50%+ organischer Traffic
- **Conversions**: 5%+ Conversion Rate
- **Core Web Vitals**: Alle Metriken im grünen Bereich

## 🔧 SEO-Implementation

### Next.js SEO Setup
```typescript
// lib/seo.ts
export function getSEOMetadata({
  title,
  description,
  slug,
  contentId,
  contentType,
}: SEOMetadataProps) {
  return {
    title: title ? `${title} | k2-energie` : 'k2-energie',
    description,
    openGraph: {
      title,
      description,
      url: `https://k2-energie.de${slug}`,
      type: 'website',
      images: [
        {
          url: `https://k2-energie.de/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://k2-energie.de/api/og?title=${encodeURIComponent(title)}`],
    },
  };
}
```

### Sanity SEO Fields
```typescript
// Sanity Schema für SEO
export const seoFields = [
  defineField({
    name: "seoTitle",
    type: "string",
    title: "SEO Titel",
    group: GROUP.SEO,
    validation: (rule) => rule.max(60).warning("Titel sollte unter 60 Zeichen bleiben"),
  }),
  defineField({
    name: "seoDescription",
    type: "text",
    title: "SEO Beschreibung",
    group: GROUP.SEO,
    rows: 3,
    validation: (rule) => [
      rule.min(140).warning("Mindestens 140 Zeichen für SEO"),
      rule.max(160).warning("Maximal 160 Zeichen für SEO"),
    ],
  }),
  defineField({
    name: "seoNoIndex",
    type: "boolean",
    title: "Nicht indexieren",
    group: GROUP.SEO,
    initialValue: false,
  }),
];
```

## 🚀 SEO-Optimierung

### Performance-Optimierung
```typescript
// next.config.ts
const nextConfig = {
  // Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Compression
  compress: true,
  
  // Headers für Caching
  async headers() {
    return [
      {
        source: '/api/og/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "k2-energie",
  "description": "Ingenieurbüro für Energieberatung, Sanierungsfahrpläne und Fördermanagement",
  "url": "https://k2-energie.de",
  "telephone": "+49 5344 984 92 10",
  "email": "hallo@k2-energie.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Adresse]",
    "addressLocality": "Lengede",
    "addressRegion": "Niedersachsen",
    "postalCode": "[PLZ]",
    "addressCountry": "DE"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 52.2,
      "longitude": 10.3
    },
    "geoRadius": "100000"
  }
}
```

## 📈 SEO-Strategie

### Kurzfristig (3 Monate)
- **On-Page SEO**: Alle Seiten optimieren
- **Technische SEO**: Core Web Vitals verbessern
- **Lokale SEO**: Google My Business optimieren
- **Content**: 10+ optimierte Seiten

### Mittelfristig (6 Monate)
- **Keyword-Rankings**: Top 10 für Hauptkeywords
- **Backlinks**: 20+ qualitätsvolle Backlinks
- **Content-Marketing**: Blog und Ressourcen
- **Local Pack**: Top 3 in lokalen Suchergebnissen

### Langfristig (12 Monate)
- **Authority**: Domain Authority > 40
- **Traffic**: 1000+ organische Besucher/Monat
- **Conversions**: 50+ Leads/Monat
- **Brand**: Markenbekanntheit in der Branche

## 🔍 SEO-Audit

### Monatliche Checks
- [ ] **Google Search Console**: Fehler und Performance
- [ ] **Core Web Vitals**: Performance-Metriken
- [ ] **Keyword-Rankings**: Positionen überwachen
- [ ] **Backlinks**: Neue und verlorene Links

### Quartalsweise Audits
- [ ] **Vollständiger SEO-Audit**: Alle Faktoren prüfen
- [ ] **Konkurrenzanalyse**: Rankings und Strategien
- [ ] **Content-Review**: Aktualität und Qualität
- [ ] **Technical SEO**: Crawling und Indexierung
