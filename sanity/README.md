# Sanity Migration Utilities

## migrate-from-demo.ts

Idempotente Migration, um Inhalte vom Demo-Setup in die neue Struktur zu überführen.

### Voraussetzungen

- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_WRITE_TOKEN`

### Ausführen

```bash
pnpm migrate
```

Das Skript prüft vorhandene Dokumente anhand von IDs bzw. Slugs und legt nur fehlende Inhalte an. Zusätzlich werden Header- und Footer-Navigationen ergänzt sowie Featured-Inhalte auf der Startseite gesetzt.
