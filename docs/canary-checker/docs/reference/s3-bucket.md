---
title: S3 Bucket
---
# <Icon name="s3"/> S3 Bucket

Checks the contents of a S3 bucket for size, age and count.

See [Folder](../reference/folder) for a full description.

:::info
  This check looks at the contents of an S3 bucket, to verify that an S3 compatible
  object storage endpoint is functioning correctly use: [S3 Protocol](s3-protocol)
:::

```yaml title="folder-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: folder-check
spec:
  interval: 30
  folder:
    - path: s3://some-bucket/folder
      name: folder-check-min
      description: Checks if there are at least 10 files in the folder
      minCount: 10
```

| Field      | Description                                                | Scheme                | Required |
| ---------- | ---------------------------------------------------------- | --------------------- | -------- |
| **`name`** | Name of the check                                          | *string*              | Yes      |
| **`path`** | A path to a S3 bucket and folder e.g. `s3://bucket/folder` | string                | Yes      |
| `awsConnection` | AWS Access credentials | [AWSConnection](#aws-connection) |  |
| `*`          | All other fields available in the folder check             | [*Folder*](folder) |          |

### Connecting to AWS

There are 3 options when connecting to AWS:

1. An AWS [instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) or [pod identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-configuration.html) (the default if no `connection` or `accessKey` is specified)
2. `connection`, this is the recommended method, connections are reusable and secure

    ```yaml title="aws-connection.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name:  aws-config-rule
    spec:
      interval: 30
      folder:
        - path: s3://some-bucket/folder
         awsConnection:
            connection: connection://aws/s3
          name: folder-check-min
          minCount: 10
          description: Checks if there are at least 10 files in the folder

    ```

3. `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret.

    ```yaml title="aws.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: s3-bucket
    spec:
      interval: 30
      folder:
        - path: s3://some-bucket/folder
          name: folder-check-min
          minCount: 10
          description: Checks if there are at least 10 files in the folder
          awsConnection:
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
         region: us-east-1AWS connection fields

| Field           | Description                                                  | Scheme                                            | Required |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| `connection`    | Path of existing connection e.g. `connection://aws/instance` <br/>Mutually exclusive with `accessKey` and `secretKey` <br/> <Commercial/> | [Connection](../concepts/connections)             |          |
| `accessKey`     | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `secretKey`     | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `endpoint`      | Custom AWS endpoint                                          | *string*                                          |          |
| `region`        | AWS region                                                   | *string*                                          |          |
| `skipTLSVerify` | Skip TLS verify when connecting to aws                       | *bool*                                            |          |
