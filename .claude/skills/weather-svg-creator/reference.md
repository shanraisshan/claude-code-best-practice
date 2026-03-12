# Weather SVG Creator — Reference

## SVG Template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <rect width="300" height="160" rx="12" fill="#1a1a2e"/>
  <text x="150" y="45" text-anchor="middle" fill="#8892b0" font-family="system-ui" font-size="14">Unit: [Celsius/Fahrenheit]</text>
  <text x="150" y="100" text-anchor="middle" fill="#ccd6f6" font-family="system-ui" font-size="42" font-weight="bold">[value]°[C/F]</text>
  <text x="150" y="140" text-anchor="middle" fill="#64ffda" font-family="system-ui" font-size="16">Dubai, UAE</text>
</svg>
```

### Placeholders

| Placeholder | Replace with | Example |
|-------------|-------------|---------|
| `[Celsius/Fahrenheit]` | Full unit name from input | `Celsius` |
| `[value]` | Numeric temperature from input | `26.2` |
| `[C/F]` | Unit abbreviation | `C` or `F` |

### Design Specs

| Property | Value |
|----------|-------|
| Dimensions | 300 x 160 px |
| Corner radius | 12 px |
| Background | `#1a1a2e` (dark navy) |
| Unit label | `#8892b0` (muted blue), 14px |
| Temperature | `#ccd6f6` (light blue), 42px bold |
| Location | `#64ffda` (teal accent), 16px |
| Font | `system-ui` |
| All text | Centered (`text-anchor="middle"` at x=150) |

---

## Output Markdown Template

```markdown
# Weather Result

## Temperature
[value]°[C/F]

## Location
Dubai, UAE

## Unit
[Celsius/Fahrenheit]

## SVG Card
![Weather Card](weather.svg)
```

---

## Output Paths

| File | Path |
|------|------|
| SVG card | `orchestration-workflow/weather.svg` |
| Markdown summary | `orchestration-workflow/output.md` |
