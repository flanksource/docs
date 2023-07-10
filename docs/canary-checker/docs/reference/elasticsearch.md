---
title: Elasticsearch
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/elasticsearch.svg' style={{height: '32px'}}/> ElasticSearch

This check will try to connect to a specified ElasticSearch database, run a query against it and verify the results.

:::note "Opensearch"
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
| `*` | All other commons field | [*Common*](common) |  |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://elastic/instance`/ Mutually exclusive with `username` and `password | [Connection](../../concepts/connections) | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `url` | host:port address | *string* | Yes |
