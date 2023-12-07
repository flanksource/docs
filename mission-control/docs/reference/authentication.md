# Authentication

Canary checker uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

Whenever a field uses the `EnvVar` object type you have the option of specifying the value in 3 ways:

## EnvVar

1. Statically in the `value` field
1. Via a Kubernetes Config Map via the `configMapKeyRef` field
1. Via a Kubernetes Secret via the `secretKeyRef` field

### Static Values

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

### Kubernetes Configmaps

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

### Kubernetes Secrets

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
    - url: https://httpbin.org/basic-auth/hello/world
      responseCodes: [200]
      authentication:
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

### Recommendations

Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. With this in mind, it is recommended to implement some level of security to prevent unauthorized access to your Kubernetes secrets.
You may consider the following for your encryption and security needs:

- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/getting-started/)
- [Bitnami Sealed Secrets](https://www.youtube.com/watch?v=xd2QoV6GJlc&ab_channel=DevOpsToolkit)
- [KSOPS](https://blog.oddbit.com/post/2021-03-09-getting-started-with-ksops/)
- [Enable Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
