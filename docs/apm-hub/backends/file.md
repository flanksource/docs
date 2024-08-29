The file backend will fetch logs from files on the local filesystem. Those source files can be provided as a list of paths in the configuration file.

## Example configuration

```yaml
apiVersion: apm-hub.flanksource.com/v1
kind: LoggingBackend
metadata:
  name: k8s-backend
spec:
  backends:
    - file:
        - routes:
            type: nginx
            idPrefix: pod-1-
          labels:
            name: acmehost
            type: Nginx
          path:
            - /var/log/nginx/access.log
        - routes:
            type: apache
            idPrefix: pod-1-
          labels:
            name: acmehost
            type: Apache
          path:
            - /var/log/apache2/access.log
```

## FileConfig

| Field    | Description                                                                                                                          | Scheme                                    | Required   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------- |
| `routes` | Specify routes that would match this backend.<br /> _(Read more [Routing](../concepts/routing))_                                     | [`[]Route`](../concepts/routing.md#route) | `true`     |
| `labels` | A set of key value pairs that'll be attached to individual items in the search result                                                | `map[string]string`                       | `optional` |
| `path`   | The list of source file paths for this backend. If a relative path is provided, it's parsed relative to the path of the config file. | `[]string`                                | `true`     |
