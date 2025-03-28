---
title: Env Vars
sidebar_custom_props:
  icon: shield-lock
sidebar_position: 1
---

import { K8SCustomresourcedefinition } from '@flanksource/icons/mi'
import { K8SConfigmap } from '@flanksource/icons/mi'
import { K8SSecret } from '@flanksource/icons/mi'
import { Helm } from '@flanksource/icons/mi'
import { K8SServiceaccount } from '@flanksource/icons/mi'

Mission Control uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

Whenever a field uses the `EnvVar` object type you have the option of specifying the value in multiple ways.

1. Statically in the `value`
1. From a <K8SConfigmap size={16}/> Kubernetes Config Map via `configMapKeyRef`
1. From a <K8SSecret size={16}/> Kubernetes Secret via `secretKeyRef`
1. From a <Helm size={16}/> Helm chart computed `values.yaml` via `helmRef`
1. From a <K8SServiceaccount size={16}/> Kubernetes service account using `serviceAccount`

## Static Values

:::warning
Avoid in-lining secrets, use `valueFrom` and <CommonLink to="authentication">EnvVar</CommonLink>
:::

Using a HTTP health check as an example for static values:

```yaml title="http-basic-auth-static.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-basic-auth
spec:
  http:
    - url: https://httpbin.org/basic-auth/hello/world
      responseCodes: [200]
      authentication:
        username:
          value: hello
        password:
          value: world
```

## <K8SConfigmap size={25}/> Kubernetes Config Maps

To use a configmap, we first need to create the configmap:

```bash
kubectl create configmap basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-configmap.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-basic-auth-configmap
spec:
  http:
    - url: https://httpbin.org/basic-auth/hello/world
      responseCodes: [200]
      authentication:
        username:
          valueFrom:
            configMapKeyRef:
              name: basic-auth
              key: user
        password:
          valueFrom:
            configMapKeyRef:
              name: basic-auth
              key: pass
```

## <K8SSecret size={25}/> Kubernetes Secrets

To use a secret, first we create the secret:

```bash
kubectl create secret generic basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-secret.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-basic-auth-configmap
spec:
  http:
    - url: https://httpbin.demo.aws.flanksource.com/basic-auth/hello/world
      username:
        valueFrom:
          secretKeyRef:
            name: basic-auth
            key: user
      password:
        valueFrom:
          secretKeyRef:
            name: basic-auth
            key: pass
```

## <Helm size={25}/> Helm Values

To use a secret, first we deploy a helm chart

```bash
helm install podinfo  podinfo/podinfo -n podinfo --set ingress.enabled=true
```

```yaml title="http-from-helm.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-from-helm
spec:
  http:
    - env:
        - name: url
          valueFrom:
            helmRef:
              name: podinfo
              key: .ingress.hosts[0].host

      url: $(url)
```

## <K8SServiceaccount size={25}/> Kubernetes Service Accounts

Checks can use service accounts for authentication with external services that have existing trust established

```yaml title="http-service-accounts.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-basic-auth-configmap
spec:
  http:

    interval: 30
  http:
    - name: vault-example-sre
      description: "HashiCorp Vault functionality check."
      url:  https://vault.example/v1/auth/kubernetes/login
      env:
        - name: TOKEN
          valueFrom:
            serviceAccount: default-account
      templateBody: true
      body: |
        {
          "jwt": "$(TOKEN)",
          "role": "example-role"
        }

```

:::note
For service account token issuing the canary-checker service account `canary-checker-sa` needs to be granted permissions to issue tokens using:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: canary-checker-sa-issuing-rolebinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: canary-checker-sa-issuing
subjects:
  - kind: ServiceAccount
    name: canary-checker-sa
    namespace: canary-checker
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  creationTimestamp: null
  name: canary-checker-sa-issuing
rules:

- apiGroups: [""]
  resources:
  - "serviceaccounts/token"
  - "serviceaccounts"
  verbs:
  - "create"
  - "get
```

:::
