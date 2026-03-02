# Verification Checklist — README CONCEPTS Section

Rules for verifying CONCEPTS table accuracy. Each rule is checked during every workflow run.

## Rules

### 1. External URL Liveness
- **Category**: URL Accuracy
- **What to check**: Every external URL in the CONCEPTS table (docs links) returns a valid page
- **Depth**: Fetch each URL and confirm it loads the expected page (not a redirect to wrong page)
- **Source to compare against**: `https://code.claude.com/docs/llms.txt` for canonical URL list
- **Date added**: 2026-03-02
- **Origin**: Permissions URL `/iam` was found to redirect to Authentication page instead of Permissions

### 2. Anchor Fragment Validity
- **Category**: URL Accuracy
- **What to check**: Any URL with an anchor fragment (`#section-name`) matches an actual heading on the target page
- **Depth**: Fetch the page and verify the heading exists with the expected anchor
- **Source to compare against**: Fetched page content
- **Date added**: 2026-03-02
- **Origin**: Rules anchor `#modular-rules-with-clauderules` was stale; section renamed to `#organize-rules-with-clauderules`

### 3. Missing Docs Pages
- **Category**: Missing Concepts
- **What to check**: Every page in the official docs index (`llms.txt`) that represents a user-facing feature has a corresponding row in the CONCEPTS table
- **Depth**: Compare full docs index against CONCEPTS table entries
- **Source to compare against**: `https://code.claude.com/docs/llms.txt`
- **Date added**: 2026-03-02
- **Origin**: Multiple missing concepts found (Agent Teams, Keybindings, Model Configuration, etc.)

### 4. Local Badge Link Validity
- **Category**: Badge Accuracy
- **What to check**: Every badge target path in the CONCEPTS table (`best-practice/*.md`, `implementation/*.md`, `.claude/*/`) points to a file or directory that exists
- **Depth**: Use Read/Glob to verify file existence
- **Source to compare against**: Local filesystem
- **Date added**: 2026-03-02
- **Origin**: Initial checklist creation

### 5. Description Currency
- **Category**: Description Accuracy
- **What to check**: Each concept's description accurately reflects the current official docs description
- **Depth**: Compare README description against the official page's meta description or first paragraph
- **Source to compare against**: Official docs page content
- **Date added**: 2026-03-02
- **Origin**: Memory description missing auto memory; MCP Servers location missing `.mcp.json`
