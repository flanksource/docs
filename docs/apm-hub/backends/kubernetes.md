The Kubernetes backend fetches logs from Kubernetes pods.

## KubernetesConfig

| Field        | Description                                                                                         | Scheme                                                                       | Required   |
| ------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------- |
| `routes`     | Specify routes that would match this backend.<br /> _(Read more [Routing](../concepts/routing.md))_ | [`[]Route`](../concepts/routing.md#route)                                    | `true`     |
| `labels`     | A set of key value pairs that'll be attached to individual items in the search result               | `map[string]string`                                                          | `optional` |
| `kubeconfig` | Specify configuration for Kubernetes connection.                                                    | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | `true`     |
| `namespace`  | Specify the namespace for the kubeconfig.                                                           | `string`                                                                     | `true`     |
