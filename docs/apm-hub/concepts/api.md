`apm-hub` exposes `/search` endpoint that can be used to search for logs from all the configured backends. The search endpoint accepts a [`SearchParam`](#search-param) and returns a [`SearchResult`](#search-result).

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
| `labels`    | Labels specified in the search query along with possibly other labels attached by the search backend.    | `map[string]string` |

## Example

Assuming that you have `apm-hub` running, you can issue a search request as follows.

```sh
curl -d '{"limit": 10, "labels":{"app" :"nginx"}}' \
-H "Content-Type: application/json" localhost:8080/search
```

The search response would be a JSON objects similar to the following.

```json
{
  "total": 3,
  "results": [
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:17 +0545] \"GET /the HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    },
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:17 +0545] \"GET /best HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    },
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:19 +0545] \"GET /league HTTP/1.1\" 200 612 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    }
  ]
}
```
