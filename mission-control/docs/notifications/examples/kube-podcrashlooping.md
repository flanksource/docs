---
title: Pod CrashLooping
---

```yaml title="pod-crashlooping-alerts.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: podcrashlooping-alerts
  namespace: default
spec:
  events:
    - config.unhealthy
  //highlight-next-line
  filter: config.type == 'Kubernetes::Pod' && config.status == 'CrashLoopBackOff'
  title: "Pod {{.config.name}} in namespace {{.config.tags.namespace}} is in CrashLoopBackOff"
  body: |
    {{.config.tags.namespace}}/{{.config.name}}
    ## Reason
    {{.config.config | jq '.status.containerStatuses[0].state.waiting.message' }}

    ###  Labels:
    {{range $k, $v := .config.config.metadata.labels}}
    **{{$k}}**: {{$v}}
    {{end}}
  email: alerts@acme.com
```
