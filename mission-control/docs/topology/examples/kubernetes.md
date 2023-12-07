# Kubernetes

The Kubernetes topology fetches and displays a Kubernetes cluster's resources defined as `components` with types, `KubernetesNode`, and `KubernetesPod`.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: SystemTemplate
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
        kubernetes:
          - kind: Node
            name: k8s
            display:
              javascript: JSON.stringify(k8s.getNodeTopology(results))
      properties:
        - name: node-metrics
          lookup:
            kubernetes:
              - kind: NodeMetrics
                  ready: false
                  name: nodemetrics
                  display:
                    javascript: JSON.stringify(k8s.getNodeMetrics(results))
    - name: pods
      icon: pods
      type: KubernetesPods
      owner: Dev
      lookup:
        kubernetes:
          - kind: Pod
            name: k8s-pods
            ready: false
            ignore:
              - junit-fail**
              - junit-pass**
            display:
              javascript: JSON.stringify(k8s.getPodTopology(results))
      properties:
        - name: pod-metrics
          lookup:
            kubernetes:
              - kind: PodMetrics
                ready: false
                name: podmetrics
                display:
                  javascript: JSON.stringify(k8s.getPodMetrics(results))
```
