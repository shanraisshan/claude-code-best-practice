---
name: ui-animation
description: >
  Animations et micro-interactions. Transitions CSS, hover effects,
  entrées au scroll, View Transitions Astro, reduced motion. Utiliser
  quand l'utilisateur dit "animation", "transition", "hover", "scroll",
  "entrée", "fade", "slide", "micro-interaction", "mouvement".
---

# Animations & Micro-interactions

## Principes

- **Subtil** — max 300ms pour les micro-interactions, 500ms pour les transitions de page
- **Intentionnel** — chaque animation a un but (feedback, orientation, plaisir)
- **Performant** — animer uniquement `transform` et `opacity` (composited properties)
- **Accessible** — toujours respecter `prefers-reduced-motion`

## Reduced Motion (OBLIGATOIRE)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Hover Effects

```css
/* Card lift */
.card-hover {
  @apply transition-all duration-300 ease-out;
}
.card-hover:hover {
  @apply -translate-y-1 shadow-lg;
}

/* Bouton scale */
.btn-hover {
  @apply transition-transform duration-150;
}
.btn-hover:hover { @apply scale-105; }
.btn-hover:active { @apply scale-95; }

/* Lien underline animé */
.link-underline {
  @apply relative;
}
.link-underline::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300;
}
.link-underline:hover::after {
  @apply w-full;
}

/* Image zoom dans un conteneur */
.img-zoom-container { @apply overflow-hidden rounded-lg; }
.img-zoom-container img {
  @apply transition-transform duration-500 ease-out;
}
.img-zoom-container:hover img {
  @apply scale-110;
}
```

## Entrées au Scroll (CSS only)

```css
/* Avec Intersection Observer natif du navigateur */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  animation: fadeUp 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Avec script léger

```astro
<div class="opacity-0 translate-y-6 transition-all duration-700" data-animate>
  <slot />
</div>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
</script>
```

## Stagger (apparition en cascade)

```astro
{items.map((item, i) => (
  <div
    class="opacity-0 translate-y-6 transition-all duration-500"
    data-animate
    style={`transition-delay: ${i * 100}ms`}
  >
    <Card>{item}</Card>
  </div>
))}
```

## View Transitions (Astro)

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>

<!-- Éléments partagés entre pages -->
<img transition:name={`hero-${slug}`} src={image} />
<h1 transition:name={`title-${slug}`}>{title}</h1>

<!-- Animations custom -->
<div transition:animate="slide">{content}</div>
<!-- Options : fade, slide, initial, none -->
```

## Timing Functions

| Nom | Cubic-bezier | Usage |
|-----|-------------|-------|
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Éléments qui arrivent (entrées) |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Éléments qui partent (sorties) |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Transitions générales |
| bounce | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Micro-interactions ludiques |

## Durées Recommandées

| Type | Durée |
|------|-------|
| Hover/focus | 150-200ms |
| Micro-interaction | 200-300ms |
| Entrée composant | 300-500ms |
| Transition de page | 300-500ms |
| Animation complexe | 500-800ms |
