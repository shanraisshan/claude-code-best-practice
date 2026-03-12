# Patterns Tailwind — Référence

## Centrage

```html
<!-- Horizontal -->
<div class="mx-auto max-w-4xl">
<!-- Flex center -->
<div class="flex items-center justify-center">
<!-- Grid center -->
<div class="grid place-items-center">
<!-- Absolue center -->
<div class="absolute inset-0 flex items-center justify-center">
```

## Overlays & Gradients

```html
<!-- Overlay sombre sur image -->
<div class="absolute inset-0 bg-black/50" />
<!-- Gradient de bas (texte sur image) -->
<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
<!-- Gradient de gauche -->
<div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
<!-- Gradient décoratif -->
<div class="bg-gradient-to-br from-primary-500 to-accent-600" />
```

## Troncature Texte

```html
<!-- 1 ligne -->
<p class="truncate">Texte long qui sera coupé...</p>
<!-- 2 lignes -->
<p class="line-clamp-2">Texte sur max 2 lignes...</p>
<!-- 3 lignes -->
<p class="line-clamp-3">Texte sur max 3 lignes...</p>
```

## Glassmorphism

```html
<div class="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
```

## Sticky + Blur Header

```html
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
```

## Card Patterns

```html
<!-- Card simple -->
<div class="bg-white rounded-xl border border-gray-200 p-6">
<!-- Card hover -->
<div class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
<!-- Card avec image -->
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <img class="w-full h-48 object-cover" />
  <div class="p-6">...</div>
</div>
<!-- Card accent -->
<div class="bg-white rounded-xl border-l-4 border-primary-500 p-6 shadow-sm">
```

## Divider Patterns

```html
<!-- Simple -->
<hr class="border-gray-200 my-8" />
<!-- Avec texte -->
<div class="flex items-center gap-4 my-8">
  <div class="flex-1 h-px bg-gray-200" />
  <span class="text-sm text-gray-500">ou</span>
  <div class="flex-1 h-px bg-gray-200" />
</div>
```

## Badges / Tags

```html
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
  Badge
</span>
```

## Bouton avec icône

```html
<button class="inline-flex items-center gap-2 px-4 py-2 ...">
  <svg class="w-4 h-4" .../>
  <span>Label</span>
</button>
```

## Input Group

```html
<div class="relative">
  <input class="w-full pl-10 pr-4 py-2.5 rounded-lg border ..." />
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" .../>
</div>
```

## Scrollbar Custom

```css
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: theme('colors.gray.300'); border-radius: 999px; }
```

## Selection Custom

```css
::selection { background: theme('colors.primary.100'); color: theme('colors.primary.900'); }
```
