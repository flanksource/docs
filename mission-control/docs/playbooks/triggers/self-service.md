# Self Service

Playbooks can be manually triggered on a component, config item or a check. If any of the [playbook's resource filters](../concepts/playbook.md#resourcefilter) matches the type and tags of the component, config or a check then a playbook run dropdown can be seen on that item.

## Example: Playbook on a config item of type "AWS::EKS::Cluster"

```yaml title="update-eks-cluster.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-passing-http-checks
spec:
  configs:
    - type: AWS::EKS::Cluster
  description: Upgrade EKS Cluster
  parameters:
    - label: New EKS Version
      name: version
  actions:
    - exec:
        script: sleep 10
      name: Check for Incompatible Objects
    - exec:
        script: sleep 15
      name: Remove cluster from global LB
    - exec:
        script: |
          echo Updating to v1.27.7-eks-a59e1f0
          sleep 10
          echo Update completed
      name: Update EKS Version
    - name: Roll all Nodes
      exec:
        script: |
          echo Draining ip-10-0-4-23.eu-west-1.compute.internal
          echo Terminating ip-10-0-4-23.eu-west-1.compute.internal
          sleep 10
          echo Draining ip-10-0-4-27.eu-west-1.compute.internal
          echo Terminating ip-10-0-4-27.eu-west-1.compute.internal
          sleep 10
          echo Draining ip-10-0-4-33.eu-west-1.compute.internal
          echo Terminating ip-10-0-4-33.eu-west-1.compute.internal
      
```

![Playbook on a config item](../../images/playbook-on-a-eks-cluster-config-item.png)
**Fig: Playbook on a config item**

![Playbook parameters](../../images/playbook-on-a-eks-cluster-config-item-popup.png)
**Fig: Playbook parameters**
