---
name: ui-components
description: >
  Composants UI réutilisables. Boutons, cards, badges, avatars, alerts,
  modals, tooltips. Utiliser quand l'utilisateur dit "composant", "bouton",
  "button", "card", "carte", "badge", "avatar", "alert", "modal",
  "tooltip", "tag", "chip", "divider", "skeleton".
---

# Composants UI Réutilisables

## Boutons

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  class?: string;
}
const { variant = 'primary', size = 'md', href, fullWidth, disabled, class: cls } = Astro.props;

const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

const variants = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  ghost:     'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
};

const classes = [base, variants[variant], sizes[size], fullWidth && 'w-full', disabled && 'opacity-50 pointer-events-none', cls].filter(Boolean).join(' ');
const Tag = href ? 'a' : 'button';
---
<Tag href={href} class={classes} disabled={disabled}><slot /></Tag>
```

## Card

```astro
---
// src/components/ui/Card.astro
interface Props {
  href?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  class?: string;
}
const { href, padding = 'md', hover = false, class: cls } = Astro.props;

const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
const Tag = href ? 'a' : 'div';
---
<Tag
  href={href}
  class:list={[
    'block bg-white rounded-xl border border-gray-200',
    paddings[padding],
    hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
    href && 'no-underline text-inherit',
    cls,
  ]}
>
  <slot />
</Tag>
```

## Badge

```astro
---
// src/components/ui/Badge.astro
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}
const { variant = 'default', size = 'sm' } = Astro.props;

const variants = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger:  'bg-red-100 text-red-700',
};

const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };
---
<span class:list={['inline-flex items-center font-medium rounded-full', variants[variant], sizes[size]]}>
  <slot />
</span>
```

## Avatar

```astro
---
interface Props {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
}
const { src, alt, size = 'md', initials } = Astro.props;
const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' };
---
{src ? (
  <img src={src} alt={alt} class:list={['rounded-full object-cover', sizes[size]]} loading="lazy" />
) : (
  <div class:list={['rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold', sizes[size]]}>
    {initials ?? alt.charAt(0).toUpperCase()}
  </div>
)}
```

## Alert

```astro
---
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}
const { variant = 'info', title } = Astro.props;
const styles = {
  info:    'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error:   'bg-red-50 border-red-200 text-red-800',
};
const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
---
<div class:list={['rounded-lg border p-4', styles[variant]]} role="alert">
  <div class="flex gap-3">
    <span class="text-lg flex-shrink-0">{icons[variant]}</span>
    <div>
      {title && <p class="font-semibold mb-1">{title}</p>}
      <div class="text-sm"><slot /></div>
    </div>
  </div>
</div>
```

## Skeleton Loader

```astro
---
interface Props { class?: string; }
const { class: cls } = Astro.props;
---
<div class:list={['animate-pulse rounded-md bg-gray-200', cls]} />

<style>
  @keyframes pulse { 50% { opacity: .5; } }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
</style>
```

Usage :
```astro
<Skeleton class="h-6 w-3/4 mb-4" />  <!-- Titre -->
<Skeleton class="h-4 w-full mb-2" />  <!-- Ligne texte -->
<Skeleton class="h-4 w-5/6 mb-2" />  <!-- Ligne texte -->
<Skeleton class="h-48 w-full" />      <!-- Image -->
```

## Divider

```astro
---
interface Props { label?: string; }
const { label } = Astro.props;
---
{label ? (
  <div class="flex items-center gap-4 my-8">
    <div class="flex-1 h-px bg-gray-200" />
    <span class="text-sm text-gray-500">{label}</span>
    <div class="flex-1 h-px bg-gray-200" />
  </div>
) : (
  <hr class="border-gray-200 my-8" />
)}
```

## Conventions

- Chaque composant = un fichier `.astro` dans `src/components/ui/`
- Props typées avec `interface Props`
- Valeurs par défaut via déstructuration
- `class` en prop passthrough pour la personnalisation
- Tailwind uniquement, pas de `<style>` sauf animations
- Slots pour le contenu enfant
