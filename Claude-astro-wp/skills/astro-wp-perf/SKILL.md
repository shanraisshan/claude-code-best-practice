---
name: astro-wp-perf
description: >
  Performance Astro + WordPress. Islands architecture, image optimization,
  Server Islands, View Transitions, lazy loading. Utiliser quand l'utilisateur
  dit "performance", "vitesse", "lent", "optimiser", "island", "lazy",
  "images", "Core Web Vitals", "Lighthouse".
---

# Performance — Astro + WordPress Headless

## Architecture Islands

Astro envoie 0 JS par défaut. Ajouter l'interactivité sélectivement :

| Directive | Quand charger le JS | Usage |
|-----------|--------------------| ------|
| `client:load` | Immédiatement | Éléments critiques (nav mobile, hero interactif) |
| `client:idle` | Quand le navigateur est idle | Widgets non critiques (newsletter, chat) |
| `client:visible` | Quand l'élément est visible | Éléments below-fold (carrousel, commentaires) |
| `client:media="(max-width: 768px)"` | Si media query match | Mobile-only components |
| `client:only="react"` | Côté client uniquement | Composants qui ne peuvent pas être SSR |

```astro
<!-- Bon : chargement progressif -->
<Header />  <!-- Pas de JS, HTML statique -->
<HeroSlider client:load />  <!-- JS immédiat, critique -->
<NewsletterForm client:idle />  <!-- JS quand idle -->
<CommentsSection client:visible />  <!-- JS quand visible -->
```

## Server Islands (Astro 5)

Contenu dynamique dans une page statique :

```astro
<!-- Page statique avec un composant rendu côté serveur -->
<StaticHeader />
<StaticContent />
<UserGreeting server:defer />  <!-- Rendu serveur à la demande -->
<RelatedPosts server:defer>
  <LoadingSkeleton slot="fallback" />  <!-- Pendant le chargement -->
</RelatedPosts>
```

## Optimisation Images

```astro
---
import { Image } from 'astro:assets';
---

<!-- Images locales (optimisées automatiquement) -->
<Image src={import('../assets/hero.jpg')} alt="Hero" width={1200} height={630} />

<!-- Images WordPress distantes -->
<img
  src={post.featuredImage}
  alt={post.featuredImageAlt}
  width="800" height="450"
  loading="lazy"
  decoding="async"
/>

<!-- Hero image (pas de lazy loading !) -->
<img
  src={post.featuredImage}
  alt={post.featuredImageAlt}
  width="1200" height="630"
  fetchpriority="high"
/>
```

### Autoriser les Images WordPress

```typescript
// astro.config.mjs
export default defineConfig({
  image: {
    domains: ['monsite.com', 'secure.gravatar.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.wp.com',
    }],
  },
});
```

## View Transitions

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

```astro
<!-- Animation personnalisée sur un élément -->
<img transition:name={`post-image-${post.slug}`} src={post.image} />
<h1 transition:name={`post-title-${post.slug}`}>{post.title}</h1>
```

## Prefetch

```typescript
// astro.config.mjs
export default defineConfig({
  prefetch: {
    prefetchAll: true,       // Prefetch tous les liens visibles
    defaultStrategy: 'viewport', // ou 'hover', 'tap', 'load'
  },
});
```

## Checklist Performance

- [ ] 0 JS sur les pages statiques (vérifier avec View Source)
- [ ] `client:visible` ou `client:idle` au lieu de `client:load` quand possible
- [ ] Images : `width`/`height` toujours définis (CLS)
- [ ] Hero image : `fetchpriority="high"`, pas de `loading="lazy"`
- [ ] Below-fold images : `loading="lazy"` + `decoding="async"`
- [ ] Fonts : hébergées localement, `font-display: swap`
- [ ] View Transitions activées
- [ ] Prefetch activé
- [ ] Pas de bibliothèques JS lourdes inutiles
