Components can be associated with a health check, when the health checks associated to the component become unhealthy, the component will also become unhealthy.

Health checks can be associated in 2 ways:

1. Selecting an existing health check using `checks.selector`
2. Defining the health check inline using `checks.inline`

## Check

| Field      | Description | Scheme                                                        | Required |
| ---------- | ----------- | ------------------------------------------------------------- | -------- |
| `inline`   |             | [`CanarySpec`](../../canary-checker/reference/canary-spec.md) |          |
| `selector` |             | [`[]Selector`](#selector)                                     |          |

### Selector

```yaml
apiVersion: canaries.flanksource.com/v1
kind: SystemTemplate
metadata:
  name: single-check
spec| `id`      | The UUID of config item, rarely used                       | `string`                       |          |

  type: Website
  icon: Application
  schedule: "@every 5m"
  components:
    - checks:
        - labelSelector: "check=http-200" # labels specified on an existing check
      name: single-check
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

By selecting health checks rather than inlining them you are able to re-use the same health check across multiple components.

| Field           | Description                                                                       | Scheme   |
| --------------- | --------------------------------------------------------------------------------- | -------- |
| `fieldSelector` | Select Kubernetes or Canary object based on the value of specified resource field | _string_ |
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary.              | _string_ |
| `name`          | Set name for selector                                                             | _string_ |

### Inline Health Checks

Sometimes a health check is specific to the component being created, in which case it can be inlined.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: SystemTemplate
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
