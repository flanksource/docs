---
title: Kubernetes Job Failing
---

```yaml title="cronjob-alerts.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: cronjob-alerts
  namespace: default
spec:
  events:
    - config.unhealthy
  //highlight-next-line
  filter: config.type == 'Kubernetes::CronJob'
  to:
    email: alerts@acme.com
```
