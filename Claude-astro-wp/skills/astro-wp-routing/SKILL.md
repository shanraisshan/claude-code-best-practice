---
name: astro-wp-routing
description: >
  Routing dynamique Astro pour WordPress headless. getStaticPaths, catch-all
  routes [...uri], pagination, catégories, archives. Utiliser quand
  l'utilisateur dit "route", "URL", "slug", "page dynamique", "getStaticPaths",
  "pagination", "archive", "catégorie".
---

# Routing Dynamique — WordPress → Astro

## Pattern 1 : Routes Explicites par Type

```astro
---
// src/pages/blog/[slug].astro
import { getPosts, getPost } from '../../lib/wordpress';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---
<PostLayout post={post} />
```

```astro
---
// src/pages/[slug].astro (Pages WordPress)
import { getPages, getPage } from '../lib/wordpress';
import PageLayout from '../layouts/PageLayout.astro';

export async function getStaticPaths() {
  const pages = await getPages();
  return pages
    .filter(p => p.slug !== 'home') // exclure la homepage
    .map(page => ({
      params: { slug: page.slug },
      props: { page },
    }));
}

const { page } = Astro.props;
---
<PageLayout page={page} />
```

## Pattern 2 : Catch-All avec nodeByUri (WPGraphQL)

```astro
---
// src/pages/[...uri].astro
import { graphqlQuery } from '../lib/graphql';

export async function getStaticPaths() {
  const { contentNodes } = await graphqlQuery<any>(`
    query { contentNodes(first: 1000) { nodes { uri } } }
  `);
  return contentNodes.nodes.map((node: any) => ({
    params: { uri: node.uri.replace(/^\/|\/$/g, '') || undefined },
  }));
}

const uri = `/${Astro.params.uri ?? ''}/`;
const { nodeByUri } = await graphqlQuery<any>(`
  query GetNode($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Post { title content date slug }
      ... on Page { title content slug }
      ... on Category { name posts { nodes { title slug } } }
    }
  }
`, { uri });

const node = nodeByUri;
---

{node.__typename === 'Post' && <PostTemplate post={node} />}
{node.__typename === 'Page' && <PageTemplate page={node} />}
{node.__typename === 'Category' && <CategoryTemplate category={node} />}
```

## Pagination Blog

```astro
---
// src/pages/blog/[...page].astro
import { getPosts } from '../../lib/wordpress';
import PostCard from '../../components/ui/PostCard.astro';
import Pagination from '../../components/ui/Pagination.astro';

const POSTS_PER_PAGE = 12;

export async function getStaticPaths() {
  const allPosts = await getPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    params: { page: i === 0 ? undefined : String(i + 1) },
    props: {
      posts: allPosts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE),
      currentPage: i + 1,
      totalPages,
    },
  }));
}

const { posts, currentPage, totalPages } = Astro.props;
---
```

## Archives par Catégorie/Tag

```astro
---
// src/pages/categorie/[slug].astro
import { fetchAPI } from '../../lib/wordpress';

export async function getStaticPaths() {
  const categories = await fetchAPI<any[]>('categories', { per_page: '100' });
  return categories.map(cat => ({
    params: { slug: cat.slug },
    props: { category: cat },
  }));
}

const { category } = Astro.props;
const posts = await fetchAPI<any[]>('posts', {
  categories: String(category.id),
  _embed: 'true',
});
---
```

## Route API (SSR uniquement)

```typescript
// src/pages/api/search.ts (output: 'server' ou 'hybrid')
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q') ?? '';
  const res = await fetch(`${import.meta.env.WP_URL}/wp-json/wp/v2/posts?search=${query}&_embed=true`);
  const posts = await res.json();
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

## Règles de Routing

- En mode SSG : `getStaticPaths()` obligatoire pour toute route dynamique
- En mode SSR : pas besoin de `getStaticPaths()`, fetch à la volée
- Slugs WP → routes Astro : `/blog/[slug]` pour les posts, `/[slug]` pour les pages
- Pagination : utiliser le pattern `[...page]` (catch-all optionnel)
- 404 : toujours créer `src/pages/404.astro`
