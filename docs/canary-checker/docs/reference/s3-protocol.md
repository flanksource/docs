---
title: S3 Protocol
---

# <Icon name="s3"/> S3 Protocol

<Enterprise/>

:::info
This checks if S3 compatible endpoints (like Minio, EMC ECS) are functioning correctly, to check the contents of
a S3 bucket use: [S3 Bucket](s3-bucket)
:::

The S3 check:

* Lists objects in the bucket to check for Read permissions
* Puts an object into the bucket for Write permissions
* Downloads previously uploaded object to check for Get permissions

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: s3-protocol-check
spec:
  interval: 30
  s3:
    - name: s3-check
      bucketName: flanksource-public
      objectPath: dummy
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`bucket`** | Bucket name to test against | [*Bucket*](#bucket) | Yes |
| **`objectPath`** | Path to create a test object e.g. `s3-dummy/` | *string* | Yes |
| `*` | All other common fields | [*Common*](common) |  |
| **Connection** |  |  |  |
| `connection` | Path of existing connection e.g. `connection://aws/instance`. Mutually exclusive with `accessKey` and `secretKey` <br/> <Commercial/> | [Connection](../concepts/connections) | |
| `accessKey` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| `secretKey` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| `endpoint` | Custom AWS endpoint | *string* | |
| `region` | AWS region | *string* | |
| `skipTLSVerify` | Skip TLS verify when connecting to aws | *bool* |  |
