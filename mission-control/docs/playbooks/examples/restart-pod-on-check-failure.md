---
title: Auto Delete Pods
---


 Restart pod when check fails for more than 10 times in the last hour

```yaml title="stop-pod-of-failing-check.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: stop-pod-of-failing-check
spec:
  description: stop pod for failing checks
  on:
    canary:
      - event: failed
        filter: check_summary.failed > 10
        labels:
          alertname: KubePodCrashLoopingcontainer
  actions:
    - name: 'Stop pod'
      exec:
        script: kubectl delete pod {{index .check.labels "pod"}}
```

This playbook will trigger automatically whenever a check, with the label `alertname: KubePodCrashLoopingcontainer`, fails more than 10 times in the last hour.
