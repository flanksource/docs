| Field        | Description                                  | Type                                          | Required |
| ------------ | -------------------------------------------- | --------------------------------------------- | -------- |
| `catalog`   | Lookup catalogs in configDB.                 | [`[]Catalog`](/topology/lookups/catalog)     |          |
| `exec`       | Lookup by running (bash/powershell) scripts. | [`[]Exec`](/topology/lookups/exec)             |          |
| `kubernetes` | Lookup kubernetes resources                  | [`[]Kubernetes`](/topology/lookups/kubernetes) |          |
| `http`       | Lookup an HTTP endpoint.                     | [`[]HTTP`](/topology/lookups/http)             |          |
| `mongodb`    | Query records from a MongoDB database.       | [`[]MongoDB`](/topology/lookups/mongo)         |          |
| `sql`      | Query records from a MSSQL database.         | [`[]SQL`](/topology/lookups/sql)           |          |
| `redis`      | Query records from a Redis server.           | [`[]Redis`](/topology/lookups/redis)           |          |
| `prometheus` | Query metrics from Prometheus.               | [`[]Prometheus`](/topology/lookups/prometheus) |          |
