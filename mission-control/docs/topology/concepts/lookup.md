# Component lookup

Lookup enables you to form components from an external source eg: an HTTP endpoint or a database.
The response from the external sources are then "shaped" to a component using the `display` field.
The `display` field contains several scripting mechanism to transform any arbitrary data to a [component](../references/components.md).

```yaml title="users-topology.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: users
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Users
      type: Employees
      icon: person
      // highlight-start
      lookup:
        http:
          - url: https://jsonplaceholder.typicode.com/users
            display:
              expr: |
                dyn(json).map(c, {
                  'name': c.name,
                  'type': 'person',
                }).toJSON()
      // highlight-end
```

This topology will create a root **"users"** component with all the users returned by the HTTP endpoint as its child components.

| Field        | Description                                  | Type                                          | Required |
| ------------ | -------------------------------------------- | --------------------------------------------- | -------- |
| `configDB`   | Lookup catalogs in configDB.                 | [`[]ConfigDB`](../references/configdb.md)     |          |
| `exec`       | Lookup by running (bash/powershell) scripts. | [`[]Exec`](../references/exec.md)             |          |
| `kubernetes` | Lookup kubernetes resources                  | [`[]Kubernetes`](../references/kubernetes.md) |          |
| `http`       | Lookup an HTTP endpoint.                     | [`[]HTTP`](../references/http.md)             |          |
| `mongodb`    | Query records from a MongoDB database.       | [`[]MongoDB`](../references/mongo.md)         |          |
| `mssql`      | Query records from a MSSQL database.         | [`[]Mssql`](../references/mssql.md)           |          |
| `mysql`      | Query records from a MySQL database.         | [`[]Mysql`](../references/mysql.md)           |          |
| `postgres`   | Query records from a Postgres database.      | [`[]Postgres`](../references/postgres.md)     |          |
| `redis`      | Query records from a Redis server.           | [`[]Redis`](../references/redis.md)           |          |
| `prometheus` | Query metrics from Prometheus.               | [`[]Prometheus`](../references/prometheus.md) |          |

## For Each

You might find that a lookup by itself can be limited for some use cases. That's where the `forEach` operation comes in.
The `forEach` operation is applied to each component formed by the lookup.

In the example above, we can apply a unique property to each of those user components using `forEach`.

```yaml title="users-topology.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: users
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Users
      type: Employees
      icon: person
      lookup:
        http:
          - url: https://jsonplaceholder.typicode.com/users
            display:
              expr: |
                dyn(json).map(c, {
                  'name': c.name,
                  'type': 'person',
                }).toJSON()
      // highlight-start
      forEach:
        properties:
          - name: Posts
            lookup:
              http:
                - url: https://jsonplaceholder.typicode.com/posts
                  display:
                    javascript: |
                      // NOTE: Need to get post count for each component.
                      // However, you don't have access to the component name 
                      // at all.
                      let postCount = {}
                      for (i = 0; i < json.length; i++) {
                        postCount[json[i].name] = postCount[json[i].name] + 1 || 1
                      }

                      let output = []
                      for (const [key, value] of Object.entries(postCount)) {
                        output.push({ name: key, text: value })
                      }
                      JSON.stringify(output)
      // highlight-end
```

| Field           | Description                                     | Scheme                                                       | Required |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------ | -------- |
| `components`    | Create sub-components for each component        | [`[]Component`](../references/components.md)                 |          |
| `properties`    | Create or lookup properties for each component  | [`[]Property`](./properties.md)                              |          |
| `configs`       | Link configuration items for each component     | [`[]ConfigSelector`](./catalog.md#config-selector)           |          |
| `checks`        | Create or link health checks for each component | [`[]CheckSelector`](./health-checks.md#check)                |          |
| `selectors`     | Create or link health checks for each component | [`[]ResourceSelector`](../../reference/resource_selector.md) |          |
| `relationships` | Create or link health checks for each component | [`[]RelationshipSpec`](#relationship-spec)                   |          |

### Relationship Spec

| Field  | Description                                                                              | Scheme   | Required |
| ------ | ---------------------------------------------------------------------------------------- | -------- | -------- |
| `ref`  | Set reference for components relationship                                                | `string` |          |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | `string` |          |
