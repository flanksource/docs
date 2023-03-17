## FileConfig

| Field    | Description                                                                                                                          | Scheme                                    | Required   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------- |
| `routes` | Specify routes that would match this backend.<br /> _(Read more [Routing](../concepts/routing.md))_                                  | [`[]Route`](../concepts/routing.md#route) | `true`     |
| `labels` | A set of key value pairs that'll be attached to individual items in the search result                                                | `map[string]string`                       | `optional` |
| `path`   | The list of source file paths for this backend. If a relative path is provided, it's parsed relative to the path of the config file. | `[]string`                                | `true`     |

### Example configuration

```yaml
backends:
  - file:
      - routes:
          type: 'nginx'
          idPrefix: 'pod-1-'
        labels:
          name: acmehost
          type: Nginx
        path:
          - /var/log/nginx/access.log # absolute path
      - labels:
          name: all
          type: Nginx
        path:
          - '*.log' # relative to the config file
```
