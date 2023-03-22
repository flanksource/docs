# Canary Spec

| Field            | Description                                                                                                                                                                                                | Type                                   | Required |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------- |
| `env`            | Environment variables.                                                                                                                                                                                     | `map[string]`[`VarSource`](#varsource) |          |
| `schedule`       | Schedule to run checks on. Supports all cron expression, example: '30 3-6,20-23 \* \* \*'. Also supports golang duration, can be set as '@every 1m30s' which runs the check every 1 minute and 30 seconds. | `string`                               |          |
| `icon`           | Icon to use for the check.                                                                                                                                                                                 | `string`                               |          |
| `severity`       | Severity of the check.                                                                                                                                                                                     | `string`                               |          |
| `owner`          | Owner of the check.                                                                                                                                                                                        | `string`                               |          |
| `resultmode`     | Result mode of the check.                                                                                                                                                                                  | `string`                               |          |
| `http`           | List of HTTP checks to run.                                                                                                                                                                                | `[]HTTPCheck`                          |          |
| `dns`            | List of DNS checks to run.                                                                                                                                                                                 | `[]DNSCheck`                           |          |
| `docker`         | List of Docker pull checks to run.                                                                                                                                                                         | `[]DockerPullCheck`                    |          |
| `dockerPush`     | List of Docker push checks to run.                                                                                                                                                                         | `[]DockerPushCheck`                    |          |
| `containerd`     | List of containerd pull checks to run.                                                                                                                                                                     | `[]ContainerdPullCheck`                |          |
| `containerdPush` | List of containerd push checks to run.                                                                                                                                                                     | `[]ContainerdPushCheck`                |          |
| `s3`             | List of S3 checks to run.                                                                                                                                                                                  | `[]S3Check`                            |          |
| `tcp`            | List of TCP checks to run.                                                                                                                                                                                 | `[]TCPCheck`                           |          |
| `pod`            | List of pod checks to run.                                                                                                                                                                                 | `[]PodCheck`                           |          |
| `ldap`           | List of LDAP checks to run.                                                                                                                                                                                | `[]LDAPCheck`                          |          |
| `icmp`           | List of ICMP checks to run.                                                                                                                                                                                | `[]ICMPCheck`                          |          |
| `postgres`       | List of Postgres checks to run.                                                                                                                                                                            | `[]PostgresCheck`                      |          |
| `mssql`          | List of MSSQL checks to run.                                                                                                                                                                               | `[]MssqlCheck`                         |          |
| `mysql`          | List of MySQL checks to run.                                                                                                                                                                               | `[]MysqlCheck`                         |          |
| `restic`         | List of restic backup checks to run.                                                                                                                                                                       | `[]ResticCheck`                        |          |
| `jmeter`         | List of JMeter load test checks to run.                                                                                                                                                                    | `[]JmeterCheck`                        |          |
| `junit`          | List of JUnit test result checks to run.                                                                                                                                                                   | `[]JunitCheck`                         |          |
| `helm`           | List of Helm checks to run.                                                                                                                                                                                | `[]HelmCheck`                          |          |
| `namespace`      | List of namespace checks to run.                                                                                                                                                                           | `[]NamespaceCheck`                     |          |
| `redis`          | List of Redis checks to run.                                                                                                                                                                               | `[]RedisCheck`                         |          |
| `ec2`            | List of EC2 checks to run.                                                                                                                                                                                 | `[]EC2Check`                           |          |
| `prometheus`     | List of Prometheus checks to run.                                                                                                                                                                          | `[]PrometheusCheck`                    |          |
| `mongodb`        | List of MongoDB checks to run.                                                                                                                                                                             | `[]MongoDBCheck`                       |          |
| `cloudwatch`     | List of CloudWatch checks to run.                                                                                                                                                                          | `[]CloudWatchCheck`                    |          |
| `github`         | List of GitHub checks to run.                                                                                                                                                                              | `[]GitHubCheck`                        |          |
| `kubernetes`     | List of Kubernetes checks to run.                                                                                                                                                                          | `[]KubernetesCheck`                    |          |
| `folder`         | List of folder checks to run.                                                                                                                                                                              | `[]FolderCheck`                        |          |
| `exec`           | List of exec checks to run.                                                                                                                                                                                | `[]ExecCheck`                          |          |
| `awsConfig`      | List of AWS Config checks to run.                                                                                                                                                                          | `[]AwsConfigCheck`                     |          |
| `awsConfigRule`  | List of AWS Config Rule checks to run.                                                                                                                                                                     | `[]AwsConfigRuleCheck`                 |          |
| `databaseBackup` | List of database backup checks to run.                                                                                                                                                                     | `[]DatabaseBackupCheck`                |          |
| `configDB`       | List of config DB checks to run.                                                                                                                                                                           | `[]ConfigDBCheck`                      |          |
| `elasticsearch`  | List of Elasticsearch checks to run.                                                                                                                                                                       | `[]ElasticsearchCheck`                 |          |
| `alertmanager`   | List of AlertManager checks to run.                                                                                                                                                                        | `[]AlertManagerCheck`                  |          |

### VarSource

| Field             | Description                                                                                                                                                                                        | Type                                            | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| `value`           |                                                                                                                                                                                                    | `string`                                        |          |
| `fieldRef`        | Selects a field of the pod: supports metadata.name, metadata.namespace, metadata.labels, metadata.annotations, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs. | [`ObjectFieldSelector`](#objectfieldselector)   |          |
| `configMapKeyRef` | Selects a key of a ConfigMap.                                                                                                                                                                      | [`ConfigMapKeySelector`](#configmapkeyselector) |          |
| `secretKeyRef`    | Selects a key of a secret in the pod's namespace                                                                                                                                                   | [`SecretKeySelector`](#secretkeyselector)       |          |

### ObjectFieldSelector

| Field        | Description                                                                   | Type     | Required |
| ------------ | ----------------------------------------------------------------------------- | -------- | -------- |
| `apiVersion` | Version of the schema the FieldPath is written in terms of, defaults to "v1". | `string` |          |
| `fieldPath`  | Path of the field to select in the specified API version.                     | `string` |          |

## ConfigMapKeySelector

| Field      | Description                                              | Type     | Required |
| ---------- | -------------------------------------------------------- | -------- | -------- |
| `name`     | Name of the referent.                                    | `string` |          |
| `key`      | The key to select.                                       | `string` |          |
| `optional` | Specify whether the ConfigMap or its key must be defined | `bool`   |          |

## SecretKeySelector

| Field      | Description                                                       | Type     | Required |
| ---------- | ----------------------------------------------------------------- | -------- | -------- |
| `name`     | Name of the referent.                                             | `string` |          |
| `key`      | The key of the secret to select from. Must be a valid secret key. | `string` |          |
| `optional` | Specify whether the Secret or its key must be defined             | `bool`   |          |
