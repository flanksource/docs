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
```

| Field       | Description                       | Scheme                                | Required |
| ----------- | --------------------------------- | ------------------------------------- | -------- |
| `display`   | Template to display the result in | [Template](../concepts/templating.md) |          |
| **`host`**  | Address of the Prometheus server  | string                                | Yes      |
| **`query`** | PromQL query                      | string                                | Yes      |
