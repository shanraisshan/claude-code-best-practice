---
name: python-background-jobs
description: Python background job patterns including task queues, workers, and event-driven architecture. Use when implementing async task processing, job queues, long-running operations, or decoupling work from request/response cycles.
---

# Python Background Jobs & Task Queues

Decouple long-running or unreliable work from request/response cycles. Return immediately to the user while background workers handle the heavy lifting asynchronously.

## When to Use This Skill

- Processing tasks that take longer than a few seconds
- Sending emails, notifications, or webhooks
- Generating reports or exporting data
- Processing uploads or media transformations
- Integrating with unreliable external services
- Building event-driven architectures

## Core Concepts

### 1. Task Queue Pattern

API accepts request, enqueues a job, returns immediately with a job ID. Workers process jobs asynchronously.

### 2. Idempotency

Tasks may be retried on failure. Design for safe re-execution.

### 3. Job State Machine

Jobs transition through states: pending → running → succeeded/failed.

### 4. At-Least-Once Delivery

Most queues guarantee at-least-once delivery. Your code must handle duplicates.

## Quick Start

This skill uses Celery for examples, a widely adopted task queue. Alternatives like RQ, Dramatiq, and cloud-native solutions (AWS SQS, GCP Tasks) are equally valid choices.

```python
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379")

@app.task
def send_email(to: str, subject: str, body: str) -> None:
    # This runs in a background worker
    email_client.send(to, subject, body)

# In your API handler
send_email.delay("user@example.com", "Welcome!", "Thanks for signing up")
```

## Fundamental Patterns

### Pattern 1: Return Job ID Immediately

For operations exceeding a few seconds, return a job ID and process asynchronously.

```python
from uuid import uuid4
from dataclasses import dataclass
from enum import Enum
from datetime import datetime

class JobStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCEEDED = "succeeded"
    FAILED = "failed"

@dataclass
class Job:
    id: str
    status: JobStatus
    created_at: datetime
    started_at: datetime | None = None
    completed_at: datetime | None = None
    result: dict | None = None
    error: str | None = None

# API endpoint
async def start_export(request: ExportRequest) -> JobResponse:
    """Start export job and return job ID."""
    job_id = str(uuid4())

    # Persist job record
    await jobs_repo.create(Job(
        id=job_id,
        status=JobStatus.PENDING,
        created_at=datetime.utcnow(),
    ))

    # Enqueue task for background processing
    await task_queue.enqueue(
        "export_data",
        job_id=job_id,
        params=request.model_dump(),
    )

    # Return immediately with job ID
    return JobResponse(
        job_id=job_id,
        status="pending",
        poll_url=f"/jobs/{job_id}",
    )
```

### Pattern 2: Celery Task Configuration

Configure Celery tasks with proper retry and timeout settings.

```python
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379")

# Global configuration
app.conf.update(
    task_time_limit=3600,          # Hard limit: 1 hour
    task_soft_time_limit=3000,      # Soft limit: 50 minutes
    task_acks_late=True,            # Acknowledge after completion
    task_reject_on_worker_lost=True,
    worker_prefetch_multiplier=1,   # Don't prefetch too many tasks
)

@app.task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
    autoretry_for=(ConnectionError, TimeoutError),
)
def process_payment(self, payment_id: str) -> dict:
    """Process payment with automatic retry on transient errors."""
    try:
        result = payment_gateway.charge(payment_id)
        return {"status": "success", "transaction_id": result.id}
    except PaymentDeclinedError as e:
        # Don't retry permanent failures
        return {"status": "declined", "reason": str(e)}
    except TransientError as e:
        # Retry with exponential backoff
        raise self.retry(exc=e, countdown=2 ** self.request.retries * 60)
```

### Pattern 3: Make Tasks Idempotent

Workers may retry on crash or timeout. Design for safe re-execution.

```python
@app.task(bind=True)
def process_order(self, order_id: str) -> None:
    """Process order idempotently."""
    order = orders_repo.get(order_id)

    # Already processed? Return early
    if order.status == OrderStatus.COMPLETED:
        logger.info("Order already processed", order_id=order_id)
        return

    # Already in progress? Check if we should continue
    if order.status == OrderStatus.PROCESSING:
        # Use idempotency key to avoid double-charging
        pass

    # Process with idempotency key
    result = payment_provider.charge(
        amount=order.total,
        idempotency_key=f"order-{order_id}",  # Critical!
    )

    orders_repo.update(order_id, status=OrderStatus.COMPLETED)
```

**Idempotency Strategies:**

1. **Check-before-write**: Verify state before action
2. **Idempotency keys**: Use unique tokens with external services
3. **Upsert patterns**: `INSERT ... ON CONFLICT UPDATE`
4. **Deduplication window**: Track processed IDs for N hours

### Pattern 4: Job State Management

