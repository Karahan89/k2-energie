# ✅ Footer-Schema Update - K2 Energieberatung

## 🎯 **Änderungen implementiert:**

Das Footer-Schema wurde entsprechend Ihren Anforderungen angepasst:

### **1. Copyright-Zeile Links:**
- **Impressum** und **Datenschutz** werden jetzt in der Copyright-Zeile angezeigt
- **Format:** `© 2025 K² Energieberatung. Alle Rechte vorbehalten. | Impressum | Datenschutz`
- **Separates Schema-Feld:** `copyrightLinks` für Copyright-Zeile Links

### **2. Quick Links:**
- **Verlinken auf echte Seiten:** Startseite, Leistungen, Projekte, Über uns, Kontakt
- **Saubere Trennung:** Quick Links sind separate von Copyright-Links
- **Beschreibung:** "Links zu Hauptseiten der Website"

## 🔧 **Schema-Änderungen:**

### **Neues `copyrightLinks` Feld:**
```typescript
const copyrightLinks = defineField({
  name: "copyrightLinks",
  title: "Copyright-Zeile Links",
  description: "Links die in der Copyright-Zeile angezeigt werden (z.B. Impressum, Datenschutz)",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titel",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "openInNewTab",
          title: "In neuem Tab öffnen",
          type: "boolean",
          initialValue: false,
        }),
      ],
    },
  ],
});
```

### **Aktualisierte `footerLinks`:**
```typescript
const footerLinks = defineField({
  name: "footerLinks",
  title: "Footer Links",
  type: "object",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Schnellzugriff Links",
      description: "Links zu Hauptseiten der Website",
      type: "array",
      // ... Quick Links Konfiguration
    }),
  ],
});
```

## 🎨 **UI-Änderungen:**

### **Copyright-Zeile Layout:**
```tsx
<div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
  <p className="text-sm text-muted-foreground">
    © {year} {settings?.siteTitle ?? contactInfo.companyName}. {copyrightText}
  </p>
  {copyrightLinks.length > 0 && (
    <nav className="flex gap-4 text-sm">
      {copyrightLinks.map((item, index) => (
        <Link
          key={`copyright-${item._id ?? item.href ?? index}`}
          href={item.href ?? "#"}
          target={item.openInNewTab ? "_blank" : undefined}
          rel={item.openInNewTab ? "noopener noreferrer" : undefined}
          className="transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )}
</div>
```

### **Responsive Verhalten:**
- **Mobile:** Copyright-Text und Links untereinander
- **Desktop:** Copyright-Text und Links nebeneinander

## 📋 **Standard-Konfiguration:**

### **Quick Links:**
- **Startseite:** `/`
- **Leistungen:** `/leistungen`
- **Projekte:** `/projekte`
- **Über uns:** `/unternehmen`
- **Kontakt:** `/kontakt`

### **Copyright-Links:**
- **Impressum:** `/impressum`
- **Datenschutz:** `/datenschutz`

## 🚀 **Setup-Status:**

- **Schema aktualisiert:** ✅
- **Komponente angepasst:** ✅
- **Setup-Script ausgeführt:** ✅
- **Footer konfiguriert:** ✅

## 📱 **Verfügbare Services:**

- **Website:** http://localhost:3000
- **Studio:** http://localhost:3333 (Einstellungen > Footer)

## 🎯 **Ergebnis:**

Das Footer-System zeigt jetzt:

1. **Newsletter-Bereich:** "Bleiben Sie informiert"
2. **Quick Links:** Hauptseiten der Website
3. **Kontakt:** K2 Energieberatung, Lengede
4. **Social Media:** Facebook, Twitter, Instagram, LinkedIn
5. **Copyright-Zeile:** `© 2025 K² Energieberatung. Alle Rechte vorbehalten. | Impressum | Datenschutz`

Die Struktur ist jetzt sauber getrennt und entspricht Ihren Anforderungen! 🎉
