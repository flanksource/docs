---
title: Cache Control
sidebar_position: 4
sidebar_custom_props:
  icon: material-symbols:cached
---

Views implement a caching system that stores query results in dedicated database tables for fast retrieval and extra filtering.
You can control cache behavior through both view configuration and HTTP headers.

## How View Caching Works

Views work like materialized views in traditional databases:

1. User requests view data
2. System looks for cached data in the view's database table
3. If data exists and hasn't expired, return immediately
   - **Cache Miss/Expired**: Execute view queries and wait up to `refreshTimeout`
4. **Timeout Handling**: If refresh exceeds timeout:
   - Return stale data if available
   - Return error if no cached data exists

## Cache Configuration

### View-Level Settings

Configure cache behavior in your view specification:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: my-view
spec:
  cache:
    maxAge: '30m' # Maximum cache age before refresh (default: 15m)
    minAge: '30s' # Minimum age clients can request (default: 10s)
    refreshTimeout: '10s' # How long to wait for refresh (default: 5s)
  queries:
    # ... your queries
```

### Default Values

| Setting          | Default    | Description                                |
| ---------------- | ---------- | ------------------------------------------ |
| `maxAge`         | 15 minutes | Cache expires after this duration          |
| `minAge`         | 10 seconds | Minimum cache age that clients can request |
| `refreshTimeout` | 5 seconds  | Timeout for background refresh operations  |
