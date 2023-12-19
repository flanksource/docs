---
title: Metrics Exporter
---

Canary checker can export custom metrics from any check type, replacing and/or consolidating multiple standaline Prometheus Exporters into a single exporter.

In the example below, exchange rates against the USD are exported by first calling an HTTP api and then using the values from the JSON response to create the metrics:

```yaml title="exchange-rates-exporter.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: exchange-rates
spec:
  schedule: "every 1 @hour"
  http:
    - name: exchange-rates
      url: https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ILS
      metrics:
        - name: exchange_rate
          type: gauge
          value: result.json.rates.GBP
          labels:
            - name: "from"
              value: "USD"
            - name: to
              value: GBP

        - name: exchange_rate
          type: gauge
          value: result.json.rates.EUR
          labels:
            - name: "from"
              value: "USD"
            - name: to
              value: EUR

        - name: exchange_rate
          type: gauge
          value: result.json.rates.ILS
          labels:
            - name: "from"
              value: "USD"
            - name: to
              value: ILS
        - name: exchange_rate_api
          type: histogram
          valueExpr: result.elapsed.getMilliseconds()
```

Which would output:

```shell
exchange_rate{from=USD, to=GBP} 0.819
exchange_rate{from=USD, to=EUR} 0.949
exchange_rate{from=USD, to=ILS} 3.849
exchange_rate_api 260.000
```

## Stateful Metrics

Metrics can be generated from time based data, e.g. logs per minute, logins per second by using the output of one check execution as the input to the next.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: "container-log-counts"
  namespace: observability
  # The schedule can be as short or as long as you want, the query will always search for log
  # since the last query
  schedule: "@every 5m"
  http:
    - name: container_log_volume
      url: "https://elasticsearch/logstash-*/_search"
      headers:
        - name: Content-Type
          value: application/json
      templateBody: true
      test:
        # if no logs are found, fail the health check
        expr: json.?aggregations.logs.doc_count.orValue(0) > 0
      # query for log counts by namespace, container and pod that have been created since the last check
      body: >-
        {
          "size": 0,
          "aggs": {
            "logs": {
              "filter": {
                "range": {
                  "@timestamp" : {
                    {{-  if last_result.results.max }}
                    "gte": "{{ last_result.results.max }}"
                    {{- else }}
                    "gte": "now-5m"
                    {{- end }}
                  }
                }
              },
              "aggs": {
                "age": {
                  "max": {
                    "field": "@timestamp"
                  }
                },
                "labels": {
                  "multi_terms": {
                    "terms": [
                      { "field": "kubernetes_namespace_name.keyword"},
                      { "field": "kubernetes_container_name.keyword"},
                      { "field": "kubernetes_pod_name.keyword"}
                    ],
                    "size": 1000
                  }
                }
              }
            }
          }
        }
      transform:
        # Save the maximum age for usage in subsequent queries and create a metric for each pair
        expr: |
          json.orValue(null) != null ?
          [{
            'detail': { 'max': string(json.?aggregations.logs.age.value_as_string.orValue(last_result().?results.max.orValue(time.Now()))) },
            'metrics': json.?aggregations.logs.labels.buckets.orValue([]).map(k,  {
              'name': "namespace_log_count",
              'type': "counter",
              'value': double(k.doc_count),
              'labels': {
                "namespace": k.key[0],
                "container": k.key[1],
                "pod": k.key[2]
              }
            })
          }].toJSON()
          : '{}'
```

This snippet will retrieve the `last_result.results.max` value from the last execution ensuring data is not duplicated or missed
```go
 "@timestamp" : {
                    {{-  if last_result.results.max }}
                    "gte": "{{ last_result.results.max }}"
                    {{- else }}
                    "gte": "now-5m"
                    {{- end }}
                  }

```

The max value is saved in the `transform` section using:

```yaml
#...
            'detail': { 'max': string(json.?aggregations.logs.age.value_as_string.orValue(last_result().?results.max.orValue(time.Now()))) },
#...
```

## Result Variables

| Field     | Description                          | Scheme            | Required |
| --------- | ------------------------------------ | ----------------- | -------- |
| `metrics` | Metrics to export from check results | [Metric](#metric) |          |

### Metric

| Field    | Description                                            | Scheme            | Required |
| -------- | ------------------------------------------------------ | ----------------- | -------- |
| `name`   | Name of the metric                                     | `string`          | Yes      |
| `value`  | An expression to derive the metric value from          | `Expression`      | Yes      |
| `type`   | Prometheus Metric Type (counter, gauge or histogram)   | `string`          | Yes      |
| `labels` | Labels for prometheus metric (values can be templated) | [[]Label](#label) |          |

### Label

| Field       | Description                                            | Scheme              | Required |
| ----------- | ------------------------------------------------------ | ------------------- | -------- |
| `name`      | Name of the label                                      | `string`            | Yes      |
| `value`     | A static value for the header                          | `string`            |          |
| `valueExpr` | An expression to derive the header value from          | `Expression`        |          |
| `labels`    | Labels for prometheus metric (values can be templated) | `map[string]string` |          |

Expresions can make use of the following variables:

### **Expression Variables**

| Fields                    | Description                                | Scheme                                    |
| ------------------------- | ------------------------------------------ | ----------------------------------------- |
| **`result`**              | Check Result                               | See result variables section of the check |
| **`last_result.results`** | The last result                            |                                           |
| `check.name`              | Check name                                 | `string`                                  |
| `check.description`       | Check description                          | `string`                                  |
| `check.labels`            | Dynamic labels attached to the check       | `map[string]string`                       |
| `check.endpoint`          | Endpoint (usally a URL)                    | `string`                                  |
| `check.duration`          | Duration in milliseconds                   | `int64`                                   |
| `canary.name`             | Canary name                                | `string`                                  |
| `canary.namespace`        | Canary namespace                           | `string`                                  |
| `canary.labels`           | Labels attached to the canary CRD (if any) | `map[string]string`                       |

