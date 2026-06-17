# GF-Dashboard · Kompetenz Kompanie (Prototyp)

Klick-Prototyp des Geschäftsführungs-Dashboards. **Ohne Backend** – alle Zahlen sind Demo-Daten aus `assets/js/data.js`. Die Anmeldung akzeptiert jede Eingabe.

## Module

| Seite | Inhalt |
|---|---|
| `index.html` | Anmeldung (Prototyp: lässt immer rein) |
| `dashboard.html` | Übersicht: KPIs, Ziele-Ampeln, Alerts, nächste Trainings |
| `finanzen.html` | Jahresvergleich, offene/geplante Rechnungen, Fixkosten, Liquidität |
| `teilnehmer.html` | In Ausbildung, bald fertig, Starts, TN-Tage, Module, Produkte |
| `akquise.html` | Anfragen, Angebote, Auftragsbestätigungen, Funnel |
| `trainings.html` | Trainingstage, No-Show-Rate, Auslastung, Kosten pro Training |
| `forecast.html` | Jahresziele, Soll/Ist mit Ampeln, Umsatz-Forecast |
| `alerts.html` | Warnsystem mit Schwellenwerten |
| `berichte.html` | Monats-/Quartals-/Jahresberichte, Export |
| `einstellungen.html` | Benutzer, Rollen, Datenquellen, Sicherheit |

Buttons mit ⚡ zeigen geplante Funktionen („Wird implementiert“).

## Lokal ansehen

Einfach `index.html` im Browser öffnen – kein Server nötig. (Für Charts wird Chart.js per CDN geladen, daher Internetverbindung erforderlich.)

## Deployment auf Cloudflare Pages

1. Repository auf GitHub anlegen und diesen Ordner pushen:
   ```bash
   git init
   git add .
   git commit -m "GF-Dashboard Prototyp"
   git remote add origin https://github.com/<dein-account>/gf-dashboard.git
   git push -u origin main
   ```
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** → Repository wählen.
3. Build-Einstellungen:
   - Framework preset: **None**
   - Build command: *(leer lassen)*
   - Build output directory: `/`
4. Deploy – fertig. Jeder Push auf `main` deployt automatisch.

## Spätere Anbindung (geplant)

- **Evidenz**: Teilnehmer, Trainings, No-Shows, offene Rechnungen
- **HiDrive**: BuHa-Auswertungen (PDF), Umsatzplanung (Excel)
- **Bank-API** (z. B. FinAPI): Kontostand, Liquiditäts-Forecast
- **Belegungsliste**: variable Kosten (Trainer, Räume)
- **TR / Akquise-Quelle**: noch zu klären

## Technik

Statisches HTML/CSS/JS, keine Build-Tools. Chart.js 4 via CDN. Branding nach kompetenzkompanie.de (Roboto Condensed, Orange `#E47A3D`, Creme `#FFF6F0`).
