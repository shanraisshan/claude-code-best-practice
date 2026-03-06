# WordPress REST API — Référence Rapide

## Base URL
`/wp-json/wp/v2/`

## Endpoints

| Ressource | GET | POST | PUT | DELETE |
|-----------|-----|------|-----|--------|
| `/posts` | ✅ Liste | ✅ Créer | - | - |
| `/posts/{id}` | ✅ Détail | - | ✅ Modifier | ✅ Supprimer |
| `/pages` | ✅ | ✅ | - | - |
| `/pages/{id}` | ✅ | - | ✅ | ✅ |
| `/categories` | ✅ | ✅ | - | - |
| `/tags` | ✅ | ✅ | - | - |
| `/media` | ✅ | ✅ | - | - |
| `/users` | ✅ | ✅ | - | - |
| `/comments` | ✅ | ✅ | - | - |
| `/menus` | ✅ (plugin) | - | - | - |
| `/search` | ✅ | - | - | - |

## Paramètres de Requête

| Param | Type | Description |
|-------|------|-------------|
| `per_page` | int | Résultats par page (max 100) |
| `page` | int | Page de résultats |
| `_embed` | bool | Inclure médias et termes liés |
| `_fields` | string | Limiter les champs (ex: `id,title,slug`) |
| `slug` | string | Filtrer par slug |
| `status` | string | publish, draft, future, pending |
| `categories` | int/csv | IDs catégories |
| `tags` | int/csv | IDs tags |
| `search` | string | Recherche full-text |
| `orderby` | string | date, title, modified, id, slug |
| `order` | string | asc, desc |
| `before` | ISO date | Articles avant cette date |
| `after` | ISO date | Articles après cette date |
| `author` | int | ID auteur |
| `exclude` | csv | IDs à exclure |

## Headers de Réponse

| Header | Contenu |
|--------|---------|
| `X-WP-Total` | Nombre total de résultats |
| `X-WP-TotalPages` | Nombre total de pages |

## Authentification

### Application Passwords (WP 5.6+)
```bash
# Header Authorization
Authorization: Basic base64(username:application_password)
```

### Cookie Auth (pour les requêtes depuis le même domaine)
Nécessite un nonce via `wp_rest` (surtout pour l'admin).

## Champs Post Standard

```json
{
  "id": 1,
  "date": "2026-02-24T10:00:00",
  "modified": "2026-02-24T12:00:00",
  "slug": "mon-article",
  "status": "publish",
  "type": "post",
  "title": { "rendered": "Mon Article" },
  "content": { "rendered": "<p>Contenu HTML</p>" },
  "excerpt": { "rendered": "<p>Extrait</p>" },
  "author": 1,
  "featured_media": 42,
  "categories": [3, 5],
  "tags": [7, 12],
  "_embedded": {
    "wp:featuredmedia": [{ "source_url": "...", "alt_text": "..." }],
    "wp:term": [
      [{ "id": 3, "name": "Cat", "slug": "cat" }],
      [{ "id": 7, "name": "Tag", "slug": "tag" }]
    ],
    "author": [{ "name": "Admin", "avatar_urls": { "96": "..." } }]
  }
}
```
