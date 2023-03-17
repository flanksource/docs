## OpenSearchConfig

| Field       | Description                                                                                                | Scheme                                     | Required   |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| `routes`    | Specify routes that would match this backend.<br> _(Read more [Routing](../concepts/routing.md))_          | [`[]Route`](../concepts/routing.md#route)  | `true`     |
| `labels`    | A set of key value pairs that'll be attached to individual items in the search result.                     | `map[string]string`                        | `optional` |
| `address`   | Elastic search instance URL.                                                                               | `string`                                   | `true`     |
| `query`     | The query for elastic search.<br>It's a go template which will receive the search param as it's view data. | `string`                                   | `true`     |
| `index`     | The elastic search index to look for the logs.                                                             | `string`                                   | `true`     |
| `namespace` | The Kubernetes namespace to search for `cloudID`, `apiKey`, `username` & `password`.                       | `string`                                   | `optional` |
| `fields`    | Additional configuration to customize what should and what shouldn't be fetched from the logs              | [`OpenSearchFields`](#opensearchfields) | `true`     |
| `username`  | Username for the elastic search instance.                                                                  | `string`                                   | `true`     |
| `password`  | Password for the elastic search instance.                                                                  | `string`                                   | `true`     |

### OpenSearchFields

| Field        | Description                                                                | Scheme     | Required   |
| ------------ | -------------------------------------------------------------------------- | ---------- | ---------- |
| `timestamp`  | Specify the field that'll be used to extract the timestamp for each log.   | `string`   | `true`     |
| `message`    | Specify the field that'll be used as the message for apm-hub search result | `string`   | `true`     |
| `exclusions` | Specify the fields that'll not be extracted from the labels                | `[]string` | `optional` |