# n8n-MCP Tools Complete Reference

## Contents
- Core Tools (7 tools) — documentation and search, no API key needed
- Workflow Management (7 tools) — requires N8N_API_URL + N8N_API_KEY
- Execution Management (2 tools) — requires API credentials
- Additional Tools (4 tools) — system, versions, deployment

---

## Core Tools (No API Key Required)

### tools_documentation

Get documentation for any MCP tool.

```
n8n-mcp:tools_documentation(tool_name="search_nodes")
```

Use this first if unsure about a tool's parameters.

### search_nodes

Full-text search across all 1,084 n8n nodes (537 core + 547 community).

```
n8n-mcp:search_nodes(query="Gmail", source="core")
n8n-mcp:search_nodes(query="HTTP Request")
n8n-mcp:search_nodes(query="database", source="community")
```

Parameters:
- `query` (required): Search term
- `source` (optional): `"core"`, `"community"`, or omit for all

### get_node

Retrieve detailed node information with multiple detail levels.

```
n8n-mcp:get_node(nodeType="n8n-nodes-base.gmail", mode="essential")
n8n-mcp:get_node(nodeType="n8n-nodes-base.httpRequest", mode="full")
```

Parameters:
- `nodeType` (required): Full node type name (e.g., `n8n-nodes-base.gmail`)
- `mode` (optional): `"essential"` (default — properties + operations), `"full"` (everything)

### validate_node

Validate a node's configuration against its schema.

```
n8n-mcp:validate_node(nodeType="n8n-nodes-base.gmail", config={...}, profile="strict")
```

Parameters:
- `nodeType` (required): Node type to validate against
- `config` (required): Node configuration object
- `profile` (optional): `"standard"` (default), `"strict"`, `"lenient"`

### validate_workflow

Validate an entire workflow definition.

```
n8n-mcp:validate_workflow(workflow={...})
```

Parameters:
- `workflow` (required): Complete workflow JSON object

### search_templates

Search the n8n template library (2,646+ pre-built configurations).

```
n8n-mcp:search_templates(query="webhook to Slack notification")
n8n-mcp:search_templates(query="CRM automation", category="sales")
```

Parameters:
- `query` (required): Search term
- `category` (optional): Filter by category

### get_template

Get the complete workflow JSON for a template.

```
n8n-mcp:get_template(templateId=1234)
```

Parameters:
- `templateId` (required): Template ID from search results

---

## Workflow Management Tools (API Key Required)

### n8n_create_workflow

Create a new workflow on the connected n8n instance.

```
n8n-mcp:n8n_create_workflow(
  name="Gmail to Slack Notifier",
  nodes=[...],
  connections={...},
  settings={...}
)
```

Parameters:
- `name` (required): Workflow name
- `nodes` (required): Array of node definitions
- `connections` (required): Node connection map
- `settings` (optional): Workflow settings

### n8n_get_workflow

Retrieve a workflow by ID.

```
n8n-mcp:n8n_get_workflow(workflowId="abc123", detail="full")
```

Parameters:
- `workflowId` (required): Workflow ID
- `detail` (optional): `"summary"`, `"full"` (default)

### n8n_update_partial_workflow

Update specific parts of a workflow without replacing the whole thing. Preferred for targeted changes.

```
n8n-mcp:n8n_update_partial_workflow(
  workflowId="abc123",
  active=true
)
n8n-mcp:n8n_update_partial_workflow(
  workflowId="abc123",
  nodes=[...updated nodes...]
)
```

Parameters:
- `workflowId` (required): Workflow ID
- Any workflow field to update (nodes, connections, settings, active, name)

### n8n_update_full_workflow

Replace an entire workflow. Use when making large structural changes.

```
n8n-mcp:n8n_update_full_workflow(workflowId="abc123", workflow={...})
```

Parameters:
- `workflowId` (required): Workflow ID
- `workflow` (required): Complete replacement workflow object

### n8n_delete_workflow

Permanently delete a workflow. **Irreversible** — always confirm with the user first.

```
n8n-mcp:n8n_delete_workflow(workflowId="abc123")
```

### n8n_list_workflows

List workflows with optional filtering.

```
n8n-mcp:n8n_list_workflows()
n8n-mcp:n8n_list_workflows(active=true)
n8n-mcp:n8n_list_workflows(tags=["production"])
```

Parameters:
- `active` (optional): Filter by active status
- `tags` (optional): Filter by tags

### n8n_validate_workflow (by ID)

Validate a workflow already on the n8n instance.

```
n8n-mcp:n8n_validate_workflow(workflowId="abc123")
```

---

## Execution Management Tools (API Key Required)

### n8n_test_workflow

Trigger a workflow execution for testing.

```
n8n-mcp:n8n_test_workflow(workflowId="abc123")
n8n-mcp:n8n_test_workflow(workflowId="abc123", inputData={...})
```

Parameters:
- `workflowId` (required): Workflow to execute
- `inputData` (optional): Test data to pass to the trigger node

### n8n_executions

Unified execution management — list, get details, retry, or delete executions.

```
n8n-mcp:n8n_executions(workflowId="abc123", action="list")
n8n-mcp:n8n_executions(workflowId="abc123", action="list", status="error")
n8n-mcp:n8n_executions(executionId="exec456", action="get")
n8n-mcp:n8n_executions(executionId="exec456", action="retry")
n8n-mcp:n8n_executions(executionId="exec456", action="delete")
```

Parameters:
- `action` (required): `"list"`, `"get"`, `"retry"`, `"delete"`
- `workflowId`: Required for `"list"` action
- `executionId`: Required for `"get"`, `"retry"`, `"delete"` actions
- `status` (optional): Filter for list — `"error"`, `"success"`, `"waiting"`

---

## Additional Tools (API Key Required)

### n8n_autofix_workflow

Automatically detect and fix common workflow errors.

```
n8n-mcp:n8n_autofix_workflow(workflowId="abc123")
```

### n8n_workflow_versions

Manage workflow version history.

```
n8n-mcp:n8n_workflow_versions(workflowId="abc123", action="list")
n8n-mcp:n8n_workflow_versions(workflowId="abc123", action="restore", versionId="v5")
```

### n8n_deploy_template

Deploy a template directly to the n8n instance as a new workflow.

```
n8n-mcp:n8n_deploy_template(templateId=1234)
```

### n8n_health_check

Verify API connectivity to the n8n instance.

```
n8n-mcp:n8n_health_check()
```

Returns: Connection status, n8n version, API key validity.
