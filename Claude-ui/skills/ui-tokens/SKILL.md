---
name: ui-tokens
description: >
  Design tokens et système de design. Couleurs, espacements, ombres,
  border-radius, breakpoints. Utiliser quand l'utilisateur dit "tokens",
  "couleurs", "palette", "spacing", "ombres", "shadows", "design system",
  "variables", "thème".
---

# Design Tokens

## Palette de Couleurs (Tailwind extend)

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        // Marque — adapter au projet
        primary: {
          50:  '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE',
          300: '#93C5FD', 400: '#60A5FA', 500: '#3B82F6',
          600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF',
          900: '#1E3A8A', 950: '#172554',
        },
        accent: {
          50:  '#F5F3FF', 100: '#EDE9FE', 200: '#DDD6FE',
          300: '#C4B5FD', 400: '#A78BFA', 500: '#8B5CF6',
          600: '#7C3AED', 700: '#6D28D9', 800: '#5B21B6',
          900: '#4C1D95', 950: '#2E1065',
        },
      },
    },
  },
};
```

### Couleurs Sémantiques

| Rôle | Couleur | Usage |
|------|---------|-------|
| `primary-500` | #3B82F6 | CTAs, liens, éléments actifs |
| `primary-600` | #2563EB | Hover sur primary |
| `primary-700` | #1D4ED8 | Active/pressed |
| `accent-500` | #8B5CF6 | Éléments secondaires, badges |
| `green-500` | #22C55E | Succès, validation |
| `amber-500` | #F59E0B | Attention, warning |
| `red-500` | #EF4444 | Erreur, danger, suppression |
| `gray-50` → `gray-950` | Neutres | Texte, fonds, bordures |

### Règle de Contraste

| Combinaison | Ratio min | Usage |
|-------------|-----------|-------|
| Texte normal sur fond | 4.5:1 | Corps de texte |
| Texte large (≥18px bold) | 3:1 | Titres |
| Éléments UI (bordures, icônes) | 3:1 | Boutons, inputs |

## Espacements

Utiliser l'échelle Tailwind (multiples de 4px) :

| Token | Valeur | Usage typique |
|-------|--------|---------------|
| `1` | 4px | Micro-espacement (icône-texte) |
| `2` | 8px | Padding boutons sm, gaps serrés |
| `3` | 12px | Padding inputs |
| `4` | 16px | Gap par défaut, padding cards |
| `6` | 24px | Sections internes |
| `8` | 32px | Gap entre composants |
| `12` | 48px | Sections de page |
| `16` | 64px | Entre sections majeures |
| `20` | 80px | Hero padding |
| `24` | 96px | Grande respiration |

## Ombres

```css
/* Du plus subtil au plus prononcé */
shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow:     0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

| Composant | Ombre recommandée |
|-----------|-------------------|
| Cards au repos | `shadow-sm` ou `shadow` |
| Cards au hover | `shadow-md` ou `shadow-lg` |
| Modals | `shadow-xl` |
| Dropdowns | `shadow-lg` |
| Boutons surélevés | `shadow-md` |
| Navbar fixe | `shadow-sm` |

## Border Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `rounded-sm` | 2px | Subtil |
| `rounded` | 4px | Inputs, badges |
| `rounded-md` | 6px | Cards, boutons |
| `rounded-lg` | 8px | Cards larges, modals |
| `rounded-xl` | 12px | Sections, conteneurs |
| `rounded-2xl` | 16px | Hero, grandes cards |
| `rounded-full` | 9999px | Avatars, badges pill |

## Breakpoints

| Token | Valeur | Device |
|-------|--------|--------|
| (défaut) | 0-639px | Mobile |
| `sm:` | 640px+ | Grand mobile / petit tablet |
| `md:` | 768px+ | Tablet |
| `lg:` | 1024px+ | Desktop |
| `xl:` | 1280px+ | Grand desktop |
| `2xl:` | 1536px+ | Ultra-wide |

## Largeurs de Conteneur

```css
max-w-sm:   384px   /* Cards étroites */
max-w-md:   448px   /* Formulaires */
max-w-lg:   512px   /* Contenu étroit */
max-w-xl:   576px   /* Contenu moyen */
max-w-2xl:  672px   /* Articles blog */
max-w-4xl:  896px   /* Contenu large */
max-w-6xl:  1152px  /* Conteneur principal */
max-w-7xl:  1280px  /* Conteneur max */
```
