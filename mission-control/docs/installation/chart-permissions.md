# Fine tuning permission

## Canary Checker

Canary Checker, by default, uses a highly permissive service account.
You can configure the permissions on that service account via the helm values.

```yaml title="values.yaml"
....
rbac:
  # Whether to create cluster-wide or namespaced roles
  cluster_role: false

  # for secret management with valueFrom
  tokenRequest: true
  secrets: true
  configmaps: true

  # for use with kubernetes resource lookups
  readAll: true

  # for pod and junit canaries
  podsCreateAndDelete: true

  # for pod canary
  ingressCreateAndDelete: true

  # for kubernetes resource check & namespace check
  namespaceCreateAndDelete: true
```

The first thing to decide on is whether to grant cluster role access or namespace access
to the service account.

If certain checks do not need to be performed, the corresponding permissions required for them can be disabled.
Example: the `readAll` permission is essential to run the Kubernetes lookup check.
