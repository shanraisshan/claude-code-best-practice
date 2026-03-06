---
name: python-error-handling
description: Python error handling patterns including input validation, exception hierarchies, and partial failure handling. Use when implementing validation logic, designing exception strategies, handling batch processing failures, or building robust APIs.
---

# Python Error Handling

Build robust Python applications with proper input validation, meaningful exceptions, and graceful failure handling. Good error handling makes debugging easier and systems more reliable.

## When to Use This Skill

- Validating user input and API parameters
- Designing exception hierarchies for applications
- Handling partial failures in batch operations
- Converting external data to domain types
- Building user-friendly error messages
- Implementing fail-fast validation patterns

## Core Concepts

### 1. Fail Fast

Validate inputs early, before expensive operations. Report all validation errors at once when possible.

### 2. Meaningful Exceptions

Use appropriate exception types with context. Messages should explain what failed, why, and how to fix it.

### 3. Partial Failures

In batch operations, don't let one failure abort everything. Track successes and failures separately.

### 4. Preserve Context

Chain exceptions to maintain the full error trail for debugging.

## Quick Start

```python
def fetch_page(url: str, page_size: int) -> Page:
    if not url:
        raise ValueError("'url' is required")
    if not 1 <= page_size <= 100:
        raise ValueError(f"'page_size' must be 1-100, got {page_size}")
    # Now safe to proceed...
```

## Fundamental Patterns

### Pattern 1: Early Input Validation

Validate all inputs at API boundaries before any processing begins.

```python
def process_order(
    order_id: str,
    quantity: int,
    discount_percent: float,
) -> OrderResult:
    """Process an order with validation."""
    # Validate required fields
    if not order_id:
        raise ValueError("'order_id' is required")

    # Validate ranges
    if quantity <= 0:
        raise ValueError(f"'quantity' must be positive, got {quantity}")

    if not 0 <= discount_percent <= 100:
        raise ValueError(
            f"'discount_percent' must be 0-100, got {discount_percent}"
        )

    # Validation passed, proceed with processing
    return _process_validated_order(order_id, quantity, discount_percent)
```

### Pattern 2: Convert to Domain Types Early

Parse strings and external data into typed domain objects at system boundaries.

```python
from enum import Enum

class OutputFormat(Enum):
    JSON = "json"
    CSV = "csv"
    PARQUET = "parquet"

def parse_output_format(value: str) -> OutputFormat:
    """Parse string to OutputFormat enum.

    Args:
        value: Format string from user input.

    Returns:
        Validated OutputFormat enum member.

    Raises:
        ValueError: If format is not recognized.
    """
    try:
        return OutputFormat(value.lower())
    except ValueError:
        valid_formats = [f.value for f in OutputFormat]
        raise ValueError(
            f"Invalid format '{value}'. "
            f"Valid options: {', '.join(valid_formats)}"
        )

# Usage at API boundary
def export_data(data: list[dict], format_str: str) -> bytes:
    output_format = parse_output_format(format_str)  # Fail fast
    # Rest of function uses typed OutputFormat
    ...
```

### Pattern 3: Pydantic for Complex Validation

Use Pydantic models for structured input validation with automatic error messages.

```python
from pydantic import BaseModel, Field, field_validator

class CreateUserInput(BaseModel):
    """Input model for user creation."""

    email: str = Field(..., min_length=5, max_length=255)
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(ge=0, le=150)

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email format")
        return v.lower()

    @field_validator("name")
    @classmethod
    def normalize_name(cls, v: str) -> str:
        return v.strip().title()

# Usage
try:
    user_input = CreateUserInput(
        email="user@example.com",
        name="john doe",
        age=25,
    )
except ValidationError as e:
    # Pydantic provides detailed error information
    print(e.errors())
```

### Pattern 4: Map Errors to Standard Exceptions

Use Python's built-in exception types appropriately, adding context as needed.

| Failure Type | Exception | Example |
|--------------|-----------|---------|
| Invalid input | `ValueError` | Bad parameter values |
| Wrong type | `TypeError` | Expected string, got int |
| Missing item | `KeyError` | Dict key not found |
| Operational failure | `RuntimeError` | Service unavailable |
| Timeout | `TimeoutError` | Operation took too long |
| File not found | `FileNotFoundError` | Path doesn't exist |
| Permission denied | `PermissionError` | Access forbidden |

```python
# Good: Specific exception with context
raise ValueError(f"'page_size' must be 1-100, got {page_size}")

# Avoid: Generic exception, no context
raise Exception("Invalid parameter")
```

## Advanced Patterns

### Pattern 5: Custom Exceptions with Context

Create domain-specific exceptions that carry structured information.

