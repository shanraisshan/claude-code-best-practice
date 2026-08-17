---
name: time-skill
description: Display current date and time in any timezone. Supports IANA timezone names (Asia/Taipei), abbreviations (CST), and UTC offsets (UTC+8). Defaults to Pakistan Standard Time (PKT).
argument-hint: "[timezone=Asia/Karachi]"
user-invocable: true
---

# Time Skill - Multi-Timezone Edition

Display the current date and time in any timezone around the world.

## Task

You will receive an optional timezone parameter. Your job is to:
1. If no parameter: show current time in Asia/Karachi (PKT) — backward compatible
2. If parameter: validate and show time in requested timezone
3. Handle errors gracefully with helpful messages

## Supported Timezone Formats

### IANA Timezone Names (Recommended)
- `Asia/Karachi` — Pakistan Standard Time (UTC+5)
- `Asia/Taipei` — Taiwan Standard Time (UTC+8)
- `Asia/Hong_Kong` — Hong Kong Standard Time (UTC+8)
- `America/New_York` — Eastern Time (UTC-5 or -4)
- `Europe/London` — Greenwich Mean Time (UTC+0 or +1)
- `Australia/Sydney` — Australian Eastern Time (UTC+10 or +11)
- `UTC` — Coordinated Universal Time

### Timezone Abbreviations
When user provides abbreviation, convert to IANA name:
- `PKT` → `Asia/Karachi`
- `CST` → `Asia/Taipei`
- `HKT` → `Asia/Hong_Kong`
- `EST` / `EDT` → `America/New_York`
- `GMT` / `BST` → `Europe/London`
- `AEDT` / `AEST` → `Australia/Sydney`

### UTC Offset Format
- `UTC+5` or `UTC-5` (converted to appropriate timezone)

## Usage Examples

```bash
/time-skill                # Show PKT (default)
/time-skill Asia/Taipei    # Show Taiwan time
/time-skill CST            # Same as above (abbreviation)
/time-skill America/New_York  # Show New York time
/time-skill UTC+8          # UTC+8 timezone
```

## Implementation Details

### Timezone Mapping
Map user input to valid IANA timezone:
```
Abbreviations → IANA Names
  PKT → Asia/Karachi
  CST → Asia/Taipei
  HKT → Asia/Hong_Kong
  EST / EDT → America/New_York
  GMT / BST → Europe/London
  AEDT / AEST → Australia/Sydney
```

### Validation Logic
1. Check if input matches known abbreviation → convert to IANA
2. Check if input is valid IANA timezone → use directly
3. Check if input matches UTC offset pattern → convert to closest timezone
4. If all fail → show error with suggestions

### Output Format

```
Current Time in [TIMEZONE]:
YYYY-MM-DD HH:MM:SS TZ
```

Example:
```
Current Time in Asia/Taipei:
2026-08-17 15:30:45 CST
```

## Requirements

- Support optional timezone parameter (default: Asia/Karachi)
- Use 24-hour format
- Include timezone abbreviation in output
- Validate timezone before use
- Show clear error messages for invalid input
- Maintain backward compatibility (no parameter = PKT)
- Keep the output concise

## Backward Compatibility

✅ Existing usage still works:
```bash
/time-skill  # Still shows PKT, as before
```

## Implementation Checklist

- [x] Accept optional timezone parameter
- [x] Default to Asia/Karachi if no parameter
- [x] Validate timezone (IANA, abbreviation, or UTC offset)
- [x] Display time in requested timezone
- [x] Show clear error messages for invalid input
- [x] Maintain 24-hour format
- [x] Include timezone abbreviation in output
