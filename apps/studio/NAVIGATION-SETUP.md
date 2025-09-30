# Navigation Setup - K2 Energieberatung

## Übersicht

Die Navigation wurde vereinfacht und basiert jetzt auf dem `navigationItem`-System. Die überflüssigen `navbar`- und `footer`-Singletons wurden entfernt.

## Navigation verwalten

### 1. Studio öffnen
```bash
pnpm dev:studio
```

### 2. Navigation konfigurieren
Gehen Sie zu **Einstellungen > Navigation** im Studio.

### 3. Navigationseinträge erstellen

#### Header Navigation (Hauptnavigation)
Erstellen Sie Navigationseinträge mit `location: "header"`:

1. **Startseite** (Reihenfolge: 1)
   - Titel: "Startseite"
   - Verlinkung: Interner Link
   - Ziel: Startseite

2. **Leistungen** (Reihenfolge: 2)
   - Titel: "Leistungen"
   - Verlinkung: Interner Link
   - Ziel: Leistungen

3. **Projekte** (Reihenfolge: 3)
   - Titel: "Projekte"
   - Verlinkung: Interner Link
   - Ziel: Projekte

4. **Über uns** (Reihenfolge: 4)
   - Titel: "Über uns"
   - Verlinkung: Interner Link
   - Ziel: Über uns

5. **Kontakt** (Reihenfolge: 5)
   - Titel: "Kontakt"
   - Verlinkung: Interner Link
   - Ziel: Kontakt

#### Footer Navigation
Erstellen Sie Navigationseinträge mit `location: "footer"`:

1. **Impressum** (Reihenfolge: 1)
   - Titel: "Impressum"
   - Verlinkung: Interner Link
   - Ziel: Impressum (Rechtsseite)

2. **Datenschutz** (Reihenfolge: 2)
   - Titel: "Datenschutz"
   - Verlinkung: Interner Link
   - Ziel: Datenschutz (Rechtsseite)

3. **FAQ** (Reihenfolge: 3)
   - Titel: "FAQ"
   - Verlinkung: Interner Link
   - Ziel: FAQ

## Verfügbare Seiten-Typen

### Singleton-Seiten (automatisch verfügbar)
- **Startseite** (`homePage`)
- **Über uns** (`companyPage`)
- **Kontakt** (`contactPage`)
- **Leistungen** (`service`)
- **Projekte** (`project`)
- **FAQ** (`faq`)

### Dokument-Seiten
- **Normale Seiten** (`page`)
- **Leistung** (`serviceItem`)
- **Projekt** (`projectItem`)
- **Rechtsseiten** (`legalPage`)

## Reihenfolge

- **Kleinere Zahlen** erscheinen weiter vorne
- **0** = ganz links/oben
- **Header**: 1-10 für Hauptnavigation
- **Footer**: 1-10 für Fußzeile

## Externe Links

Für externe Links:
- **Verlinkung**: Externer Link
- **Externe URL**: Vollständige URL (z.B. https://example.com)
- **In neuem Tab öffnen**: Optional

## Tipps

1. **Gruppen**: Navigationseinträge sind in "Inhalt" und "Einstellungen" gruppiert
2. **Vorschau**: Die Vorschau zeigt Titel, Ziel und Reihenfolge
3. **Filterung**: Im Studio können Sie nach Header/Footer filtern
4. **Sortierung**: Automatische Sortierung nach Reihenfolge

## Technische Details

- **Schema**: `navigationItem`
- **Query**: `queryNavigationData`
- **Frontend**: `Navbar` und `Footer` Komponenten
- **Sortierung**: `order asc` für beide Bereiche
