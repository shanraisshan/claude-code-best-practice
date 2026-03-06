---
name: astro-wp-preview
description: >
  Mode preview pour WordPress headless. Prévisualisation des brouillons,
  ISR, revalidation, drafts. Utiliser quand l'utilisateur dit "preview",
  "prévisualiser", "brouillon", "draft", "ISR", "revalidation",
  "voir avant publication".
---

# Preview Mode — WordPress → Astro

## Architecture Preview

Le mode preview permet aux éditeurs WordPress de voir leurs brouillons
sur le frontend Astro avant publication. Requiert **SSR** (output: 'server').

## Setup

### 1. WordPress : Application Password

```bash
# Créer un mot de passe applicatif pour l'auth API
wp user application-password create admin "Astro Preview" --format=json
```

### 2. Variables d'Environnement

```bash
# .env
WP_URL=https://monsite.com
WP_APP_USER=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx
PREVIEW_SECRET=un-secret-long-et-unique
```

### 3. Route Preview (SSR)

```typescript
// src/pages/api/preview.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const secret = url.searchParams.get('secret');
  const postId = url.searchParams.get('id');
  const postType = url.searchParams.get('type') || 'post';

  if (secret !== import.meta.env.PREVIEW_SECRET || !postId) {
    return new Response('Invalid request', { status: 401 });
  }

  // Fetch le brouillon avec auth
  const auth = btoa(`${import.meta.env.WP_APP_USER}:${import.meta.env.WP_APP_PASSWORD}`);
  const res = await fetch(
    `${import.meta.env.WP_URL}/wp-json/wp/v2/${postType}s/${postId}?status=draft`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  if (!res.ok) return new Response('Post not found', { status: 404 });
  const post = await res.json();

  // Rediriger vers la page avec le contenu preview
  return redirect(`/preview/${postType}/${post.slug}?id=${postId}`);
};
```

### 4. Page Preview (SSR)

```astro
---
// src/pages/preview/post/[slug].astro
export const prerender = false; // Toujours SSR

const postId = Astro.url.searchParams.get('id');
if (!postId) return Astro.redirect('/404');

const auth = btoa(`${import.meta.env.WP_APP_USER}:${import.meta.env.WP_APP_PASSWORD}`);
const res = await fetch(
  `${import.meta.env.WP_URL}/wp-json/wp/v2/posts/${postId}?_embed=true&status=draft`,
  { headers: { Authorization: `Basic ${auth}` } }
);

if (!res.ok) return Astro.redirect('/404');
const post = await res.json();
---
<BaseLayout title={`[PREVIEW] ${post.title.rendered}`}>
  <div class="bg-yellow-100 text-yellow-800 p-4 text-center font-bold">
    ⚠️ Mode Preview — Ce contenu n'est pas encore publié
  </div>
  <article>
    <h1 set:html={post.title.rendered} />
    <div set:html={post.content.rendered} />
  </article>
</BaseLayout>
```

### 5. Bouton Preview dans WordPress

```php
// functions.php
add_filter('preview_post_link', function($link, $post) {
    $frontend_url = 'https://monsite-astro.vercel.app';
    $secret = 'un-secret-long-et-unique';
    return "{$frontend_url}/api/preview?secret={$secret}&id={$post->ID}&type={$post->post_type}";
}, 10, 2);
```

## Rebuild On-Demand (alternative au preview SSR)

Pour les sites SSG, déclencher un rebuild Vercel :

```php
// Webhook rebuild quand un post est publié
add_action('transition_post_status', function($new, $old, $post) {
    if ($new === 'publish' && $old !== 'publish') {
        wp_remote_post('https://api.vercel.com/v1/integrations/deploy/prj_XXX/YYY');
    }
}, 10, 3);
```
