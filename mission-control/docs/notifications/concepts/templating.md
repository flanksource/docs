# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating is essential for crafting customized notifications. It involves using templates for both the notification title and body. In Mission Control, these templates are rendered using Go templates. To determine which variables you can use in a specific event's template, refer to the corresponding event details in the [events](../events) section.

## Go Template

Go templates are a feature of the Go programming language that allow you to define and execute templates. Templates are text files that contain placeholders for data, which are filled in at runtime.

### Examples

```yaml title="check-alerts.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: check-alerts
  namespace: default
spec:
  events:
    - check.passed
    - check.failed
  to:
    connection: connection://slack/flanksource
  title: Check {{.check.name}} is {{.check.status}}
  template: |
    Canary: {{.canary.id}} ({{.canary.name}})
    Description: {{.check.description}}
    Type: {{.check.type}}
```

```yaml title="component-alerts.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: component-alerts
  namespace: default
spec:
  events:
    - component.status.healthy
    - component.status.unhealthy
    - component.status.warning
    - component.status.error
    - component.status.info
  to:
    connection: connection://slack/flanksource
  title: Component {{.component.name}} status changed to {{.component.status}}
  template: |
    Description: {{.component.description}}
    Type: {{.component.type}}
```
