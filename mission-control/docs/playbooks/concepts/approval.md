# Approval

Authorization safeguards can be applied to playbook runs, ensuring their execution is limited to specific individuals or teams who grant approval.

```yaml title="approve-kubernetes-scaling.yaml"
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

## Approval

| Field       | Description                    | Scheme       | Required |
| ----------- | ------------------------------ | ------------ | -------- |
| `type`      | Specify type of approval.      | `string`     | `false`  |
| `approvers` | Specify approvers of approval. | `[]Approver` | `false`  |

### Approval Type

| Type  | Description                           |
| ----- | ------------------------------------- |
| `any` | A single approval can suffice.        |
| `all` | All approvals are required. (default) |

### Approvers

| Field    | Description               | Scheme     | Required |
| -------- | ------------------------- | ---------- | -------- |
| `people` | Specify ids of the people | `[]string` | `false`  |
| `teams`  | Specify ids of the teams  | `[]string` | `false`  |
