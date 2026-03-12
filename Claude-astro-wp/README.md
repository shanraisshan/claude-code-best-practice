# 🚀 Claude Astro WP — Développement WordPress Headless + Astro 5

Suite complète de skills et agents pour développer des sites WordPress headless avec Astro 5, déployés sur Vercel.

## ✨ Skills

| Skill | Description |
|-------|-------------|
| **astro-wp** | Orchestrateur — route vers les sous-skills |
| **astro-wp-setup** | Scaffolding projet, structure, configuration |
| **astro-wp-data** | Couche data (REST API, WPGraphQL, Content Layer loaders) |
| **astro-wp-components** | Composants Astro, layouts, templates, rendu HTML WP |
| **astro-wp-routing** | Routes dynamiques, getStaticPaths, [...uri], pagination |
| **astro-wp-content** | Content Collections Astro 5, loaders custom, Zod schemas |
| **astro-wp-deploy** | Déploiement Vercel/Netlify/CF, webhooks, CI/CD, ISR |
| **astro-wp-seo** | SEO, meta tags, sitemap, OG, schema JSON-LD |
| **astro-wp-perf** | Performance, Islands, Server Islands, images, View Transitions |
| **astro-wp-styling** | Tailwind CSS, blocs Gutenberg, dark mode, typographie |
| **astro-wp-acf** | ACF, Custom Post Types, champs personnalisés |
| **astro-wp-preview** | Preview mode, brouillons, Application Passwords |
| **astro-wp-i18n** | Multilingue (WPML, Polylang), hreflang |
| **astro-wp-woo** | WooCommerce headless, produits, panier |

## 📁 Structure

```
claude-astro-wp/
├── skills/
│   ├── astro-wp/                  # Orchestrateur
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── wp-rest-api.md        # Endpoints REST API
│   │       ├── astro-config.md       # Config Astro 5
│   │       └── wpgraphql-queries.md  # Requêtes GraphQL
│   ├── astro-wp-setup/SKILL.md
│   ├── astro-wp-data/SKILL.md
│   ├── astro-wp-components/SKILL.md
│   ├── astro-wp-routing/SKILL.md
│   ├── astro-wp-content/SKILL.md
│   ├── astro-wp-deploy/SKILL.md
│   ├── astro-wp-seo/SKILL.md
│   ├── astro-wp-perf/SKILL.md
│   ├── astro-wp-styling/SKILL.md
│   ├── astro-wp-acf/SKILL.md
│   ├── astro-wp-preview/SKILL.md
│   ├── astro-wp-i18n/SKILL.md
│   └── astro-wp-woo/SKILL.md
├── agents/
│   ├── astro-wp-architect.md     # Décisions d'architecture
│   ├── astro-wp-builder.md       # Génération de code
│   └── astro-wp-reviewer.md      # Code review
└── install.sh
```

## 🚀 Installation

```bash
unzip claude-astro-wp.zip
cd claude-astro-wp
chmod +x install.sh
./install.sh
```

## 🎯 Utilisation

```
/astro setup                    # Nouveau projet
/astro data                     # Configurer la couche data
/astro component PostCard       # Créer un composant
/astro route blog               # Routes dynamiques blog
/astro content                  # Content Collections WP
/astro deploy                   # Déployer sur Vercel
/astro seo                      # Optimisation SEO
/astro perf                     # Audit performance
/astro style                    # Styling Tailwind
/astro acf                      # Champs ACF / CPT
/astro preview                  # Mode preview
/astro i18n                     # Multilingue
/astro woo                      # WooCommerce headless
```

Ou naturellement :
- "Crée-moi un blog headless avec Astro et WordPress"
- "Ajoute une page portfolio avec des champs ACF"
- "Configure le déploiement Vercel avec webhook"
- "Optimise les images et la performance"

## 🔧 Stack Technique

- **Astro 5** — Content Layer, Server Islands, View Transitions
- **WordPress** — REST API + WPGraphQL
- **TypeScript** — Strict par défaut
- **Tailwind CSS 4** — @tailwindcss/typography pour le contenu WP
- **Vercel** — SSG/SSR/Hybrid, ISR, Edge Functions
- **Zod** — Validation schemas Content Collections

## 📋 Combinable avec les Autres Configs

Ce projet cohabite avec Claude SEO et Claude WP :
- `astro-wp-*` — Skills développement headless
- `seo-*` — Skills audit SEO
- `wp-*` — Skills administration WordPress
