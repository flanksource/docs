There are 3 types of receivers

1. Person
2. Team
3. Custom Services

A notification must and can only have a single recipient.

## 1. Person

When a person is chosen as a recipient, the notification will be delivered via email to the person's registered email address.

## 2. Team

Teams have the flexibility to fine-tune their notification preferences. They can choose from various communication channels and apply filters to tailor their alerts. For instance, a team can set up a configuration to receive both email and Slack notifications for high-severity incidents, while opting for Slack exclusively for low-severity issues.

## 3. Custom Services

For notifications that do not neatly fit into the person or team categories, there's the option to route them to custom services. This ensures that the unique and non-standard notification scenarios are managed effectively and in a way that suits the organization's specific needs.

## Notification Config

To define the notification channel for team or a custom service, we use the structure below.

| Field      | Description                                                                                              | Schema              | Required |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| name       | A unique name for the notification.                                                                      | `string`            | `true`   |
| connection | The connection to use for the notification channel.                                                      | `string`            | `false`  |
| filter     | Filter is a CEL-expression used to decide whether this notification client should send the notification. | `string`            | `false`  |
| url        | URL in the form of Shoutrrr notification service URL schema.                                             | `string`            | `false`  |
| properties | Configuration properties for Shoutrrr. It's Templatable.                                                 | `map[string]string` | `false`  |

!!! Note

    One of either the `connection` or the `url` is required.

### Example:

```yaml title="backend-team.yaml"
notifications:
  - connection: connection://smtp://system/?To=aditya@flanksource.com
    filter: incident.severity == 'High' || incident.severity == "Critical"

  - url: slack://<api-token>@incident-notifications
    filter: incident.id != "" # Dummy filter to ensure that this filter only runs for incident related notifications
    properties:
      color: '{{if eq incident.severity "Low"}}good{{else}}danger{{end}}'
      title: 'Subscribed to new incident: {{.incident.title}}'
```
