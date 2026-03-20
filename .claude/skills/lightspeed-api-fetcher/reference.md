# Lightspeed R-Series API Reference

## Full Endpoint List (V3)

All endpoints follow: `https://api.lightspeedapp.com/API/V3/Account/{ID}/{Resource}.json`

### Core Resources
| Resource | GET | POST | PUT | DELETE | Notes |
|----------|-----|------|-----|--------|-------|
| Account | ✅ | — | — | — | Read-only account info |
| Item | ✅ | ✅ | ✅ | ✅ | Products/inventory items |
| ItemMatrix | ✅ | ✅ | ✅ | ✅ | Matrix/variant products |
| ItemShop | ✅ | — | ✅ | — | Per-shop stock levels |
| Category | ✅ | ✅ | ✅ | ✅ | Product categories |
| Tag | ✅ | ✅ | ✅ | ✅ | Product tags |
| Manufacturer | ✅ | ✅ | ✅ | ✅ | Product manufacturers |
| Vendor | ✅ | ✅ | ✅ | ✅ | Suppliers |
| Sale | ✅ | ✅ | ✅ | — | Sales transactions |
| SaleLine | ✅ | ✅ | ✅ | ✅ | Sale line items |
| SalePayment | ✅ | ✅ | — | — | Payment records |
| Customer | ✅ | ✅ | ✅ | ✅ | Customer profiles |
| CustomerType | ✅ | ✅ | ✅ | ✅ | Customer groups |
| Employee | ✅ | ✅ | ✅ | ✅ | Staff profiles |
| EmployeeHours | ✅ | ✅ | ✅ | ✅ | Time clock records |
| Shop | ✅ | — | ✅ | — | Store locations |
| Register | ✅ | — | — | — | POS registers |
| Order | ✅ | ✅ | ✅ | ✅ | Purchase orders |
| OrderLine | ✅ | ✅ | ✅ | ✅ | PO line items |
| Workorder | ✅ | ✅ | ✅ | — | Service/repair orders |
| WorkorderLine | ✅ | — | ✅ | ✅ | Workorder line items |
| WorkorderItem | ✅ | — | — | — | Workorder serialized items |
| WorkorderStatus | ✅ | — | — | — | Workorder statuses |
| InventoryCount | ✅ | ✅ | ✅ | — | Physical counts |
| InventoryCountItem | ✅ | ✅ | ✅ | ✅ | Items in counts |
| InventoryLog | ✅ | — | — | — | Change history |
| InventoryTransfer | ✅ | ✅ | ✅ | — | Inter-location transfers |
| InventoryTransferItem | ✅ | ✅ | ✅ | ✅ | Transfer line items |
| Discount | ✅ | ✅ | ✅ | ✅ | Discount rules |
| TaxCategory | ✅ | ✅ | ✅ | ✅ | Tax config |
| CreditAccount | ✅ | — | — | — | Store credit |
| Quote | ✅ | ✅ | ✅ | — | Quotes/estimates |
| SpecialOrder | ✅ | ✅ | ✅ | — | Special orders |
| Contact | ✅ | ✅ | ✅ | ✅ | Contact records |

## Response Format

```json
{
  "@attributes": {
    "count": "150",
    "offset": "0",
    "limit": "100"
  },
  "Item": [
    {
      "itemID": "1",
      "description": "Blue Widget",
      "defaultCost": "10.00",
      "avgCost": "10.50",
      "Prices": {
        "ItemPrice": [
          { "amount": "19.99", "useTypeID": "1", "useType": "Default" }
        ]
      },
      "Category": { "categoryID": "5", "name": "Widgets" }
    }
  ]
}
```

## Pagination Loop Pattern

```bash
OFFSET=0
LIMIT=100
ALL_RESULTS="[]"

while true; do
  RESPONSE=$(curl -s -H "Authorization: Bearer ${TOKEN}" \
    "${BASE_URL}/${RESOURCE}.json?limit=${LIMIT}&offset=${OFFSET}")

  COUNT=$(echo "$RESPONSE" | jq -r '.["@attributes"].count // "0"')

  # Merge results...

  if [ "$COUNT" -lt "$LIMIT" ]; then
    break
  fi
  OFFSET=$((OFFSET + LIMIT))
done
```

## Filter Operator Encoding

| Operator | URL Encoded | Example |
|----------|-------------|---------|
| `=` | (none) | `?Item.categoryID=5` |
| `!=` | `%21%3D` | `?Item.categoryID=%21%3D,5` |
| `>` | `%3E` | `?Sale.total=%3E,100` |
| `>=` | `%3E%3D` | `?Sale.timeStamp=%3E%3D,2024-01-01` |
| `<` | `%3C` | `?Item.defaultCost=%3C,50` |
| `<=` | `%3C%3D` | `?ItemShop.qoh=%3C%3D,5` |
| `~` | `%7E` | `?Item.description=%7E,%25widget%25` |
| `!~` | `%21%7E` | `?Item.description=%21%7E,%25test%25` |
| `IN` | (comma list) | `?Item.categoryID=IN,[1,2,3]` |

## Common load_relations

| Base Resource | Useful Relations |
|---------------|-----------------|
| Item | `Category`, `Vendor`, `ItemShops`, `Manufacturer`, `Tags`, `Prices`, `Images` |
| Sale | `SaleLines`, `SalePayments`, `Customer`, `Employee`, `Register`, `Shop` |
| SaleLine | `Item`, `Tax` |
| Customer | `CustomerType`, `CreditAccount`, `Contact` |
| Employee | `EmployeeHours` |
| Order | `OrderLines`, `Vendor` |
