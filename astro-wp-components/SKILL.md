---
name: astro-wp-components
description: >
  Composants Astro pour WordPress headless. Layouts, templates, blocs
  Gutenberg, header/footer, SEO component. Utiliser quand l'utilisateur
  dit "composant", "component", "layout", "template", "bloc", "header",
  "footer", "carte", "card".
---

# Composants Astro pour WordPress

## BaseLayout.astro

```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
import SEO from '../components/common/SEO.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
}

const { title, description, image, canonical, noindex } = Astro.props;
---
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <SEO {title} {description} {image} {canonical} {noindex} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <slot name="head" />
</head>
<body class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    <slot />
  </main>
  <Footer />
</body>
</html>
```

## SEO Component

```astro
---
// src/components/common/SEO.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
}

const { title, description = '', image, canonical, noindex = false } = Astro.props;
const siteUrl = Astro.site?.toString() ?? '';
const canonicalUrl = canonical ?? Astro.url.href;
const ogImage = image ?? `${siteUrl}og-default.jpg`;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImage} />
<meta property="og:locale" content="fr_FR" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

## PostCard Component

```astro
---
// src/components/ui/PostCard.astro
interface Props {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image?: string;
  categories?: string[];
}

const { title, slug, excerpt, date, image, categories } = Astro.props;
const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric'
});
---
<article class="group">
  <a href={`/blog/${slug}`}>
    {image && (
      <img
        src={image}
        alt={title}
        class="w-full aspect-video object-cover rounded-lg"
        loading="lazy"
        decoding="async"
        width="800" height="450"
      />
    )}
    <div class="mt-4">
      {categories && (
        <div class="flex gap-2 mb-2">
          {categories.map(cat => (
            <span class="text-xs font-medium text-blue-600 uppercase">{cat}</span>
          ))}
        </div>
      )}
      <h2 class="text-xl font-bold group-hover:text-blue-600 transition-colors"
          set:html={title} />
      <time class="text-sm text-gray-500 mt-1 block" datetime={date}>
        {formattedDate}
      </time>
      <div class="text-gray-600 mt-2 line-clamp-3" set:html={excerpt} />
    </div>
  </a>
</article>
```

## WordPress Content Renderer

```astro
---
// src/components/common/WPContent.astro
interface Props {
  content: string;
  class?: string;
}
const { content, class: className = '' } = Astro.props;
---
<div class:list={['wp-content prose prose-lg max-w-none', className]} set:html={content} />

<style is:global>
  .wp-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
  .wp-content a {
    color: theme('colors.blue.600');
    text-decoration: underline;
  }
  .wp-content blockquote {
    border-left: 4px solid theme('colors.blue.500');
    padding-left: 1rem;
    font-style: italic;
  }
  .wp-content pre {
    background: theme('colors.gray.900');
    color: theme('colors.gray.100');
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }
  .wp-content .wp-block-image { margin: 2rem 0; }
  .wp-content .wp-block-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
  .wp-content figure figcaption { text-align: center; font-size: 0.875rem; color: theme('colors.gray.500'); margin-top: 0.5rem; }
</style>
```

## Pagination Component

```astro
---
// src/components/ui/Pagination.astro
interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
const { currentPage, totalPages, basePath } = Astro.props;
---
<nav aria-label="Pagination" class="flex justify-center gap-2 mt-12">
  {currentPage > 1 && (
    <a href={currentPage === 2 ? basePath : `${basePath}/${currentPage - 1}`}
       class="px-4 py-2 rounded border hover:bg-gray-100">
      ← Précédent
    </a>
  )}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
    <a href={page === 1 ? basePath : `${basePath}/${page}`}
       class:list={['px-4 py-2 rounded border',
         page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
       ]}>
      {page}
    </a>
  ))}
  {currentPage < totalPages && (
    <a href={`${basePath}/${currentPage + 1}`}
       class="px-4 py-2 rounded border hover:bg-gray-100">
      Suivant →
    </a>
  )}
</nav>
```

## Conventions

- Composants statiques → `.astro`
- Composants interactifs → `.tsx` / `.vue` avec `client:load` ou `client:visible`
- Toujours `set:html` pour le contenu WordPress (HTML rendu)
- Toujours `loading="lazy"` + `decoding="async"` + `width`/`height` sur les images
- `is:global` sur les styles ciblant le contenu WP injecté via `set:html`
