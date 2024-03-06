# For Each

Lookup component definitions from an external source, use the
forEach property to iterate over the results to further enrich each component.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: acme-app
spec:
  icon: oracle_icon
  id:
    expr: $.external_id
  name: OIPA
  type: virtual
  components:
    // highlight-start
    - forEach:
        configs:
          - name: ${.component.name}
            type: OIPA
          - labels:
              namespace: ${.properties.namespace}
            name: PAS.properties
            type: File
      // highlight-end
      type: virtual
      lookup:
        postgres:
          - auth:
              password:
                value: postgres
              username:
                value: postgres
            connection: 'postgres://$(username):$(password)@localhost:5432/incident_commander?sslmode=disable'
            query: SELECT * from config_items where config_type = 'OIPA' and name = 'dev-qa' ;
            display:
              javascript: |
                var components = []
                for (var i = 0; i < this.results.Rows.length; i++) {
                  var row = this.results.Rows[i]
                  var config = JSON.parse(row.config)

                  components.push({
                    icon: 'oracle_icon',
                    external_id: row.name,
                    type: 'OIPA',
                    name: row.name,
                    properties: [
                      {
                        value: 1000 + Math.floor(Math.random() * 1000),
                        max: 2000,
                        icon: "cost",
                        label: "Cost",
                        name: "cost",
                        type: "currency",
                        unit: "USD",
                        headline: true
                      },
                      {
                        type: "url",
                        text: "https://" + config.domain,
                        icon: "world"
                      },
                      {
                        type: "text",
                        icon: "namespace",
                        text: config.namespace,
                        name: "namespace"
                      },
                      {
                        type: "text",
                        icon: "sqlserver",
                        text: config.db.name,
                        name: "db"
                      },
                      {
                        text: config.efs,
                        icon: "folder",
                        label: "efs"
                      },
                    ]
                  })
                }
                JSON.stringify(components);
```

| Field           | Description                                     | Scheme                                                       | Required |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------ | -------- |
| `components`    | Create sub-components for each component        | [`[]Component`](../references/components.md)                 |          |
| `properties`    | Create or lookup properties for each component  | [`[]Property`](./properties.md)                              |          |
| `configs`       | Link configuration items for each component     | [`[]ConfigSelector`](./catalog.md#config-selector)           |          |
| `checks`        | Create or link health checks for each component | [`[]CheckSelector`](./health-checks.md#check)                |          |
| `selectors`     | Create or link health checks for each component | [`[]ResourceSelector`](../../reference/resource_selector.md) |          |
| `relationships` | Create or link health checks for each component | [`[]RelationshipSpec`](#relationship-spec)                   |          |

## Relationship Spec

| Field  | Description                                                                              | Scheme   | Required |
| ------ | ---------------------------------------------------------------------------------------- | -------- | -------- |
| `ref`  | Set reference for components relationship                                                | `string` |          |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | `string` |          |
