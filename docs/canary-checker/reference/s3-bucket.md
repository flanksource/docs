# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/s3Bucket.svg' style='height: 32px'/> S3Bucket

The S3Bucket Check:

* Searches objects matching the provided object path pattern.
* Checks that the latest object is no older than provided `MaxAge` value in seconds
* Checks that the latest object size is not smaller than provided `MinSize` value in bytes.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: s3-bucket-check
spec:
  interval: 30
  s3Bucket:
    # Check for any backup not older than 7 days and min size 25 bytes
    - name: s3-backup
      bucket: tests-e2e-1
      accessKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_ACCESS_KEY_ID
      secretKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_SECRET_ACCESS_KEY
      region: "minio"
      endpoint: "http://minio.minio:9000"
      filter:
        regex: "(.*)backup.zip$"
      maxAge: 7d
      minSize: 25b
      usePathStyle: true
      skipTLSVerify: true
    # Check for any mysql backup not older than 7 days and min size 25 bytes
    - name: s3-sql-backup
      bucket: tests-e2e-1
      accessKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_ACCESS_KEY_ID
      secretKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_SECRET_ACCESS_KEY
      region: "minio"
      endpoint: "http://minio.minio:9000"
      filter:
        regex: "mysql\\/backups\\/(.*)\\/mysql.zip$"
      maxAge: 7d
      minSize: 25b
      usePathStyle: true
      skipTLSVerify: true
    # Check for any pg backup not older than 7 days and min size 50 bytes
    - name: s3-pg-backup
      bucket: tests-e2e-1
      accessKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_ACCESS_KEY_ID
      secretKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_SECRET_ACCESS_KEY
      region: "minio"
      endpoint: "http://minio.minio:9000"
      filter:
        regex: "pg\\/backups\\/(.*)\\/backup.zip$"
      maxAge: 7d
      minSize: 25b
      usePathStyle: true
      skipTLSVerify: true

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of the check | *string* |  |

| **`accessKey`** | Access key value or valueFrom configMapKeyRef or SecretKeyRef to access your s3 | [***kommons.EnvVar***](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`secretKey`** | secret key value or valueFrom configMapKeyRef or SecretKeyRef to access your s3/minio bucket | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |

| **`bucket`** | Array of [Bucket](#bucket) objects to be checked | [Bucket](#bucket) | Yes |
| `description` | Description for the check | *string* |  |
| `display` | Template to display the result in | [Template](../concepts/templating.md) |  |
| `endpoint` | S3/Minio HTTP Endpoint to establish connection | *string* |  |
| `region` | Region where S3 bucket is located | *string* |  |
| `filter` | Used to filter the objects  | [*FolderFilter*](#folderfilter) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `minAge` | The latest object should be older than defined age | *Duration* |  |
| `maxAge` | The latest object should be younger than defined age | *Duration* |  |
| `minCount` | The minimum minimum number of files inside the searchPath | *int* |  |
| `maxCount` | The maximum number of files inside the searchPath | *int* |  |
| `minSize` | The minimum size of the files inside the searchPath | *Size* |  |
| `maxSize` | The max size of the files inside the searchPath | *Size* |  |
| `regex` | Filter files based on regular expression  | *string* |  |
| `objectPath` | glob path to restrict matches to a subset | *string* |  |
| `skipTLSVerify` | Skip TLS verify when connecting to aws | *bool* |  |
| `test`| Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `usePathStyle` | Use path style path: <http://s3.amazonaws.com/BUCKET/KEY> instead of <http://BUCKET.s3.amazonaws.com/KEY> | *bool* |  |
