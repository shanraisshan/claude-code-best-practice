---
name: ui-accessibility
description: >
  Accessibilité web WCAG 2.1 AA. Contraste, focus, ARIA, sémantique HTML,
  navigation clavier, screen readers. Utiliser quand l'utilisateur dit
  "accessibilité", "a11y", "WCAG", "ARIA", "contraste", "focus",
  "screen reader", "clavier", "handicap".
---

# Accessibilité Web — WCAG 2.1 AA

## HTML Sémantique

```html
<header>          <!-- Pas <div class="header"> -->
<nav>             <!-- Pas <div class="nav"> -->
<main>            <!-- Contenu principal, unique par page -->
<article>         <!-- Contenu autonome -->
<section>         <!-- Groupe thématique avec heading -->
<aside>           <!-- Contenu complémentaire -->
<footer>          <!-- Pas <div class="footer"> -->
<button>          <!-- Pas <div onclick="..."> -->
<a href="...">    <!-- Pas <span onclick="..."> -->
```

## Focus Visible

```css
/* Focus visible pour la navigation clavier */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary-500;
}

/* Supprimer l'outline uniquement pour les clics souris */
:focus:not(:focus-visible) {
  @apply outline-none;
}

/* Skip to content */
.skip-link {
  @apply absolute -top-full left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-b-lg;
  @apply focus:top-0 transition-all;
}
```

```astro
<!-- En premier enfant du body -->
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
<!-- ... -->
<main id="main-content">
```

## ARIA Patterns

### Bouton toggle
```html
<button aria-pressed="false" aria-label="Activer le mode sombre">
  🌙
</button>
```

### Menu mobile
```html
<button aria-expanded="false" aria-controls="mobile-menu" aria-label="Menu de navigation">
  ☰
</button>
<nav id="mobile-menu" aria-hidden="true">
  <!-- liens -->
</nav>
```

### Modal
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Titre du modal</h2>
  <!-- contenu -->
</div>
```

### Alert/notification
```html
<div role="alert" aria-live="polite">
  Votre message a été envoyé avec succès.
</div>
```

### Tab navigation
```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Onglet 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Onglet 2</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Contenu 1</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Contenu 2</div>
```

## Contraste Couleurs

| Texte | Ratio Min | Outils |
|-------|-----------|--------|
| Normal (<18px) | 4.5:1 | WebAIM Contrast Checker |
| Large (≥18px ou ≥14px bold) | 3:1 | Chrome DevTools |
| Éléments UI non-texte | 3:1 | Stark plugin |

### Combinaisons sûres
| Fond | Texte | Ratio |
|------|-------|-------|
| `white` | `gray-700` (#374151) | 8.5:1 ✅ |
| `white` | `gray-600` (#4B5563) | 5.9:1 ✅ |
| `white` | `gray-500` (#6B7280) | 4.6:1 ✅ |
| `white` | `gray-400` (#9CA3AF) | 3.0:1 ⚠️ large text only |
| `gray-900` | `gray-300` (#D1D5DB) | 9.7:1 ✅ |
| `primary-600` | `white` | 4.7:1 ✅ |

## Images

```html
<!-- Image informative : alt descriptif -->
<img src="equipe.jpg" alt="L'équipe de 5 personnes dans nos bureaux à Paris" />

<!-- Image décorative : alt vide -->
<img src="decoration.svg" alt="" role="presentation" />

<!-- Image avec texte : reproduire le texte -->
<img src="promo.jpg" alt="Soldes : -50% sur tout le site jusqu'au 31 mars" />

<!-- Image complexe (graphique) : description longue -->
<figure>
  <img src="graphique.png" alt="Évolution du CA 2024" aria-describedby="desc-graph" />
  <figcaption id="desc-graph">Le CA a augmenté de 15% au T1, 22% au T2...</figcaption>
</figure>
```

## Formulaires

```html
<!-- Toujours associer label + input -->
<label for="email">Email</label>
<input id="email" type="email" required aria-required="true" />

<!-- Erreur accessible -->
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert" class="text-red-600 text-sm">L'email est invalide.</p>

<!-- Groupe de champs -->
<fieldset>
  <legend>Mode de livraison</legend>
  <label><input type="radio" name="delivery" value="standard" /> Standard</label>
  <label><input type="radio" name="delivery" value="express" /> Express</label>
</fieldset>
```

## Checklist

- [ ] HTML sémantique (`nav`, `main`, `header`, `footer`, `button`)
- [ ] Skip to content link
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Contraste ≥ 4.5:1 texte normal, ≥ 3:1 grand texte
- [ ] Alt text sur toutes les images non-décoratives
- [ ] Labels sur tous les champs de formulaire
- [ ] Navigation complète au clavier (Tab, Enter, Esc)
- [ ] `aria-expanded` sur les menus déroulants
- [ ] `aria-current="page"` sur le lien actif de la nav
- [ ] `prefers-reduced-motion` respecté
- [ ] `lang` sur la balise `<html>`
- [ ] Pas de `tabindex` > 0 (sauf cas rare)
