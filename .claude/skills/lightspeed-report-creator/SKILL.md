---
name: lightspeed-report-creator
description: Creates formatted markdown reports from Lightspeed POS data — sales summaries, inventory alerts, customer insights, and employee performance reports
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash(date *)
  - Bash(python3 *)
---

# Lightspeed Report Creator Skill

Creates formatted markdown reports from raw Lightspeed POS data. Invoked after the `lightspeed-agent` fetches data.

## Task

You will receive raw Lightspeed API data in the current context. Create a clean, actionable markdown report and write it to `lightspeed-pos/reports/`.

## Report Types

### 1. Sales Dashboard (`sales-dashboard.md`)

```markdown
# Sales Dashboard — {date}

## Summary
| Metric | Value |
|--------|-------|
| Total Sales | ${total} |
| Transaction Count | {count} |
| Average Sale | ${avg} |
| Top Payment Method | {method} |

## Hourly Breakdown
| Hour | Sales | Transactions |
|------|-------|-------------|
| 9 AM | ${x} | {n} |
...

## Top Selling Items
| # | Item | Qty | Revenue |
|---|------|-----|---------|
| 1 | {name} | {qty} | ${rev} |
...

## Employee Performance
| Employee | Sales | Transactions | Avg Sale |
|----------|-------|-------------|----------|
| {name} | ${total} | {count} | ${avg} |
...
```

### 2. Inventory Alert (`inventory-alert.md`)

```markdown
# Inventory Alert — {date}

## Low Stock Items ({count} items below reorder point)
| Item | On Hand | Reorder Point | Deficit | Vendor | Est. Cost to Reorder |
|------|---------|--------------|---------|--------|---------------------|
| {name} | {qoh} | {rop} | {deficit} | {vendor} | ${cost} |
...

## Out of Stock ({count} items)
| Item | Last Sold | Category | Vendor |
|------|-----------|----------|--------|
...

## Overstock Items ({count} items significantly above reorder point)
| Item | On Hand | Reorder Point | Excess | Carrying Cost |
|------|---------|--------------|--------|---------------|
...
```

### 3. Customer Insights (`customer-insights.md`)

```markdown
# Customer Insights — {date range}

## Top Customers by Revenue
| # | Customer | Total Spent | Visits | Avg Sale | Last Visit |
|---|----------|------------|--------|----------|------------|
...

## New Customers (this period)
| Customer | First Purchase | Amount |
|----------|---------------|--------|
...

## At-Risk Customers (no purchase in 30+ days)
| Customer | Last Purchase | Lifetime Value | Days Since Last Visit |
|----------|--------------|---------------|----------------------|
...
```

### 4. Employee Performance (`employee-performance.md`)

```markdown
# Employee Performance — {date range}

## Sales Performance
| Employee | Sales Total | Transactions | Avg Sale | Hours Worked | Sales/Hour |
|----------|------------|-------------|----------|-------------|-----------|
...

## Hours Summary
| Employee | Total Hours | Overtime | Clock-ins |
|----------|------------|----------|-----------|
...
```

### 5. Custom Query (`query-result.md`)

For ad-hoc queries, format the raw data into a clean table with:
- Column headers from field names
- Numeric formatting (currency, counts)
- Sorted by the most relevant field
- Summary row at bottom

## Instructions

1. **Identify report type** from the data shape and caller's request
2. **Calculate derived metrics** — averages, totals, percentages, deltas from previous period
3. **Write the report** to `lightspeed-pos/reports/{report-type}.md`
4. **If previous data exists in agent memory**, include trend comparisons (↑ ↓ →)

## Rules

- Currency values always formatted as `$X,XXX.XX`
- Dates formatted as `YYYY-MM-DD` or human-readable (`Mon, Jan 15`)
- Sort tables by the most actionable column (highest revenue, lowest stock, etc.)
- Include a "Generated at" timestamp at the bottom of every report
- If data is empty, create the report with a "No data" message — don't skip it
