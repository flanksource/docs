# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/sftp.svg' style='height: 32px'/> SFTPConnection

The SFTP check connects to an SFTP server to check for folder freshness.
The check:

* Verifies the most recently modified file that fulfills the `minAge` and `maxAge` constraints. (each an optional bound)
* Verifies files present in the mount is more than `minCount`.

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
| **`auth`** | Username and password value, configMapKeyRef or SecretKeyRef for SFTP server | [*Authentication*](../concepts/authentication.md) | Yes |
| **`host`** | Host is the server against which check needs to be executed | *string* | Yes |
| `port` | Port for the SSH server. Defaults to 22 | *int* |  |
| `minAge` | The latest object should be older than defined age | *Duration* |  |
| `maxAge` | The latest object should be younger than defined age | *Duration* |  |
| `minCount` | The minimum minimum number of files inside the searchPath | *int* |  |
| `maxCount` | The maximum number of files inside the searchPath | *int* |  |
| `minSize` | The minimum size of the files inside the searchPath | *Size* |  |
| `maxSize` | The max size of the files inside the searchPath | *Size* |  |
| `regex` | Filter files based on regular expression  | *string* |  |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
