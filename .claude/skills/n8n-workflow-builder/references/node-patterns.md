# n8n Node Patterns & Best Practices

## Contents
- Node naming conventions
- Common trigger patterns
- Workflow structure best practices
- Credential handling
- Error handling patterns

---

## Node Naming Conventions

n8n nodes follow a consistent naming pattern:

| Type | Pattern | Example |
|------|---------|---------|
| Core nodes | `n8n-nodes-base.<name>` | `n8n-nodes-base.gmail` |
| Community nodes | `n8n-nodes-community.<name>` | varies by package |
| Trigger nodes | `n8n-nodes-base.<name>Trigger` | `n8n-nodes-base.webhookTrigger` |

Always use `search_nodes` to find the exact node type name rather than guessing.

## Common Trigger Patterns

### Webhook Trigger (most common)
```json
{
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "httpMethod": "POST",
    "path": "my-webhook",
    "responseMode": "onReceived"
  }
}
```

### Schedule Trigger (cron-based)
```json
{
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [{ "field": "hours", "hoursInterval": 1 }]
    }
  }
}
```

### Manual Trigger (for testing)
```json
{
  "type": "n8n-nodes-base.manualTrigger"
}
```

## Workflow Structure Best Practices

### Always start with a trigger
Every workflow needs exactly one trigger node as its entry point.

### Use the IF node for branching
```json
{
  "type": "n8n-nodes-base.if",
  "parameters": {
    "conditions": {
      "string": [{ "value1": "={{ $json.status }}", "value2": "active" }]
    }
  }
}
```

### Use Set node to transform data
```json
{
  "type": "n8n-nodes-base.set",
  "parameters": {
    "values": {
      "string": [{ "name": "outputField", "value": "={{ $json.inputField }}" }]
    }
  }
}
```

### Chain error handling with Error Trigger
Add an Error Trigger workflow to catch failures from production workflows. Connect it to a notification node (Slack, email) for alerting.

## Credential Handling

- **Never hardcode credentials** in workflow JSON — always reference credential IDs
- Use `get_node` with `mode="essential"` to see which credential types a node requires
- Credentials must be created in the n8n UI or API before being referenced in workflows
- Credential IDs are instance-specific — workflows exported from one instance need credential remapping on import

## Error Handling Patterns

### Retry on failure
Most nodes support retry configuration:
```json
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 1000
}
```

### Continue on fail
For non-critical nodes, enable continue-on-fail to prevent the entire workflow from stopping:
```json
{
  "continueOnFail": true
}
```

### Error workflow
Set a dedicated error-handling workflow in workflow settings:
```json
{
  "settings": {
    "errorWorkflow": "error-handler-workflow-id"
  }
}
```

## Expression Syntax

n8n uses a specific expression syntax for dynamic values:

| Pattern | Example | Description |
|---------|---------|-------------|
| `{{ $json.field }}` | `{{ $json.email }}` | Access current item field |
| `{{ $node["Name"].json.field }}` | `{{ $node["HTTP"].json.status }}` | Access another node's output |
| `{{ $env.VAR }}` | `{{ $env.API_KEY }}` | Access environment variable |
| `{{ $now }}` | `{{ $now.toISO() }}` | Current timestamp |
| `{{ $input.all() }}` | — | All input items |

Always wrap expressions in `={{ }}` (with equals prefix) when used in node parameters.
