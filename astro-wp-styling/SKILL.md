---
name: astro-wp-styling
description: >
  Styling Astro avec Tailwind CSS. Design system, thème, typographie,
  contenu WordPress stylé. Utiliser quand l'utilisateur dit "style",
  "CSS", "Tailwind", "design", "couleurs", "typographie", "thème",
  "dark mode", "responsive".
---

# Styling — Tailwind CSS + Astro + WordPress

## Setup Tailwind

```bash
npx astro add tailwind
```

## Tailwind Config

```javascript
// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a' },
        accent: { 500: '#8b5cf6', 600: '#7c3aed' },
      },
    },
  },
  plugins: [typography], // @tailwindcss/typography pour le contenu WP
};
```

## Styler le Contenu WordPress

Le contenu WordPress arrive en HTML brut. Utiliser `@tailwindcss/typography` :

```astro
<!-- Le plugin prose stylise automatiquement le HTML WordPress -->
<article class="prose prose-lg prose-blue max-w-none
               prose-headings:font-bold
               prose-a:text-primary-600
               prose-img:rounded-lg
               prose-pre:bg-gray-900"
         set:html={post.content} />
```

### Styles Globaux pour Blocs Gutenberg

```css
/* src/styles/wp-blocks.css */
@layer components {
  .wp-content .wp-block-image { @apply my-8; }
  .wp-content .wp-block-image img { @apply rounded-lg shadow-md; }
  .wp-content .wp-block-gallery { @apply grid grid-cols-2 md:grid-cols-3 gap-4 my-8; }
  .wp-content .wp-block-quote { @apply border-l-4 border-primary-500 pl-6 italic my-6; }
  .wp-content .wp-block-pullquote { @apply text-center text-xl font-serif border-y border-gray-200 py-6 my-8; }
  .wp-content .wp-block-code { @apply bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6; }
  .wp-content .wp-block-button__link { @apply inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition no-underline; }
  .wp-content .wp-block-columns { @apply flex flex-col md:flex-row gap-6; }
  .wp-content .wp-block-column { @apply flex-1; }
  .wp-content .wp-block-separator { @apply border-gray-200 my-8; }
  .wp-content .wp-block-embed { @apply my-8; }
  .wp-content .wp-block-embed iframe { @apply w-full aspect-video rounded-lg; }
}
```

## Dark Mode

```astro
---
// Toggle dans le header
---
<button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
  <svg class="w-5 h-5 dark:hidden"><!-- sun icon --></svg>
  <svg class="w-5 h-5 hidden dark:block"><!-- moon icon --></svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  });
</script>
```

## Polices Locales

```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```
