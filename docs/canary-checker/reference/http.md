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
      responseContent: ""
      maxSSLExpiry: 7
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`**        | Name of the check                                            | *string*                                                     | Yes |
| **`endpoint`**    | HTTP endpoint to check.  Mutually exclusive with Namespace   | *string*                                                     | Yes      |
| `method`          | Method to use - defaults to GET                              | *string*                                                     | |
| `headers`         | Header fields to be used in the query                        | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | |
| `body` | Request Body Contents | *string* |  |
| `templateBody` | If true the `body` field will be templated using go templates these [variables](#templateVariables) will be available | boo; | |
| `namespace` | Namespace to crawl for TLS endpoints.  Mutually exclusive with Endpoint | *string* |  |
| `authentication` | Username and password for authentication.  mutually exclusive with `connection` | [*Authentication*](../concepts/authentication.md) | |
| `connection` | Mutually exclusive with `authentication` | [Connection](../concepts/connections) | |
| `ntlm` | When true will do authentication using NTLM v1 protocol | *bool* |  |
| `ntlmv2` | When true will do authentication using NTLM v2 protocol | *bool* |  |
| `responseCodes` | Expected response codes for the HTTP Request. | *[]int* |  |
| `responseContent` | Exact response content expected to be returned by the endpoint. | *string* |  |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `thresholdMillis` | Maximum duration in milliseconds for the HTTP request. It will fail the check if it takes longer. | *int* |  |
| `maxSSLExpiry` | Maximum number of days until the SSL Certificate expires. | *int* | |
| `description` | Description for the check | *string* | |
| `icon` | Icon for overwriting default icon on the dashboard | *string* | |
| `display` | template to display server response in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) | |

### Template Variables

| Name | Scheme |
| ----- | ------ |
| `metadata.name` | string |
| `metadata.metadata.namespace` | *string* |
| `metadata.labels` | *map[string]string* |
