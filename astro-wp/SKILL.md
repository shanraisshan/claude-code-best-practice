---
name: astro-wp
description: >
  Orchestrateur principal pour le développement de sites WordPress headless
  avec Astro 5 et déploiement Vercel. Route vers les sous-skills spécialisés.
  Utiliser quand l'utilisateur dit "Astro", "headless", "WordPress headless",
  "Astro WordPress", "frontend", "composant", "page", "déployer", "Vercel",
  "SSG", "SSR", ou toute tâche liée au développement Astro + WP.
---

# Claude Astro WP — Développement Headless WordPress + Astro 5

## Stack Technique

- **Frontend** : Astro 5.x (Content Layer API, Server Islands, View Transitions)
- **Backend/CMS** : WordPress (headless, REST API + WPGraphQL optionnel)
- **Styling** : Tailwind CSS 4
- **Déploiement** : Vercel (adapter @astrojs/vercel)
- **Langage** : TypeScript par défaut

## Routage

| Commande | Sub-Skill | Action |
|----------|-----------|--------|
| `astro setup` | astro-wp-setup | Scaffolding projet Astro + connexion WP |
| `astro data` | astro-wp-data | Couche data (REST API, GraphQL, loaders) |
| `astro component` | astro-wp-components | Composants, layouts, templates Astro |
| `astro route` | astro-wp-routing | Routing dynamique, getStaticPaths, [...uri] |
| `astro content` | astro-wp-content | Content Collections, Content Layer API |
| `astro deploy` | astro-wp-deploy | Déploiement Vercel/Netlify/Cloudflare |
| `astro seo` | astro-wp-seo | SEO, meta, sitemap, OG, schema |
| `astro perf` | astro-wp-perf | Performance, islands, images |
| `astro style` | astro-wp-styling | Tailwind CSS, design system |
| `astro acf` | astro-wp-acf | ACF, CPT, custom fields |
| `astro preview` | astro-wp-preview | Preview mode, drafts, ISR |
| `astro i18n` | astro-wp-i18n | Internationalisation (WPML, Polylang) |
| `astro woo` | astro-wp-woo | WooCommerce headless |

## Architecture Headless WP + Astro

```
┌─────────────────────┐     REST API / GraphQL     ┌──────────────────┐
│   WordPress (CMS)   │ ◄─────────────────────────► │   Astro 5 (SSG)  │
│                     │    /wp-json/wp/v2/          │                  │
│  • Contenu          │    /graphql (WPGraphQL)     │  • Pages .astro  │
│  • ACF / CPT        │                             │  • Components    │
│  • Médias           │                             │  • Layouts       │
│  • Menus            │                             │  • Content Layer │
│  • Taxonomies       │                             │                  │
└─────────────────────┘                             └──────────────────┘
                                                            │
                                                    Build (SSG/SSR/Hybrid)
                                                            │
                                                    ┌──────────────────┐
                                                    │  Vercel / CDN    │
                                                    │  • Static HTML   │
                                                    │  • Edge Functions│
                                                    │  • ISR           │
                                                    └──────────────────┘
```

## Modes de Rendu Astro 5

| Mode | Quand l'utiliser | Config |
|------|------------------|--------|
| **SSG** (Static) | Blog, portfolio, docs — contenu change rarement | `output: 'static'` (défaut) |
| **SSR** (Server) | Contenu personnalisé, preview, temps réel | `output: 'server'` |
| **Hybrid** | Mix statique + dynamique | `output: 'static'` + `export const prerender = false` sur certaines pages |

## Règles de Développement

- **TypeScript** par défaut — toujours typer les réponses API
- **Composants .astro** pour le contenu statique, frameworks (React/Vue/Svelte) uniquement si interactivité client nécessaire
- **Astro Islands** — `client:load`, `client:visible`, `client:idle` selon le besoin
- **Server Islands** — `server:defer` pour le contenu dynamique dans une page statique
- **Content Layer API** (Astro 5) — utiliser les loaders pour WordPress plutôt que fetch brut
- **Images** — toujours utiliser `<Image />` d'Astro pour l'optimisation automatique
- **SEO** — chaque page doit avoir title, meta description, OG tags, canonical

## Références (charger à la demande)

- `references/wp-rest-api.md` — Endpoints WP REST API essentiels
- `references/astro-config.md` — Configuration Astro 5 courante
- `references/wpgraphql-queries.md` — Requêtes GraphQL courantes

## Langue

Par défaut : français. S'adapte à la langue de l'utilisateur.
