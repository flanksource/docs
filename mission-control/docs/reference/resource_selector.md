# ResourceSelector

We use resource selectors to link components with each other

| Field         | Description                                                                                                                            | Scheme   | Required |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|----------|----------|
| id            | ID of the component                                                                                                                    | string   |          |
| name          | Name of the component                                                                                                                  | string   |          |
| namespace     | Namespace of the component                                                                                                             | string   |          |
| types         | List of types of the component                                                                                                         | []string |          |
| statuses      | List of statuses of the component                                                                                                      | []string |          |
| labelSelector | Labels to select the component in kubernetes format                                                                                    | string   |          |
| fieldSelector | Property fields of the component in kubernetes format (or database columns: owner, topology_id, parent_id)                             | string   |          |
| agent         | ID or name of the agent (Default: local agent). Use 'all' to select all the agents                                                     | string   |          |
| cache         | One of 'no-cache' (should not fetch from cache but can be cached), 'no-store' (should not cache) or 'max-age=X' (cache for X duration) | string   |          |


A resource selector fetches components that satisfy all the parameters, you can use multiple selectors to aggregate

## Example
```yaml
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

  - name: Components with Node type with spot instance property labelled with gpu tag
    selectors:
    - types: ['Kubernetes::Node']
      fieldSelector: 'instance-type=spot'
      labelSelector: 'sku-type=gpu'

  - name: Components with labels of team payments and team orders
    # Using multiple selectors to aggregate
    selectors:
    - labelSelector: 'team=payments'
    - labelSelector: 'team=orders'
```
