---
title: Webhook Triggers
sidebar_position: 4
---

Playbooks can also be triggered via webhooks. When a webhook is configured, mission-control listens on the specified endpoint and any calls to the endpoint triggers the playbook.

```
POST /webhook/<webhook-path>
```

```yaml title="webhook-trigger.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: create-file-on-webhook
spec:
  description: Create a file specified by the webhook
  'on':
    webhook:
      // highlight-next-line
      path: my-webhook
      authentication:
        basic:
          username:
            value: my-username
          password:
            value: my-password
  actions:
    - name: Create the file
      exec:
        script: echo '{{.request.content}}' > '{{.request.params.path}}'
```

:::note
A webhook playbook doesn't accept any parameters and resources unlike a regular playbook.
:::

## Authentication

By default, the webhook calls are not protected via authentication. However, there are various authentication methods available as listed below.

- [Basic Auth](../reference/playbooks/webhooks.md#basic)
- [GitHub](../reference/playbooks/webhooks.md#github)
- [Svix](../reference/playbooks/webhooks.md#svix)
- [JWT](../reference/playbooks/webhooks.md#jwt)

## Webhook Data

The following details of a webhook request is available on the playbook under `request`.

<Fields
  rows={[
    {
      field: 'url',
      description: `Endpoint of the webhook. Example \`/playbook/webhook/my-webhook\``,
      scheme: 'string'
    },
    {
      field: 'headers',
      description: `Headers sent on the webhook request`,
      scheme: '`map[string]string`'
    },
    {
      field: 'params',
      description: `Query parameters sent on the webhook request`,
      scheme: '`map[string]string`'
    },
    {
      field: 'content',
      description: `Content sent on the webhook request`,
      scheme: 'string'
    },
    {
      field: 'json',
      description: `JSON content if the webhook content is JSON`,
      scheme: '`map[string]any`',
    }
  ]}
/>

