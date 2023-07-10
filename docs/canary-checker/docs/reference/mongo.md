---
title: MongoDB
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/mongodb.svg' style={{height: '32px'}}/> MongoDB

The Mongo check tries to connect to a specified Mongo Database to ensure connectivity.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mongo-check
spec:
  interval: 30
  mongodb:
    - name: mongo password
      url: mongodb://$(username):$(password)@mongo.default.svc:27017/?authSource=admin
      username:
        valueFrom:
          secretKeyRef:
            name: mongo-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: mongo-credentials
            key: PASSWORD

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `connection` | Path of existing connection e.g. `connection://mongo/instance` or connection url | [Connection](../../concepts/connections) | |
| url | mongodb://:27017/?authSource=admin, See [connection-string](https://docs.mongodb.com/manual/reference/connection-string/) |  | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `*` | All other common fields | [*Common*](common) | |
