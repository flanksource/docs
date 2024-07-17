---
title: PodCrashLooping notification
---

```yaml title="podcrashlooping-alerts.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: podcrashlooping-alerts
  namespace: default
spec:
  events:
    - config.unhealthy
  filter: config.type == 'Kubernetes::Pod' && config.status == 'CrashLoopBackOff'
  to:
    # use the slack connection as the recipient for this notification
    connection: connection://flanksource-slack
```
