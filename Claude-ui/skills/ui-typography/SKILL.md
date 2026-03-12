---
name: ui-typography
description: >
  Typographie web. Échelle typographique, polices, line-height, lisibilité,
  prose, @tailwindcss/typography. Utiliser quand l'utilisateur dit
  "typographie", "typo", "police", "font", "texte", "lisibilité",
  "prose", "heading", "titre", "paragraphe".
---

# Typographie Web

## Échelle Typographique

| Élément | Mobile | Desktop | Tailwind | Usage |
|---------|--------|---------|----------|-------|
| Display | 36px | 60px | `text-4xl lg:text-6xl` | Hero, landing |
| H1 | 30px | 48px | `text-3xl lg:text-5xl` | Titre de page |
| H2 | 24px | 36px | `text-2xl lg:text-4xl` | Sections |
| H3 | 20px | 24px | `text-xl lg:text-2xl` | Sous-sections |
| H4 | 18px | 20px | `text-lg lg:text-xl` | Titres mineurs |
| Body | 16px | 16-18px | `text-base lg:text-lg` | Corps de texte |
| Small | 14px | 14px | `text-sm` | Captions, meta |
| Tiny | 12px | 12px | `text-xs` | Labels, badges |

## Polices Recommandées

### Sans-serif (UI / Corps)
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Alternatives : Geist, DM Sans, Plus Jakarta Sans, Outfit, Manrope

### Serif (Éditorial / Blog)
```css
font-family: 'Merriweather', Georgia, 'Times New Roman', serif;
```

Alternatives : Lora, Playfair Display, Source Serif 4, Crimson Pro

### Monospace (Code)
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

## Chargement des Polices

```astro
<!-- src/layouts/BaseLayout.astro -->
<head>
  <!-- Preconnect pour Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
```

### Polices Locales (meilleure perf)

```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**`font-display: swap`** OBLIGATOIRE — évite le texte invisible pendant le chargement.

## Tailwind Config Typographie

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};
```

## Prose (contenu WordPress)

Installer `@tailwindcss/typography` pour styler le HTML WordPress :

```bash
npm install @tailwindcss/typography
```

```astro
<!-- Afficher le contenu WordPress -->
<article class="prose prose-lg max-w-none
  prose-headings:font-bold prose-headings:text-gray-900
  prose-p:text-gray-700 prose-p:leading-relaxed
  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
  prose-img:rounded-lg
  prose-blockquote:border-primary-500
  prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:rounded prose-code:px-1
  dark:prose-invert
">
  <Fragment set:html={post.content.rendered} />
</article>
```

## Règles de Lisibilité

| Règle | Valeur | Tailwind |
|-------|--------|----------|
| Longueur de ligne | 45-75 caractères | `max-w-prose` (65ch) |
| Line-height corps | 1.5-1.75 | `leading-relaxed` |
| Line-height titres | 1.1-1.3 | `leading-tight` |
| Poids minimum corps | 400 (regular) | `font-normal` |
| Taille minimum | 16px mobile | `text-base` |
| Contraste texte | 4.5:1 minimum | `text-gray-700` sur blanc |

## Hiérarchie Visuelle

```html
<!-- Bonne hiérarchie -->
<h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
  Titre Principal
</h1>
<p class="mt-4 text-xl text-gray-600">
  Sous-titre ou accroche en plus grand et plus léger
</p>
<p class="mt-6 text-base text-gray-700 leading-relaxed max-w-prose">
  Corps de texte avec une line-height confortable et une largeur
  de ligne optimale pour la lecture.
</p>
<span class="text-sm text-gray-500">
  Métadonnée ou caption en petit
</span>
```

## Anti-patterns

- ❌ Corps de texte < 16px sur mobile
- ❌ Line-height < 1.4 pour du texte long
- ❌ Lignes > 80 caractères
- ❌ Trop de poids de police (max 4 : regular, medium, semibold, bold)
- ❌ Texte gris clair sur fond blanc (`text-gray-400` seul = contraste insuffisant)
