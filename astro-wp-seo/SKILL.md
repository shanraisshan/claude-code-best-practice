---
name: astro-wp-seo
description: >
  SEO pour Astro + WordPress headless. Meta tags, sitemap, OG images,
  schema JSON-LD, canonical, robots.txt. Utiliser quand l'utilisateur
  dit "SEO", "meta", "sitemap", "robots", "Open Graph", "schema",
  "référencement", "canonical".
---

# SEO — Astro + WordPress Headless

## Récupérer les Données SEO depuis WordPress

### Avec Yoast SEO REST API
```typescript
// L'API Yoast ajoute un champ yoast_head_json aux posts/pages
const post = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`);
const data = await post.json();
const seo = data[0].yoast_head_json; // title, description, og_image, etc.
```

### Avec WPGraphQL + Yoast
```graphql
query GetPostSEO($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage { sourceUrl }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
      schema { raw }
    }
  }
}
```

## Sitemap Automatique

```typescript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://monsite.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

## robots.txt

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://monsite.com/sitemap-index.xml

# Bloquer l'accès au WP admin depuis le frontend
Disallow: /wp-admin/
Disallow: /wp-login.php
```

## Schema JSON-LD

```astro
---
// src/components/common/SchemaOrg.astro
interface Props {
  type: 'Article' | 'WebPage' | 'WebSite' | 'Organization' | 'BreadcrumbList';
  data: Record<string, any>;
}
const { type, data } = Astro.props;

const schema = { '@context': 'https://schema.org', '@type': type, ...data };
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

Usage :
```astro
<SchemaOrg type="Article" data={{
  headline: post.title,
  datePublished: post.date,
  dateModified: post.modified,
  author: { '@type': 'Person', name: post.author },
  publisher: { '@type': 'Organization', name: 'Mon Site', logo: { '@type': 'ImageObject', url: '/logo.png' } },
  image: post.featuredImage,
  description: post.excerpt,
}} />
```

## Canonical URLs

```astro
<!-- Toujours définir le canonical -->
<link rel="canonical" href={Astro.url.href} />

<!-- Pour le contenu paginé -->
{prevPage && <link rel="prev" href={prevPage} />}
{nextPage && <link rel="next" href={nextPage} />}
```

## Performance SEO

- Astro génère du HTML statique → excellent pour les Core Web Vitals
- Pas de JavaScript par défaut → LCP rapide
- `<Image />` d'Astro → optimisation automatique
- View Transitions → navigation fluide sans rechargement
