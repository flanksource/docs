---
title: Notification Action
---

# <Icon name="bell-dark"/> Notification Action

Notification action sends notification.

```yaml title="notify-deployment-restarts.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-deployment-restarts
spec:
  description: Sends Telegram notification after restarting deployment
  components:
    - type: KubernetesDeployment
  actions:
    - name: 'Restart the deployment'
      exec:
        script: kubectl rollout restart {{.component.name}}
    - name: 'Send notification'
      notification:
        connection: connection://telegram/example
        title: 'Deployment restarted successfully'
        message: 'Name: "{{.component.name}}"'
```

| Field        | Description                                               | Scheme              | Required | Templatable |
| ------------ | --------------------------------------------------------- | ------------------- | -------- | ----------- |
| `url`        | Shoutrrr URL [Read more](../../notifications/overview.md) | `string`            |          |             |
| `connection` | Connection to use to send the notification                | `string`            |          |             |
| `title`      | Title of the notification                                 | `string`            | `true`   | `true`      |
| `message`    | Message is the body of the notification                   | `string`            | `true`   | `true`      |
| `properties` | Properties for shoutrrr                                   | `map[string]string` |          |             |

:::note
Either the `connection` or the `url` is required.
:::

## Templating

The template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](./reference/config-db/config-item) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/checl)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
