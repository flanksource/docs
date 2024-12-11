---
title: Delayed Actions
---

## Delay

This example demonstrates how to create a playbook that restarts a Kubernetes Pod and introduces a delay before checking the status of the Pod to ensure it has restarted.

````yaml title="restart-pod-with-delay.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
` metadata:
  name: restart-pod
spec:
  description: Restarts a Kubernetes Pod and checks its status after a delay
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Restart the Pod
      exec:
        script: kubectl delete pod {{.config.name}} -n {{.config.tags.namespace}}
    - name: Wait for Pod to restart
      //highlight-next-line
      delay: '30s'
    - name: Check Pod status
      exec:
        script: kubectl get pod {{.config.name}} -n {{.config.tags.namespace}} -o jsonpath='{.status.phase}'


This example

1. Deletes the specified Kubernetes Pod to restart it.
2. Introduces a `delay` of 30 seconds to allow the Pod to restart.
3. Checks the status of the Pod to ensure it has restarted.
## Dynamic Delay

This example demonstrates how to create a playbook that restarts a Kubernetes Pod and introduces a delay based on the `readinessProbe.initialDelaySeconds` before checking the status of the Pod to ensure it has restarted properly.

```yaml title="restart-pod-with-dynamic-delay.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: restart-pod-dynamic-delay
spec:
  description: Restarts a Kubernetes Pod and checks its status after a dynamic delay
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Restart the Pod
      exec:
        script: kubectl delete pod {{.config.name}} -n {{.config.tags.namespace}}
    - name: Wait for Pod to restart
      //highlight-next-line
      delay: '{{.config.config.spec.containers[0].readinessProbe.initialDelaySeconds}}s'
    - name: Check Pod status
      exec:
        script: kubectl get pod {{.config.name}} -n {{.config.tags.namespace}} -o jsonpath='{.status.phase}'
````

This example

1. Deletes the specified Kubernetes Pod to restart it.
2. Introduces a `delay` based on the `initialDelaySeconds` to allow the Pod to restart.
3. Checks the status of the Pod to ensure it has restarted.

See [duration](/reference/types#duration) for support formats.
