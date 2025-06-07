# Barrierefreiheit (Accessibility) - Dark Mode Feature

## Übersicht
Das Dark Mode Feature wurde mit umfassender Barrierefreiheit nach WCAG 2.1 Standards implementiert.

## Implementierte Accessibility Features

### 1. Deutsche Beschreibungen
- **aria-label**: Vollständige deutsche Beschreibungen für Screenreader
  - Light Mode: "Zur dunklen Ansicht wechseln (Dark Mode aktivieren)"
  - Dark Mode: "Zur hellen Ansicht wechseln (Light Mode aktivieren)"

### 2. Erweiterte Tooltips
- **title-Attribute**: Informative deutsche Beschreibungen
  - Light Mode: "Zur dunklen Ansicht wechseln - Schont die Augen bei Dunkelheit"
  - Dark Mode: "Zur hellen Ansicht wechseln - Bessere Lesbarkeit bei Tag"

### 3. Tastaturnavigation
- **Enter-Taste**: Aktiviert den Theme-Wechsel
- **Leertaste**: Aktiviert den Theme-Wechsel
- **Tab-Navigation**: Fokussierung des Buttons möglich
- **Focus-Styles**: Deutlich sichtbare Fokusanzeige

### 4. Visuelle Tooltips
- Tooltips erscheinen bei Hover und Fokus
- Mehrzeilige Darstellung für längere Beschreibungen
- Schatten für bessere Sichtbarkeit
- Animierte Ein-/Ausblendung

### 5. Farbkontrast
- Erfüllt WCAG AA Standards
- Automatische Anpassung der Tooltip-Farben je nach Theme
- Konsistente Kontrastverhältnisse in beiden Modi

### 6. Systemintegration
- Respektiert Benutzer-Systemeinstellungen (`prefers-color-scheme`)
- Reagiert auf Systemtheme-Änderungen
- Speichert Benutzereinstellungen persistent

## Technische Details

### CSS Features
```css
.theme-toggle:focus {
    outline: 2px solid var(--header-text);
    outline-offset: 2px;
}
```

### JavaScript Features
- Automatische Icon-Aktualisierung (🌙/☀️)
- Dynamische aria-label und title Updates
- Keyboard Event Handling
- System Theme Change Listener

## DSGVO Compliance
- Keine Cookies verwendet
- Lokale Speicherung über localStorage
- Keine externen Abhängigkeiten
- Tracking-frei

## Browser-Unterstützung
- Alle modernen Browser
- Internet Explorer 11+ (mit Fallback)
- Mobile Browser optimiert
- Screenreader kompatibel

## Testing
Das Feature wurde getestet mit:
- Screenreader (NVDA, JAWS)
- Tastaturnavigation
- Verschiedenen Browsern
- Mobile Geräte
- High Contrast Modi
