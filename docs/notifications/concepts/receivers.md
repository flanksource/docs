## Notification Spec

| Field      | Description                                                                                              | Schema              | Required |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| connection | The connection to use for the notification.                                                              | `string`            | `false`  |
| filter     | Filter is a CEL-expression used to decide whether this notification client should send the notification. | `string`            | `false`  |
| template   | Go template for the notification message.                                                                | `string`            | `true`   |
| url        | URL in the form of Shoutrrr notification service URL schema.                                             | `string`            | `false`  |
| properties | Configuration properties for Shoutrrr. It's Templatable.                                                 | `map[string]string` | `false`  |

**Example:**

```yaml
components:
  - name: Cyza
notifications:
  - connection: connection://googlechat/incident-notifications
    filter: incident.severity == 'High' || incident.severity == "Critical"
    template: |
      Subscribed to new incident: {{.incident.title}}

      Type: {{.incident.type}}
      Severity: {{.incident.severity}}
      Status: {{.incident.status}}

  - url: slack://<api-token>@incident-notifications
    filter: incident.severity != 'Low'
    template: |
      Type: {{.incident.type}}
      Severity: {{.incident.severity}}
      Status: {{.incident.status}}
    properties:
      color: '{{if eq incident.severity "Low"}}good{{else}}danger{{end}}'
      title: 'Subscribed to new incident: {{.incident.title}}'
```

## Types

### Team

Each team can have one or more notifications set up. The notification can be setup in the team spec.
Whenever a responder is attached to an incident, the responder team will receive the notifications on matching services.

### Person

### Custom Services
