---
title: Config DB
---

# <Icon name="config-db"/> Config DB

ConfigDB component lookup enables you to query configs from the database to use as components.

```yaml title="kubernetes-cluster.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-cluster
spec:
  type: KubernetesCluster
  icon: kubernetes
  schedule: '@every 10m'
  id:
    javascript: properties.id
  components:
    - name: nodes
      icon: server
      type: KubernetesNode
      // highlight-start
      lookup:
        configDB:
          - query: SELECT name, type FROM config_items WHERE type = 'Kubernetes::Node'
      // highlight-end
```

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `authentication` | Username and password value, configMapKeyRef or SecretKeyRef for ConfigDB server | [_Authentication_](../concepts/authentication.md) |          |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`host`**       | Host is the server against which check needs to be executed                      | _string_                                          | Yes      |
| `labels`         | Labels for the check                                                             | [_Labels_](#labels)                               |          |
| **`query`**      | Query that needs to be executed on the server                                    | _string_                                          | Yes      |
| `transform`      | Template to transform results to                                                 | [_Template_](../concepts/templating.md)           |          |

## Results

The `results` variable in the template will contain the following fields

| Field   | Description             | Scheme             |
| ------- | ----------------------- | ------------------ |
| `rows`  | stderr from the script  | `[]map[string]any` |
| `count` | exit code of the script | `int`              |
