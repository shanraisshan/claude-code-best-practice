# Webflow

Visual web design and CMS platform for marketing sites.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for sites, CMS, forms |
| MCP | - | Not available |
| CLI | ✓ | Webflow CLI for devlink and apps |
| SDK | ✓ | Official SDK for Node.js |

## Authentication

- **Type**: API Token (Site token or OAuth)
- **Header**: `Authorization: Bearer {api_token}`
- **Get token**: Site Settings > Integrations > API Access

## Common Agent Operations

### List sites

```bash
GET https://api.webflow.com/v2/sites

Authorization: Bearer {api_token}
```

### Get site

```bash
GET https://api.webflow.com/v2/sites/{site_id}

Authorization: Bearer {api_token}
```

### List collections

```bash
GET https://api.webflow.com/v2/sites/{site_id}/collections

Authorization: Bearer {api_token}
```

### List collection items

```bash
GET https://api.webflow.com/v2/collections/{collection_id}/items

Authorization: Bearer {api_token}
```

### Get collection item

```bash
GET https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}

Authorization: Bearer {api_token}
```

### Create collection item

```bash
POST https://api.webflow.com/v2/collections/{collection_id}/items

Authorization: Bearer {api_token}

{
  "fieldData": {
    "name": "Item Name",
    "slug": "item-name",
    "custom-field": "value"
  }
}
```

### Update collection item

```bash
PATCH https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}

Authorization: Bearer {api_token}

{
  "fieldData": {
    "custom-field": "new value"
  }
}
```

### Publish collection items

```bash
POST https://api.webflow.com/v2/collections/{collection_id}/items/publish

Authorization: Bearer {api_token}

{
  "itemIds": ["item_id_1", "item_id_2"]
}
```

### List form submissions

```bash
GET https://api.webflow.com/v2/sites/{site_id}/forms/{form_id}/submissions

Authorization: Bearer {api_token}
```

### Publish site

```bash
POST https://api.webflow.com/v2/sites/{site_id}/publish

Authorization: Bearer {api_token}

{
  "publishToWebflowSubdomain": true,
  "publishToCustomDomains": true
}
```

## Node.js SDK

```javascript
const Webflow = require('webflow-api');

const webflow = new Webflow({ token: 'api_token' });

// List sites
const sites = await webflow.sites.list();

// Get collection items
const items = await webflow.collections.items.listItems(collectionId);

// Create item
const item = await webflow.collections.items.createItem(collectionId, {
  fieldData: {
    name: 'New Item',
    slug: 'new-item'
  }
});
```

## CLI Commands

```bash
# Install
npm install -g @webflow/webflow-cli

# Login
webflow login

# Initialize devlink
webflow devlink init

# Sync components
webflow devlink sync
```

## CMS Structure

- **Collections** - Content types (like blog posts, team members)
- **Items** - Individual entries in a collection
- **Fields** - Data fields on items

## Common Field Types

- `PlainText` - Simple text
- `RichText` - Formatted content
- `Image` - Image upload
- `Link` - URL or page reference
- `Reference` - Link to another collection
- `Multi-Reference` - Multiple collection links
- `Switch` - Boolean toggle
- `Number` - Numeric value
- `Date` - Date/time

## When to Use

- Marketing site CMS management
- Blog/content publishing
- Form submission handling
- Automated content updates
- Programmatic SEO pages

## Rate Limits

- 60 requests/minute (general)
- 10 requests/minute (publishing)

## Relevant Skills

- programmatic-seo
- content-strategy
- page-cro
