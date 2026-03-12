# Configuration Astro 5 — Référence Rapide

## astro.config.mjs Complet

```typescript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  // URL du site déployé (obligatoire pour sitemap, canonical)
  site: 'https://monsite.com',

  // Mode de rendu
  output: 'static',    // SSG (défaut) — toutes les pages pré-rendues
  // output: 'server', // SSR — toutes les pages rendues à la demande
  // Hybrid : output 'static' + export const prerender = false sur certaines pages

  // Adapter pour le déploiement
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),

  // Intégrations
  integrations: [
    tailwind(),
    sitemap(),
    react(),
  ],

  // Images distantes autorisées
  image: {
    domains: ['monsite.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**.wp.com' }],
  },

  // Prefetch des liens
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // i18n
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  // Vite config (si besoin)
  vite: {
    ssr: { noExternal: [] },
  },

  // Markdown (pour le contenu local)
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },

  // Dev server
  server: { port: 4321, host: true },

  // Build
  build: {
    inlineStylesheets: 'auto',
  },
});
```

## tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

## Directives Client (Islands)

| Directive | Chargement JS |
|-----------|--------------|
| `client:load` | Immédiat |
| `client:idle` | Quand navigateur idle |
| `client:visible` | Quand élément visible |
| `client:media="(query)"` | Si media query match |
| `client:only="react"` | Client-only (pas de SSR) |

## Directives Serveur (Server Islands)

| Directive | Effet |
|-----------|-------|
| `server:defer` | Rendu serveur différé |
| `slot="fallback"` | Contenu pendant le chargement |

## Astro 5 — Nouveautés Clés

- Content Layer API avec loaders pluggables
- Server Islands (`server:defer`)
- Responsive images (stable en 5.10)
- Live Content Collections (expérimental 5.10)
- CSP (Content Security Policy) expérimental
- Builds 5x plus rapides pour Markdown
- Mémoire réduite de 25-50%
