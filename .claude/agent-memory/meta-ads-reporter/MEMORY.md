# Meta Ads Reporter Memory

## Account Configuration
- **Account name:** Digital HELOC (exact — singular, not "HELOCS")
- **Ad account ID:** 1089740229154307
- **Business portfolio:** Anthony Huynh
- **Do NOT report on:** account 1775910079629954 (a different, empty account that Chrome may default to)
- **Browser:** drive the local macOS Chrome (Claude in Chrome). If multiple browsers are connected, the tool will require disambiguation — for unattended runs only the Mac Chrome should be connected.
- **Reporting window:** Last 7 days (Ads Manager preset). Dates shown in Pacific Time.
- **Lead metric:** "Results" column = Leads (Form).
- **Reading tip:** use `get_page_text` for figures — Ads Manager clips the Amount spent column at the viewport edge.

## Reading conventions
Cost per lead = Amount spent ÷ Leads. Cross-check against Ads Manager's own "Cost per result" column (should match within rounding).

## Historical 7-day Readings
Each row is one run's trailing-7-day totals for the Digital HELOC account. Append a new row each run; use prior rows for the period-over-period trend.

| Run date | Window (7d) | Spend | Leads | Cost/lead | Notes |
|----------|-------------|-------|-------|-----------|-------|
| 2026-06-06 | May 30 – Jun 5, 2026 | $2,074.43 | 54 | $38.42 | Baseline (manual test run). All spend from the "DIGITAL HELOC" campaign; "DIGITAL HELOC - Copy" paused ($0). Campaign had unpublished edits / "Review and publish (2)" pending. Daily series verified to reconcile to totals (spend & leads both tie out). |

## Daily series (most recent run — window May 30 – Jun 5, 2026)
| Day | Leads | Spend | Cost/lead | Reach |
|-----|-------|-------|-----------|-------|
| 2026-05-30 | 11 | $291.98 | $26.54 | 8,192 |
| 2026-05-31 | 4 | $311.58 | $77.90 | 8,934 |
| 2026-06-01 | 9 | $318.83 | $35.43 | 9,416 |
| 2026-06-02 | 8 | $293.02 | $36.63 | 8,156 |
| 2026-06-03 | 9 | $284.54 | $31.62 | 8,863 |
| 2026-06-04 | 8 | $288.06 | $36.01 | 8,604 |
| 2026-06-05 | 5 | $286.42 | $57.28 | 8,884 |

**Pattern:** daily spend is steady (~$285–$319/day), but lead volume swings (4–11/day), so cost-per-lead is volatile ($26.54–$77.90). Most efficient day was May 30; least efficient was May 31. The latest day (Jun 5) shows CPL climbing to $57.28 on only 5 leads — worth watching whether that's a one-day dip or a trend.
