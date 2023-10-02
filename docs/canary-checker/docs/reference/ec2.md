---
title: EC2
---

# <Icon name="aws-ec2-instance"/> EC2

<Enterprise/>

This check connects to an AWS account with the specified credentials, launch an EC2 instance with an option for `userData`.
This test can be used to check the availability of an ami, account service limits, run backup & restore operations, etc.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: ec2-check
spec:
  interval: 30
  ec2:
    - name: ec2-check
      ami: ami-04f7efe62f419d9f5
      description: test instance
      accessKeyID:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_ACCESS_KEY_ID
      secretKey:
        valueFrom:
          secretKeyRef:
            name: aws-credentials
            key: AWS_SECRET_ACCESS_KEY
      region: af-south-1
      userData: |
        #!/bin/bash
        yum install -y httpd
        systemctl start httpd
        systemctl enable httpd
        usermod -a -G apache ec2-user
        chown -R ec2-user:apache /var/www
        chmod 2775 /var/www
        find /var/www -type d -exec chmod 2775 {} \;
        find /var/www -type f -exec chmod 0664 {} \;
      securityGroup: WebAccess
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `ami` | Master image to create EC2 instance from | string | Yes |
| `canaryRef` | Reference Canary object | \[\][*v1.LocalObjectReference*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#localobjectreference-v1-core) |  |
| `keepAlive` | Toggle keepalive with `true` or `false` | *bool* |  |
| `securityGroup` | Security groups to attach to the EC2 instance | *string* |  |
| `timeout` | Set keep-alive timeout | *int* |  |
| `userData` | Configure EC2 instance with user data | *string* |  |
| `waitTime` | Set wait-time for EC2 instance launch | *int* |  |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://aws/instance`<br/>*Mutually exclusive with `accessKey` and `secretKey`* <br/> <Commercial/> | [Connection](../concepts/connections) | |
| `accessKey` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `secretKey` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `endpoint` | Custom AWS endpoint | *string* | |
| `region` | AWS region | *string* | |
| `skipTLSVerify` | Skip TLS verify when connecting to aws | *bool* | |

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

3. `accessKey` and `secretKey` [*EnvVar*](../../concepts/authentication/#envvar) with the credentials stored in a secret.

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
