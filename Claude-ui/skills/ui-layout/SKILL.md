---
name: ui-layout
description: >
  Layouts et sections de page. Hero, grilles, conteneurs, footer, sidebar,
  sections CTA, features, testimonials. Utiliser quand l'utilisateur dit
  "layout", "section", "hero", "grille", "grid", "footer", "sidebar",
  "CTA", "features", "témoignages", "pricing", "landing page".
---

# Layouts & Sections

## Container

```astro
---
interface Props { size?: 'sm' | 'md' | 'lg' | 'xl'; class?: string; }
const { size = 'lg', class: cls } = Astro.props;
const sizes = { sm: 'max-w-3xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl' };
---
<div class:list={['mx-auto px-4 sm:px-6 lg:px-8', sizes[size], cls]}><slot /></div>
```

## Section

```astro
---
interface Props { padding?: 'sm' | 'md' | 'lg'; bg?: string; class?: string; }
const { padding = 'md', bg = '', class: cls } = Astro.props;
const pads = { sm: 'py-12', md: 'py-16 lg:py-20', lg: 'py-20 lg:py-28' };
---
<section class:list={[pads[padding], bg, cls]}><slot /></section>
```

## Hero Section

```astro
<section class="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-900 text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
    <div class="max-w-3xl">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
        <slot name="title" />
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-primary-100 max-w-2xl">
        <slot name="subtitle" />
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</section>
```

## Features Grid (3 colonnes)

```astro
<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl font-bold">{title}</h2>
      <p class="mt-4 text-lg text-gray-600">{subtitle}</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map(f => (
        <div class="text-center p-6">
          <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-xl">
            {f.icon}
          </div>
          <h3 class="text-lg font-semibold mb-2">{f.title}</h3>
          <p class="text-gray-600">{f.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## CTA Section

```astro
<section class="bg-primary-600 text-white py-16">
  <div class="mx-auto max-w-4xl px-4 text-center">
    <h2 class="text-3xl font-bold">{title}</h2>
    <p class="mt-4 text-lg text-primary-100">{subtitle}</p>
    <div class="mt-8 flex justify-center gap-4">
      <slot name="actions" />
    </div>
  </div>
</section>
```

## Testimonials

```astro
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {testimonials.map(t => (
    <blockquote class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <p class="text-gray-700 italic">"{t.quote}"</p>
      <footer class="mt-4 flex items-center gap-3">
        <img src={t.avatar} alt={t.name} class="w-10 h-10 rounded-full" />
        <div>
          <cite class="font-semibold not-italic text-sm">{t.name}</cite>
          <p class="text-xs text-gray-500">{t.role}</p>
        </div>
      </footer>
    </blockquote>
  ))}
</div>
```

## Pricing Cards

```astro
<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {plans.map(plan => (
    <div class:list={[
      'rounded-2xl p-8 border',
      plan.featured ? 'border-primary-500 shadow-xl scale-105 bg-white' : 'border-gray-200 bg-white',
    ]}>
      {plan.featured && <span class="text-xs font-bold uppercase text-primary-600 mb-4 block">Populaire</span>}
      <h3 class="text-xl font-bold">{plan.name}</h3>
      <p class="mt-2 text-gray-500">{plan.description}</p>
      <p class="mt-6"><span class="text-4xl font-bold">{plan.price}€</span><span class="text-gray-500">/mois</span></p>
      <ul class="mt-8 space-y-3">
        {plan.features.map(f => (
          <li class="flex items-center gap-2 text-sm">
            <span class="text-green-500">✓</span>{f}
          </li>
        ))}
      </ul>
      <Button variant={plan.featured ? 'primary' : 'secondary'} fullWidth class="mt-8">
        {plan.cta}
      </Button>
    </div>
  ))}
</div>
```

## Footer

```astro
<footer class="bg-gray-900 text-gray-400 py-16">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <h4 class="text-white font-semibold mb-4">Entreprise</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="/a-propos" class="hover:text-white transition">À propos</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
      <!-- Répéter pour chaque colonne -->
    </div>
    <div class="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
      © {new Date().getFullYear()} Mon Site. Tous droits réservés.
    </div>
  </div>
</footer>
```

## Grid Patterns

| Pattern | Classes Tailwind |
|---------|-----------------|
| 2 colonnes | `grid md:grid-cols-2 gap-8` |
| 3 colonnes | `grid sm:grid-cols-2 lg:grid-cols-3 gap-8` |
| 4 colonnes | `grid sm:grid-cols-2 lg:grid-cols-4 gap-6` |
| Sidebar + Content | `grid lg:grid-cols-[280px_1fr] gap-8` |
| Masonry (approx) | `columns-2 md:columns-3 gap-4 space-y-4` |
| Auto-fit | `grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6` |
