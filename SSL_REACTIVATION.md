# SSL Reaktivierung - Anleitung

## Nach erfolgreicher SSL-Zertifikat Aktivierung bei IONOS:

### 1. HTTPS-Weiterleitung in .htaccess aktivieren

Ersetzen Sie in der .htaccess Datei diese Zeilen:

```apache
# Force HTTPS redirect (SSL certificate active)
# TEMPORARILY DISABLED - SSL certificate needs to be activated at IONOS first
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Mit:

```apache
# Force HTTPS redirect (SSL certificate active)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 2. SSL-Test durchführen

1. Besuchen Sie: https://stefanspiess.de/
2. Überprüfen Sie das Schloss-Symbol im Browser
3. Testen Sie mit: https://www.ssllabs.com/ssltest/

### 3. Search Console aktualisieren

- Fügen Sie die HTTPS-Version in Google Search Console hinzu
- Reichen Sie die Sitemap erneut ein: https://stefanspiess.de/sitemap.xml

## Status Check
- [ ] SSL-Zertifikat bei IONOS aktiviert
- [ ] HTTPS-Weiterleitung in .htaccess aktiviert  
- [ ] Website über HTTPS erreichbar
- [ ] Google Search Console mit HTTPS-Version eingerichtet
