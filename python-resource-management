---
name: python-resource-management
description: Python resource management with context managers, cleanup patterns, and streaming. Use when managing connections, file handles, implementing cleanup logic, or building streaming responses with accumulated state.
---

# Python Resource Management

Manage resources deterministically using context managers. Resources like database connections, file handles, and network sockets should be released reliably, even when exceptions occur.

## When to Use This Skill

- Managing database connections and connection pools
- Working with file handles and I/O
- Implementing custom context managers
- Building streaming responses with state
- Handling nested resource cleanup
- Creating async context managers

## Core Concepts

### 1. Context Managers

The `with` statement ensures resources are released automatically, even on exceptions.

### 2. Protocol Methods

`__enter__`/`__exit__` for sync, `__aenter__`/`__aexit__` for async resource management.

### 3. Unconditional Cleanup

`__exit__` always runs, regardless of whether an exception occurred.

### 4. Exception Handling

Return `True` from `__exit__` to suppress exceptions, `False` to propagate them.

## Quick Start

```python
from contextlib import contextmanager

@contextmanager
def managed_resource():
    resource = acquire_resource()
    try:
        yield resource
    finally:
        resource.cleanup()

with managed_resource() as r:
    r.do_work()
```

## Fundamental Patterns

### Pattern 1: Class-Based Context Manager

Implement the context manager protocol for complex resources.

```python
class DatabaseConnection:
    """Database connection with automatic cleanup."""

    def __init__(self, dsn: str) -> None:
        self._dsn = dsn
        self._conn: Connection | None = None

    def connect(self) -> None:
        """Establish database connection."""
        self._conn = psycopg.connect(self._dsn)

    def close(self) -> None:
        """Close connection if open."""
        if self._conn is not None:
            self._conn.close()
            self._conn = None

    def __enter__(self) -> "DatabaseConnection":
        """Enter context: connect and return self."""
        self.connect()
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> None:
        """Exit context: always close connection."""
        self.close()

# Usage with context manager (preferred)
with DatabaseConnection(dsn) as db:
    result = db.execute(query)

# Manual management when needed
db = DatabaseConnection(dsn)
db.connect()
try:
    result = db.execute(query)
finally:
    db.close()
```

### Pattern 2: Async Context Manager

For async resources, implement the async protocol.

```python
class AsyncDatabasePool:
    """Async database connection pool."""

    def __init__(self, dsn: str, min_size: int = 1, max_size: int = 10) -> None:
        self._dsn = dsn
        self._min_size = min_size
        self._max_size = max_size
        self._pool: asyncpg.Pool | None = None

    async def __aenter__(self) -> "AsyncDatabasePool":
        """Create connection pool."""
        self._pool = await asyncpg.create_pool(
            self._dsn,
            min_size=self._min_size,
            max_size=self._max_size,
        )
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> None:
        """Close all connections in pool."""
        if self._pool is not None:
            await self._pool.close()

    async def execute(self, query: str, *args) -> list[dict]:
        """Execute query using pooled connection."""
        async with self._pool.acquire() as conn:
            return await conn.fetch(query, *args)

# Usage
async with AsyncDatabasePool(dsn) as pool:
    users = await pool.execute("SELECT * FROM users WHERE active = $1", True)
```

### Pattern 3: Using @contextmanager Decorator

Simplify context managers with the decorator for straightforward cases.

```python
from contextlib import contextmanager, asynccontextmanager
import time
import structlog

logger = structlog.get_logger()

@contextmanager
def timed_block(name: str):
    """Time a block of code."""
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        logger.info(f"{name} completed", duration_seconds=round(elapsed, 3))

# Usage
with timed_block("data_processing"):
    process_large_dataset()

@asynccontextmanager
async def database_transaction(conn: AsyncConnection):
    """Manage database transaction."""
    await conn.execute("BEGIN")
    try:
        yield conn
        await conn.execute("COMMIT")
    except Exception:
        await conn.execute("ROLLBACK")
        raise

# Usage
async with database_transaction(conn) as tx:
    await tx.execute("INSERT INTO users ...")
    await tx.execute("INSERT INTO audit_log ...")
```

### Pattern 4: Unconditional Resource Release

Always clean up resources in `__exit__`, regardless of exceptions.

```python
class FileProcessor:
    """Process file with guaranteed cleanup."""

    def __init__(self, path: str) -> None:
        self._path = path
        self._file: IO | None = None
        self._temp_files: list[Path] = []

    def __enter__(self) -> "FileProcessor":
        self._file = open(self._path, "r")
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> None:
        """Clean up all resources unconditionally."""
        # Close main file
        if self._file is not None:
            self._file.close()

        # Clean up any temporary files
        for temp_file in self._temp_files:
            try:
                temp_file.unlink()
            except OSError:
                pass  # Best effort cleanup

        # Return None/False to propagate any exception
```

