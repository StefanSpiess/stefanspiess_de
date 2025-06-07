# Google Search Console Setup für stefanspiess.de

## Schritt-für-Schritt Anleitung

### 1. Google Search Console öffnen
- Gehe zu: https://search.google.com/search-console/
- Melde dich mit deinem Google-Konto an

### 2. Property hinzufügen
- Klicke auf "Property hinzufügen"
- Wähle "URL-Präfix" 
- Gib ein: `https://stefanspiess.de`
- Klicke "Weiter"

### 3. Inhaberschaft bestätigen
Du hast mehrere Optionen:

#### Option A: HTML-Datei (Empfohlen)
- Google gibt dir eine HTML-Datei zum Download
- Lade die Datei in das Root-Verzeichnis deiner Website hoch
- Beispiel: `google123abc456def.html`
- Die Datei muss unter `https://stefanspiess.de/google123abc456def.html` erreichbar sein

#### Option B: HTML-Tag (Alternative)
- Füge den Google-Meta-Tag in den `<head>` aller HTML-Seiten ein
- Beispiel: `<meta name="google-site-verification" content="abc123def456..." />`

#### Option C: DNS (Bei IONOS)
- Füge einen TXT-Record in den DNS-Einstellungen hinzu
- Bei IONOS: Domain → DNS → TXT-Record erstellen
- Name: `@` oder leer lassen
- Wert: Der von Google bereitgestellte Code

### 4. Sitemap einreichen
Nach der Bestätigung:
- Gehe zu "Sitemaps" im linken Menü
- Klicke "Neue Sitemap hinzufügen"
- Gib ein: `sitemap.xml`
- Klicke "Senden"

### 5. Weitere Einstellungen
- **URL-Inspektion**: Teste einzelne URLs
- **Abdeckung**: Überwache indexierte Seiten
- **Leistung**: Analysiere Suchbegriffe und Klicks
- **Verbesserungen**: Mobile Nutzerfreundlichkeit prüfen

### 6. Robots.txt prüfen
- Gehe zu "robots.txt-Tester" (falls verfügbar)
- Teste: `https://stefanspiess.de/robots.txt`

## Was du überwachen solltest:

### Sofort nach Setup:
- [ ] Sitemap erfolgreich eingereicht
- [ ] Alle 4 Hauptseiten indexiert (index, kleine-probleme, grosse-probleme, impressum)
- [ ] Keine Crawling-Fehler
- [ ] Mobile Nutzerfreundlichkeit OK

### Langfristig (nach 1-2 Wochen):
- [ ] Ranking für Keywords prüfen
- [ ] Core Web Vitals überwachen  
- [ ] Backlinks analysieren
- [ ] Search Performance auswerten

## Wichtige URLs für stefanspiess.de:
- Hauptseite: https://stefanspiess.de/
- Sitemap: https://stefanspiess.de/sitemap.xml
- Robots.txt: https://stefanspiess.de/robots.txt

## Tipps:
1. **Geduld**: Indexierung kann 1-7 Tage dauern
2. **URL-Inspektion**: Bei Änderungen "Indexierung beantragen"
3. **Structured Data**: Schema.org Markup ist bereits implementiert
4. **HTTPS**: SSL-Redirect ist aktiv - perfekt für SEO!

Die Search Console ist das wichtigste kostenlose SEO-Tool von Google!
