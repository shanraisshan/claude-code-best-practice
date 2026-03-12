---
name: n8n-workflow-builder
description: Builds, manages, and debugs n8n automation workflows using the n8n-mcp server. Use when the user asks to "create a workflow", "automate with n8n", "build an n8n flow", "debug a workflow", "connect services in n8n", "manage n8n workflows", "deploy a template", or any task involving n8n workflow automation. Triggers on mentions of n8n, workflow automation, or specific n8n node names.
allowed-tools: mcp__n8n-mcp__*
metadata:
  author: claude-code-best-practice
  version: 1.0.0
  category: workflow-automation
  mcp-server: n8n-mcp
  tags: [n8n, automation, workflows, mcp]
---

# n8n Workflow Builder

## Prerequisites

The `n8n-mcp` MCP server must be configured. Verify with `/mcp` command. If not connected, see [references/setup.md](references/setup.md).

## Core Workflow: Build a New Workflow

### Step 1: Search for the right nodes

```
n8n-mcp:search_nodes("Gmail") → find available nodes
n8n-mcp:get_node("n8n-nodes-base.gmail", mode="essential") → get properties & operations
```

### Step 2: Find a template (recommended)

```
n8n-mcp:search_templates("gmail to slack notification") → find matching templates
n8n-mcp:get_template(templateId) → get complete workflow JSON
```

### Step 3: Create the workflow

```
n8n-mcp:n8n_create_workflow(name, nodes, connections) → create on n8n instance
```

### Step 4: Validate before activating

```
n8n-mcp:n8n_validate_workflow(workflowId) → check for errors
n8n-mcp:n8n_autofix_workflow(workflowId) → auto-fix common issues
```

### Step 5: Test, then activate

```
n8n-mcp:n8n_test_workflow(workflowId) → trigger a test run
n8n-mcp:n8n_executions(workflowId, action="list") → check execution results
n8n-mcp:n8n_update_partial_workflow(workflowId, active=true) → activate
```

## Common Patterns

### Modify an existing workflow

1. `n8n-mcp:n8n_get_workflow(workflowId, detail="full")` — get current state
2. Make changes using `n8n_update_partial_workflow` for targeted edits or `n8n_update_full_workflow` for complete replacement
3. Always validate after changes: `n8n-mcp:n8n_validate_workflow(workflowId)`

### Debug a failed execution

1. `n8n-mcp:n8n_executions(workflowId, action="list", status="error")` — find failures
2. `n8n-mcp:n8n_executions(executionId, action="get")` — get error details
3. Fix the issue in the workflow
4. `n8n-mcp:n8n_executions(executionId, action="retry")` — retry the failed run

### Deploy from template

```
n8n-mcp:search_templates("webhook to database") → find template
n8n-mcp:n8n_deploy_template(templateId) → deploy directly to n8n
```

## Tool Quick Reference

| Tool | Purpose |
|------|---------|
| `search_nodes` | Find n8n nodes by name or capability |
| `get_node` | Get node properties, operations, examples |
| `validate_node` | Validate node configuration |
| `search_templates` | Find workflow templates |
| `get_template` | Get full template JSON |
| `n8n_create_workflow` | Create new workflow |
| `n8n_get_workflow` | Retrieve workflow details |
| `n8n_update_partial_workflow` | Update specific parts |
| `n8n_update_full_workflow` | Replace entire workflow |
| `n8n_validate_workflow` | Validate workflow by ID |
| `n8n_autofix_workflow` | Auto-fix common errors |
| `n8n_test_workflow` | Test/trigger workflow |
| `n8n_executions` | List, get, retry executions |
| `n8n_health_check` | Check n8n API connectivity |

For full tool parameters: [references/tools-reference.md](references/tools-reference.md)
For n8n node patterns: [references/node-patterns.md](references/node-patterns.md)
For setup instructions: [references/setup.md](references/setup.md)

## Troubleshooting

- **MCP not connected**: Run `/mcp` to check status. If `n8n-mcp` is missing, follow [references/setup.md](references/setup.md).
- **API key errors**: Management tools (create, update, delete) require `N8N_API_URL` and `N8N_API_KEY`. Core tools (search, get_node) work without API credentials.
- **Workflow validation fails**: Use `n8n_autofix_workflow` first. If issues persist, check node versions and credential references.
- **Execution errors**: Always check `n8n_executions(action="list", status="error")` before debugging manually. The execution data contains the exact error message and failing node.
- **Node not found**: Use `search_nodes` with partial names. n8n node names follow the pattern `n8n-nodes-base.<name>` for core nodes.
- **Template deployment fails**: Verify the template exists with `get_template` first. Some templates require specific credentials to be configured in n8n before deployment.
