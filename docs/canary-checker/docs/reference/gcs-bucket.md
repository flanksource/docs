---
title: GCS Bucket
---

# <Icon name="gcs"/> GCSBucket

Checks the contents of a GCP bucket for size, age and count.

See [Folder](folder) for a full description.

```yaml title="gcs-folder-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: gcs-bucket-check
spec:
  interval: 30
  spec:
    folder:
      - name: gcs auth test
        path: gcs://somegcsbucket
        minCount: 5
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`** | Name of the check                                            | *string*              | Yes      |
| **`path`** | A path to a GCS bucket and folder e.g. `gcs://bucket/folder` | string                | Yes      |
| `gcpConnection` | Connection details for GCP | [GCPConnection](#gcp-connection) |  |
| `*`        | All other fields available in the folder check               | [*Folder*](folder) |          |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |  |  | |
| `connection` | Path of an existing connection e.g. `connection://aws/instance` <br/>Mutually exclusive with `credentials`  <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `credentials` | GCP Access Token File. Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |

### Connecting to GCP

There are 3 options when connecting to GCP:

1. GKE [workload identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) (the default if no `connection` or `credentials` is specified)
2. `connection`, this is the recommended method, connections are reusable and secure

```yaml title="aws-connection.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: database-backup-check
spec:
  interval: 60
  folder:
      - name: gcs auth test
        path: gcs://somegcsbucket
        gcpConnection:
        connection: connection://gcp/internal
```

3. `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret.

```yaml title="aws.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: database-backup-check
spec:
  interval: 60
  folder:
      - name: gcs auth test
        path: gcs://somegcsbucket
        gcpConnection:
          credentials:
            valueFrom:
              secretKeyRef:
                name: gcp-credentials
                key: AUTH_ACCESS_TOKEN

```