## Advanced Patterns

### Pattern 5: Selective Exception Suppression

Only suppress specific, documented exceptions.

```python
class StreamWriter:
    """Writer that handles broken pipe gracefully."""

    def __init__(self, stream) -> None:
        self._stream = stream

    def __enter__(self) -> "StreamWriter":
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> bool:
        """Clean up, suppressing BrokenPipeError on shutdown."""
        self._stream.close()

        # Suppress BrokenPipeError (client disconnected)
        # This is expected behavior, not an error
        if exc_type is BrokenPipeError:
            return True  # Exception suppressed

        return False  # Propagate all other exceptions
```

### Pattern 6: Streaming with Accumulated State

Maintain both incremental chunks and accumulated state during streaming.

```python
from collections.abc import Generator
from dataclasses import dataclass, field

@dataclass
class StreamingResult:
    """Accumulated streaming result."""

    chunks: list[str] = field(default_factory=list)
    _finalized: bool = False

    @property
    def content(self) -> str:
        """Get accumulated content."""
        return "".join(self.chunks)

    def add_chunk(self, chunk: str) -> None:
        """Add chunk to accumulator."""
        if self._finalized:
            raise RuntimeError("Cannot add to finalized result")
        self.chunks.append(chunk)

    def finalize(self) -> str:
        """Mark stream complete and return content."""
        self._finalized = True
        return self.content

def stream_with_accumulation(
    response: StreamingResponse,
) -> Generator[tuple[str, str], None, str]:
    """Stream response while accumulating content.

    Yields:
        Tuple of (accumulated_content, new_chunk) for each chunk.

    Returns:
        Final accumulated content.
    """
    result = StreamingResult()

    for chunk in response.iter_content():
        result.add_chunk(chunk)
        yield result.content, chunk

    return result.finalize()
```

### Pattern 7: Efficient String Accumulation

Avoid O(n²) string concatenation when accumulating.

```python
def accumulate_stream(stream) -> str:
    """Efficiently accumulate stream content."""
    # BAD: O(n²) due to string immutability
    # content = ""
    # for chunk in stream:
    #     content += chunk  # Creates new string each time

    # GOOD: O(n) with list and join
    chunks: list[str] = []
    for chunk in stream:
        chunks.append(chunk)
    return "".join(chunks)  # Single allocation
```

### Pattern 8: Tracking Stream Metrics

Measure time-to-first-byte and total streaming time.

```python
import time
from collections.abc import Generator

def stream_with_metrics(
    response: StreamingResponse,
) -> Generator[str, None, dict]:
    """Stream response while collecting metrics.

    Yields:
        Content chunks.

    Returns:
        Metrics dictionary.
    """
    start = time.perf_counter()
    first_chunk_time: float | None = None
    chunk_count = 0
    total_bytes = 0

    for chunk in response.iter_content():
        if first_chunk_time is None:
            first_chunk_time = time.perf_counter() - start

        chunk_count += 1
        total_bytes += len(chunk.encode())
        yield chunk

    total_time = time.perf_counter() - start

    return {
        "time_to_first_byte_ms": round((first_chunk_time or 0) * 1000, 2),
        "total_time_ms": round(total_time * 1000, 2),
        "chunk_count": chunk_count,
        "total_bytes": total_bytes,
    }
```

### Pattern 9: Managing Multiple Resources with ExitStack

Handle a dynamic number of resources cleanly.

```python
from contextlib import ExitStack, AsyncExitStack
from pathlib import Path

def process_files(paths: list[Path]) -> list[str]:
    """Process multiple files with automatic cleanup."""
    results = []

    with ExitStack() as stack:
        # Open all files - they'll all be closed when block exits
        files = [stack.enter_context(open(p)) for p in paths]

        for f in files:
            results.append(f.read())

    return results

async def process_connections(hosts: list[str]) -> list[dict]:
    """Process multiple async connections."""
    results = []

    async with AsyncExitStack() as stack:
        connections = [
            await stack.enter_async_context(connect_to_host(host))
            for host in hosts
        ]

        for conn in connections:
            results.append(await conn.fetch_data())

    return results
```

## Best Practices Summary

1. **Always use context managers** - For any resource that needs cleanup
2. **Clean up unconditionally** - `__exit__` runs even on exception
3. **Don't suppress unexpectedly** - Return `False` unless suppression is intentional
4. **Use @contextmanager** - For simple resource patterns
5. **Implement both protocols** - Support `with` and manual management
6. **Use ExitStack** - For dynamic numbers of resources
7. **Accumulate efficiently** - List + join, not string concatenation
8. **Track metrics** - Time-to-first-byte matters for streaming
9. **Document behavior** - Especially exception suppression
10. **Test cleanup paths** - Verify resources are released on errors
