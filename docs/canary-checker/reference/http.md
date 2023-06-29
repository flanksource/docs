# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/http.svg' style='height: 32px'/> HTTP

This check performs queries on HTTP endpoints, and HTTP Namespaces to monitor their activity.

![](/snippets/http.svg.png)

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      endpoint: http://status.savanttools.com/?code=200
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      maxSSLExpiry: 7
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`endpoint`**    | HTTP endpoint to check.  Mutually exclusive with Namespace   | *string*                                                     | Yes      |
| `method`          | Method to use - defaults to GET                              | *string*                                                     | |
| `headers`         | Header fields to be used in the query                        | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | |
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

### Template Body Variables

| Name | Scheme |
| ----- | ------ |
| `metadata.name` | string |
| `metadata.metadata.namespace` | *string* |
| `metadata.labels` | *map[string]string* |
