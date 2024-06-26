---
title: JIT Access With Expiry
---

```yaml title="test-cluster-role-binding.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: test-cluster-role-binding
spec:
  actions:
    - name: Create new service account and test get pods
      exec:
        script: |
          kubectl create serviceaccount demo-playbook-sa
          response=$(kubectl auth can-i get pods --as=system:serviceaccount:default:demo-playbook-sa) # Save to a response because exitcode=1
          echo $response
    - name: Create new Cluster role binding
      exec:
        script: |
          kubectl create clusterrole demo-playbook-clusterrole --verb=get --resource=pods
          kubectl create clusterrolebinding demo-playbook-cluster-role-binding --clusterrole=demo-playbook-clusterrole --serviceaccount=default:demo-playbook-sa
          kubectl auth can-i get pods --as=system:serviceaccount:default:demo-playbook-sa
    - name: Cleanup
      delay: 8h
      exec:
        script: |
          kubectl delete clusterrolebinding demo-playbook-cluster-role-binding
          kubectl delete serviceaccount demo-playbook-sa
          kubectl delete clusterrole demo-playbook-clusterrole
```

## Screenshots

![Playbook Logs](/img/playbook-eg-cluster-role-binding.png)
_Fig: Playbook Logs_
