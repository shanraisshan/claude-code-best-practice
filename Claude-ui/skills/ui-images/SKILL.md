---
name: ui-images
description: >
  Images web. Responsive images, lazy loading, hero images, galeries,
  aspect ratio, WebP, optimisation. Utiliser quand l'utilisateur dit
  "image", "photo", "galerie", "hero image", "lazy loading", "WebP",
  "optimisation images", "responsive image", "srcset".
---

# Images Web

## Image Responsive Basique

```html
<img
  src="/images/photo.webp"
  alt="Description détaillée"
  width="800" height="600"
  loading="lazy"
  decoding="async"
  class="w-full h-auto rounded-lg"
/>
```

**Règles :**
- `width` et `height` TOUJOURS présents (évite le CLS)
- `loading="lazy"` sur toutes les images SAUF hero/above-the-fold
- `decoding="async"` partout
- `alt` descriptif (ou `alt=""` si décoratif)

## Hero Image (Above the Fold)

```html
<img
  src="/images/hero.webp"
  alt="Description"
  width="1920" height="1080"
  fetchpriority="high"
  loading="eager"
  decoding="async"
  class="w-full h-auto"
/>
```

**PAS de `loading="lazy"`** — l'image hero est critique.
**`fetchpriority="high"`** — priorité réseau maximale.

## Astro Image (Local)

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---
<Image
  src={heroImg}
  alt="Description"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
  quality={80}
  class="w-full rounded-lg"
/>
```

## Image WordPress (Remote)

```astro
---
// Images WordPress = URL distante, pas de transformation Astro
const { featuredImage } = Astro.props;
---
{featuredImage && (
  <img
    src={featuredImage.source_url}
    alt={featuredImage.alt_text || ''}
    width={featuredImage.media_details?.width}
    height={featuredImage.media_details?.height}
    loading="lazy"
    decoding="async"
    class="w-full h-auto rounded-lg"
  />
)}
```

## Aspect Ratios

```html
<!-- 16:9 Video -->
<div class="aspect-video overflow-hidden rounded-lg">
  <img src="..." alt="..." class="w-full h-full object-cover" />
</div>

<!-- 4:3 Photo -->
<div class="aspect-[4/3] overflow-hidden rounded-lg">
  <img src="..." alt="..." class="w-full h-full object-cover" />
</div>

<!-- Carré (avatar, thumbnail) -->
<div class="aspect-square overflow-hidden rounded-full">
  <img src="..." alt="..." class="w-full h-full object-cover" />
</div>

<!-- Portrait (3:4) -->
<div class="aspect-[3/4] overflow-hidden rounded-lg">
  <img src="..." alt="..." class="w-full h-full object-cover" />
</div>
```

## Galerie

```astro
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  {images.map(img => (
    <div class="aspect-square overflow-hidden rounded-lg group cursor-pointer">
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  ))}
</div>
```

## Image avec Overlay Texte

```html
<div class="relative overflow-hidden rounded-xl">
  <img src="..." alt="..." class="w-full h-64 object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
  <div class="absolute bottom-0 left-0 p-6 text-white">
    <h3 class="text-xl font-bold">Titre</h3>
    <p class="text-sm text-white/80">Description</p>
  </div>
</div>
```

## Formats

| Format | Usage |
|--------|-------|
| WebP | Par défaut pour tout (85-90% support) |
| AVIF | Si support disponible (meilleure compression) |
| SVG | Logos, icônes, illustrations |
| PNG | Screenshots, images avec transparence |
| JPEG | Fallback photos |

## Checklist Images

- [ ] `width` et `height` sur toute `<img>`
- [ ] `loading="lazy"` sauf above-the-fold
- [ ] `fetchpriority="high"` sur l'image hero
- [ ] `alt` descriptif (ou vide si décoratif)
- [ ] Format WebP ou AVIF
- [ ] Compression quality 75-85%
- [ ] Tailles adaptées (pas de 4000px pour un thumbnail)
