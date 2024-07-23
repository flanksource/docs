---
title: Playbook Approval
---

# Introduction

This example demonstrates how to create a playbook that requires approval before execution. The playbook scales a Kubernetes deployment to a specified number of replicas. The approval process ensures that either an admin or a member of the DevOps team approves the action before it runs.

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

## Explanation

This playbook is designed to be triggered manually. It does not listen for automated triggers such as events or webhooks. The playbook scales the specified deployment to the desired number of replicas, which are provided as parameters.

The `approval` section specifies that the playbook requires approval before execution. The approval can be granted by either the admin or any member of the DevOps team.
