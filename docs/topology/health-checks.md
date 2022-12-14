## Health Checks

Components can be associated with a health check, when the health checks associated to the component become unhealthy, the component will also become unhealthy.

Health checks can be associated in 2 ways:

1. Selecting an exising health check using `checks.selector`
2. Defining the health check inline using `checks.inline`

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `inline` |  | [*Inline*](#inline-health-checks) |
| `selector` |  | [*Selector*](#selecting-health-checks)

### Selecting Health Checks

| Field     | Description | Scheme |
| -----     | ----------- | ------ |
| `fieldSelector`    | Select Kubernetes or Canary object based on the value of specified resource field | *string*
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary. | *string*
| `name` | Set name for selector | *string* |

```yaml
apiVersion: canaries.flanksource.com/v1
kind: SystemTemplate
metadata:
  name: single-check
spec:
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
    endpoint: http://status.savanttools.com/?code=202
    responseCodes:
      - 202
```

By selecting health checks rather than inlining them you are able to re-use the same health check across multiple components.

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
  schedule: "@every 5m"
  components:
    - checks:
        - inline:
            http:
              - name: inline-check
                endpoint: http://status.savanttools.com/?code=202
                responseCodes:
                  - 202
      name: inline-canary
```

The inline object can specify any [Check](/reference/checks/)
