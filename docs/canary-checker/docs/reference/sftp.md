---
title: SFTP Connection
---

# <img src='<https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/sftp.svg>' style={{height: '32px'}}/> SFTPConnection

Checks the contents of a folder over SFTP for size, age and count.

See [Folder](folder) for a full description.

```yaml title="sftp-folder-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: sftp-check
spec:
  interval: 30
  folder:
    - path: /tmp
      name: sample sftp check
      sftpConnection:
        host: 192.168.1.5
        auth:
          username:
            valueFrom:
              secretKeyRef:
                name: sftp-credentials
                key: USERNAME
          password:
            valueFrom:
              secretKeyRef:
                name: sftp-credentials
                key: PASSWORD
      maxCount: 10
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`**       | Name of the check                                          | *string*                          | Yes      |
| **`path`**       | A path to the remote folder | string                            | Yes      |
| **`sftpConnection`** | SFTP connection details                                    | [SFTPConnection](#sftp-connection) | Yes |
| `*`              | All other fields available in the folder check             | [*Folder*](folder)             |          |

## SFTP Connection

| Field        | Description                                                  | Scheme                                            |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| `connection` | Path of existing connection e.g. `connection://sftp/instance`<br/> Mutually exclusive with `username ` <br/><Commercial/> | [Connection](../../concepts/connections)          |
| `username`   | utually exclusive with `connection`                          | [*EnvVar*](../../concepts/authentication/#envvar) |
| `password`   | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) |
| `host`       | Custom AWS Cloudwatch endpoint                               | *string*                                          |
| `port`       | Default to `22`                                              | int                                               |
