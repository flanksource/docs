Lookup helps you in defining component definitions from an external source. You can use the forEach property to iterate over the results to further enrich each component.

## Lookup

| Field        | Description                       | Type                                               | Required |
| ------------ | --------------------------------- | -------------------------------------------------- | -------- |
| `configDB`   | List of config DB checks to run.  | [`[]ConfigDBCheck`](../references/configdb.md)     |          |
| `exec`       | List of exec checks to run.       | [`[]ExecCheck`](../references/exec.md)             |          |
| `http`       | List of HTTP checks to run.       | [`[]HTTPCheck`](../references/http.md)             |          |
| `kubernetes` | List of Kubernetes checks to run. | [`[]KubernetesCheck`](../references/kubernetes.md) |          |
| `mongodb`    | List of MongoDB checks to run.    | [`[]MongoDBCheck`](../references/mongo.md)         |          |
| `mssql`      | List of MSSQL checks to run.      | [`[]MssqlCheck`](../references/mssql.md)           |          |
| `mysql`      | List of MySQL checks to run.      | [`[]MysqlCheck`](../references/mysql.md)           |          |
| `postgres`   | List of Postgres checks to run.   | [`[]PostgresCheck`](../references/postgres.md)     |          |
| `prometheus` | List of Prometheus checks to run. | [`[]PrometheusCheck`](../references/prometheus.md) |          |
| `redis`      | List of Redis checks to run.      | [`[]RedisCheck`](../references/redis.md)           |          |
