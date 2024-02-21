# For Each

```yaml

apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: acme-app
spec:
  components:
    - forEach:
        components: null
        configs:
          - name: ${.component.name}
            type: OIPA
          - labels:
              namespace: ${.properties.namespace}
            name: PAS.properties
            type: File
      lookup:
        postgres:
          - auth:
              password:
                value: postgres
              username:
                value: postgres
            connection: >-
              postgres://$(username):$(password)@localhost:5432/incident_commander?sslmode=disable
            display:
              javascript: |+
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

            query: SELECT * from config_items where config_type = 'OIPA' and name = 'dev-qa' ;
      type: virtual
  icon: oracle_icon
  id:
    expr: $.external_id
  name: OIPA
  type: virtual

```

### ForEach

| Field           | Description               | Scheme                                    | Required |
| --------------- | ------------------------- | ----------------------------------------- | -------- |
| `components`    | Create sub-components for each component  | [`[]Component`](#component)               |          |
| `properties`    | Create or lookup properties for each component    | [`[]Property`](#property)                 |          |
| `configs`       | Link configuration items for each component     | [`[]Config`](#config)                     |          |
| `checks`        | Create or link health checks for each component       | [`[]Check`](./health-checks.md#check)     |          |
