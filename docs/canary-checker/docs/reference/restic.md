---
title: Restic
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/restic.svg' style={{height: '32px'}}/> Restic

The Restic check:

* Queries a Restic Repository for content
* Checks the integrity and consistency of the repository and data-blobs
* Checks for backup freshness.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: restic-check
spec:
  interval: 30
  restic:
    - repository: s3:http://minio.minio:9000/restic-canary-checker
      name: restic check
      password:
        valueFrom:
          secretKeyRef:
            name: restic-credentials
            key: PASSWORD
      maxAge: 1h
      accessKey:
        valueFrom:
          secretKeyRef:
            name: restic-credentials
            key: ACCESS_KEY_ID
      secretKey:
        valueFrom:
          secretKeyRef:
            name: restic-credentials
            key: SECRET_ACCESS_KEY
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`maxAge`** | MaxAge for backup freshness | string | Yes |
| **`repository`** | The restic repository path eg: rest:<https://user:pass@host:8000/> or rest:<https://host:8000/> or s3:s3.amazonaws.com/bucket_name | string | Yes |
| `caCert` | CaCert path to the root cert. In case of self-signed certificates | string |  |
| `checkIntegrity` | When enabled will check the Integrity and consistency of the restic repository | bool |  |
| `*` | All other common fields | [*Common*](common) | |
| **Encryption Connection** |  |  | |
| `connection` | Path of existing connection to get encryption key e.g. `connection://restic/key`/ Mutuall exclusive with `password` | [Connection](../concepts/connections) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| **AWS Connection** |  |  | |
| `awsConnectionName` | Path of existing connection to connect to S3 e.g. `connection://aws/instance`/ Mutuall exclusive with `accessKey` | [Connection](../concepts/connections) | |
| `accessKey` | Mutually exclusive with `awsConnectionName` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| `secretKey` | Mutually exclusive with `awsConnectionName` | [*EnvVar*](../../concepts/authentication/#envvar) | Yes |
| `endpoint` | Custom AWS Config endpoint | *string* | |
| `region` | AWS region | *string* | |
| `skipTLSVerify` | Skip TLS verify when connecting to AWS | *bool* | |
