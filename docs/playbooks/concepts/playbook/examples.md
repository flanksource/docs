# Examples

## 1. Scaling EC2 instance

```yaml
description: Scale deployment
configs:
  - type: Kubernetes::Deployment
    tags:
      namespace: default
      cluster: local-kind-cluster
parameters:
  - name: replicas
    label: The new desired number of replicas.
approval:
  type: any
  approvers:
    people:
      - d87243c9-3183-4ab9-9df9-c77c8278df11
    teams:
      - 018770c4-4b73-5d44-8bb5-0e849d62e461
actions:
  - name: 'scale deployment'
    exec:
      script: kubectl scale --replicas={{.params.replicas}} deployment {{.config.name}}
```