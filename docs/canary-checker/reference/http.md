# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/http.svg' style='height: 32px'/> HTTP

This check performs queries on HTTP endpoints, and HTTP Namespaces to monitor their activity.

![](/snippets/http.svg.png)

```yaml title=http-check.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      endpoint: https://httpbin.demo.aws.flanksource.com/status/200
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      maxSSLExpiry: 7
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`url`** |  | *string* | Yes |
| `endpoint`    | Deprecated, Use `url` instread | *string*                                                     |       |
| `method`          | HTTP Request method, default to `GET` | *string*                                                     | |
| `headers`         | Header fields to be used in the query                        | [[]*EnvVar*](../../concepts/authentication/#envvar) | |
| `body` | Request Body Contents | *string* |  |
| `templateBody` | If true the `body` field will be templated using go templates these [variables](#templateVariables) will be available | boo; | |
| `responseCodes` | Expected response codes for the HTTP Request. | *[]int* |  |
| `responseContent` | Exact response content expected to be returned by the endpoint. | *string* |  |
| `thresholdMillis` | Maximum duration in milliseconds for the HTTP request. It will fail the check if it takes longer. | *int* |  |
| `maxSSLExpiry` | Maximum number of days until the SSL Certificate expires. | *int* | |
| `*` | All other common fields | [*Common*](../common) | |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://sftp/instance`/ Mutually exclusive with `username`, `password` | [Connection](../../concepts/connections) | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| **`url`** | HTTP  URL, if a URL is specified on both the connection and check, the url on the check takes precedence. | *string* | Yes |
| `ntlm` | When true will do authentication using NTLM v1 protocol | *bool* | |
| `ntlmv2` | When true will do authentication using NTLM v2 protocol | *bool* | |

### Result Variables

Result variables can be used in `test`, `display` and `transform` [scripts](../concepts/scripting)

| Name      | Description                                                  | Scheme              |
| --------- | ------------------------------------------------------------ | ------------------- |
| `code`    | HTTP response code                                           | *int*               |
| `headers` | HTTP response headers                                        | *map[string]string* |
| `elapsed` | HTTP Request duration                                        | *time.Duration*     |
| `sslAge`  | Time until SSL certificate expires                           | *time.Duration*     |
| `content` | HTTP Response body                                           | string              |
| `json`    | If `Content-Type=application/json response body converted into JSON object | `JSON`              |

The above canary (`http-check.yaml`) is functionally equivalent to `http-check-expr.yaml` below

```yaml title=http-check-expr.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check-expr
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      endpoint: https://httpbin.demo.aws.flanksource.com/status/200
      test:
        expr: "code in [200,201,301] and sslAge > Duration('7d')"
```

### Template Body Variables

| Name | Scheme |
| ----- | ------ |
| `metadata.name` | string |
| `metadata.metadata.namespace` | *string* |
| `metadata.labels` | *map[string]string* |

## Metrics

| **HTTP Check Metrics**                                       |         |                                         |
| ------------------------------------------------------------ | ------- | --------------------------------------- |
| `canary_check_http_response_status{status, statusClass, url}` | Counter | Response code counter for each endpoint |
| `canary_check_http_ssl_expiry{url}`                          | Guage   |                                         |

Status class is one of `1xx`, `2xx`, `3xx`, `4xx`, `5xx`
