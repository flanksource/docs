---
title: Custom Metrics
---

Canary checker can export custom metrics from any check type, replacing and/or consolidating multiple standalone Prometheus Exporters into a single exporter.

In the example below, exchange rates against the USD are exported by first calling an HTTP api and then using the values from the JSON response to create the metrics:

```yaml title="exchange-rates-exporter.yaml" file=../../../../modules/canary-checker/fixtures/minimal/metrics-multiple.yaml
```

Which would output:

```shell
exchange_rate{from=USD, to=GBP} 0.819
exchange_rate{from=USD, to=EUR} 0.949
exchange_rate{from=USD, to=ILS} 3.849
exchange_rate_api 260.000
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

Expressions can make use of the following variables:

### **Expression Variables**

| Fields                    | Description                                | Scheme                                    |
| ------------------------- | ------------------------------------------ | ----------------------------------------- |
| **`result`**              | Check Result                               | See result variables section of the check |
| **`last_result.results`** | The last result                            |                                           |
| `check.name`              | Check name                                 | `string`                                  |
| `check.description`       | Check description                          | `string`                                  |
| `check.labels`            | Dynamic labels attached to the check       | `map[string]string`                       |
| `check.endpoint`          | Endpoint (usually a URL)                   | `string`                                  |
| `check.duration`          | Duration in milliseconds                   | `int64`                                   |
| `canary.name`             | Canary name                                | `string`                                  |
| `canary.namespace`        | Canary namespace                           | `string`                                  |
| `canary.labels`           | Labels attached to the canary CRD (if any) | `map[string]string`                       |
