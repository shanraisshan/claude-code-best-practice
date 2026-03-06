---
name: astro-wp-deploy
description: >
  Déploiement Astro sur Vercel, Netlify, Cloudflare. Adapters, ISR,
  webhooks, CI/CD, rebuild automatique. Utiliser quand l'utilisateur
  dit "déployer", "deploy", "Vercel", "Netlify", "Cloudflare", "mise
  en prod", "hosting", "hébergement", "CI/CD", "webhook", "rebuild".
---

# Déploiement Astro + WordPress Headless

## Vercel (Recommandé)

### Configuration

```bash
npx astro add vercel
```

```typescript
// astro.config.mjs
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static', // ou 'server' pour SSR
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    isr: {
      expiration: 60 * 60, // Revalider toutes les heures
    },
  }),
});
```

### Variables d'Environnement Vercel
```bash
vercel env add WP_URL production
vercel env add WP_GRAPHQL_URL production
```

### ISR (Incremental Static Regeneration)

```astro
---
// Page avec ISR — se revalide automatiquement
export const prerender = true; // pré-rendu au build

// Vercel revalide selon le TTL configuré dans l'adapter
---
```

### Webhook pour Rebuild Automatique

Sur WordPress, déclencher un rebuild Vercel quand du contenu est publié :

```php
// functions.php — Webhook Vercel
add_action('publish_post', function($post_id) {
    $webhook_url = 'https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/YYYY';
    wp_remote_post($webhook_url, [
        'timeout' => 5,
        'blocking' => false,
    ]);
});

add_action('save_post_page', function($post_id) {
    // Aussi pour les pages
    if (get_post_status($post_id) === 'publish') {
        wp_remote_post('https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/YYYY', [
            'timeout' => 5, 'blocking' => false
        ]);
    }
});
```

### On-Demand Revalidation (SSR)

```typescript
// src/pages/api/revalidate.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== import.meta.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { paths } = await request.json();
  // Purge Vercel cache pour ces paths
  // Note: utiliser l'API Vercel ou rebuild partiel

  return new Response(JSON.stringify({ revalidated: true }));
};
```

## Netlify

```bash
npx astro add netlify
```

```typescript
import netlify from '@astrojs/netlify';
export default defineConfig({
  adapter: netlify(),
});
```

## Cloudflare

```bash
npx astro add cloudflare
```

```typescript
import cloudflare from '@astrojs/cloudflare';
export default defineConfig({
  adapter: cloudflare(),
});
```

## GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [wordpress_update]  # Trigger depuis WP webhook

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
        env:
          WP_URL: ${{ secrets.WP_URL }}
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Checklist Pré-Déploiement

- [ ] Variables d'environnement configurées
- [ ] `astro.config.mjs` : `site` défini
- [ ] Build local OK : `npm run build && npm run preview`
- [ ] 404.astro existe
- [ ] robots.txt configuré
- [ ] Sitemap activé
- [ ] Images : domaine WP autorisé dans `image.domains`
- [ ] Webhook WP → Vercel configuré
- [ ] CORS configuré sur WordPress
