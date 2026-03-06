---
name: astro-wp-setup
description: >
  Scaffolding d'un projet Astro + WordPress headless. Installation,
  configuration, connexion API, structure de fichiers. Utiliser quand
  l'utilisateur dit "nouveau projet", "setup", "installer", "init",
  "créer un projet", "démarrer", "scaffolding".
---

# Setup Projet Astro + WordPress Headless

## 1. Créer le Projet Astro

```bash
npm create astro@latest mon-site -- --template minimal --typescript strict
cd mon-site
```

## 2. Installer les Dépendances Essentielles

```bash
# Adapter Vercel
npx astro add vercel

# Tailwind CSS
npx astro add tailwind

# Sitemap
npx astro add sitemap

# React (si composants interactifs nécessaires)
npx astro add react
```

## 3. Variables d'Environnement

```bash
# .env
WP_URL=https://monsite.com
# ou pour WPGraphQL :
WP_GRAPHQL_URL=https://monsite.com/graphql
```

## 4. Structure du Projet Recommandée

```
src/
├── components/
│   ├── common/           # Header, Footer, Nav, SEO
│   ├── blocks/           # Blocs Gutenberg mappés
│   ├── ui/               # Boutons, cards, inputs
│   └── islands/          # Composants interactifs (React/Vue)
├── layouts/
│   ├── BaseLayout.astro  # Layout principal (html, head, body)
│   ├── PostLayout.astro  # Layout article
│   └── PageLayout.astro  # Layout page
├── lib/
│   ├── wordpress.ts      # Client API WordPress
│   ├── queries.ts        # Requêtes GraphQL (si WPGraphQL)
│   └── types.ts          # Types TypeScript pour WP
├── pages/
│   ├── index.astro       # Homepage
│   ├── blog/
│   │   ├── index.astro   # Archive blog
│   │   └── [slug].astro  # Article unique
│   ├── [slug].astro      # Pages WordPress
│   └── 404.astro         # Page 404
├── styles/
│   └── global.css        # Styles globaux + Tailwind
└── content.config.ts     # Content Collections (Astro 5)

public/
├── fonts/                # Polices locales
├── favicon.svg
└── robots.txt

astro.config.mjs          # Config Astro
tailwind.config.mjs       # Config Tailwind
tsconfig.json             # Config TypeScript
.env                      # Variables d'environnement
```

## 5. Configuration Astro

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://monsite.com',
  output: 'static', // ou 'server' pour SSR, ou 'hybrid'
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    tailwind(),
    sitemap(),
    react(), // uniquement si composants React nécessaires
  ],
  image: {
    domains: ['monsite.com'], // domaine WP pour les images
  },
});
```

## 6. Client WordPress de Base

```typescript
// src/lib/wordpress.ts
const WP_URL = import.meta.env.WP_URL;

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  parent: number;
}

export async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${WP_URL}/wp-json/wp/v2/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WP API error: ${res.status} on ${endpoint}`);
  return res.json();
}

export async function getPosts(params: Record<string, string> = {}) {
  return fetchAPI<WPPost[]>('posts', { _embed: 'true', per_page: '100', ...params });
}

export async function getPost(slug: string) {
  const posts = await fetchAPI<WPPost[]>('posts', { slug, _embed: 'true' });
  return posts[0] ?? null;
}

export async function getPages(params: Record<string, string> = {}) {
  return fetchAPI<WPPage[]>('pages', { per_page: '100', ...params });
}

export async function getPage(slug: string) {
  const pages = await fetchAPI<WPPage[]>('pages', { slug });
  return pages[0] ?? null;
}

export async function getMenuItems(menuSlug: string) {
  return fetchAPI<any[]>(`menus/v1/menus/${menuSlug}`);
}
```

## 7. Prérequis WordPress

### Plugins Recommandés
| Plugin | Rôle | Obligatoire |
|--------|------|-------------|
| WPGraphQL | API GraphQL | Non (mais recommandé) |
| ACF (Advanced Custom Fields) | Champs personnalisés | Si besoin |
| WPGraphQL for ACF | Exposer ACF via GraphQL | Si ACF + GraphQL |
| Yoast SEO | Meta SEO via API | Recommandé |
| WP REST API Menus | Exposer les menus | Recommandé |
| Application Passwords | Auth pour preview | Si preview mode |

### Configuration WordPress
```php
// functions.php ou mu-plugin

// Autoriser les requêtes CORS depuis le frontend Astro
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});

// Exposer les champs supplémentaires dans l'API REST
add_action('rest_api_init', function() {
    // Exposer l'URL de l'image à la une directement
    register_rest_field('post', 'featured_image_url', [
        'get_callback' => function($post) {
            return get_the_post_thumbnail_url($post['id'], 'full');
        }
    ]);
});
```

## Output

- Projet Astro scaffoldé avec structure complète
- Client WordPress typé et prêt à l'emploi
- Configuration Astro optimale
- Instructions de configuration WordPress
