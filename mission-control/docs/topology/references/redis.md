# <Icon name="redis" /> Redis

The Redis check connects to a specified Redis database instance to check its availability.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: redis-check
spec:
  interval: 30
  spec:
    redis:
      - addr: "redis.default.svc:6379"
        name: redis-check
        auth:
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
        db: 0
        description: "The redis check"
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`addr`** | host:port address | string | Yes |
| `auth` | username and password value, configMapKeyRef or SecretKeyRef for redis server | [*Authentication*](../concepts/authentication.md) |  |
| **`db`** | Database to be selected after connecting to the server | *int* | Yes |
| `description` | Description for the check | *string* |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `name` | Name of the check | *string* |  |

---

# Scheme Reference

## Authentication

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |