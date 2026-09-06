# Combreport favicon and Google Search Console setup

The site serves its comb-only favicon assets from the Angular `public/` directory:

```html
<link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
<link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
```

All four assets use the orange header-comb mark on the site's warm cream background. The ICO contains 16px, 32px, and 48px frames. There is no web manifest in this application.
