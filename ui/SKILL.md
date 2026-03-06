---
name: ui
description: >
  Orchestrateur UI/Webdesign pour la création d'interfaces web modernes.
  Design system, composants, responsive, accessibilité, animations,
  dark mode, typographie. Utiliser quand l'utilisateur dit "design",
  "UI", "interface", "composant", "bouton", "card", "layout", "style",
  "couleur", "responsive", "accessible", "animation", "dark mode",
  "formulaire", "navigation", "hero", "section", "landing page".
---

# Claude UI — Spécialiste Webdesign

## Stack Ciblé

- **Framework** : Astro 5 + Tailwind CSS 4 (compatible React/Vue si islands)
- **Méthodologie** : Atomic Design (Atoms → Molecules → Organisms → Templates → Pages)
- **Accessibilité** : WCAG 2.1 AA minimum
- **Performances** : 0 JS par défaut, islands pour l'interactivité

## Routage

| Commande | Sub-Skill | Action |
|----------|-----------|--------|
| `ui tokens` | ui-tokens | Design tokens, couleurs, espacements, ombres |
| `ui component` | ui-components | Composants réutilisables (buttons, cards, badges) |
| `ui layout` | ui-layout | Grilles, conteneurs, sections, hero, footer |
| `ui animation` | ui-animation | Micro-interactions, transitions, View Transitions |
| `ui a11y` | ui-accessibility | Audit accessibilité, ARIA, focus, contraste |
| `ui form` | ui-forms | Formulaires, inputs, validation, UX |
| `ui nav` | ui-navigation | Headers, navbars, menus mobile, breadcrumbs |
| `ui responsive` | ui-responsive | Breakpoints, mobile-first, adaptation |
| `ui dark` | ui-darkmode | Dark mode, thème switcher |
| `ui images` | ui-images | Images responsives, hero, galleries, lazy loading |
| `ui typo` | ui-typography | Typographie, échelle, polices, lisibilité |

## Principes de Design

1. **Hiérarchie visuelle** — Guider l'œil avec taille, poids, couleur, espace
2. **Cohérence** — Même composant = même apparence partout
3. **Espace blanc** — Les éléments respirent, pas de surcharge
4. **Feedback** — Chaque action utilisateur a une réponse visuelle
5. **Simplicité** — Supprimer ce qui n'est pas nécessaire
6. **Mobile-first** — Concevoir pour mobile, enrichir pour desktop

## Conventions de Code

- **Tailwind CSS** pour tout le styling — pas de CSS custom sauf nécessité
- **Composants .astro** pour le HTML statique
- **React/Vue avec `client:visible`** uniquement pour l'interactivité
- **Classes utilitaires** organisées : layout → spacing → sizing → typography → colors → effects
- **Nommage des composants** : PascalCase (`HeroSection.astro`, `PostCard.astro`)

## Références (charger à la demande)

- `references/design-tokens.md` — Tokens complets (couleurs, typo, spacing, shadows)
- `references/tailwind-patterns.md` — Patterns Tailwind courants
- `references/a11y-checklist.md` — Checklist accessibilité complète

## Langue

Par défaut : français. S'adapte à la langue de l'utilisateur.
