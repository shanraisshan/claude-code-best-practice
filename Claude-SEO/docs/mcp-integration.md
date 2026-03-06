# MCP Integration

## Available Integrations

### Official SEO MCP Servers (2025-2026)

| Tool | Package / Endpoint | Type | Notes |
|------|-------------------|------|-------|
| Ahrefs | @ahrefs/mcp | Official | Launched July 2025. Backlinks, keywords, site audit. |
| Semrush | https://mcp.semrush.com/v1/mcp | Official (remote) | Full API access. Domain analytics, keyword research. |
| Google Search Console | mcp-server-gsc | Community | By ahonn. Search performance, URL inspection. |
| PageSpeed Insights | mcp-server-pagespeed | Community | By enemyrr. Lighthouse audits, CWV metrics. |
| DataForSEO | dataforseo-mcp-server | Community | SERP data, keyword data, backlinks. |
| kwrds.ai | kwrds MCP server | Community | Keyword research, search volume. |

### Google Search Console

```json
{
  "mcpServers": {
    "google-search-console": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}
```

### PageSpeed Insights MCP Server

```json
{
  "mcpServers": {
    "pagespeed": {
      "command": "npx",
      "args": ["-y", "mcp-server-pagespeed"],
      "env": {
        "PAGESPEED_API_KEY": "your-api-key"
      }
    }
  }
}
```

### PageSpeed Insights API (direct)

```bash
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=URL&key=YOUR_API_KEY&strategy=mobile&category=performance&category=seo"
```

### CrUX API (field data)

```bash
curl -X POST "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "formFactor": "PHONE"}'
```

## Without API Keys

Claude SEO can still:
- Analyze HTML source for potential issues
- Identify common performance problems
- Check for render-blocking resources
- Evaluate image optimization opportunities
- Detect JavaScript-heavy implementations

## Best Practices

- **Rate Limiting**: Respect API quotas (typically 25k requests/day for PageSpeed)
- **Caching**: Cache results to avoid redundant API calls
- **Field vs Lab**: Prioritize field data (CrUX) for ranking signals
