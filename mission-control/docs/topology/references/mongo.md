---
title: Mongo
---

# <Icon name="mongo" /> MongoDB

The Mongo check tries to connect to a specified Mongo Database to ensure connectivity.

```yaml title="mongo-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mongo-check
spec:
  interval: 30
  spec:
    mongodb:
      - connection: mongodb://$(username):$(password)@mongo.default.svc:27017/?authSource=admin
        description: mongo ping
        auth:
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
        dns:
          - query: mongo.default.svc
```

| Field            | Description                                                                   | Scheme                                            | Required |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for Mongo server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | Connection string to connect to the Mongo server                              | _string_                                          | Yes      |

## Authentication

| Field          | Description                                                                     | Scheme                                                                       | Required |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | [_kommons.EnvVar_](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes      |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | [_kommons.EnvVar_](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes      |
