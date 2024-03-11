# Component lookup

Lookup enables you to form components from an external source eg: an HTTP endpoint, kubernetes clusters or a database.
The response from the external sources are then "shaped" to a component using the `display` field.
The `display` field contains several scripting mechanism to transform any arbitrary data to a [component](../references/components.md).

```yaml title="kubernetes-ingress-classes.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-ingress-classes
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Ingress
      type: Ingress
      icon: server
      // highlight-start
      lookup:
        configDB:
          - query: SELECT name FROM config_items WHERE type = 'Kubernetes::IngressClass'
            expr: |
              dyn(results).map(e, {
                'name': e.name,
                'type': "Ingress",
              }).toJSON()
      // highlight-end
```

This topology will create a root **"Ingress"** component with all the ingresses in a kubernetes cluster as its child components.

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

The forEach operation allows you to perform operations that you would apply to all the components crafted during the lookup phase.

In the example above, we can add a kubernetes check on each of the ingresses as follows

```yaml title="kubernetes-ingress-classes.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-ingress-classes
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Ingress
      type: Ingress
      icon: server
      lookup:
        configDB:
          - query: SELECT name FROM config_items WHERE type = 'Kubernetes::IngressClass'
            expr: |
              dyn(results).map(e, {
                'name': e.name,
                'type': "Ingress",
              }).toJSON()
      // highlight-start
      forEach:
        checks:
          - inline:
              kubernetes:
                - kind: Pod
                  ready: true
                  resource:
                    labelSelector: 'app.kubernetes.io/name=ingress-{{.component.name}}&app.kubernetes.io/component=controller'
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

## Templating

All the fields in forEach are templatable. They receive the following two variables:

| Field        | Description                | Scheme                                       |
| ------------ | -------------------------- | -------------------------------------------- |
| `component`  | Component from the lookup  | [`[]Component`](../references/components.md) |
| `properties` | The component's properties | `map[string]any`                             |

### Relationship Spec

| Field  | Description                                                                              | Scheme   | Required |
| ------ | ---------------------------------------------------------------------------------------- | -------- | -------- |
| `ref`  | Set reference for components relationship                                                | `string` |          |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | `string` |          |
