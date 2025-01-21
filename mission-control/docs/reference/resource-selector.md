---
title: Resource Selectors
sidebar_position: 2
sidebar_custom_props:
  icon: stash:search-box-light
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
| `search`        | Search for resources via key value pairs using parsing expression grammar                                                                                          | `string`                                                                                            | No       |

## Search

The query syntax is `field1=value1 field2>value2 field3=value3* field4=*value4`. `*` is for prefix and suffix matching.

Supported operators:

| Operator | Syntax                           | Types                 |
| -------- | -------------------------------- | --------------------- |
| `=`      | `field=value`                    | `string` `int` `json` |
| `!=`     | `field!=value`                   | `string` `int` `json` |
| `*`      | `field=*value` or `field=value*` | `string` `int`        |
| `>` `<`  | `field>value` or `field<value`   | `datetime` `int`      |

Supported fields for:

- [Catalog/Config](/reference/config-db/config):

| Field        | Type       |
| ------------ | ---------- |
| `name`       | `string`   |
| `source`     | `string`   |
| `namespace`  | `string`   |
| `type`       | `string`   |
| `status`     | `string`   |
| `labels`     | `json`     |
| `tags`       | `json`     |
| `config`     | `json`     |
| `health`     | `string`   |
| `agent`      | `string`   |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |
| `deleted_at` | `datetime` |

- [Components](/reference/topology/components):

| Field         | Type       |
| ------------- | ---------- |
| `name`        | `string`   |
| `topology_id` | `string`   |
| `namespace`   | `string`   |
| `type`        | `string`   |
| `status`      | `string`   |
| `labels`      | `json`     |
| `health`      | `string`   |
| `agent`       | `string`   |
| `created_at`  | `datetime` |
| `updated_at`  | `datetime` |
| `deleted_at`  | `datetime` |

- [Health Checks](/reference/canary-checker/check):

| Field        | Type       |
| ------------ | ---------- |
| `name`       | `string`   |
| `canary_id`  | `string`   |
| `namespace`  | `string`   |
| `type`       | `string`   |
| `status`     | `string`   |
| `health`     | `string`   |
| `labels`     | `json`     |
| `agent`      | `string`   |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |
| `deleted_at` | `datetime` |

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

    - name: Kubernetes components which start with kafka created in last 24h
      # Suffix and Prefix matches are supported using *
      selectors:
        - search: name=kafka* type=Kubernetes* created_at>now-24h

    - name: All components updated between a specific interval
      selectors:
        - search: updated_at>2024-10-10 updated_at<2024-10-17

    - name: Component with name httpbin-service
      # Not giving any key will do a name lookup (ie name=httpbin-service)
      selectors:
        - search: httpbin-service

    - name: Components with label cluster
      # JSON lookups are also supported
      selectors:
        - search: labels.cluster=prod

    - name: Link configs which have logistics-api image
      configs:
        - search: config.spec.template.spec.containers[0].name=docker.io/example/logistics-api:latest
```
