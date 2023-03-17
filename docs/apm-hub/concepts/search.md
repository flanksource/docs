When `apm-hub` runs with the `search` command, it will expose a `/search` endpoint that can be used to search for logs from all the configured backends. The search endpoint accepts a [`SearchParam`](#search-param) and returns a [`SearchResult`](#search-result).

## Search Param

Search param is the accepted structure by the `/search` endpoint.

| Field               | Description                                                                                                                                                                                     | Scheme              | Required   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------- |
| `limit`             | The maximum number of results to return.                                                                                                                                                        | `int64`             | `optional` |
| `limitBytes`        | The maximum size of the search result in bytes.                                                                                                                                                 | `int64`             | `optional` |
| `page`              | Page token used as cursor for the next request.                                                                                                                                                 | `string`            | `optional` |
| `labels`            | A comma separated list of labels to filter the results.<br>_Example `key1=value1,key2=value2`_                                                                                                  | `map[string]string` | `optional` |
| `start`             | A RFC3339 timestamp or an age string.<br>_Example: "1h", "2d", "1w". (defaults to 1h)_                                                                                                          | `string`            | `optional` |
| `type`              | The type of logs to find, e.g. KubernetesNode, KubernetesService, KubernetesPod, VM, etc. Type and ID are used to route search requests.                                                        | `string`            | `optional` |
| `id`                | The identifier of the type of logs to find, e.g. k8s-node-1, k8s-service-1, k8s-pod-1, vm-1, etc. The ID should include include any cluster/namespace/account information required for routing. | `string`            | `optional` |
| `limitPerItem`      | Limits the number of log messages return per item, e.g. pod.                                                                                                                                    | `int64`             | `optional` |
| `limitBytesPerItem` | Limits the number of bytes returned per item, e.g. pod.                                                                                                                                         | `int64`             | `optional` |

## Search Result

| Field      | Description                    | Scheme                |
| ---------- | ------------------------------ | --------------------- |
| `total`    | The total result in existence. | `int`                 |
| `results`  | RFC3339 timestamp.             | [`[]Result`](#result) |
| `nextPage` | The log message.               | `string`              |

### Result

Result is the individual log message fetched from the underlying backends.

| Field       | Description                                                                                              | Scheme              |
| ----------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`        | The unique identifier provided by the underlying system, use to link to a point in time of a log stream. | `string`            |
| `timestamp` | RFC3339 timestamp.                                                                                       | `string`            |
| `message`   | The log message.                                                                                         | `string`            |
| `labels`    | Returned labels.                                                                                         | `map[string]string` |