```python
class ApiError(Exception):
    """Base exception for API errors."""

    def __init__(
        self,
        message: str,
        status_code: int,
        response_body: str | None = None,
    ) -> None:
        self.status_code = status_code
        self.response_body = response_body
        super().__init__(message)

class RateLimitError(ApiError):
    """Raised when rate limit is exceeded."""

    def __init__(self, retry_after: int) -> None:
        self.retry_after = retry_after
        super().__init__(
            f"Rate limit exceeded. Retry after {retry_after}s",
            status_code=429,
        )

# Usage
def handle_response(response: Response) -> dict:
    match response.status_code:
        case 200:
            return response.json()
        case 401:
            raise ApiError("Invalid credentials", 401)
        case 404:
            raise ApiError(f"Resource not found: {response.url}", 404)
        case 429:
            retry_after = int(response.headers.get("Retry-After", 60))
            raise RateLimitError(retry_after)
        case code if 400 <= code < 500:
            raise ApiError(f"Client error: {response.text}", code)
        case code if code >= 500:
            raise ApiError(f"Server error: {response.text}", code)
```

### Pattern 6: Exception Chaining

Preserve the original exception when re-raising to maintain the debug trail.

```python
import httpx

class ServiceError(Exception):
    """High-level service operation failed."""
    pass

def upload_file(path: str) -> str:
    """Upload file and return URL."""
    try:
        with open(path, "rb") as f:
            response = httpx.post("https://upload.example.com", files={"file": f})
            response.raise_for_status()
            return response.json()["url"]
    except FileNotFoundError as e:
        raise ServiceError(f"Upload failed: file not found at '{path}'") from e
    except httpx.HTTPStatusError as e:
        raise ServiceError(
            f"Upload failed: server returned {e.response.status_code}"
        ) from e
    except httpx.RequestError as e:
        raise ServiceError(f"Upload failed: network error") from e
```

### Pattern 7: Batch Processing with Partial Failures

Never let one bad item abort an entire batch. Track results per item.

```python
from dataclasses import dataclass

@dataclass
class BatchResult[T]:
    """Results from batch processing."""

    succeeded: dict[int, T]  # index -> result
    failed: dict[int, Exception]  # index -> error

    @property
    def success_count(self) -> int:
        return len(self.succeeded)

    @property
    def failure_count(self) -> int:
        return len(self.failed)

    @property
    def all_succeeded(self) -> bool:
        return len(self.failed) == 0

def process_batch(items: list[Item]) -> BatchResult[ProcessedItem]:
    """Process items, capturing individual failures.

    Args:
        items: Items to process.

    Returns:
        BatchResult with succeeded and failed items by index.
    """
    succeeded: dict[int, ProcessedItem] = {}
    failed: dict[int, Exception] = {}

    for idx, item in enumerate(items):
        try:
            result = process_single_item(item)
            succeeded[idx] = result
        except Exception as e:
            failed[idx] = e

    return BatchResult(succeeded=succeeded, failed=failed)

# Caller handles partial results
result = process_batch(items)
if not result.all_succeeded:
    logger.warning(
        f"Batch completed with {result.failure_count} failures",
        failed_indices=list(result.failed.keys()),
    )
```

### Pattern 8: Progress Reporting for Long Operations

Provide visibility into batch progress without coupling business logic to UI.

```python
from collections.abc import Callable

ProgressCallback = Callable[[int, int, str], None]  # current, total, status

def process_large_batch(
    items: list[Item],
    on_progress: ProgressCallback | None = None,
) -> BatchResult:
    """Process batch with optional progress reporting.

    Args:
        items: Items to process.
        on_progress: Optional callback receiving (current, total, status).
    """
    total = len(items)
    succeeded = {}
    failed = {}

    for idx, item in enumerate(items):
        if on_progress:
            on_progress(idx, total, f"Processing {item.id}")

        try:
            succeeded[idx] = process_single_item(item)
        except Exception as e:
            failed[idx] = e

    if on_progress:
        on_progress(total, total, "Complete")

    return BatchResult(succeeded=succeeded, failed=failed)
```

## Best Practices Summary

1. **Validate early** - Check inputs before expensive operations
2. **Use specific exceptions** - `ValueError`, `TypeError`, not generic `Exception`
3. **Include context** - Messages should explain what, why, and how to fix
4. **Convert types at boundaries** - Parse strings to enums/domain types early
5. **Chain exceptions** - Use `raise ... from e` to preserve debug info
6. **Handle partial failures** - Don't abort batches on single item errors
7. **Use Pydantic** - For complex input validation with structured errors
8. **Document failure modes** - Docstrings should list possible exceptions
9. **Log with context** - Include IDs, counts, and other debugging info
10. **Test error paths** - Verify exceptions are raised correctly
