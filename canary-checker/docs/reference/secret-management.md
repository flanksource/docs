# Secret Management

Canary checker uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

Whenever a field uses the `EnvVar` object type you have the option of specifying the value in multiple ways.

1. Statically in the `value`
1. Via a Kubernetes Config Map via the `configMapKeyRef`
1. Via a Kubernetes Secret via the `secretKeyRef`
1. From a value of a deployed helm chart using `helmRef`
1. From a service account using `serviceAccount`

## Static Values

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

## Configmaps

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

## Secrets

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

## Helm Values

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

## Service Accounts

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

For service account token issuing the canary-checker service account `canary-checker-sa` will need to be granted permissions to issue tokens using:

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

# Recommendations

Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. With this in mind, it is recommended to implement some level of security to prevent unauthorized access to your Kubernetes secrets.
You may consider the following for your encryption and security needs:

- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/getting-started/)
- [Bitnami Sealed Secrets](https://www.youtube.com/watch?v=xd2QoV6GJlc&ab_channel=DevOpsToolkit)
- [KSOPS](https://blog.oddbit.com/post/2021-03-09-getting-started-with-ksops/)
- [Enable Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
