---
title: Connections
---

Mission Control uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

Whenever a field uses the `EnvVar` object type you have the option of specifying the value in 3 ways:

1. Statically in the `value` field
2. Via a Kubernetes Config Map via the `configMapKeyRef` field
3. Via a Kubernetes Secret via the `secretKeyRef` field

### Static Values

Using a HTTP health check as an example for static values:

```yaml title="http-basic-auth-static.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_static_pass.yaml

```

### Kubernetes Configmaps

Create a configmap:

```bash
kubectl create configmap basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-configmap.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_config_map.yaml

```

### Kubernetes Secrets

Create secret:

```bash
kubectl create secret generic basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-secret.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_secret.yaml

```
