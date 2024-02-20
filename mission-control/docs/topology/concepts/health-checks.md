# Health Checks

Components can be associated with health checks. This association allows you to check the health of a component. When the health checks associated to the component become unhealthy, the component will also become unhealthy & vice-versa.

Health checks can be associated in 2 ways:

1. Selecting an existing health check using `checks.selector`
2. Defining the health check inline using `checks.inline`

## Check

| Field      | Description                      | Scheme                                                        | Required |
| ---------- | -------------------------------- | ------------------------------------------------------------- | -------- |
| `inline`   | Define a new health check inline | [`CanarySpec`](../../canary-checker/reference/canary-spec.md) |          |
| `selector` | Select an existing health check  | [`[]ResourceSelector`](../../reference/resource_selector)     |          |

### Selector

```yaml title="topology.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: single-check
spec:
  type: Website
  icon: Application
  schedule: "@every 5m"
  components:
    - name: single-check
      checks:
        - labelSelector: "check=http-200" # labels specified on an existing check
---
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: abp-microservice
  labels:
    check: http-200 # match against this label
spec:
  interval: 30
  - name: inline-check
    url: https://httpbin.demo.aws.flanksource.com/status/202
    responseCodes:
      - 202
```

### Inline Health Checks

Sometimes a health check is specific to the component being created, in which case it can be inlined.

```yaml title="topology.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: inline-check
spec:
  type: Website
  icon: Application
  schedule: '@every 5m'
  components:
    - checks:
        - inline:
            http:
              - name: inline-check
                url: https://httpbin.demo.aws.flanksource.com/status/202
                responseCodes:
                  - 202
      name: inline-canary
```

The inline object can specify any [Check](../../canary-checker/reference/canary-spec.md)
