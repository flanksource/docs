---
title: GCS Bucket
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/gcsBucket.svg' style={{height: '32px'}}/> GCSBucket

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
| `*` | All other common fields | [*Common*](common) | |
| **Connection** |  |  | |
| `connection` | Path of an existing connection e.g. `connection://aws/instance`/. Mutually exclusive with `credentials` | [Connection](../../concepts/connections) | |
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
