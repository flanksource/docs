---
title: Pod Action
---

# <Icon name="pod"/> Pod Action

Pod action allows you to run an arbitrary pod on your kubernetes cluster.

```yaml title="ping-database-from-pod.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: ping-database-from-pod
spec:
  description: Create a pod and ping the database
  actions:
    - name: Ping database
      pod:
        name: Ping db from the pod
        spec:
          containers:
            - name: my-alpine-container
              image: ubuntu:jammy
              command: ['/bin/sh']
              args:
                - -c
                - 'apt-get update -y && apt-get install -y iputils-ping && ping -c 2 postgres.default.svc.cluster.local'
              resources:
                limits:
                  memory: 128Mi
                  cpu: '1'
                requests:
                  memory: 64Mi
                  cpu: '0.2'
```

| Field       | Description                                                   | Type                                                               | Required |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| `name`      | Name of the pod that'll be created                            | `string`                                                           | `true`   |
| `spec`      | Full pod specification                                        | [`PodSpec`](https://pkg.go.dev/k8s.io/api@v0.28.2/core/v1#PodSpec) | `true`   |
| `maxLength` | Maximum length of the logs to show (default: 3000 characters) | `integer`                                                          |          |
| `artifacts` | Specify what artifacts generated in the pod needs to be saved | [`[]Artifact`](#artifacts)                                         |          |

## Artifact

| Field  | Description   | Type     | Required |
| ------ | ------------- | -------- | -------- |
| `path` | Path or glob. | `string` | `true`   |

[Read more ...](../concepts/artifacts.md)
