---
name: workflow-orchestration-patterns
description: Design durable workflows with Temporal for distributed systems. Covers workflow vs activity separation, saga patterns, state management, and determinism constraints. Use when building long-running processes, distributed transactions, or microservice orchestration.
---

# Workflow Orchestration Patterns

Master workflow orchestration architecture with Temporal, covering fundamental design decisions, resilience patterns, and best practices for building reliable distributed systems.

## When to Use Workflow Orchestration

### Ideal Use Cases (Source: docs.temporal.io)

- **Multi-step processes** spanning machines/services/databases
- **Distributed transactions** requiring all-or-nothing semantics
- **Long-running workflows** (hours to years) with automatic state persistence
- **Failure recovery** that must resume from last successful step
- **Business processes**: bookings, orders, campaigns, approvals
- **Entity lifecycle management**: inventory tracking, account management, cart workflows
- **Infrastructure automation**: CI/CD pipelines, provisioning, deployments
- **Human-in-the-loop** systems requiring timeouts and escalations

### When NOT to Use

- Simple CRUD operations (use direct API calls)
- Pure data processing pipelines (use Airflow, batch processing)
- Stateless request/response (use standard APIs)
- Real-time streaming (use Kafka, event processors)

## Critical Design Decision: Workflows vs Activities

**The Fundamental Rule** (Source: temporal.io/blog/workflow-engine-principles):
- **Workflows** = Orchestration logic and decision-making
- **Activities** = External interactions (APIs, databases, network calls)

### Workflows (Orchestration)

**Characteristics:**
- Contain business logic and coordination
- **MUST be deterministic** (same inputs → same outputs)
- **Cannot** perform direct external calls
- State automatically preserved across failures
- Can run for years despite infrastructure failures

**Example workflow tasks:**
- Decide which steps to execute
- Handle compensation logic
- Manage timeouts and retries
- Coordinate child workflows

### Activities (External Interactions)

**Characteristics:**
- Handle all external system interactions
- Can be non-deterministic (API calls, DB writes)
- Include built-in timeouts and retry logic
- **Must be idempotent** (calling N times = calling once)
- Short-lived (seconds to minutes typically)

**Example activity tasks:**
- Call payment gateway API
- Write to database
- Send emails or notifications
- Query external services

### Design Decision Framework

```
Does it touch external systems? → Activity
Is it orchestration/decision logic? → Workflow
```

## Core Workflow Patterns

### 1. Saga Pattern with Compensation

**Purpose**: Implement distributed transactions with rollback capability

**Pattern** (Source: temporal.io/blog/compensating-actions-part-of-a-complete-breakfast-with-sagas):

```
For each step:
  1. Register compensation BEFORE executing
  2. Execute the step (via activity)
  3. On failure, run all compensations in reverse order (LIFO)
```

**Example: Payment Workflow**
1. Reserve inventory (compensation: release inventory)
2. Charge payment (compensation: refund payment)
3. Fulfill order (compensation: cancel fulfillment)

**Critical Requirements:**
- Compensations must be idempotent
- Register compensation BEFORE executing step
- Run compensations in reverse order
- Handle partial failures gracefully

### 2. Entity Workflows (Actor Model)

**Purpose**: Long-lived workflow representing single entity instance

**Pattern** (Source: docs.temporal.io/evaluate/use-cases-design-patterns):
- One workflow execution = one entity (cart, account, inventory item)
- Workflow persists for entity lifetime
- Receives signals for state changes
- Supports queries for current state

**Example Use Cases:**
- Shopping cart (add items, checkout, expiration)
- Bank account (deposits, withdrawals, balance checks)
- Product inventory (stock updates, reservations)

**Benefits:**
- Encapsulates entity behavior
- Guarantees consistency per entity
- Natural event sourcing

### 3. Fan-Out/Fan-In (Parallel Execution)

**Purpose**: Execute multiple tasks in parallel, aggregate results

**Pattern:**
- Spawn child workflows or parallel activities
- Wait for all to complete
- Aggregate results
- Handle partial failures

**Scaling Rule** (Source: temporal.io/blog/workflow-engine-principles):
- Don't scale individual workflows
- For 1M tasks: spawn 1K child workflows × 1K tasks each
- Keep each workflow bounded

### 4. Async Callback Pattern

