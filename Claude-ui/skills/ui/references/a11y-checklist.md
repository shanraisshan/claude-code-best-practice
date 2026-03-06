# Checklist Accessibilité WCAG 2.1 AA

## Perceivable

### Images
- [ ] Toutes les images informatives ont un `alt` descriptif
- [ ] Images décoratives : `alt=""` ou `role="presentation"`
- [ ] Images complexes (graphiques) : `aria-describedby` vers description longue
- [ ] Pas de texte dans les images (sauf logos)

### Couleurs
- [ ] Contraste texte normal : ratio ≥ 4.5:1
- [ ] Contraste texte large (≥18px bold / ≥24px) : ratio ≥ 3:1
- [ ] Éléments UI non-texte : ratio ≥ 3:1
- [ ] L'information n'est pas transmise uniquement par la couleur
- [ ] Mode dark : mêmes règles de contraste

### Multimédia
- [ ] Vidéos : sous-titres disponibles
- [ ] Audio : transcription disponible
- [ ] Pas d'autoplay audio/vidéo

## Operable

### Clavier
- [ ] Tous les éléments interactifs accessibles au clavier
- [ ] Focus visible (`focus-visible` ou `focus:ring`)
- [ ] Ordre de tabulation logique (pas de `tabindex` > 0)
- [ ] Skip to main content link
- [ ] Modals : focus trap + fermeture Escape
- [ ] Pas de piège à focus (l'utilisateur peut toujours sortir)

### Navigation
- [ ] `<nav>` avec `aria-label` si multiples navigations
- [ ] Lien actif : `aria-current="page"`
- [ ] Breadcrumbs avec `aria-label="Fil d'Ariane"`
- [ ] Menu mobile : `aria-expanded` sur le toggle

### Timing
- [ ] Pas de limite de temps (ou possibilité d'extension)
- [ ] Contenu auto-défilant : bouton pause
- [ ] `prefers-reduced-motion` respecté pour toutes les animations

### Cibles tactiles
- [ ] Boutons et liens : minimum 44x44px
- [ ] Espacement suffisant entre les cibles

## Understandable

### Langue
- [ ] `<html lang="fr">` (ou la langue appropriée)
- [ ] Changements de langue dans le contenu : `lang="en"` sur les passages

### Formulaires
- [ ] Chaque input a un `<label>` visible et associé
- [ ] Champs obligatoires : `aria-required="true"` + indicateur visuel
- [ ] Erreurs : `aria-invalid="true"` + `aria-describedby` vers le message
- [ ] Messages d'erreur clairs et spécifiques
- [ ] Groupes de champs : `<fieldset>` + `<legend>`
- [ ] Autocomplétion : `autocomplete` approprié

### Contenu
- [ ] Langage clair et simple
- [ ] Abréviations expliquées à la première occurrence
- [ ] Structure logique avec headings hiérarchiques (h1 → h2 → h3)

## Robust

### HTML
- [ ] HTML valide (pas de doublons d'ID)
- [ ] HTML sémantique (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- [ ] `<button>` pour les actions, `<a>` pour la navigation
- [ ] ARIA uniquement quand le HTML sémantique ne suffit pas

### ARIA Patterns
- [ ] Modals : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [ ] Tabs : `role="tablist/tab/tabpanel"`, `aria-selected`
- [ ] Accordions : `aria-expanded`, `aria-controls`
- [ ] Alertes : `role="alert"` ou `aria-live="polite"`
- [ ] Loading : `aria-busy="true"` ou live region

## Outils de Test

| Outil | Type | URL |
|-------|------|-----|
| axe DevTools | Extension navigateur | deque.com/axe |
| Lighthouse | Intégré Chrome | F12 → Lighthouse |
| WAVE | Extension navigateur | wave.webaim.org |
| WebAIM Contrast | Vérificateur contraste | webaim.org/resources/contrastchecker |
| NVDA | Screen reader (Windows) | nvaccess.org |
| VoiceOver | Screen reader (macOS) | Intégré macOS |
