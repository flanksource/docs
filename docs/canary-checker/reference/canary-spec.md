# Canary Spec

| Field            | Description                                                                                   | Type                                                | Required |
| ---------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| `env`            | Environment variables.                                                                        | `map[string]`[`VarSource`](#varsource)              |          |
| `schedule`       | Schedule to run checks on.<br>Supports all cron expression.<br>Also supports golang duration. | `string`                                            |          |
| `icon`           | Icon to use for the check.                                                                    | `string`                                            |          |
| `severity`       | Severity of the check.                                                                        | `string`                                            |          |
| `owner`          | Owner of the check.                                                                           | `string`                                            |          |
| `resultmode`     | Result mode of the check.                                                                     | `string`                                            |          |
| `http`           | List of HTTP checks to run.                                                                   | [`[]HTTPCheck`](./http.md)                          |          |
| `dns`            | List of DNS checks to run.                                                                    | [`[]DNSCheck`](./dns.md)                            |          |
| `docker`         | List of Docker pull checks to run.                                                            | [`[]DockerPullCheck`](./docker-pull.md)             |          |
| `dockerPush`     | List of Docker push checks to run.                                                            | [`[]DockerPushCheck`](./docker-push.md)             |          |
| `containerd`     | List of containerd pull checks to run.                                                        | [`[]ContainerdPullCheck`](./containerd-pull.md)     |          |
| `containerdPush` | List of containerd push checks to run.                                                        | [`[]ContainerdPushCheck`](./containerd-push.md)     |          |
| `s3`             | List of S3 checks to run.                                                                     | [`[]S3Check`](./s3.md)                              |          |
| `tcp`            | List of TCP checks to run.                                                                    | [`[]TCPCheck`]()                                    |          |
| `pod`            | List of pod checks to run.                                                                    | [`[]PodCheck`](./pod.md)                            |          |
| `ldap`           | List of LDAP checks to run.                                                                   | [`[]LDAPCheck`](./ldap.md)                          |          |
| `icmp`           | List of ICMP checks to run.                                                                   | [`[]ICMPCheck`](./icmp.md)                          |          |
| `postgres`       | List of Postgres checks to run.                                                               | [`[]PostgresCheck`](./postgres.md)                  |          |
| `mssql`          | List of MSSQL checks to run.                                                                  | [`[]MssqlCheck`](./mssql.md)                        |          |
| `mysql`          | List of MySQL checks to run.                                                                  | [`[]MysqlCheck`](./mysql.md)                        |          |
| `restic`         | List of restic backup checks to run.                                                          | [`[]ResticCheck`](./restic.md)                      |          |
| `jmeter`         | List of JMeter load test checks to run.                                                       | [`[]JmeterCheck`](./jmeter.md)                      |          |
| `junit`          | List of JUnit test result checks to run.                                                      | [`[]JunitCheck`](./junit.md)                        |          |
| `helm`           | List of Helm checks to run.                                                                   | [`[]HelmCheck`](./helm.md)                          |          |
| `namespace`      | List of namespace checks to run.                                                              | [`[]NamespaceCheck`](./namespace.md)                |          |
| `redis`          | List of Redis checks to run.                                                                  | [`[]RedisCheck`](./redis.md)                        |          |
| `ec2`            | List of EC2 checks to run.                                                                    | [`[]EC2Check`](./ec2.md)                            |          |
| `prometheus`     | List of Prometheus checks to run.                                                             | [`[]PrometheusCheck`](./prometheus.md)              |          |
| `mongodb`        | List of MongoDB checks to run.                                                                | [`[]MongoDBCheck`](./mongo.md)                      |          |
| `cloudwatch`     | List of CloudWatch checks to run.                                                             | [`[]CloudWatchCheck`](./cloudwatch.md)              |          |
| `github`         | List of GitHub checks to run.                                                                 | [`[]GitHubCheck`](./github.md)                      |          |
| `kubernetes`     | List of Kubernetes checks to run.                                                             | [`[]KubernetesCheck`](./kubernetes.md)              |          |
| `folder`         | List of folder checks to run.                                                                 | [`[]FolderCheck`]()                                 |          |
| `exec`           | List of exec checks to run.                                                                   | [`[]ExecCheck`](./exec.md)                          |          |
| `awsConfig`      | List of AWS Config checks to run.                                                             | [`[]AwsConfigCheck`]()                              |          |
| `awsConfigRule`  | List of AWS Config Rule checks to run.                                                        | [`[]AwsConfigRuleCheck`]()                          |          |
| `databaseBackup` | List of database backup checks to run.                                                        | [`[]DatabaseBackupCheck`](./gcs-database-backup.md) |          |
| `configDB`       | List of config DB checks to run.                                                              | [`[]ConfigDBCheck`](./configdb.md)                  |          |
| `elasticsearch`  | List of Elasticsearch checks to run.                                                          | [`[]ElasticsearchCheck`](./elasticsearch.md)        |          |
| `alertmanager`   | List of AlertManager checks to run.                                                           | [`[]AlertManagerCheck`](./alert-manager.md)         |          |

## Scheme Reference

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

### ConfigMapKeySelector

| Field      | Description                                              | Type     | Required |
| ---------- | -------------------------------------------------------- | -------- | -------- |
| `name`     | Name of the referent.                                    | `string` |          |
| `key`      | The key to select.                                       | `string` |          |
| `optional` | Specify whether the ConfigMap or its key must be defined | `bool`   |          |

### SecretKeySelector

| Field      | Description                                                       | Type     | Required |
| ---------- | ----------------------------------------------------------------- | -------- | -------- |
| `name`     | Name of the referent.                                             | `string` |          |
| `key`      | The key of the secret to select from. Must be a valid secret key. | `string` |          |
| `optional` | Specify whether the Secret or its key must be defined             | `bool`   |          |
