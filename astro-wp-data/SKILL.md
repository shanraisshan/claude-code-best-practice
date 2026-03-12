---
name: astro-wp-data
description: >
  Couche de données WordPress pour Astro. REST API, WPGraphQL, Content Layer
  loaders, pagination, filtres. Utiliser quand l'utilisateur dit "fetch",
  "API", "données", "GraphQL", "REST", "requête", "loader", "récupérer".
---

# Couche Data — WordPress → Astro

## Option 1 : WP REST API (sans plugin)

### Endpoints Principaux

| Endpoint | Données |
|----------|---------|
| `/wp-json/wp/v2/posts` | Articles |
| `/wp-json/wp/v2/pages` | Pages |
| `/wp-json/wp/v2/categories` | Catégories |
| `/wp-json/wp/v2/tags` | Tags |
| `/wp-json/wp/v2/media` | Médias |
| `/wp-json/wp/v2/users` | Auteurs |
| `/wp-json/wp/v2/comments` | Commentaires |
| `/wp-json/wp/v2/menus` | Menus (plugin requis) |

### Paramètres Utiles

```
?per_page=100        # Max 100 par requête
?page=2              # Pagination
?_embed=true         # Inclure médias et termes liés
?slug=mon-article    # Chercher par slug
?categories=5        # Filtrer par catégorie ID
?orderby=date        # Tri (date, title, modified)
?order=desc          # Ordre
?status=publish      # Statut (publish, draft, future)
?search=terme        # Recherche full-text
?_fields=id,title,slug  # Limiter les champs retournés
```

### Pagination Complète (>100 articles)

```typescript
export async function getAllPosts(): Promise<WPPost[]> {
  const allPosts: WPPost[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=true`
    );
    const totalPages = Number(res.headers.get('X-WP-TotalPages'));
    const posts: WPPost[] = await res.json();
    allPosts.push(...posts);
    hasMore = page < totalPages;
    page++;
  }
  return allPosts;
}
```

## Option 2 : WPGraphQL (recommandé)

### Installation
```bash
# Sur WordPress, installer le plugin WPGraphQL
# Endpoint disponible : https://monsite.com/graphql
```

### Client GraphQL

```typescript
// src/lib/graphql.ts
const GRAPHQL_URL = import.meta.env.WP_GRAPHQL_URL;

export async function graphqlQuery<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join('\n'));
  }
  return json.data;
}
```

### Requêtes Courantes

```graphql
# Tous les articles
query GetAllPosts {
  posts(first: 100, where: { status: PUBLISH }) {
    nodes {
      id
      slug
      title
      date
      excerpt
      content
      featuredImage {
        node { sourceUrl altText mediaDetails { width height } }
      }
      categories { nodes { name slug } }
      tags { nodes { name slug } }
      author { node { name avatar { url } } }
    }
  }
}

# Article par slug
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    title
    content
    date
    modified
    seo { title metaDesc opengraphImage { sourceUrl } }
    featuredImage { node { sourceUrl altText } }
    categories { nodes { name slug } }
  }
}

# Toutes les pages
query GetPages {
  pages(first: 100) {
    nodes { id slug title content }
  }
}

# Menus
query GetMenu($slug: ID!) {
  menu(id: $slug, idType: SLUG) {
    menuItems { nodes { label url path } }
  }
}

# Par URI (routing dynamique universel)
query GetNodeByUri($uri: String!) {
  nodeByUri(uri: $uri) {
    __typename
    ... on Post { title content date slug featuredImage { node { sourceUrl } } }
    ... on Page { title content slug }
    ... on Category { name description posts { nodes { title slug } } }
  }
}
```

## Option 3 : Content Layer Loader (Astro 5)

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

// Loader custom pour WordPress REST API
const wpLoader = {
  name: 'wordpress-loader',
  load: async ({ store, logger }) => {
    logger.info('Fetching WordPress posts...');
    const res = await fetch(`${process.env.WP_URL}/wp-json/wp/v2/posts?per_page=100&_embed=true`);
    const posts = await res.json();

    for (const post of posts) {
      store.set({
        id: post.slug,
        data: {
          title: post.title.rendered,
          date: new Date(post.date),
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
          categories: post._embedded?.['wp:term']?.[0]?.map((t: any) => t.name) ?? [],
        },
      });
    }
  },
};

const blog = defineCollection({
  loader: wpLoader,
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    content: z.string(),
    featuredImage: z.string().nullable(),
    categories: z.array(z.string()),
  }),
});

export const collections = { blog };
```

Usage dans les pages :
```astro
---
import { getCollection, getEntry } from 'astro:content';

// Tous les articles
const posts = await getCollection('blog');

// Un article spécifique
const post = await getEntry('blog', 'mon-article');
---
```

## Comparaison

| Critère | REST API | WPGraphQL | Content Layer |
|---------|----------|-----------|---------------|
| Setup | Rien à installer | Plugin WPGraphQL | Code loader |
| Flexibilité requêtes | Moyenne | Excellente | Excellente |
| Taille réponse | Grosse (champs inutiles) | Précise | Précise |
| TypeScript | Manuel | Manuel | Automatique |
| Cache Astro | Non | Non | Oui (build) |
| Complexité | Faible | Moyenne | Moyenne |
| **Recommandation** | Projets simples | Projets moyens/grands | Idéal Astro 5 |
