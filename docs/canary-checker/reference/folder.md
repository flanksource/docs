# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/folder.svg' style='height: 32px'/> Folder

Folder Check checks if a given folder exists or not. In addition to supporting local folder check it also supports other protocols like

- Cloud Object storage (example: AWS S3 and Google Cloud Storage)
- SMB
- SFTP

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: exec-check
    spec:
      interval: 30
      exec:
      - description: "Check the secret folder"
        name: secret folder check
				path: /home/flanksource/secrets
    ```

| Field            | Description                                                                                           | Scheme                              | Required |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| `name`           | Name of the check                                                                                     | `string`                            |          |
| `description`    | Description for the check                                                                             | `string`                            |          |
| `icon`           | Icon for overwriting default icon on the dashboard                                                    | `string`                            |          |
| `labels`         | Labels for check                                                                                      | `map[string]string`                 |          |
| `test`           | Template to test the result against                                                                   | [`Template`](#template)             |          |
| `display`        | Template to display the result in                                                                     | [`Template`](#template)             |          |
| `transform`      | Template for transformation                                                                           | [`Template`](#template)             |          |
| `path`           | Path to folder or object storage, e.g. `s3://<bucket-name>`, `gcs://<bucket-name>`, `/path/tp/folder` | `string`                            |          |
| `filter`         | Specify filters                                                                                       | [`FolderFilter`](#folderfilter)     |          |
| `awsConnection`  | AWS connection details for S3 bucket                                                                  | [`AWSConnection`](#awsconnection)   |          |
| `gcpConnection`  | GCP connection details for GCS bucket                                                                 | [`GCPConnection`](#gcpconnection)   |          |
| `smbConnection`  | SMB connection details for SMB bucket                                                                 | [`SMBConnection`](#smbconnection)   |          |
| `sftpConnection` | SFTP connection details for SFTP bucket                                                               | [`SFTPConnection`](#sftpconnection) |          |

---

## Scheme Reference

### Template

| Field        | Description                                      | Scheme   | Required |
| ------------ | ------------------------------------------------ | -------- | -------- |
| `jsonPath`   | Specify path to JSON element for use in template | `string` |          |
| `template`   | Specify Go template for use                      | `string` |          |
| `expr`       | Specify expression for use in template           | `string` |          |
| `javascript` | Specify javascript syntax to run for template    | `string` |          |

### FolderFilter

| Field     | Description | Scheme                  | Required |
| --------- | ----------- | ----------------------- | -------- |
| `minAge`  |             | [`Duration`](#duration) |          |
| `maxAge`  |             | [`Duration`](#duration) |          |
| `minSize` |             | [`Size`](#size)         |          |
| `maxSize` |             | [`Size`](#size)         |          |
| `regex`   |             | `string`                |          |

### AWSConnection

| Field           | Description                                                                                           | Scheme                                                                       | Required |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| `accessKey`     | Specify the access key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `secretKey`     | Specify the secret key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `region`        | Specify the region                                                                                    | `string`                                                                     |          |
| `endpoint`      | Specify the endpoint                                                                                  | `string`                                                                     |          |
| `skipTLSVerify` | Skip TLS verification when connecting to AWS                                                          | `bool`                                                                       |          |
| `objectPath`    | Glob path to restrict matches to a subset                                                             | `string`                                                                     |          |
| `usePathStyle`  | Use path style path: http://s3.amazonaws.com/BUCKET/KEY instead of http://BUCKET.s3.amazonaws.com/KEY | `bool`                                                                       |          |

### GCPConnection

| Field         | Description             | Scheme                                                                       | Required |
| ------------- | ----------------------- | ---------------------------------------------------------------------------- | -------- |
| `endpoint`    | Specify the endpoint    | `string`                                                                     |          |
| `credentials` | Specify the credentials | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |

### SMBConnection

| Field         | Description                                          | Scheme   | Required |
| ------------- | ---------------------------------------------------- | -------- | -------- |
| `port`        | Port on which smb server is running. Defaults to 445 | `int`    |          |
| `auth`        | Authentication details for the SMB server            |          |          |
| `domain`      | Domain                                               | `string` |          |
| `workstation` | Workstation                                          | `string` |          |
| `sharename`   | Sharename to mount from the samba server             | `string` |          |
| `searchPath`  | Sub-path inside the mount location                   | `string` |          |

### SFTPConnection

| Field  | Description                                | Scheme   | Required |
| ------ | ------------------------------------------ | -------- | -------- |
| `port` | Port for the SSH server. Defaults to 22    | `int`    |          |
| `host` | Hostname of the SFTP server                | `string` |          |
| `auth` | Authentication details for the SFTP server |          |          |

### Authentication

| Field      | Description | Scheme                                                                       | Required |
| ---------- | ----------- | ---------------------------------------------------------------------------- | -------- |
| `username` | Username    | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `password` | Password    | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
