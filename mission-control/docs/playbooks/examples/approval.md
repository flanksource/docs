# Playbook Approval

```yaml title="approval.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: scale-deployment
spec:
  description: Scale deployment
  configs:
    - type: Kubernetes::Deployment
      tags:
        environment: staging
  parameters:
    - name: replicas
      label: The new desired number of replicas.
  approval:
    type: any
    approvers:
      people:
        - admin@local
      teams:
        - DevOps
  actions:
    - name: 'scale deployment'
      exec:
        script: kubectl scale --replicas={{.params.replicas}} --namespace={{.config.tags.namespace}} deployment {{.config.name}}
```

This playbook is designed to be triggered manually as it isn't listening on any automated triggers .i.e. events or webhooks. It scales the given deployment to the desired number of replicas; where the replicas come from the parameters.

The notable thing here is the `approval` spec which enforces that playbook is approved by either the admin or any person from the the DevOps team before it runs.
