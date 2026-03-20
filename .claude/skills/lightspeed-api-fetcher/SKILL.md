---
name: lightspeed-api-fetcher
description: Instructions for querying the Lightspeed Retail R-Series POS API (V3) — items, sales, customers, employees, inventory, and more
user-invocable: false
---

# Lightspeed API Fetcher Skill

This skill provides instructions for querying the Lightspeed Retail R-Series API (V3). It is preloaded into the `lightspeed-agent` — follow these instructions when fetching POS data.

## Authentication

The Lightspeed R-Series API uses **OAuth 2.0**. Tokens are managed by the helper script.

### Token Retrieval

Run the helper script to get a valid access token:

```bash
ACCESS_TOKEN=$(python3 ${CLAUDE_PROJECT_DIR}/lightspeed-pos/scripts/lightspeed_auth.py get-token)
```

The script handles token refresh automatically. If it fails, report the error — do NOT attempt manual OAuth flows.

### Environment Variables Required

These must be set in `lightspeed-pos/.env` (see `.env.example`):

- `LIGHTSPEED_ACCOUNT_ID` — Your Lightspeed account ID
- `LIGHTSPEED_CLIENT_ID` — OAuth app client ID
- `LIGHTSPEED_CLIENT_SECRET` — OAuth app client secret
- `LIGHTSPEED_REFRESH_TOKEN` — Long-lived refresh token (obtained during initial setup)

## Base URL Pattern

```
https://api.lightspeedapp.com/API/V3/Account/{ACCOUNT_ID}/{Resource}.json
```

All requests use JSON format (append `.json`). Include the access token as a Bearer token:

```bash
curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://api.lightspeedapp.com/API/V3/Account/${ACCOUNT_ID}/{Resource}.json"
```

## Available Endpoints

### Inventory & Products
| Resource | Description |
|----------|-------------|
| `Item` | Products — name, price, UPC, description, cost |
| `ItemMatrix` | Matrix items (variants — size, color, etc.) |
| `Category` | Product categories |
| `Tag` | Product tags |
| `Manufacturer` | Product manufacturers |
| `Vendor` | Suppliers/vendors |
| `ItemShop` | Per-shop inventory levels (quantity on hand, reorder point) |
| `InventoryCount` | Physical inventory counts |
| `InventoryCountItem` | Individual items within an inventory count |
| `InventoryLog` | Inventory change history |
| `InventoryTransfer` | Transfers between locations |

### Sales & Revenue
| Resource | Description |
|----------|-------------|
| `Sale` | Sales transactions (date, total, status, register, employee) |
| `SaleLine` | Individual line items within a sale |
| `SalePayment` | Payment details for a sale (method, amount) |
| `Register` | POS registers |
| `Quote` | Quotes / estimates |

### Customers
| Resource | Description |
|----------|-------------|
| `Customer` | Customer profiles (name, email, phone, address) |
| `CustomerType` | Customer groups/types |
| `CreditAccount` | Store credit accounts |

### Employees & Labor
| Resource | Description |
|----------|-------------|
| `Employee` | Staff profiles (name, role, access level) |
| `EmployeeHours` | Clock-in/out records, hours worked |

### Operations
| Resource | Description |
|----------|-------------|
| `Shop` | Store locations |
| `Order` | Purchase orders to vendors |
| `OrderLine` | Line items within purchase orders |
| `Workorder` | Service/repair work orders |
| `TaxCategory` | Tax configurations |
| `Discount` | Discount rules |

## Query Parameters

### Pagination
The API uses cursor-based pagination. Max 100 results per request.

```
?limit=100&offset=0
```

To get all records, loop until the response count is less than the limit.

### Filtering
Filter by any field using query parameters:

```
?Item.categoryID=5
?Sale.completed=true
?Sale.timeStamp=%3E%3D,2024-01-01T00:00:00
```

Operators: `=`, `!=`, `>`, `>=`, `<`, `<=`, `~` (LIKE), `!~` (NOT LIKE)

URL-encode operators: `>=` → `%3E%3D`

### Sorting

```
?sort=-timeStamp    (descending by timestamp)
?sort=description   (ascending by description)
```

### Relations (Embedded Data)
Load related resources inline:

```
?load_relations=["Category","Vendor"]     (for Items)
?load_relations=["SaleLines","Customer"]  (for Sales)
?load_relations=["SalePayments"]          (for Sales)
```

### Date Ranges for Sales
```
?Sale.timeStamp=%3E%3D,2024-01-01T00:00:00&Sale.timeStamp=%3C,2024-02-01T00:00:00
```

## Common Query Patterns

### Today's Sales
```bash
curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://api.lightspeedapp.com/API/V3/Account/${ACCOUNT_ID}/Sale.json?Sale.completed=true&Sale.timeStamp=%3E%3D,$(date -u +%Y-%m-%dT00:00:00)&load_relations=[\"SaleLines\",\"SalePayments\"]&limit=100"
```

### Low Stock Items
```bash
curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://api.lightspeedapp.com/API/V3/Account/${ACCOUNT_ID}/Item.json?load_relations=[\"ItemShops\"]&limit=100"
```
Then filter items where `ItemShops.ItemShop.qoh` <= `ItemShops.ItemShop.reorderPoint`.

### Top Customers
```bash
curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://api.lightspeedapp.com/API/V3/Account/${ACCOUNT_ID}/Customer.json?sort=-creditAccount.balance&limit=20"
```

### Employee Hours This Week
```bash
curl -s -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://api.lightspeedapp.com/API/V3/Account/${ACCOUNT_ID}/EmployeeHours.json?EmployeeHours.checkIn=%3E%3D,$(date -u -d 'last monday' +%Y-%m-%dT00:00:00)&load_relations=[\"Employee\"]&limit=100"
```

## Rate Limits

- **Bucket system**: Each account has a request bucket (typically 60 requests/minute for non-partner apps)
- **Drip rate**: Bucket refills at ~1 request/second
- **Headers**: Check `X-LS-API-Bucket-Level` in response headers
- **429 errors**: If rate-limited, wait and retry with exponential backoff (2s, 4s, 8s)

## Error Handling

- **401 Unauthorized**: Token expired — run `lightspeed_auth.py get-token` to refresh
- **429 Too Many Requests**: Rate limited — wait based on `Retry-After` header
- **404 Not Found**: Invalid resource or ID
- **500/503**: Lightspeed server issue — retry with backoff

## Rules

- Always use the helper script for token management — never hardcode tokens
- Paginate through ALL results when the caller asks for "all" data
- Use `load_relations` to minimize API calls (fetch related data in one request)
- Respect rate limits — check `X-LS-API-Bucket-Level` header
- Return raw JSON data to the agent — formatting is the report creator's job
- Cache frequently-accessed reference data (categories, vendors) in agent memory
