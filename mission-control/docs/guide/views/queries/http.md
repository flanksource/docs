---
title: HTTP
sidebar_custom_props:
  icon: mdi:web
---

The `http` query allows you to fetch data from external APIs and use it within your view. It supports RESTful APIs and can extract data using JSONPath.

## Example

```yaml title="recipes-http.yaml" file=<rootDir>/modules/mission-control/fixtures/views/recipes-http.yaml

```

## Configuration

| Field        | Type                              | Description                                                     |
| ------------ | --------------------------------- | --------------------------------------------------------------- |
| `url`        | string                            | The URL to send the request to.                                 |
| `method`     | string                            | HTTP method (GET, POST, PUT, DELETE, PATCH). Default: `GET`.    |
| `body`       | string                            | Request body for POST/PUT/PATCH requests. Supports templating.  |
| `jsonpath`   | string                            | JSONPath expression to extract specific data from the response. |
| `headers`    | list                              | List of headers to include in the request.                      |
| `connection` | string                            | Reference to a connection for authentication.                   |
| `username`   | [EnvVar](/docs/reference/env-var) | Basic auth username.                                            |
| `password`   | [EnvVar](/docs/reference/env-var) | Basic auth password.                                            |
| `bearer`     | [EnvVar](/docs/reference/env-var) | Bearer token.                                                   |

### JSONPath Extraction

If the API returns a nested structure, you can use `jsonpath` to extract the list of items you want to treat as rows.

For example, if the API returns:

```json
{
  "status": "success",
  "data": {
    "items": [
      { "id": 1, "name": "A" },
      { "id": 2, "name": "B" }
    ]
  }
}
```

Use `jsonpath: "$.data.items"` to extract the array.

### Authentication

You can provide authentication details inline or reference a stored connection.

**Inline Basic Auth:**

```yaml
http:
  url: https://api.example.com/data
  username:
    value: myuser
  password:
    value: mypass
```

**Using a Connection:**

```yaml
http:
  url: https://api.example.com/data
  connection: connection://my-api-creds
```

## Connection Field

The `connection` field references a stored [Connection](/mission-control/guide/configurations/connections) resource. When specified, Mission Control hydrates the connection by:

1. Looking up the connection by name in the view's namespace
2. Extracting authentication details (username, password, bearer token, OAuth credentials)
3. Applying TLS configuration (CA, cert, key, insecure skip verify)
4. Merging custom headers defined in the connection
5. Resolving any environment variable references in connection properties

Connection properties that can be inherited:
- `url` - Base URL for the API
- `username` / `password` - HTTP Basic Authentication
- `bearer` - Bearer token for token-based auth
- `oauth` - OAuth2 credentials (clientID, clientSecret, tokenURL, scopes, params)
- `tls` - TLS configuration (ca, cert, key, insecureSkipVerify)
- `headers` - Additional HTTP headers

**Example with connection:**

```yaml title="http-connection.yaml" file=<rootDir>/modules/mission-control/fixtures/views/http-connection.yaml

```

## Templating Support

The `body` field supports Go templating, allowing dynamic request payloads:

```yaml title="http-post-body.yaml" file=<rootDir>/modules/mission-control/fixtures/views/http-post-body.yaml

```

Template variables available in the body:
- `$(var.<name>)` - View template variables
- Environment variables via `$(ENV_VAR_NAME)`

## Response Size Limits

By default, HTTP responses are limited to **25 MB** to prevent memory issues with large payloads. You can configure this limit using the `view.http.body.max_size_bytes` property.

### Configuring the Limit

Set the property via environment variable or configuration:

```yaml
# Increase limit to 50 MB
properties:
  view.http.body.max_size_bytes: "52428800"
```

### Size Limit Error Handling

When a response exceeds the configured limit, the view returns an error with details:

```
http response body size (32 MB) exceeds maximum allowed (25 MB); increase limit via property "view.http.body.max_size_bytes"
```

To resolve:
1. Increase the limit via the property (if you have sufficient memory)
2. Use pagination in the API request to fetch smaller chunks
3. Apply filters in the API request to reduce response size
4. Use `jsonpath` to extract only the needed subset of data

**Example with pagination:**

```yaml
queries:
  paged-data:
    http:
      url: https://api.example.com/items?page=1&per_page=100
      connection: connection://my-api
```


