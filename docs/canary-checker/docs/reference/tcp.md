---
title: TCP
---

# <Icon name="network"/> TCP

This checks whether the given address is reachable within the specified timeout period.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: tcp-check
spec:
  schedule: "*/1 * * * *"
  tcp:
    - name: "flanksource website"
      endpoint: www.flanksource.com:80
      thresholdMillis: 1200
```

| Field             | Description                            | Scheme                | Required |
| ----------------- | -------------------------------------- | --------------------- | -------- |
| **`endpoint`**    | `host:port`  to connect to             | `string`              | Yes      |
| `thresholdMillis` | Expected response time threshold in ms | `int64`               |          |
| `*`               | All other common fields                 | [*Common*](common) |          |
