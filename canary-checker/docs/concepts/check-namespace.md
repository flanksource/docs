# Inserting checks into different namespaces

A check can reside on different namespace than its canary. You can do that by specfiying the namespace in the `namespace` field.

```yaml title=canary.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: kube-system-checks
spec:
  interval: 30
  kubernetes:
    # failing checks will be inserted into kube-system, irrespective of which
    # namespace this canary is created in
    - name: kube-system
      // highlight-next-line
      namespace: kube-system
      kind: Pod
      ready: true
      resource:
        labelSelector: k8s-app=kube-dns
      namespaceSelector:
        name: kube-system
```
