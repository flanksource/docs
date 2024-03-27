# Webhook Triggers

Playbooks can also be triggered via webhooks. When a webhook is configured, mission-control listens on the specified endpoint and any calls to the endpoint triggers the playbook.
By default, the webhook calls are not protected via authentication. However, there are various authentication methods available.

```
/webhook/<webhook-path>
```

```yaml title="webhook-trigger.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: create-file-on-webhook
spec:
  description: Create a file specified by the webhook
  components:
    - type: KubernetesCluster
  'on':
    webhook:
      path: my-webhook
      authentication:
        basic:
          username:
            value: my-username
          password:
            value: my-password
  parameters:
    - name: path
      label: Absolute path of the file to create
  actions:
    - name: Create the file
      exec:
        script: touch {{.params.path}}
```

