# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/redis.svg' style='height: 32px'/> Redis

The Redis check connects to a specified Redis database instance to check its availability.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: redis-check
spec:
  interval: 30
  redis:
    - name: redis-check
      addr: "redis.default.svc:6379"
      db: 0
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
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`addr`** | `host:port` address of redis | string | Yes |
| **`db`** | Database to be selected after connecting to the server | *int* | Yes |
| `*` | All other common fields | [*Common*](../common) |  |

## Redis Connection

| Field        | Description                                                  | Scheme                                            |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| `connection` | Path of existing connection e.g. `connection://redis/instance`/ Mutually exclusive with `accessKey` | [Connection](../../concepts/connections)          |
| `username`   | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) |
| `password`   | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) |
