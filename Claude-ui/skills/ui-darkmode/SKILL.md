---
name: ui-darkmode
description: >
  Dark mode et gestion de thèmes. Toggle, CSS, Tailwind dark:, localStorage,
  prefers-color-scheme. Utiliser quand l'utilisateur dit "dark mode",
  "mode sombre", "thème", "theme", "light/dark", "switcher", "toggle thème".
---

# Dark Mode

## Stratégie Tailwind (class-based)

```javascript
// tailwind.config.mjs
export default {
  darkMode: 'class', // ou 'selector' en Tailwind 4
};
```

## Toggle Component (Astro + JS)

```astro
---
// src/components/ThemeToggle.astro
---
<button
  id="theme-toggle"
  class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
  aria-label="Changer de thème"
>
  <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <!-- Sun icon -->
    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
  </svg>
  <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <!-- Moon icon -->
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
</button>

<script is:inline>
  // Exécuté immédiatement pour éviter le flash
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

## Anti-flash Script (dans le `<head>`)

```astro
<!-- src/layouts/BaseLayout.astro — dans <head> avant tout CSS -->
<script is:inline>
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

## Palette Dark Mode

| Élément | Light | Dark |
|---------|-------|------|
| Background page | `bg-white` | `dark:bg-gray-950` |
| Background card | `bg-white` | `dark:bg-gray-900` |
| Background subtil | `bg-gray-50` | `dark:bg-gray-800` |
| Texte principal | `text-gray-900` | `dark:text-gray-100` |
| Texte secondaire | `text-gray-600` | `dark:text-gray-400` |
| Bordures | `border-gray-200` | `dark:border-gray-700` |
| Hover | `hover:bg-gray-100` | `dark:hover:bg-gray-800` |
| Input border | `border-gray-300` | `dark:border-gray-600` |
| Input bg | `bg-white` | `dark:bg-gray-900` |
| Shadows | `shadow-lg` | `dark:shadow-gray-900/50` |

## Patterns Dark Mode

```html
<!-- Card -->
<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
  <h3 class="text-gray-900 dark:text-gray-100 font-semibold">Titre</h3>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>

<!-- Page layout -->
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

<!-- Images qui s'adaptent -->
<img class="dark:brightness-90 dark:contrast-105" src="..." alt="..." />

<!-- SVG/icônes -->
<svg class="text-gray-600 dark:text-gray-400" ...>
```

## Règles

- Toujours définir les variantes `dark:` sur chaque composant
- Utiliser `gray-950` pour le fond (pas `black`, trop harsh)
- Réduire la luminosité des images en dark mode
- Les ombres en dark mode doivent être plus prononcées et plus sombres
- Tester le contraste en dark mode (WCAG 4.5:1 s'applique aussi)
