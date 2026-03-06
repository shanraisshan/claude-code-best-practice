---
name: ui-responsive
description: >
  Design responsive et mobile-first. Breakpoints, adaptation, conteneurs,
  media queries, container queries. Utiliser quand l'utilisateur dit
  "responsive", "mobile", "tablet", "desktop", "breakpoint", "adaptatif",
  "mobile-first", "container query".
---

# Design Responsive

## Approche Mobile-First

Toujours coder du mobile vers le desktop. Les classes Tailwind sans préfixe = mobile. Les préfixes (`sm:`, `md:`, `lg:`) enrichissent progressivement.

```html
<!-- ❌ Desktop-first (mauvais) -->
<div class="grid grid-cols-3 sm:grid-cols-1">

<!-- ✅ Mobile-first (bon) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

## Patterns Responsive Courants

### Texte adaptatif
```html
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Titre principal
</h1>
<p class="text-base lg:text-lg text-gray-600">
  Description qui grandit légèrement sur desktop.
</p>
```

### Espacement adaptatif
```html
<section class="py-12 md:py-16 lg:py-24">
  <div class="px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
    <!-- contenu -->
  </div>
</section>
```

### Grid responsive
```html
<!-- 1 col → 2 col → 3 col -->
<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

<!-- 1 col → sidebar + content -->
<div class="grid lg:grid-cols-[280px_1fr] gap-8">

<!-- Stack → inline -->
<div class="flex flex-col sm:flex-row gap-4">
```

### Image responsive
```html
<!-- Pleine largeur mobile, 50% desktop -->
<img class="w-full lg:w-1/2 rounded-lg" src="..." alt="..." />

<!-- Aspect ratio maintenu -->
<div class="aspect-video w-full">
  <img class="w-full h-full object-cover rounded-lg" src="..." alt="..." />
</div>
```

### Navigation responsive
```html
<!-- Menu : caché mobile, visible desktop -->
<nav class="hidden md:flex gap-8">...</nav>
<!-- Hamburger : visible mobile, caché desktop -->
<button class="md:hidden">☰</button>
```

### Boutons responsive
```html
<!-- Full width mobile, auto desktop -->
<button class="w-full sm:w-auto px-6 py-3 ...">Commencer</button>

<!-- Stack mobile, inline desktop -->
<div class="flex flex-col sm:flex-row gap-4">
  <button class="flex-1 sm:flex-none ...">Principal</button>
  <button class="flex-1 sm:flex-none ...">Secondaire</button>
</div>
```

## Container Queries (CSS natif)

```css
/* Pour des composants qui s'adaptent à leur conteneur, pas au viewport */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

Tailwind 4 :
```html
<div class="@container">
  <div class="grid @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    <!-- composants -->
  </div>
</div>
```

## Checklist Responsive

- [ ] Tester sur 320px (petit mobile), 375px, 768px, 1024px, 1440px
- [ ] Texte lisible sans zoom horizontal
- [ ] Images pas plus larges que le viewport
- [ ] Boutons tactiles ≥ 44x44px
- [ ] Pas de scroll horizontal non voulu
- [ ] Navigation accessible sur mobile
- [ ] Formulaires utilisables au pouce
- [ ] Tables : scroll horizontal ou restructuration sur mobile
