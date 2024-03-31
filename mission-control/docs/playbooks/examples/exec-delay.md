---
title: Delayed Actions
---

```yaml title="delay-deletion.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: write-config-to-file
spec:
  description: Creates a file with the content of the config
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Create the config file
      exec:
        script: echo -n '{{.config.config}}' > /tmp/{{.config.id}}
    - name: Delete the file
      delay: 'config.name.startsWith("actual") ? "1m" : "0s"'
      exec:
        script: rm /tmp/{{.config.id}}
```

This playbook saves the config of a `Kubernetes::Pod` to a temporary file. A delay is introduced before deleting that file. If the name of the pod beings with
`actual` then the deletion is delayed by a minute, else it is deleted immediately.
