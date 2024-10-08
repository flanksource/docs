---
title: Redis
---

# <Icon name="redis" /> Redis

The Redis component lookup allows you to form components from the records in a Redis database.

```yaml title="redis-components.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: redis-components
spec:
  interval: 30
  spec:
    redis:
      - addr: 'redis.default.svc:6379'
        name: redis-components
        username:
          valueFrom:
            secretKeyRef:
              name: redis-credentials
              key: USERNAME
        password:
          valueFrom:
            secretKeyRef:
              name: redis-credentials
              key: PASSWORD
        query: INFO keyspace
```

| Field          | Description                                                                     | Scheme                                         | Required |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| **`addr`**     | host:port address                                                               | string                                         | Yes      |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | <CommonLink to="secrets">_EnvVar_</CommonLink> | Yes      |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | <CommonLink to="secrets">_EnvVar_</CommonLink> | Yes      |
| **`db`**       | Database to be selected after connecting to the server                          | _int_                                          | Yes      |

## Authentication

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
