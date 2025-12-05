---
title: Cache Control
sidebar_custom_props:
  icon: mdi:cached
---

Views implement intelligent caching to minimize unnecessary data refreshes while keeping data reasonably fresh. Cache control settings help you balance data freshness with performance.

## Overview

When a view is requested, the system follows this process:

1. **Check cache validity** - Is the cached data still fresh?
2. **Return or refresh** - If fresh, return cached data; if stale, trigger a refresh
3. **Handle refresh timeout** - If refresh takes too long, return stale data instead
4. **Store results** - New data is cached for subsequent requests

## Configuration

Cache is configured in the view's `spec` section:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: my-view
spec:
  cache:
    # Maximum age before cache is considered stale (default: 15m)
    maxAge: 15m

    # Minimum age a user can request refresh (default: 10s)
    # Prevents over-refreshing from rapid user requests
    minAge: 10s

    # Timeout for refresh operations (default: 5s)
    # If refresh takes longer, stale data is returned instead
    refreshTimeout: 5s
```

## Cache Parameters

### maxAge

The maximum age of cached data before it's considered stale and needs refresh.

- **Default**: `15m`
- **Format**: Go duration (e.g., `5m`, `1h`, `30s`)
- **Effect**: Determines how fresh your data is
  - Shorter duration: More frequent refreshes, fresher data, higher load
  - Longer duration: Less frequent refreshes, potentially stale data, lower load

**Example**:

```yaml
cache:
  maxAge: 5m # Refresh at least every 5 minutes
```

### minAge

The minimum age cached data must reach before a user can request a manual refresh. This prevents over-refreshing from rapid user clicks.

- **Default**: `10s`
- **Format**: Go duration
- **Effect**: Throttles refresh requests from users
  - Users cannot force a refresh faster than this interval
  - Helps prevent accidental load spikes from aggressive clicking

**Example**:

```yaml
cache:
  minAge: 30s # Users can only refresh every 30 seconds
```

### refreshTimeout

How long to wait for a refresh operation to complete. If the refresh takes longer, stale data is returned instead of waiting.

- **Default**: `5s`
- **Format**: Go duration
- **Effect**: Ensures response times don't degrade when refresh is slow
  - Shorter timeout: Faster responses, but may return stale data
  - Longer timeout: Fresher data, but slower responses if refresh is slow

**Example**:

```yaml
cache:
  refreshTimeout: 2s # Return stale data if refresh takes > 2 seconds
```

## Per-Variable Caching

Each unique combination of template variables creates a separate cache entry. This allows different filters to maintain independent cache lifespans.

**Example**: A view with a "cluster" variable will maintain separate cached data for:

- cluster=us-east-1
- cluster=us-west-2
- cluster=eu-central-1

Each cluster's data is cached independently, allowing users to switch between clusters without invalidating other cached results.

## Cache Behavior Examples

### Example 1: Fresh Data Request

```
User requests view
  ↓
Cache check: Data is 5 minutes old, maxAge=15m
  ↓
Cache is valid → Return cached data immediately
  ↓
Response time: ~10ms
```

### Example 2: Stale Data with Quick Refresh

```
User requests view
  ↓
Cache check: Data is 20 minutes old, maxAge=15m
  ↓
Cache is stale → Trigger refresh with 2s timeout
  ↓
Refresh completes in 1.5 seconds
  ↓
Return fresh data → Cache updated
  ↓
Response time: ~1.5s
```

### Example 3: Stale Data with Slow Refresh

```
User requests view
  ↓
Cache check: Data is 20 minutes old, maxAge=15m
  ↓
Cache is stale → Trigger refresh with 2s timeout
  ↓
Refresh takes 4 seconds (slower than timeout)
  ↓
Timeout triggers after 2 seconds
  ↓
Return stale cached data instead of waiting
  ↓
Response time: ~2s
  ↓
Refresh continues in background, updates cache
```

### Example 4: Manual Refresh Throttling

```
User clicks refresh button
  ↓
Check minAge: Last refresh was 2 seconds ago, minAge=10s
  ↓
Too soon → Ignore refresh request
  ↓
User must wait 8 more seconds before refresh is allowed
```

## Recommended Settings

### High-Frequency Monitoring (Every Minute)

Use shorter cache times for real-time dashboards:

```yaml
cache:
  maxAge: 1m
  minAge: 10s
  refreshTimeout: 5s
```

### Typical Dashboard (Every 5-15 Minutes)

Standard balance of freshness and performance:

```yaml
cache:
  maxAge: 15m
  minAge: 30s
  refreshTimeout: 5s
```

### Low-Frequency Reference Data (Hourly)

For relatively static data:

```yaml
cache:
  maxAge: 1h
  minAge: 1m
  refreshTimeout: 10s
```

### Real-Time Critical (Seconds)

For mission-critical live data:

```yaml
cache:
  maxAge: 30s
  minAge: 5s
  refreshTimeout: 2s
```

## Performance Impact

Cache settings directly affect system performance:

| Setting                | ↓ Latency | ↓ Load | ↓ Freshness |
| ---------------------- | --------- | ------ | ----------- |
| Shorter maxAge         | ✗         | ✗      | ✓           |
| Longer maxAge          | ✓         | ✓      | ✗           |
| Shorter refreshTimeout | ✓         | ✗      | ✗           |
| Longer refreshTimeout  | ✗         | ✓      | ✓           |
| Higher minAge          | ✓         | ✓      | ✗           |
| Lower minAge           | ✗         | ✗      | ✓           |

## Default Configuration

If you don't specify cache settings, Mission Control uses these defaults:

```yaml
cache:
  maxAge: 15m # Refresh at least every 15 minutes
  minAge: 10s # Throttle user refreshes to every 10 seconds
  refreshTimeout: 5s # Return stale data if refresh takes > 5 seconds
```

These defaults work well for most use cases and provide a good balance between data freshness and system performance.

## Cache Deduplication

Mission Control uses **singleflight deduplication** to prevent multiple concurrent refresh requests for the same view and variable combination. This means:

- If 10 users request the same view at the same time
- Only one database query is executed
- All 10 users receive the same cached result
- Significantly reduces database load

## Cache Storage

View cache data is stored in:

- **Primary storage**: PostgreSQL database (persistent)
- **Format**: `view_<namespace>_<name>` table per view
- **Tracking**: Request fingerprint (SHA256 hash of variable map) identifies unique variable combinations

This allows:

- Data to survive service restarts
- PostgREST API access to view data
- Historical tracking of different variable combinations
