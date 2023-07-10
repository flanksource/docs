---
title: AWS Config Rule
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/aws-config.svg' style={{height: '32px'}}/> AWS Config Rule

Check if any AWS resources are failing AWS config rule checks.

  ```yaml
  apiVersion: canaries.flanksource.com/v1
  kind: Canary
  metadata:
    name: aws-config-rule
  spec:
    interval: 30
    awsConfigRule:
      - description: "AWS Config Rule Checker"
        name: AWS Config Rule Checker
        rules:
          - "s3-bucket-public-read-prohibited"
        ignoreRules:
          - "s3-bucket-public-write-prohibited"
  ```

| Field             | Description                                                  | Scheme                                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| `rules`           | Specify one or more Config rule names to filter the results by rule. | `[]string`                                        |          |
| `ignoreRules`     | List of rules which would be omitted from the fetch result.  | `[]string`                                        |          |
| `complianceTypes` | Filters the results by compliance. The allowed values are `INSUFFICIENT_DATA`, `NON_COMPLIANT`, `NOT_APPLICABLE`, `COMPLIANT` | `[]string`                                        |          |
| `*`               | All other commons field                                      | [*Common*](common)                             |          |
| **Connection**    |                                                              |                                                   |          |
| `connection`      | Path of existing connection e.g. `connection://aws/instance`/ Mutuall exclusive with `accessKey` | [Connection](../concepts/connections)             |          |
| `accessKey`       | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `secretKey`       | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `endpoint`        | Custom AWS Config endpoint                                   | *string*                                          |          |
| `region`          | AWS region                                                   | *string*                                          |          |
| `skipTLSVerify`   | Skip TLS verify when connecting to AWS                       | *bool*                                            |          |

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
      awsConfigRule:
        - name: AWS Config Rule Checker
          connection: connection://aws/internal
          rules:
            - "s3-bucket-public-read-prohibited"
    ```

3.  `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret.

    ```yaml title="aws.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: aws-config-rule
    spec:
      interval: 30
      awsConfigRule:
        - name: AWS Config Rule Checker
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
          region: us-east-1
          rules:
            - "s3-bucket-public-read-prohibited"
    ```