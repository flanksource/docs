---
title: HTTP
sidebar_custom_props:
  icon: mdi:web
---

The `http` query allows you to fetch data from external APIs and use it within your view. It supports RESTful APIs and can extract data using JSONPath.

## Example

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: github-stars
spec:
  queries:
    repos:
      http:
        url: https://api.github.com/users/flanksource/repos
        headers:
          - name: User-Agent
            value: Mission-Control
      columns:
        name: string
        stargazers_count: number
        html_url: url

  columns:
    - name: name
      type: string
    - name: stars
      type: number
    - name: link
      type: url

  mapping:
    name: row.name
    stars: row.stargazers_count
    link: row.html_url
```

## Configuration

| Field | Type | Description |
|Str|Str|Str|
| `url` | string | The URL to send the request to. |
| `method` | string | HTTP method (GET, POST, PUT, DELETE, PATCH). Default: `GET`. |
| `body` | string | Request body for POST/PUT/PATCH requests. Supports templating. |
| `jsonpath` | string | JSONPath expression to extract specific data from the response. |
| `headers` | list | List of headers to include in the request. |
| `connection` | string | Reference to a connection for authentication. |
| `username` | [EnvVar](/docs/reference/env-var) | Basic auth username. |
| `password` | [EnvVar](/docs/reference/env-var) | Basic auth password. |
| `bearer` | [EnvVar](/docs/reference/env-var) | Bearer token. |

### JSONPath Extraction

If the API returns a nested structure, you can use `jsonpath` to extract the list of items you want to treat as rows.

For example, if the API returns:

```json
{
  "status": "success",
  "data": {
    "items": [
      {"id": 1, "name": "A"},
      {"id": 2, "name": "B"}
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
