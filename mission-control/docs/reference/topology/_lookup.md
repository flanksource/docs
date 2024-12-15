| Field        | Description                                  | Type                                           | Required |
| ------------ | -------------------------------------------- | ---------------------------------------------- | -------- |
| `catalog`    | Lookup catalogs in configDB.                 | [`[]Catalog`](/guide/topology/lookups/catalog)       |          |
| `exec`       | Lookup by running (bash/powershell) scripts. | [`[]Exec`](/guide/topology/lookups/exec)             |          |
| `kubernetes` | Lookup kubernetes resources                  | [`[]Kubernetes`](/guide/topology/lookups/kubernetes) |          |
| `http`       | Lookup an HTTP endpoint.                     | [`[]HTTP`](/guide/topology/lookups/http)             |          |
| `mongodb`    | Query records from a MongoDB /guide/canary-checker/reference/database.       | [`[]MongoDB`](/guide/topology/lookups/mongo)         |          |
| `sql`        | Query records from a MSSQL /guide/canary-checker/reference/database.         | [`[]SQL`](/guide/topology/lookups/sql)               |          |
| `redis`      | Query records from a Redis server.           | [`[]Redis`](/guide/topology/lookups/redis)           |          |
| `prometheus` | Query metrics from Prometheus.               | [`[]Prometheus`](/guide/topology/lookups/prometheus) |          |
