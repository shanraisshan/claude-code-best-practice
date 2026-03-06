---
name: ui-navigation
description: >
  Navigation web. Header, navbar, menu mobile hamburger, breadcrumbs,
  sticky nav, menu dropdown. Utiliser quand l'utilisateur dit "navigation",
  "menu", "header", "navbar", "hamburger", "breadcrumb", "sticky",
  "dropdown", "menu mobile".
---

# Navigation

## Header/Navbar Responsive

```astro
---
const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];
const currentPath = Astro.url.pathname;
---
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="text-xl font-bold text-gray-900">Logo</a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Navigation principale">
        {navItems.map(item => (
          <a
            href={item.href}
            class:list={[
              'text-sm font-medium transition-colors',
              currentPath === item.href
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-gray-900',
            ]}
            aria-current={currentPath === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <!-- CTA Desktop -->
      <div class="hidden md:block">
        <Button size="sm">Commencer</Button>
      </div>

      <!-- Mobile Toggle -->
      <button
        id="menu-toggle"
        class="md:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-expanded="false"
        aria-controls="mobile-menu"
        aria-label="Menu de navigation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <nav id="mobile-menu" class="md:hidden hidden border-t border-gray-100" aria-label="Navigation mobile">
    <div class="px-4 py-4 space-y-2">
      {navItems.map(item => (
        <a href={item.href} class="block py-2 text-gray-700 hover:text-primary-600 font-medium">
          {item.label}
        </a>
      ))}
      <Button fullWidth class="mt-4">Commencer</Button>
    </div>
  </nav>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('hidden');
  });
</script>
```

## Breadcrumbs

```astro
---
interface Props { items: Array<{ label: string; href?: string }>; }
const { items } = Astro.props;
---
<nav aria-label="Fil d'Ariane" class="text-sm text-gray-500">
  <ol class="flex items-center gap-1.5">
    {items.map((item, i) => (
      <li class="flex items-center gap-1.5">
        {i > 0 && <span aria-hidden="true">/</span>}
        {item.href ? (
          <a href={item.href} class="hover:text-primary-600 transition">{item.label}</a>
        ) : (
          <span class="text-gray-900 font-medium" aria-current="page">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

## Patterns

| Pattern | Usage |
|---------|-------|
| Sticky + backdrop-blur | `sticky top-0 z-50 bg-white/80 backdrop-blur-md` |
| Navbar avec ombre au scroll | Ajouter `shadow-sm` via JS quand `scrollY > 0` |
| Active link | `aria-current="page"` + couleur primary |
| Mobile off-canvas | Sidebar animée depuis la gauche |
