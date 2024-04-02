The Kubernetes backend fetches logs from Kubernetes pods using the Kubernetes Log API.


```yaml
apiVersion: apm-hub.flanksource.com/v1
kind: LoggingBackend
metadata:
  name: k8s-backend
spec:
  backends:
    - kubernetes:
        routes:
          type: nginx
          idPrefix: pod-1-
        labels:
          name: acmehost
          type: Nginx
        namespace: default
        kubeconfig: # empty kubeconfig means the current kubeconfig will be used for connection.
```

## KubernetesConfig

| Field        | Description                                                                                                                    | Scheme                                                                       | Required   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------- |
| `routes`     | Specify routes that would match this backend.<br /> _(Read more [Routing](../concepts/routing))_                            | [`[]Route`](../concepts/routing.md#route)                                    | `true`     |
| `labels`     | A set of key value pairs that'll be attached to individual items in the search result                                          | `map[string]string`                                                          | `optional` |
| `kubeconfig` | Specify configuration for Kubernetes connection.<br>empty kubeconfig means the current kubeconfig will be used for connection. | <CommonLink to="secrets">[]_EnvVar_</CommonLink> | `true`     |
| `namespace`  | Specify the namespace for the kubeconfig.                                                                                      | `string`                                                                     | `true`     |
