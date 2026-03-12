---
name: time-skill
description: Display the current time in Pakistan Standard Time (PKT, UTC+5). Use when the user asks for the current time, Pakistan time, or PKT.
user-invocable: true
---

# Time Skill

This skill displays the current date and time in Pakistan Standard Time (PKT).

## Task

Display the current date and time in Pakistan Standard Time (UTC+5).

## Instructions

1. **Get Current Time**: Run the following bash command:
   ```
   TZ='Asia/Karachi' date '+%Y-%m-%d %H:%M:%S %Z'
   ```

2. **Display Result**: Show the time in this format:
   ```
   Current Time in Pakistan (PKT): YYYY-MM-DD HH:MM:SS PKT
   ```

## Requirements

- Always use the `Asia/Karachi` timezone (UTC+5)
- Use 24-hour format
- Include the date alongside the time
- Keep the output concise — no extra commentary
