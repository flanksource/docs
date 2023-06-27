# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/cloudwatch.svg' style='height: 32px'/> CloudWatch

Cloudwatch checks  for all active alarms

```yaml title="cloudwatch-alarms.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: cloudwatch-check
spec:
  interval: 30
  cloudwatch:
    - name: cloudwatch-check
      accessKey:
        valueFrom:
          secretKeyRef:
            key: AWS_ACCESS_KEY_ID
            name: aws-credentials
      secretKey:
        valueFrom:
          secretKeyRef:
            key: AWS_SECRET_ACCESS_KEY
            name: aws-credentials
      region: "us-east-1"
      #skipTLSVerify: true
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of the check | *string* |  |
| `filter` | Used to filter the objects | [`CloudWatchFilter`](#cloudwatchfilter) |  |
| `description` | Description for the check | *string* |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* | |
| `display` | Template to display the result in | [*Template*](../concepts/templating.md) |  |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |

### Connecting to AWS

There are 3 options when connecting to AWS:

1. An AWS [instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) or [pod identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-configuration.html) (the default if no `connection` or `accessKey` is specified)
2. `connection`, this is the recommended method, connections are reusable and secure

    ```yaml title="aws-connection.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: cloudwatch-check
    spec:
      interval: 30
      cloudwatch:
        - connection: connection://aws/internal
          region: us-east-1 # optional if specified in the connection
    ```

3. `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret.

    ```yaml title="aws.yaml"
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: cloudwatch-check
    spec:
      interval: 30
      cloudwatch:
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
    ```

| Field           | Description                                                  | Scheme                                         | Required |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------- | -------- |
| `connection`    | Path of existing connection e.g. `connection://aws/instance`/ | [Connection](../concepts/connections)          |          |
| `accessKey`     |                                                              | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `secretKey`     |                                                              | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
| `endpoint`      | Custom AWS Cloudwatch endpoint                               | *string*                                       |          |
| `region`        | AWS region                                                   | *string*                                       |          |
| `skipTLSVerify` | Skip TLS verify when connecting to aws                       | *bool*                                         |          |

## CloudWatchFilter

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `actionPrefix` | Use to filter the results of the operation to only those alarms that use a certain alarm action. For example, you could specify the ARN of an SNS topic to find all alarms that send notifications to that topic. | *string* |  |
| `alarmPrefix` | Specify to receive information about all alarms that have names that start with this prefix. | *string* |  |
| `alarms` | Set field to retrieve information about alarm | *\[\]string* |  |
| `state` | Specify to retrieve state value of alarm | *string* |  |
