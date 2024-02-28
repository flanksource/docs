# <Icon name="config-db"/> Config DB

ConfigDB check connects to the specified database host, run a specified query for your configuration data, and return the result.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: cluster
labels:
  canary: "kubernetes-cluster"
spec:
  type: KubernetesCluster
  icon: kubernetes
  schedule: "@every 10m"
  id:
    javascript: properties.id
  configs:
    - name: flanksource-canary-cluster
      type: EKS
  components:
    - name: nodes
      icon: server
      owner: infra
      id:
        javascript: properties.zone + "/" + self.name
      type: KubernetesNode
      lookup:
        configDB:
          query: <insert-query>
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `authentication` | Username and password value, configMapKeyRef or SecretKeyRef for ConfigDB server | [*Authentication*](../reference/authentication) |  |
| `description` | Description for the check | *string* |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) |  |
| **`host`** | Host is the server against which check needs to be executed | *string* | Yes |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `labels` | Labels for the check | [*Labels*](#labels) |  |
| **`name`** | Name of the check | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `transform` | Template to transform results to | [*Template*](../concepts/templating.md) |  |
