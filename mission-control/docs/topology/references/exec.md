---
title: Exec
---

# <Icon name="console" /> Exec

Exec Check executes a command or script file on the target host. The type of scripts executed include:

- Bash scripts
- Powershell scripts

```yaml title="exec-lookup.yml"
---
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-pods
spec:
  type: Pods
  icon: kubernetes
  schedule: '@every 30s'
  components:
    - name: pods
      icon: server
      type: KubernetesPod
      // highlight-start
      lookup:
        exec:
          - script: |
              echo '[
                {
                  "name": "pod-1",
                  "type": "Kubernetes::Pod"
                },
                {
                  "name": "pod-2",
                  "type": "Kubernetes::Pod"
                }
              ]'
      // highlight-end
```

| Field        | Description                                                                                                                                                    | Scheme                                  | Required |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `display`    | Template to display server response in text (overrides default bar format for UI)                                                                              | [_Template_](../concepts/templating.md) |          |
| `labels`     | Labels for the check                                                                                                                                           | Labels                                  |          |
| **`script`** | Script can be a inline script or a path to a script that needs to be executed. On windows executed via powershell and in darwin and linux executed using bash. | _string_                                | Yes      |
| `transform`  | Template to transform results by excluding or including certain fields in result                                                                               | [_Template_](../concepts/templating.md) |          |
