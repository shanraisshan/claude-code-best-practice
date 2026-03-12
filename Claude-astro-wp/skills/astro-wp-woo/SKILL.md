---
name: astro-wp-woo
description: >
  WooCommerce headless avec Astro. Produits, panier, checkout via API.
  Utiliser quand l'utilisateur dit "WooCommerce", "e-commerce", "boutique",
  "produit", "panier", "checkout", "shop".
---

# WooCommerce Headless — Astro

## API WooCommerce

WooCommerce expose une API REST complète à `/wp-json/wc/v3/`.
Authentification requise (Consumer Key + Consumer Secret).

```typescript
// src/lib/woocommerce.ts
const WC_URL = import.meta.env.WP_URL;
const WC_KEY = import.meta.env.WC_CONSUMER_KEY;
const WC_SECRET = import.meta.env.WC_CONSUMER_SECRET;

export async function wcFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set('consumer_key', WC_KEY);
  url.searchParams.set('consumer_secret', WC_SECRET);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  return res.json();
}

export async function getProducts(params = {}) {
  return wcFetch<any[]>('products', { per_page: '100', ...params });
}

export async function getProduct(slug: string) {
  const products = await wcFetch<any[]>('products', { slug });
  return products[0] ?? null;
}

export async function getCategories() {
  return wcFetch<any[]>('products/categories', { per_page: '100' });
}
```

## Pages Produits (SSG)

```astro
---
// src/pages/boutique/[slug].astro
import { getProducts, getProduct } from '../../lib/woocommerce';

export async function getStaticPaths() {
  const products = await getProducts();
  return products.map(p => ({ params: { slug: p.slug }, props: { product: p } }));
}

const { product } = Astro.props;
---
<h1>{product.name}</h1>
<p class="text-2xl font-bold">{product.price} €</p>
<div set:html={product.description} />
```

## Panier & Checkout

Le panier et le checkout nécessitent de l'interactivité côté client.
Deux approches :

1. **Snipcart** — Panier JS overlay, pas besoin de SSR
2. **WooCommerce Store API** — Panier natif WC (plus complexe)
3. **Redirection vers WP** — Checkout sur WordPress classique

### Snipcart (le plus simple)

```astro
<button
  class="snipcart-add-item"
  data-item-id={product.id}
  data-item-name={product.name}
  data-item-price={product.price}
  data-item-url={`/boutique/${product.slug}`}
  data-item-image={product.images[0]?.src}
>
  Ajouter au panier
</button>
```

### Redirect vers WP Checkout

```astro
<a href={`${WP_URL}/checkout/?add-to-cart=${product.id}`}
   target="_blank" rel="noopener">
  Acheter
</a>
```

## Schema Produit

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nom du Produit",
  "image": "url-image",
  "description": "Description",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

## Limitations

- Le checkout complet headless WooCommerce est complexe (paiement, shipping)
- Pour un e-commerce simple : Snipcart ou redirection WP
- Pour un e-commerce avancé : considérer Shopify headless + Astro
