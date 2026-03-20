# Report Templates Reference

## Formatting Rules

### Currency
- Always use `$` prefix with comma separators: `$1,234.56`
- Negative values: `-$50.00` (not `($50.00)`)
- Round to 2 decimal places

### Percentages
- One decimal place: `12.5%`
- Include direction indicator: `↑ 12.5%` or `↓ 3.2%` or `→ 0.0%`

### Dates
- Headers: `Monday, March 15, 2026`
- Tables: `Mar 15` or `2026-03-15`
- Timestamps: `2026-03-15 14:30 UTC`

### Trend Indicators
Compare to previous period (day, week, month) when memory data is available:
- `↑` Green/up: improvement
- `↓` Red/down: decline
- `→` Neutral: no significant change (< 1%)

### Table Guidelines
- Max 20 rows per table (add "... and X more" if truncated)
- Right-align numeric columns
- Bold the top 3 and bottom 3 entries for quick scanning
- Include a TOTAL or AVERAGE summary row at the bottom

## Example: Sales Dashboard

```markdown
# Sales Dashboard — Monday, March 15, 2026

## Summary
| Metric | Today | Yesterday | Trend |
|--------|-------|-----------|-------|
| Total Sales | $4,523.50 | $3,892.00 | ↑ 16.2% |
| Transactions | 47 | 41 | ↑ 14.6% |
| Average Sale | $96.24 | $94.93 | ↑ 1.4% |
| Items Sold | 132 | 118 | ↑ 11.9% |

## Top 10 Items
| # | Item | Qty | Revenue | % of Total |
|---|------|-----|---------|-----------|
| 1 | **Premium Widget** | 15 | **$749.85** | 16.6% |
| 2 | **Deluxe Gadget** | 8 | **$639.92** | 14.1% |
| 3 | **Basic Thingamajig** | 22 | **$439.78** | 9.7% |
| ... | ... | ... | ... | ... |
| **TOTAL** | | **132** | **$4,523.50** | **100%** |

---
*Generated at 2026-03-15 23:59 UTC by lightspeed-report-creator*
```
