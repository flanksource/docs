---
title: Elasticsearch
---

# <Icon name="elasticsearch"/> ElasticSearch

This check will try to connect to a specified ElasticSearch database, run a query against it and verify the results.

:::info Opensearch
To connect to Opensearch use `opensearch` field instead of `elasticsearch`
:::

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: elasticsearch-check
spec:
  interval: 30
  elasticsearch:
    - url: http://elasticsearch.default.svc:9200
      description: Elasticsearch checker
      index: index
      query: |
        {
        "query": {
            "term": {
            "system.role": "api"
            }
        }
        }

      results: 1
      name: elasticsearch_pass
      username:
          valueFrom:
            secretKeyRef:
              name: elasticsearch-credentials
              key: USERNAME
      password:
          valueFrom:
            secretKeyRef:
              name: elasticsearch-credentials
              key: PASSWORD
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`index`** | Index against which query should be ran | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number of expected hits | *int* | Yes |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://elastic/instance` <br/>Mutually exclusive with `username` and `password`  <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `url` | URL of elastichsearch server | *string* | Yes |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