Persist job state transitions for visibility and debugging.

```python
class JobRepository:
    """Repository for managing job state."""

    async def create(self, job: Job) -> Job:
        """Create new job record."""
        await self._db.execute(
            """INSERT INTO jobs (id, status, created_at)
               VALUES ($1, $2, $3)""",
            job.id, job.status.value, job.created_at,
        )
        return job

    async def update_status(
        self,
        job_id: str,
        status: JobStatus,
        **fields,
    ) -> None:
        """Update job status with timestamp."""
        updates = {"status": status.value, **fields}

        if status == JobStatus.RUNNING:
            updates["started_at"] = datetime.utcnow()
        elif status in (JobStatus.SUCCEEDED, JobStatus.FAILED):
            updates["completed_at"] = datetime.utcnow()

        await self._db.execute(
            "UPDATE jobs SET status = $1, ... WHERE id = $2",
            updates, job_id,
        )

        logger.info(
            "Job status updated",
            job_id=job_id,
            status=status.value,
        )
```

## Advanced Patterns

### Pattern 5: Dead Letter Queue

Handle permanently failed tasks for manual inspection.

```python
@app.task(bind=True, max_retries=3)
def process_webhook(self, webhook_id: str, payload: dict) -> None:
    """Process webhook with DLQ for failures."""
    try:
        result = send_webhook(payload)
        if not result.success:
            raise WebhookFailedError(result.error)
    except Exception as e:
        if self.request.retries >= self.max_retries:
            # Move to dead letter queue for manual inspection
            dead_letter_queue.send({
                "task": "process_webhook",
                "webhook_id": webhook_id,
                "payload": payload,
                "error": str(e),
                "attempts": self.request.retries + 1,
                "failed_at": datetime.utcnow().isoformat(),
            })
            logger.error(
                "Webhook moved to DLQ after max retries",
                webhook_id=webhook_id,
                error=str(e),
            )
            return

        # Exponential backoff retry
        raise self.retry(exc=e, countdown=2 ** self.request.retries * 60)
```

### Pattern 6: Status Polling Endpoint

Provide an endpoint for clients to check job status.

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/jobs/{job_id}")
async def get_job_status(job_id: str) -> JobStatusResponse:
    """Get current status of a background job."""
    job = await jobs_repo.get(job_id)

    if job is None:
        raise HTTPException(404, f"Job {job_id} not found")

    return JobStatusResponse(
        job_id=job.id,
        status=job.status.value,
        created_at=job.created_at,
        started_at=job.started_at,
        completed_at=job.completed_at,
        result=job.result if job.status == JobStatus.SUCCEEDED else None,
        error=job.error if job.status == JobStatus.FAILED else None,
        # Helpful for clients
        is_terminal=job.status in (JobStatus.SUCCEEDED, JobStatus.FAILED),
    )
```

### Pattern 7: Task Chaining and Workflows

Compose complex workflows from simple tasks.

```python
from celery import chain, group, chord

# Simple chain: A → B → C
workflow = chain(
    extract_data.s(source_id),
    transform_data.s(),
    load_data.s(destination_id),
)

# Parallel execution: A, B, C all at once
parallel = group(
    send_email.s(user_email),
    send_sms.s(user_phone),
    update_analytics.s(event_data),
)

# Chord: Run tasks in parallel, then a callback
# Process all items, then send completion notification
workflow = chord(
    [process_item.s(item_id) for item_id in item_ids],
    send_completion_notification.s(batch_id),
)

workflow.apply_async()
```

### Pattern 8: Alternative Task Queues

Choose the right tool for your needs.

**RQ (Redis Queue)**: Simple, Redis-based
```python
from rq import Queue
from redis import Redis

queue = Queue(connection=Redis())
job = queue.enqueue(send_email, "user@example.com", "Subject", "Body")
```

**Dramatiq**: Modern Celery alternative
```python
import dramatiq
from dramatiq.brokers.redis import RedisBroker

dramatiq.set_broker(RedisBroker())

@dramatiq.actor
def send_email(to: str, subject: str, body: str) -> None:
    email_client.send(to, subject, body)
```

**Cloud-native options:**
- AWS SQS + Lambda
- Google Cloud Tasks
- Azure Functions

## Best Practices Summary

1. **Return immediately** - Don't block requests for long operations
2. **Persist job state** - Enable status polling and debugging
3. **Make tasks idempotent** - Safe to retry on any failure
4. **Use idempotency keys** - For external service calls
5. **Set timeouts** - Both soft and hard limits
6. **Implement DLQ** - Capture permanently failed tasks
7. **Log transitions** - Track job state changes
8. **Retry appropriately** - Exponential backoff for transient errors
9. **Don't retry permanent failures** - Validation errors, invalid credentials
10. **Monitor queue depth** - Alert on backlog growth
