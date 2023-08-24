---
title: GCS Database Backup
---

# <img src='<https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/database2.svg>' style={{height: '32px'}}/> GCP CloudSQL Backups

Checks if a GCP CloudSQL instance has been successfully backed up recently.

```yaml title="gcp-database.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: database-backup-check
spec:
  interval: 60
  databaseBackup:
    - maxAge: 6h
      gcp:
        project: google-project-name
        instance: cloudsql-instance-name
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`gcp`** | Connect to GCP project and instance | [*GCPDatabase*](#gcpdatabase) | Yes |
| **`maxAge`** | Max age for backup allowed, eg. 5h30m | *Duration* |  |
| `*` | All other common fields | [*Common*](common) | |
|  |  |  | |

## Duration

Durations are strings with an optional fraction and unit e.g.  `300ms`, `1.5h` or `2h45m`. Valid time units are `ms`, `s`, `m`, `h`.

## GCPDatabase

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `project` | GCP project\ name | *string* | Yes |
| `instance` | Google CloudSQL instance name | *string* | Yes |
| **Connection** |  |  |  |
| `connection` | Path of an existing connection e.g. `connection://aws/instance`/. Mutually exclusive with `credentials` <br/> <Commercial/> | [Connection](../../concepts/connections) |  |
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
  databaseBackup:
    - maxAge: 6h
      gcp:
        project: google-project-name
        instance: cloudsql-instance-name
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
  databaseBackup:
    - name: gcp db check
      maxAge: 6h
      gcp:
        project: google-project-name
        credentials:
          valueFrom:
            secretKeyRef:
              name: gcp-credentials
              key: AUTH_ACCESS_TOKEN

```
