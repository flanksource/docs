---
title: Resource Selectors
sidebar_position: 2
sidebar_custom_props:
  icon: stash:search-box-light
---

import ResourceSelector from '@site/docs/snippets/\_resource-selector.mdx';

# Resource Selectors

<ResourceSelector />

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
