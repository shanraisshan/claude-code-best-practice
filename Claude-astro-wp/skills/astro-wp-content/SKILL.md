---
name: astro-wp-content
description: >
  Content Collections Astro 5 avec WordPress. Content Layer API, loaders
  custom, Zod schemas, type safety. Utiliser quand l'utilisateur dit
  "content collection", "content layer", "loader", "collection", "schema",
  "Zod", "type safe".
---

# Content Collections — Astro 5 + WordPress

## Content Layer API (Astro 5)

Le Content Layer remplace l'ancien système de collections basé sur `src/content/`.
Avec Astro 5, les loaders permettent de charger du contenu depuis n'importe quelle source.

## Loader WordPress REST API

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const WP_URL = process.env.WP_URL || 'https://monsite.com';

// Helper pour paginer l'API
async function fetchAllWP(endpoint: string) {
  const items: any[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_embed=true`);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || 1);
    const data = await res.json();
    items.push(...data);
    hasMore = page < totalPages;
    page++;
  }
  return items;
}

const blog = defineCollection({
  loader: {
    name: 'wp-posts',
    load: async ({ store, logger }) => {
      logger.info('Loading WordPress posts...');
      const posts = await fetchAllWP('posts');
      for (const post of posts) {
        store.set({
          id: post.slug,
          data: {
            wpId: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered,
            date: new Date(post.date),
            modified: new Date(post.modified),
            featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
            featuredImageAlt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? '',
            categories: post._embedded?.['wp:term']?.[0]?.map((t: any) => ({
              name: t.name, slug: t.slug
            })) ?? [],
            tags: post._embedded?.['wp:term']?.[1]?.map((t: any) => ({
              name: t.name, slug: t.slug
            })) ?? [],
            author: post._embedded?.author?.[0]?.name ?? 'Anonyme',
          },
        });
      }
      logger.info(`Loaded ${posts.length} posts`);
    },
  },
  schema: z.object({
    wpId: z.number(),
    title: z.string(),
    content: z.string(),
    excerpt: z.string(),
    date: z.date(),
    modified: z.date(),
    featuredImage: z.string().nullable(),
    featuredImageAlt: z.string(),
    categories: z.array(z.object({ name: z.string(), slug: z.string() })),
    tags: z.array(z.object({ name: z.string(), slug: z.string() })),
    author: z.string(),
  }),
});

const pages = defineCollection({
  loader: {
    name: 'wp-pages',
    load: async ({ store, logger }) => {
      logger.info('Loading WordPress pages...');
      const wpPages = await fetchAllWP('pages');
      for (const page of wpPages) {
        store.set({
          id: page.slug,
          data: {
            wpId: page.id,
            title: page.title.rendered,
            content: page.content.rendered,
            parent: page.parent,
            menuOrder: page.menu_order,
          },
        });
      }
    },
  },
  schema: z.object({
    wpId: z.number(),
    title: z.string(),
    content: z.string(),
    parent: z.number(),
    menuOrder: z.number(),
  }),
});

export const collections = { blog, pages };
```

## Usage dans les Pages

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);
---
{sortedPosts.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <time>{post.data.date.toLocaleDateString('fr-FR')}</time>
  </article>
))}
```

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
---
<h1 set:html={post.data.title} />
<div set:html={post.data.content} />
```

## Live Content Collections (Astro 5.10+ — Expérimental)

Pour du contenu qui change fréquemment sans rebuild :

```typescript
// src/live.config.ts
import { defineLiveCollection, z } from 'astro:content';

export const collections = {
  latestPosts: defineLiveCollection({
    type: 'live',
    loader: {
      name: 'wp-live-posts',
      load: async () => {
        const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=10&_embed=true`);
        return res.json();
      },
    },
    schema: z.object({ /* ... */ }),
  }),
};
```

## Avantages Content Layer vs Fetch Direct

| Aspect | Content Layer | Fetch Direct |
|--------|--------------|--------------|
| TypeScript auto | ✅ Zod validation | ❌ Manuel |
| Cache build | ✅ Astro gère | ❌ À gérer |
| Requêtes | 1 au build | N à chaque page |
| Hot reload | ✅ Oui | ❌ Non |
| Filtrage | `getCollection()` avec filter | Manuel |
| Performances | Excellentes | Variables |
