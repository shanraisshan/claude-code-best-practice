# AirOps

AI content platform for crafting content that wins AI search. Build and execute AI workflows (flows) for SEO content generation, data enrichment, and automation.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Flows, Workflows, Runs |
| MCP | - | Not available |
| CLI | ✓ | [airops.js](../clis/airops.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key + Workspace ID
- **Header**: `Authorization: Bearer {api_key}`
- **Env vars**: `AIROPS_API_KEY`, `AIROPS_WORKSPACE_ID`
- **Get key**: Settings > API Keys at https://app.airops.com

## Common Agent Operations

### List Flows

```bash
GET https://api.airops.com/public_api/v1/workspaces/{workspace_id}/flows
```

### Get Flow Details

```bash
GET https://api.airops.com/public_api/v1/workspaces/{workspace_id}/flows/{flow_id}
```

### Execute a Flow

```bash
POST https://api.airops.com/public_api/v1/workspaces/{workspace_id}/flows/{flow_id}/execute

{
  "inputs": {
    "keyword": "best project management tools",
    "target_audience": "startup founders"
  }
}
```

### List Runs for a Flow

```bash
GET https://api.airops.com/public_api/v1/workspaces/{workspace_id}/flows/{flow_id}/runs
```

### Get Run Status

```bash
GET https://api.airops.com/public_api/v1/workspaces/{workspace_id}/runs/{run_id}
```

### List Workflows

```bash
GET https://api.airops.com/public_api/v1/workspaces/{workspace_id}/workflows
```

### Execute a Workflow

```bash
POST https://api.airops.com/public_api/v1/workspaces/{workspace_id}/workflows/{workflow_id}/execute

{
  "inputs": {
    "topic": "email marketing best practices",
    "content_type": "blog_post"
  }
}
```

## Key Metrics

### Flow Data
- `id` - Flow identifier
- `name` - Flow name
- `description` - Flow description
- `status` - Active/inactive status
- `created_at` - Creation timestamp
- `updated_at` - Last modified timestamp

### Run Data
- `id` - Run identifier
- `flow_id` - Parent flow ID
- `status` - pending, running, completed, failed
- `inputs` - Input parameters used
- `outputs` - Generated results
- `started_at` - Run start time
- `completed_at` - Run completion time

## Parameters

### Flow Execution
- `inputs` - JSON object of key-value pairs matching the flow's expected inputs
- Input keys vary per flow (e.g., `keyword`, `topic`, `url`, `target_audience`)

### Workflow Execution
- `inputs` - JSON object of key-value pairs matching the workflow's expected inputs

## When to Use

- Bulk content generation for SEO at scale
- SEO-optimized article creation with AI workflows
- Data enrichment pipelines for marketing lists
- Keyword research automation
- Content optimization and rewriting
- Programmatic SEO page generation
- AI-powered content briefs and outlines

## Rate Limits

- Rate limits vary by plan
- Concurrent execution limits depend on workspace tier
- Check AirOps dashboard for current usage and limits

## Relevant Skills

- ai-seo
- content-strategy
- programmatic-seo
- copywriting
