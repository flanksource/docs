---
title: Resource Selectors
sidebar_position: 2
---

# Resource Selectors

Resource Selectors are used in multiple places including:

- Attaching components to a topology
- Creating relationships between configs and configs/components
- Finding resources to run health checks or playbooks on

| Field           | Description                                                                                                                                                        | Scheme                                                                                              | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------- |
| `id`            | ID of the component                                                                                                                                                | `string`                                                                                            | No       |
| `name`          | Name of the component/config                                                                                                                                       | `string`                                                                                            | No       |
| `namespace`     | Select resources in this namespace only, if empty find resources in all namespaces                                                                                 | `string`                                                                                            | No       |
| `types`         | Match any of the types specified                                                                                                                                   | `[]string`                                                                                          | No       |
| `statuses`      | Match any of the statuses specified                                                                                                                                | `[]string`                                                                                          | No       |
| `labelSelector` | Kubernetes Style Label Selector                                                                                                                                    | [LabelSelector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)          | No       |
| `fieldSelector` | Kubernetes Style Field Selector Property fields of the component in kubernetes format (or database columns: owner, topology_id, parent_id)                         | [FieldSelector](https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/) | No       |
| `agent`         | Select resources created on this agent, Defaults to `local`                                                                                                        | `uuid`, `{name}`, `local` or `all`                                                                  | No       |
| `cache`         | Cache settings to use for the results, expensive selectors or selectors that are are use very often should be cached for longer periods. Defaults to `max-age=10m` | `no-cache`, `no-store` or `max-age={duration}`                                                      | No       |

## Examples

### Selecting Components in a Topology

```yaml title="topology-component-selectors.yaml"
kind: Topology
metadata:
  name: Example
spec:
  components:
    - name: Components with healthy status in kube-system namespace of all agents
      selectors:
        - statuses: ['healthy']
          namespace: kube-system
          agent: all

    - name: Components with Node type with spot instance property labeled with gpu tag
      selectors:
        - types: ['Kubernetes::Node']
          fieldSelector: 'instance-type=spot'
          labelSelector: 'sku-type=gpu'

    - name: Components with labels of team payments or team orders
      # Using multiple selectors to aggregate
      selectors:
        - labelSelector: 'team=payments'
        - labelSelector: 'team=orders'
```

### Selecting configs in a playbook paramater

```yaml title="display-config-map.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: display-config-map
  namespace: mc
spec:
  category: kubernetes
  parameters:
    - name: configmap
      label: 'Choose a secret'
      type: config
      properties:
        filter:
          - types:
              - Kubernetes::ConfigMap
  actions:
    - name: JSON
      exec:
        script: |
          echo '{{.params.configmap | toJSONPretty "  "}}'
```
