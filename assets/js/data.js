/* ============================================================
   GF-Dashboard – Demo-Daten (Prototyp, KEINE echten Zahlen)
   Stand der fiktiven Daten: 06.06.2026
   Später: Ersetzen durch API-Anbindung (HiDrive, Evidenz, Bank, TR)
   ============================================================ */

const KK = {

  meta: {
    stand: '06.06.2026',
    nutzer: { name: 'Gabi Geschäftsführung', kuerzel: 'GG', rolle: 'Geschäftsführung' }
  },

  /* ---------------- FINANZEN ---------------- */
  finanzen: {
    // Jahresvergleich: 3 Jahre zurück + aktuelles Jahr bis heute
    jahresvergleich: [
      { jahr: '2023', umsatz: 612400, kosten: 488200, gewinn: 124200 },
      { jahr: '2024', umsatz: 689750, kosten: 521300, gewinn: 168450 },
      { jahr: '2025', umsatz: 742100, kosten: 549800, gewinn: 192300 },
      { jahr: '2026 (YTD)', umsatz: 318650, kosten: 246900, gewinn: 71750 }
    ],
    monatsumsatz2026: {
      labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun*'],
      umsatz: [58200, 61400, 67800, 54300, 62100, 14850],
      kosten: [44100, 45800, 49600, 42900, 46200, 18300]
    },
    offeneRechnungen: [
      { nr: 'RE-2026-0142', kunde: 'Klinikum Nordstadt gGmbH', betrag: 12400, datum: '28.04.2026', faellig: '28.05.2026', tageUeberfaellig: 9 },
      { nr: 'RE-2026-0151', kunde: 'AWO Bezirksverband', betrag: 8750, datum: '06.05.2026', faellig: '05.06.2026', tageUeberfaellig: 1 },
      { nr: 'RE-2026-0156', kunde: 'Stadtwerke Hellweg GmbH', betrag: 6200, datum: '12.05.2026', faellig: '11.06.2026', tageUeberfaellig: 0 },
      { nr: 'RE-2026-0159', kunde: 'Pflegedienst Sonnenblick', betrag: 4150, datum: '18.05.2026', faellig: '17.06.2026', tageUeberfaellig: 0 },
      { nr: 'RE-2026-0163', kunde: 'Caritasverband Region Ost', betrag: 9800, datum: '25.05.2026', faellig: '24.06.2026', tageUeberfaellig: 0 },
      { nr: 'RE-2026-0167', kunde: 'MVZ Gesundheitszentrum Süd', betrag: 7400, datum: '02.06.2026', faellig: '01.07.2026', tageUeberfaellig: 0 }
    ],
    geplanteRechnungen: [
      { kunde: 'Klinikum Nordstadt gGmbH', leistung: 'KomPass Führung – Gruppe K12, Module 4–6', betrag: 14200, geplant: '15.06.2026' },
      { kunde: 'Berufsförderungswerk Mitte', leistung: 'BZTZ – Durchgang 2026/2', betrag: 18600, geplant: '30.06.2026' },
      { kunde: 'Hausarztpraxen Verbund West', leistung: 'mFA-Qualifizierung – 8 TN', betrag: 9450, geplant: '15.07.2026' },
      { kunde: 'Stadtwerke Hellweg GmbH', leistung: 'Führung konkret – Inhouse, 2 Tage', betrag: 7800, geplant: '31.07.2026' },
      { kunde: 'AWO Bezirksverband', leistung: 'KomPass Führung – Gruppe K13, Module 1–3', betrag: 13100, geplant: '15.08.2026' }
    ],
    fixkosten: [
      { posten: 'Personalkosten (fest)', betrag: 18500, faellig: 'monatlich, zum 28.', art: 'fix' },
      { posten: 'Miete Trainingsräume + Büro', betrag: 4800, faellig: 'monatlich, zum 3.', art: 'fix' },
      { posten: 'Software / IT / Lizenzen (Evidenz u. a.)', betrag: 940, faellig: 'monatlich', art: 'fix' },
      { posten: 'Kfz-Leasing (2 Fahrzeuge)', betrag: 780, faellig: 'monatlich', art: 'fix' },
      { posten: 'Versicherungen', betrag: 620, faellig: 'monatlich', art: 'fix' },
      { posten: 'Steuerberatung / Buchhaltung', betrag: 550, faellig: 'monatlich', art: 'fix' },
      { posten: 'Honorartrainer (lt. Belegungsliste Juni)', betrag: 9200, faellig: 'variabel, n. Einsatz', art: 'variabel' },
      { posten: 'Raummieten extern (lt. Belegungsliste Juni)', betrag: 1850, faellig: 'variabel, n. Einsatz', art: 'variabel' },
      { posten: 'Catering / Seminarmaterial (Juni, hochger.)', betrag: 1240, faellig: 'variabel', art: 'variabel' }
    ],
    liquiditaet: {
      kontostand: 86420,
      kontostandDatum: '06.06.2026',
      forecast: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        werte: [86420, 92100, 78400, 95800, 104300, 99700, 118200],
        minimum: 30000
      }
    }
  },

  /* ---------------- TEILNEHMER ---------------- */
  teilnehmer: {
    aktuellInAusbildung: 147,
    baldFertig: 23,           // nur noch 1 Modul
    gesamtAktiv: 147,
    gesamtAbsolventen: 1137,
    anzahlModuleLaufend: 412, // gebuchte Module im laufenden Jahr
    tnTageYtd: 3864,
    jahresdurchschnittTn: 138,
    beginnAnstehend: [
      { name: 'Gruppe K13 – KomPass Führung', tn: 12, start: '17.06.2026', quelle: 'Evidenz' },
      { name: 'BZTZ Durchgang 2026/3', tn: 16, start: '01.07.2026', quelle: 'Evidenz' },
      { name: 'mFA-Qualifizierung Sommer', tn: 8, start: '13.07.2026', quelle: 'Excel (Zukunftsaufträge)' },
      { name: 'Führung konkret – Inhouse Stadtwerke', tn: 10, start: '24.08.2026', quelle: 'Excel (Zukunftsaufträge)' },
      { name: 'Gruppe K14 – KomPass Führung', tn: 11, start: '07.09.2026', quelle: 'Evidenz' }
    ],
    baldFertigListe: [
      { gruppe: 'Gruppe K10 – KomPass Führung', tn: 9, letztesModul: 'Modul 6: Wirksam führen', termin: '22.06.2026' },
      { gruppe: 'BZTZ Durchgang 2025/4', tn: 8, letztesModul: 'Abschlussmodul + Kolloquium', termin: '29.06.2026' },
      { gruppe: 'mFA-Qualifizierung Frühjahr', tn: 6, letztesModul: 'Prüfungsvorbereitung', termin: '08.07.2026' }
    ],
    entwicklungTn: {
      labels: ['2023', '2024', '2025', '2026 (YTD)'],
      aktiv: [112, 126, 141, 147],
      absolventen: [188, 214, 241, 96]
    },
    tnProProdukt: [
      { produkt: 'KomPass Führung', tn: 52 },
      { produkt: 'Führung konkret', tn: 31 },
      { produkt: 'BZTZ', tn: 38 },
      { produkt: 'mFA', tn: 19 },
      { produkt: 'Sonstige / Inhouse', tn: 7 }
    ]
  },

  /* ---------------- AKQUISE ---------------- */
  akquise: {
    angebote: [
      { kunde: 'Klinikverbund Westfalen', produkt: 'KomPass Führung', tn: 14, module: 6, summe: 42800, datum: '12.05.2026', status: 'offen' },
      { kunde: 'Jobcenter Region Mitte', produkt: 'BZTZ', tn: 18, module: 8, summe: 51300, datum: '15.05.2026', status: 'offen' },
      { kunde: 'Ärztenetz Nordwest', produkt: 'mFA', tn: 10, module: 4, summe: 16900, datum: '21.05.2026', status: 'offen' },
      { kunde: 'Sparkasse Hellweg-Lippe', produkt: 'Führung konkret', tn: 12, module: 2, summe: 9800, datum: '26.05.2026', status: 'nachgefasst' },
      { kunde: 'Diakonie Soziale Dienste', produkt: 'KomPass Führung', tn: 11, module: 6, summe: 33600, datum: '28.05.2026', status: 'offen' },
      { kunde: 'Logistik Hub OWL GmbH', produkt: 'Führung konkret', tn: 15, module: 3, summe: 17200, datum: '03.06.2026', status: 'neu' },
      { kunde: 'Kommunale Pflegeholding', produkt: 'KomPass Führung', tn: 9, module: 6, summe: 14800, datum: '05.06.2026', status: 'neu' }
    ],
    auftragsbestaetigungen: [
      { kunde: 'Stadtwerke Hellweg GmbH', produkt: 'Führung konkret', tn: 10, summe: 7800, datum: '14.05.2026', start: '24.08.2026' },
      { kunde: 'Berufsförderungswerk Mitte', produkt: 'BZTZ', tn: 16, summe: 37200, datum: '20.05.2026', start: '01.07.2026' },
      { kunde: 'Hausarztpraxen Verbund West', produkt: 'mFA', tn: 8, summe: 9450, datum: '27.05.2026', start: '13.07.2026' },
      { kunde: 'AWO Bezirksverband', produkt: 'KomPass Führung', tn: 12, summe: 26200, datum: '02.06.2026', start: '17.06.2026' }
    ],
    anfragen: [
      { kunde: 'Stadtverwaltung Ostheim', thema: 'Führungskräfteentwicklung Verwaltung', eingang: '26.05.2026', kanal: 'Website' },
      { kunde: 'Reha-Zentrum Lindenpark', thema: 'BZTZ für 12–15 TN ab Herbst', eingang: '28.05.2026', kanal: 'Empfehlung' },
      { kunde: 'Volksbank Börde eG', thema: 'Inhouse Führung konkret', eingang: '01.06.2026', kanal: 'Telefon' },
      { kunde: 'Seniorenresidenz Am Wall', thema: 'mFA-Qualifizierung, 6 TN', eingang: '03.06.2026', kanal: 'E-Mail' },
      { kunde: 'IT-Systemhaus Brandt', thema: 'KomPass Führung, Kostenrahmen?', eingang: '05.06.2026', kanal: 'Website' }
    ],
    funnel: { anfragen: 23, angebote: 14, auftraege: 6, zeitraum: 'letzte 90 Tage' }
  },

  /* ---------------- TRAININGS ---------------- */
  trainings: {
    tageAbsolviert: 96,
    tageGeplant: 118,
    tageGesamtJahr: 214,
    noShow: { monat: 4.2, jahr: 5.1, noShows30Tage: 11, tn30Tage: 264 },
    auslastung: { min: 6, max: 14, durchschnitt: 10.3, zielMin: 8 },
    kosten: { trainerProTag: 1150, raumProTag: 320, gesamtProTagOe: 1640 },
    kostenHinweis: 'Quelle: eingehende Rechnungen (EBH), Durchschnitt 2026. Alternativ: Hochrechnung aus TN-Zahl.',
    monatsTage: {
      labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      absolviert: [16, 18, 21, 17, 19, 5, 0, 0, 0, 0, 0, 0],
      geplant: [0, 0, 0, 0, 0, 13, 14, 9, 22, 24, 21, 15]
    },
    noShowVerlauf: {
      labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun*'],
      werte: [5.8, 6.1, 4.9, 5.3, 4.2, 3.8]
    },
    tnProProdukt: [
      { produkt: 'KomPass Führung', tn: 52, tage: 38, auslastung: 10.8 },
      { produkt: 'Führung konkret', tn: 31, tage: 14, auslastung: 11.2 },
      { produkt: 'BZTZ', tn: 38, tage: 26, auslastung: 9.5 },
      { produkt: 'mFA', tn: 19, tage: 12, auslastung: 8.9 },
      { produkt: 'Sonstige / Inhouse', tn: 7, tage: 6, auslastung: 7.0 }
    ],
    anstehend: [
      { datum: '09.06.2026', training: 'KomPass Führung K11 – Modul 4', trainer: 'M. Berger', tn: 11, raum: 'Raum A (eigen)' },
      { datum: '11.06.2026', training: 'BZTZ 2026/2 – Modul 5', trainer: 'S. Kaminski', tn: 14, raum: 'Raum B (eigen)' },
      { datum: '15.06.2026', training: 'Führung konkret – Stadtwerke (Inhouse)', trainer: 'T. Vogel', tn: 10, raum: 'beim Kunden' },
      { datum: '17.06.2026', training: 'KomPass Führung K13 – Kickoff', trainer: 'M. Berger', tn: 12, raum: 'Raum A (eigen)' },
      { datum: '22.06.2026', training: 'KomPass Führung K10 – Modul 6 (Abschluss)', trainer: 'A. Reinhardt', tn: 9, raum: 'Raum A (eigen)' }
    ]
  },

  /* ---------------- FORECAST & ZIELE ---------------- */
  ziele2026: {
    umsatz: { ziel: 820000, ist: 318650 },
    gewinn: { ziel: 205000, ist: 71750 },
    tnAktiv: { ziel: 160, ist: 147 },
    trainingstage: { ziel: 230, ist: 96, geplant: 118 },
    noShowMax: { ziel: 5.0, ist: 5.1 },
    neukunden: { ziel: 12, ist: 5 }
  },
  forecastUmsatz: {
    labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    ist: [58200, 61400, 67800, 54300, 62100, null, null, null, null, null, null, null],
    forecast: [null, null, null, null, 62100, 68500, 64200, 52800, 78400, 82100, 76900, 71300],
    zielLinie: 68333 // 820k / 12
  },

  /* ---------------- ALERTS ---------------- */
  alerts: {
    schwellen: [
      { id: 'liq', label: 'Liquidität unter', wert: 30000, einheit: '€', aktiv: true },
      { id: 'rechnung', label: 'Offene Rechnung älter als', wert: 30, einheit: 'Tage', aktiv: true },
      { id: 'noshow', label: 'No-Show-Rate (Monat) über', wert: 5, einheit: '%', aktiv: true },
      { id: 'auslastung', label: 'Ø Auslastung unter', wert: 8, einheit: 'TN', aktiv: true },
      { id: 'angebot', label: 'Angebot ohne Reaktion seit', wert: 14, einheit: 'Tagen', aktiv: false }
    ],
    aktuelle: [
      { stufe: 'red', titel: 'Rechnung RE-2026-0142 ist 9 Tage überfällig', detail: 'Klinikum Nordstadt gGmbH · 12.400 € · fällig 28.05.2026', zeit: 'seit 28.05.2026', modul: 'finanzen.html' },
      { stufe: 'yellow', titel: 'No-Show-Rate (Jahr) über Schwellenwert', detail: '5,1 % (Schwelle: 5,0 %) – Monatswert mit 4,2 % wieder im grünen Bereich', zeit: 'seit 31.05.2026', modul: 'trainings.html' },
      { stufe: 'yellow', titel: 'Angebot Klinikverbund Westfalen ohne Reaktion', detail: '42.800 € · versendet 12.05.2026 · 25 Tage ohne Rückmeldung', zeit: 'seit 26.05.2026', modul: 'akquise.html' },
      { stufe: 'green', titel: 'Liquidität im grünen Bereich', detail: 'Kontostand 86.420 € – Forecast bleibt über Minimum (30.000 €)', zeit: 'geprüft 06.06.2026', modul: 'finanzen.html' }
    ]
  },

  /* ---------------- BENUTZER & DATENQUELLEN ---------------- */
  benutzer: [
    { name: 'Gabi Geschäftsführung', email: 'gf@kompetenzkompanie.de', rolle: 'Geschäftsführung (Admin)', status: 'aktiv', letzterLogin: '06.06.2026, 08:12' },
    { name: 'Bernd Buchhaltung', email: 'buchhaltung@kompetenzkompanie.de', rolle: 'Buchhaltung', status: 'aktiv', letzterLogin: '05.06.2026, 16:40' },
    { name: 'Anna Assistenz', email: 'office@kompetenzkompanie.de', rolle: 'Nur Lesen', status: 'aktiv', letzterLogin: '04.06.2026, 09:55' },
    { name: 'Steuerberatung Müller & Partner', email: 'extern@stb-mueller.example', rolle: 'Extern (Finanzen, nur Lesen)', status: 'eingeladen', letzterLogin: '–' }
  ],
  datenquellen: [
    { name: 'Evidenz (Teilnehmer- & Seminarverwaltung)', typ: 'API', nutzt: 'Teilnehmer, Trainings, No-Shows, Auslastung', status: 'geplant' },
    { name: 'HiDrive (2.1_GF\\FINANZEN – BuHa-Auswertungen, Umsatzplanung)', typ: 'Datei-Sync (PDF/Excel)', nutzt: 'Jahresvergleich, geplante Rechnungen', status: 'geplant' },
    { name: 'Bankkonto (z. B. via FinAPI / finAPI XS2A)', typ: 'Banking-API', nutzt: 'Kontostand, Liquiditäts-Forecast', status: 'geplant' },
    { name: 'TR / Akquise-Liste', typ: 'noch zu klären', nutzt: 'Anfragen, Angebote, Auftragsbestätigungen', status: 'offen' },
    { name: 'Belegungsliste', typ: 'Excel', nutzt: 'variable Kosten (Trainer, Räume)', status: 'geplant' }
  ],

  /* ---------------- BERICHTE ---------------- */
  berichte: [
    { name: 'Monatsbericht Mai 2026', typ: 'Monat', inhalt: 'Umsatz, Kosten, EÜ, TN-Zahlen, Trainingstage, No-Show', stand: '01.06.2026' },
    { name: 'Quartalsbericht Q1 2026', typ: 'Quartal', inhalt: 'Finanzen, TN-Entwicklung, Akquise-Funnel, Soll/Ist', stand: '04.04.2026' },
    { name: 'Jahresbericht 2025', typ: 'Jahr', inhalt: 'Komplettauswertung inkl. 3-Jahres-Vergleich', stand: '15.01.2026' },
    { name: 'Bankenreport (Liquidität & Forecast)', typ: 'Ad-hoc', inhalt: 'Liquiditätsentwicklung, offene Posten, Forecast', stand: 'auf Abruf' }
  ]
};
