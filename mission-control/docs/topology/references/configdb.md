# <Icon name="config-db"/> Config DB

ConfigDB check connects to the specified database host, run a specified query for your configuration data, and return the result.

```yaml title="kubernetes-cluster.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: cluster
labels:
  canary: 'kubernetes-cluster'
spec:
  type: KubernetesCluster
  icon: kubernetes
  schedule: '@every 10m'
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

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `authentication` | Username and password value, configMapKeyRef or SecretKeyRef for ConfigDB server | [_Authentication_](../concepts/authentication.md) |          |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`host`**       | Host is the server against which check needs to be executed                      | _string_                                          | Yes      |
| `labels`         | Labels for the check                                                             | [_Labels_](#labels)                               |          |
| **`query`**      | Query that needs to be executed on the server                                    | _string_                                          | Yes      |
| `transform`      | Template to transform results to                                                 | [_Template_](../concepts/templating.md)           |          |
