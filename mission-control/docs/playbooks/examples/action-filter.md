# Playbook Action Filter

```yaml title="delete-kubernetes-pod.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: delete kubernetes pod
spec:
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Delete the pod
      exec:
        script: kubectl delete pod {{.config.name}}
    - name: Log Maintenance Success
      delay: 2m
      if: failure()
      notification:
        connection: connection://telegram/aditya
        title: 'Failed to delete kubernetes pod {{.config.name}}'
        message: 'Something went wrong with deleting kubernetes pod {{.config.name}}'
```
