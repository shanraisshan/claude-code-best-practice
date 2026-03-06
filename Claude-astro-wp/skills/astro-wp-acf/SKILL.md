---
name: astro-wp-acf
description: >
  Advanced Custom Fields et Custom Post Types avec Astro. Exposer ACF
  via REST/GraphQL, CPT, champs flexibles, repeaters. Utiliser quand
  l'utilisateur dit "ACF", "custom fields", "champs personnalisés",
  "CPT", "custom post type", "flexible content", "repeater".
---

# ACF & Custom Post Types — WordPress → Astro

## Exposer un CPT dans l'API REST

```php
// functions.php
register_post_type('project', [
    'labels' => ['name' => 'Projets', 'singular_name' => 'Projet'],
    'public' => true,
    'show_in_rest' => true,           // Obligatoire pour l'API REST
    'rest_base' => 'projects',        // Endpoint : /wp-json/wp/v2/projects
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
    'has_archive' => true,
    'rewrite' => ['slug' => 'projets'],
]);
```

## Exposer les Champs ACF dans l'API REST

```php
// ACF expose automatiquement les champs si "Show in REST API" est coché
// dans les options du groupe de champs.
// Sinon, manuellement :
add_action('rest_api_init', function() {
    register_rest_field('project', 'acf_fields', [
        'get_callback' => function($post) {
            return get_fields($post['id']);
        }
    ]);
});
```

Les champs ACF apparaissent dans `post.acf` ou `post.acf_fields` :

```typescript
// src/lib/wordpress.ts
export interface WPProject {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    client_name: string;
    project_url: string;
    technologies: string[];
    gallery: Array<{ url: string; alt: string }>;
    testimonial: { quote: string; author: string };
  };
}

export async function getProjects() {
  return fetchAPI<WPProject[]>('projects', { per_page: '100', _embed: 'true' });
}
```

## Avec WPGraphQL + ACF

```bash
# Installer WPGraphQL for ACF plugin
```

```graphql
query GetProjects {
  projects(first: 100) {
    nodes {
      slug
      title
      projectFields {  # Nom du groupe ACF
        clientName
        projectUrl
        technologies
        gallery { sourceUrl altText }
        testimonial { quote author }
      }
    }
  }
}
```

## Content Layer Loader pour CPT

```typescript
// Dans content.config.ts
const projects = defineCollection({
  loader: {
    name: 'wp-projects',
    load: async ({ store, logger }) => {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/projects?per_page=100&_embed=true`);
      const items = await res.json();
      for (const item of items) {
        store.set({
          id: item.slug,
          data: {
            title: item.title.rendered,
            client: item.acf?.client_name ?? '',
            url: item.acf?.project_url ?? '',
            technologies: item.acf?.technologies ?? [],
            gallery: item.acf?.gallery ?? [],
            testimonial: item.acf?.testimonial ?? null,
            featuredImage: item._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
          },
        });
      }
    },
  },
  schema: z.object({
    title: z.string(),
    client: z.string(),
    url: z.string(),
    technologies: z.array(z.string()),
    gallery: z.array(z.object({ url: z.string(), alt: z.string() })),
    testimonial: z.object({ quote: z.string(), author: z.string() }).nullable(),
    featuredImage: z.string().nullable(),
  }),
});
```

## Types ACF Supportés

| Type ACF | Type Zod | Notes |
|----------|----------|-------|
| Text, Email, URL | `z.string()` | |
| Number, Range | `z.number()` | |
| True/False | `z.boolean()` | |
| Select, Radio | `z.string()` ou `z.enum()` | |
| Checkbox | `z.array(z.string())` | |
| Image | `z.object({ url, alt, width, height })` | Format dépend du "Return Format" ACF |
| Gallery | `z.array(z.object({ url, alt }))` | |
| Repeater | `z.array(z.object({ ... }))` | |
| Flexible Content | `z.discriminatedUnion(...)` | Complexe, mapper par layout |
| Relationship | `z.array(z.number())` | IDs des posts liés |
| Date | `z.string()` | Format ACF, convertir en Date si besoin |
| WYSIWYG | `z.string()` | HTML brut |
