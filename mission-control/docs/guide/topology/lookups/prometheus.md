---
title: Prometheus
---

# <Icon name="prometheus" /> Prometheus

The Prometheus Check connects to the Prometheus host, performs the desired query, and displays the results.

```yaml title="prometheus-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: prometheus-metrics
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Prometheus
      type: Table
      icon: prometheus
      // highlight-start
      lookup:
        prometheus:
          - connection: http://prometheus.monitoring:9090
            query: sum(up) by (job)
            display:
              expr: |
                results.map(target, {
                  'name': target.job,
                  'type': "Job",
                }).toJSON()
      // highlight-end
```

| Field       | Description                       | Scheme                             | Required |
| ----------- | --------------------------------- | ---------------------------------- | -------- |
| `display`   | Template to display the result in | [Template](../concepts/templating) |          |
| **`host`**  | Address of the Prometheus server  | string                             | Yes      |
| **`query`** | PromQL query                      | string                             | Yes      |

## Results

The `results` variable in the template is a list of prometheus metrics.

| Field     | Description                | Scheme             |
| --------- | -------------------------- | ------------------ |
| `results` | List of prometheus metrics | `[]map[string]any` |