**Purpose**: Wait for external event or human approval

**Pattern:**
- Workflow sends request and waits for signal
- External system processes asynchronously
- Sends signal to resume workflow
- Workflow continues with response

**Use Cases:**
- Human approval workflows
- Webhook callbacks
- Long-running external processes

## State Management and Determinism

### Automatic State Preservation

**How Temporal Works** (Source: docs.temporal.io/workflows):
- Complete program state preserved automatically
- Event History records every command and event
- Seamless recovery from crashes
- Applications restore pre-failure state

### Determinism Constraints

**Workflows Execute as State Machines**:
- Replay behavior must be consistent
- Same inputs → identical outputs every time

**Prohibited in Workflows** (Source: docs.temporal.io/workflows):
- ❌ Threading, locks, synchronization primitives
- ❌ Random number generation (`random()`)
- ❌ Global state or static variables
- ❌ System time (`datetime.now()`)
- ❌ Direct file I/O or network calls
- ❌ Non-deterministic libraries

**Allowed in Workflows**:
- ✅ `workflow.now()` (deterministic time)
- ✅ `workflow.random()` (deterministic random)
- ✅ Pure functions and calculations
- ✅ Calling activities (non-deterministic operations)

### Versioning Strategies

**Challenge**: Changing workflow code while old executions still running

**Solutions**:
1. **Versioning API**: Use `workflow.get_version()` for safe changes
2. **New Workflow Type**: Create new workflow, route new executions to it
3. **Backward Compatibility**: Ensure old events replay correctly

## Resilience and Error Handling

### Retry Policies

**Default Behavior**: Temporal retries activities forever

**Configure Retry**:
- Initial retry interval
- Backoff coefficient (exponential backoff)
- Maximum interval (cap retry delay)
- Maximum attempts (eventually fail)

**Non-Retryable Errors**:
- Invalid input (validation failures)
- Business rule violations
- Permanent failures (resource not found)

### Idempotency Requirements

**Why Critical** (Source: docs.temporal.io/activities):
- Activities may execute multiple times
- Network failures trigger retries
- Duplicate execution must be safe

**Implementation Strategies**:
- Idempotency keys (deduplication)
- Check-then-act with unique constraints
- Upsert operations instead of insert
- Track processed request IDs

### Activity Heartbeats

**Purpose**: Detect stalled long-running activities

**Pattern**:
- Activity sends periodic heartbeat
- Includes progress information
- Timeout if no heartbeat received
- Enables progress-based retry

## Best Practices

### Workflow Design

1. **Keep workflows focused** - Single responsibility per workflow
2. **Small workflows** - Use child workflows for scalability
3. **Clear boundaries** - Workflow orchestrates, activities execute
4. **Test locally** - Use time-skipping test environment

### Activity Design

1. **Idempotent operations** - Safe to retry
2. **Short-lived** - Seconds to minutes, not hours
3. **Timeout configuration** - Always set timeouts
4. **Heartbeat for long tasks** - Report progress
5. **Error handling** - Distinguish retryable vs non-retryable

### Common Pitfalls

**Workflow Violations**:
- Using `datetime.now()` instead of `workflow.now()`
- Threading or async operations in workflow code
- Calling external APIs directly from workflow
- Non-deterministic logic in workflows

**Activity Mistakes**:
- Non-idempotent operations (can't handle retries)
- Missing timeouts (activities run forever)
- No error classification (retry validation errors)
- Ignoring payload limits (2MB per argument)

### Operational Considerations

**Monitoring**:
- Workflow execution duration
- Activity failure rates
- Retry attempts and backoff
- Pending workflow counts

**Scalability**:
- Horizontal scaling with workers
- Task queue partitioning
- Child workflow decomposition
- Activity batching when appropriate

## Additional Resources

**Official Documentation**:
- Temporal Core Concepts: docs.temporal.io/workflows
- Workflow Patterns: docs.temporal.io/evaluate/use-cases-design-patterns
- Best Practices: docs.temporal.io/develop/best-practices
- Saga Pattern: temporal.io/blog/saga-pattern-made-easy

**Key Principles**:
1. Workflows = orchestration, Activities = external calls
2. Determinism is non-negotiable for workflows
3. Idempotency is critical for activities
4. State preservation is automatic
5. Design for failure and recovery
