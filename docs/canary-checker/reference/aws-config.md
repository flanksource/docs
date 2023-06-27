# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/aws-config.svg' style='height: 32px'/> AWS Config

AWS Config checks .

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: exec-check
spec:
  interval: 30
  awsConfig:
    - description: "Check the config"
      name: config check
      query: "SELECT * FROM aws_config_rule"
```

| Field            | Description                                        | Scheme                                  | Required |
| ---------------- | -------------------------------------------------- | --------------------------------------- | -------- |
| **`name`**       | Name of the check                                  | `string`                                |          |
| `description`    | Description for the check                          | `string`                                |          |
| `icon`           | Icon for overwriting default icon on the dashboard | `string`                                |          |
| `labels`         | Labels for check                                   | `map[string]string`                     |          |
| `test`           | Template to test the result against                | [`Template`](../concepts/templating.md) |          |
| `display`        | Template to display the result in                  | [`Template`](../concepts/templating.md) |          |
| `transform`      | Template for transformation                        | [`Template`](../concepts/templating.md) |          |
| **`query`**      | The SQL query SELECT command                       | `string`                                | `true`   |
| `awsConnection`  | AWS connection details.                            | [`AWSConnection`](#awsconnection)       |          |
| `aggregatorName` | Specify the name of the configuration aggregator   | `string`                                |          |

---

### Connecting to AWS

There are 3 options when connecting to AWS:

1. An AWS [instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) or [pod identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-configuration.html) (the default if no `connection` or `accessKey` is specified)

     ```yaml title="aws-config.yaml"
     apiVersion: canaries.flanksource.com/v1
     kind: Canary
     metadata:
       name:  aws-config-rule
     spec:
       interval: 30
       awsConfig:
         - name: AWS Config check
           query: "SELECT * FROM aws_config_rule"
     ```

2. `connection`, this is the recommended method, connections are reusable and secure

    ```yaml title="aws-connection.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name:  aws-config-rule
    spec:
      interval: 30
      awsConfig:
        - name: AWS Config check
          connection: connection://aws/internal
          query: "SELECT * FROM aws_config_rule"
    ```

3.  `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret

    ```yaml title="aws-static.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: aws-config-rule
    spec:
      interval: 30
      awsConfig:
        - accessKey:
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
         name: AWS Config check
         query: "SELECT * FROM aws_config_rule"
    ```

| Field           | Description                                                  | Scheme                                         | Required |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------- | -------- |
| `connection`    | Path of existing connection e.g. `connection://aws/instance`/ Mutuall exclusive with `accessKey` | [Connection](../concepts/connections)          |          |
| `accessKey`     | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `secretKey`     | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `endpoint`      | Custom AWS Config endpoint                                   | *string*                                       |          |
| `region`        | AWS region                                                   | *string*                                       |          |
| `skipTLSVerify` | Skip TLS verify when connecting to AWS                       | *bool*                                         |          |
