# Filtering

Customizing notifications is made possible through the use of filters, which are driven by CEL expressions _(Check Execution Language)_.

:::info
Learn more about CEL expressions [here](../../reference/scripting/cel.md).
:::

The cel expression receives different input variables based on the event type. To determine which variables are available, refer to the corresponding event details in the [events](../events) section.

## Examples

```yaml title="check-alerts.yaml"
---
# Filter HTTP checks that have failed for more than 5 times in the last 1 hour
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: check-alerts
  namespace: default
spec:
  events:
    - check.passed
    - check.failed
  filter: check.type == 'http' && check.uptime.failed > 5
  to:
    connection: connection://slack/flanksource
  title: Check {{.check.name}} is {{.check.status}}
```

```yaml title="kubernetes-node-component-alerts.yaml"
---
# Send all component status alerts for Kubernetes Node component
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: kubernetes-node-component-alerts
  namespace: default
spec:
  events:
    - component.status.healthy
    - component.status.unhealthy
    - component.status.warning
    - component.status.error
    - component.status.info
  filter: component.type == "Kubernetes::Node"
  to:
    connection: connection://slack/flanksource
```
