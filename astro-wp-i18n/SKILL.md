---
name: astro-wp-i18n
description: >
  Internationalisation Astro + WordPress. WPML, Polylang, routing i18n,
  hreflang. Utiliser quand l'utilisateur dit "multilingue", "traduction",
  "i18n", "WPML", "Polylang", "langue", "international".
---

# i18n — WordPress Multilingue + Astro

## Astro i18n Routing

```typescript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es'],
    routing: { prefixDefaultLocale: false }, // / = fr, /en/ = en
  },
});
```

## WordPress avec Polylang (REST API)

```typescript
// Polylang ajoute ?lang= aux endpoints
export async function getPostsByLang(lang: string) {
  return fetchAPI<WPPost[]>('posts', { lang, per_page: '100', _embed: 'true' });
}

// Récupérer les traductions d'un post
export async function getTranslations(postId: number) {
  const post = await fetchAPI<any>(`posts/${postId}`);
  return post.translations; // { en: 456, es: 789 }
}
```

## WordPress avec WPML (REST API)

```typescript
// WPML utilise ?wpml_language=
export async function getPostsByLang(lang: string) {
  return fetchAPI<WPPost[]>('posts', { wpml_language: lang, per_page: '100' });
}
```

## Content Layer Multi-Langue

```typescript
// content.config.ts
const locales = ['fr', 'en', 'es'];

const blog = defineCollection({
  loader: {
    name: 'wp-posts-i18n',
    load: async ({ store, logger }) => {
      for (const lang of locales) {
        const posts = await fetchAllWP(`posts?lang=${lang}`);
        for (const post of posts) {
          store.set({
            id: `${lang}/${post.slug}`,
            data: { ...mapPost(post), locale: lang },
          });
        }
      }
    },
  },
  schema: z.object({
    // ... champs habituels
    locale: z.enum(['fr', 'en', 'es']),
  }),
});
```

## Pages Dynamiques i18n

```astro
---
// src/pages/[lang]/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => {
    const [lang, slug] = post.id.split('/');
    return { params: { lang, slug }, props: { post } };
  });
}
---
```

## Hreflang

```astro
---
const currentLang = Astro.currentLocale ?? 'fr';
const translations = { fr: '/article', en: '/en/article', es: '/es/articulo' };
---
{Object.entries(translations).map(([lang, url]) => (
  <link rel="alternate" hreflang={lang} href={`${Astro.site}${url}`} />
))}
<link rel="alternate" hreflang="x-default" href={`${Astro.site}${translations.fr}`} />
```
