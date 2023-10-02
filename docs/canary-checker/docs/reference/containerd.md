---
title: ContainerD / Docker
---

# <Icon name="containerd"/>  ContainerD / Docker

This check will try to pull a Docker image from specified registry using containerd and then verify its checksum and size.

:::note Root Privileges Required
The containerd and docker health checks require access to a working socket that is mounted at runtime
:::

## Pulling images

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: containerd-pull-check
spec:
  interval: 30
  containerd: # use docker if running outside kubernetes / docker
    - image: docker.io/library/busybox:1.31.1
      expectedDigest: sha256:95cf004f559831017cdf4628aaf1bb30133677be8702a8c5f2994629f637a209
      expectedSize: 764556

```

| Field            | Description                                                  | Scheme                                            | Required |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for registry | [_Authentication_](../concepts/authentication.md) |          |
| `expectedDigest` | Expected digest of the pulled image                          | _string_                                          | Yes      |
| `expectedSize`   | Expected size of the pulled image                            | _int64_                                           | Yes      |
| **`image`**      | Full path to image, including registry                       | _string_                                          | Yes      |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

---

## Pushing images

This check will try to push a Docker image to a specified registry using containerd.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: containerd-push-check
spec:
  interval: 30
  containerdPush:  # use dockerPush if running outside kubernetes / docker
    - name: ContainerdPush Check
      image: docker.io/library/busybox:1.31.1
      username: <insert-username>
      password: <insert-password>
```

| Field          | Description                            | Scheme                | Required |
| -------------- | -------------------------------------- | --------------------- | -------- |
| **`image`**    | Full path to image, including registry | `string`              | Yes      |
| **`password`** | Password to access Containerd          | `string`              | Yes      |
| **`username`** | Username to access Containerd          | `string`              | Yes      |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
