# Design Tokens — Référence Complète

## Couleurs Extended

### Génération de Palette

Pour générer une palette cohérente à partir d'une couleur de marque :

1. Choisir la couleur principale (ex: `#3B82F6`)
2. Générer 11 nuances (50-950) via https://uicolors.app/create
3. Vérifier le contraste de chaque nuance

### Palettes Prédéfinies Populaires

| Style | Primary | Accent | Résultat |
|-------|---------|--------|----------|
| Corporate | Blue-600 | Indigo-500 | Professionnel, fiable |
| Startup | Violet-600 | Pink-500 | Moderne, innovant |
| Nature | Emerald-600 | Teal-500 | Organique, santé |
| Luxe | Amber-600 | Rose-500 | Élégant, premium |
| Minimal | Gray-900 | Gray-500 | Épuré, sophistiqué |
| Tech | Cyan-600 | Blue-500 | Futuriste, digital |

## Spacing Scale Complète

```
0:    0px
px:   1px
0.5:  2px
1:    4px
1.5:  6px
2:    8px
2.5:  10px
3:    12px
3.5:  14px
4:    16px
5:    20px
6:    24px
7:    28px
8:    32px
9:    36px
10:   40px
11:   44px
12:   48px
14:   56px
16:   64px
20:   80px
24:   96px
28:   112px
32:   128px
36:   144px
40:   160px
44:   176px
48:   192px
52:   208px
56:   224px
60:   240px
64:   256px
72:   288px
80:   320px
96:   384px
```

## Z-Index Scale

| Token | Valeur | Usage |
|-------|--------|-------|
| `z-0` | 0 | Défaut |
| `z-10` | 10 | Éléments légèrement au-dessus |
| `z-20` | 20 | Dropdowns |
| `z-30` | 30 | Sticky elements |
| `z-40` | 40 | Fixed navbar |
| `z-50` | 50 | Modals, overlays |

## Transitions

| Propriété | Durée | Easing | Tailwind |
|-----------|-------|--------|----------|
| Couleur (hover) | 150ms | ease | `transition-colors duration-150` |
| Transform | 200ms | ease-out | `transition-transform duration-200` |
| Ombre | 200ms | ease-out | `transition-shadow duration-200` |
| Opacité | 300ms | ease-in-out | `transition-opacity duration-300` |
| Tout | 200ms | ease | `transition-all duration-200` |
