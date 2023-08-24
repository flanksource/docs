---
title: Config DB
---

# Config DB Query

Runs a [config-db](https://github.com/flanksource/config-db) query.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: configdb-check
spec:
  interval: 30
  configDB:
    - name: ConfigDB Check
      query: <insert-query>
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`** | Name of the check | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| `*` | All other commons field | [*Common*](common) |  |
