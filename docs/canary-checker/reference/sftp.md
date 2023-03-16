## SFTPConnection

The SFTP check connects to an SFTP server to check for folder freshness. 
The check:
* Verifies the most recently modified file that fulfills the `minAge` and `maxAge` constraints. (each an optional bound)
* Verifies files present in the mount is more than `minCount`.

??? example
    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: sftp-check
    spec:
      interval: 30
      spec:
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
| **`auth`** | Username and password value, configMapKeyRef or SecretKeyRef for SFTP server | [*Authentication*](#authentication) | Yes |
| **`host`** | Host is the server against which check needs to be executed | *string* | Yes |
| `port` | Port for the SSH server. Defaults to 22 | *int* |  |
| `maxCount` | MaxCount the Maximum number of files inside the searchPath | *int* |  |

---
# Scheme Reference
## Authentication

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes | 