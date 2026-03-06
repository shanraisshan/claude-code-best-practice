# Optimizely

A/B testing and experimentation platform with a REST API for managing projects, experiments, campaigns, and results.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Projects, Experiments, Campaigns, Audiences, Results |
| MCP | - | Not available |
| CLI | ✓ | [optimizely.js](../clis/optimizely.js) |
| SDK | ✓ | JavaScript, Python, Ruby, Java, Go, C#, PHP, React, Swift, Android |

## Authentication

- **Type**: Bearer Token (Personal Access Token or OAuth 2.0)
- **Header**: `Authorization: Bearer {personal_token}`
- **Get token**: https://app.optimizely.com/v2/profile/api > Generate New Token

## Common Agent Operations

### List Projects

```bash
GET https://api.optimizely.com/v2/projects
```

### Get Project

```bash
GET https://api.optimizely.com/v2/projects/{project_id}
```

### List Experiments

```bash
GET https://api.optimizely.com/v2/experiments?project_id={project_id}
```

### Get Experiment

```bash
GET https://api.optimizely.com/v2/experiments/{experiment_id}
```

### Get Experiment Results

```bash
GET https://api.optimizely.com/v2/experiments/{experiment_id}/results
```

### Create Experiment

```bash
POST https://api.optimizely.com/v2/experiments

{
  "project_id": 12345,
  "name": "Homepage CTA Test",
  "type": "a/b",
  "variations": [
    { "name": "Control", "weight": 5000 },
    { "name": "Variation 1", "weight": 5000 }
  ],
  "metrics": [{ "event_id": 67890 }],
  "status": "not_started"
}
```

### Update Experiment

```bash
PATCH https://api.optimizely.com/v2/experiments/{experiment_id}

{
  "status": "running"
}
```

### List Campaigns

```bash
GET https://api.optimizely.com/v2/campaigns?project_id={project_id}
```

### Get Campaign Results

```bash
GET https://api.optimizely.com/v2/campaigns/{campaign_id}/results
```

### List Audiences

```bash
GET https://api.optimizely.com/v2/audiences?project_id={project_id}
```

### List Events

```bash
GET https://api.optimizely.com/v2/events?project_id={project_id}
```

### List Pages

```bash
GET https://api.optimizely.com/v2/pages?project_id={project_id}
```

## Key Metrics

### Experiment Results
- `variation_id` - Variation identifier
- `variation_name` - Variation display name
- `visitors` - Unique visitors per variation
- `conversions` - Conversion count
- `conversion_rate` - Rate as decimal
- `improvement` - Percentage improvement vs. control
- `statistical_significance` - Confidence level
- `is_baseline` - Whether this is the control

### Experiment Properties
- `name` - Experiment name
- `status` - not_started, running, paused, archived
- `type` - a/b, multivariate, personalization
- `traffic_allocation` - Percentage of traffic (0-10000 = 0-100%)
- `variations` - Array of variations with weights

## Parameters

### List Experiments
- `project_id` (required) - Project to list experiments for
- `page` - Page number
- `per_page` - Results per page (default: 25)
- `status` - Filter by status

### Get Results
- `start_time` - Results start time (ISO 8601)
- `end_time` - Results end time (ISO 8601)

### Create Experiment
- `project_id` (required) - Parent project
- `name` (required) - Experiment name
- `type` - Experiment type (default: a/b)
- `variations` (required) - Array of variations with name and weight
- `metrics` - Array of metric/event configurations
- `audience_conditions` - Targeting conditions
- `traffic_allocation` - Traffic percentage (0-10000)

## When to Use

- Running A/B tests on web pages and features
- Managing experimentation programs at scale
- Pulling experiment results for analysis
- Automating experiment creation and monitoring
- Feature flag management
- Personalization campaigns

## Rate Limits

- 50 requests/second per personal token
- Pagination via `page` and `per_page` parameters
- OpenAPI spec available at https://api.optimizely.com/v2/swagger.json

## Relevant Skills

- ab-test-setup
- page-cro
- landing-page
- personalization
- analytics-tracking
