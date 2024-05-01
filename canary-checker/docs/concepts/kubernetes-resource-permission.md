# Granting permission to Kubernetes resources

Canary Checker, by default, uses a highly permissive service account.
You can configure the permissions on that service account during the installation.

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

  # for namespace canary
  namespaceCreateAndDelete: true
```

First, you decide whether to create cluster-wide or namespaced roles by setting
`cluster_role` to `true` or `false`.
If false _(the default)_, you create namespace-scoped roles and role bindings
that limit the service account's permissions to a specific namespace.

Next, you enable certain capabilities for the service account:

- By setting `tokenRequest: true`, you allow the service account to request
  and manage temporary authentication tokens from the API server for secure resource management.
- With `secrets: true`, you grant permissions to read & list secrets.
- Similarly, `configmaps: true` gives you the ability to read & list ConfigMaps.
- Conversely, you can set `readAll: true` which allows reading _(list and get)_
  all resources in the cluster for lookups and monitoring. This flag is essential
  if you need to use the [Kubernetes Resource Lookup Check](../reference/kubernetes.mdx).

Then, you have flags for running canary tests:

- `podsCreateAndDelete: true` lets you create and delete pods, useful for
  [Pod check](../reference/pod.mdx) & [Junit check](../reference/junit.mdx)
- If the pod check requires managing ingress resources then seet `ingressCreateAndDelete: true`.
- `namespaceCreateAndDelete: true` allows creating and deleting entire namespaces
  for [Namespace Check](../reference/namespace.mdx).
