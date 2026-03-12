---
name: ui-forms
description: >
  Formulaires et inputs. Validation, UX, états, messages d'erreur,
  champs. Utiliser quand l'utilisateur dit "formulaire", "form", "input",
  "champ", "validation", "contact", "newsletter", "search".
---

# Formulaires

## Input Field

```astro
---
interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}
const { label, name, type = 'text', required, error, placeholder } = Astro.props;
---
<div class="space-y-1.5">
  <label for={name} class="block text-sm font-medium text-gray-700">
    {label}{required && <span class="text-red-500 ml-0.5">*</span>}
  </label>
  <input
    id={name} name={name} type={type}
    required={required} placeholder={placeholder}
    aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
    class:list={[
      'w-full px-4 py-2.5 rounded-lg border transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200',
    ]}
  />
  {error && <p id={`${name}-error`} role="alert" class="text-sm text-red-600">{error}</p>}
</div>
```

## Textarea

```astro
<textarea
  id={name} name={name} rows="4"
  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition resize-y"
  placeholder={placeholder}
/>
```

## Select

```astro
<select class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition bg-white">
  <option value="" disabled selected>Choisir...</option>
  {options.map(o => <option value={o.value}>{o.label}</option>)}
</select>
```

## Formulaire de Contact Complet

```astro
<form action="/api/contact" method="POST" class="max-w-lg mx-auto space-y-6">
  <FormField label="Nom" name="name" required />
  <FormField label="Email" name="email" type="email" required />
  <FormField label="Sujet" name="subject" />
  <div class="space-y-1.5">
    <label for="message" class="block text-sm font-medium text-gray-700">Message *</label>
    <textarea id="message" name="message" rows="5" required
      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition resize-y" />
  </div>
  <Button type="submit" fullWidth>Envoyer</Button>
</form>
```

## Bonnes Pratiques Formulaires

- Labels visibles (pas uniquement placeholder)
- Validation côté client ET serveur
- Messages d'erreur sous le champ, pas en haut de page
- Focus automatique sur le premier champ avec erreur
- Bouton submit clairement identifiable
- Confirmation après envoi réussi
- Minimum de champs (ne demander que le nécessaire)
