---
title: HTTP
---

# <Icon name="http" /> HTTP

This check performs queries on HTTP endpoints and HTTP Namespaces to monitor their activity.

```yaml title="http-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - url: https://httpbin.demo.aws.flanksource.com/status/200
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      responseContent: ''
      maxSSLExpiry: 7
    - endpoint: https://httpbin.demo.aws.flanksource.com/status/404
      thresholdMillis: 3000
      responseCodes: [404]
      responseContent: ''
      maxSSLExpiry: 7
    - endpoint: https://httpbin.demo.aws.flanksource.com/status/500
      thresholdMillis: 3000
      responseCodes: [500]
      responseContent: ''
      maxSSLExpiry: 7
```

| **Connection** |                                                                                                               |                                                        |     |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --- |
| `connection`   | Path of existing connection e.g. `connection://sftp/instance`/ Mutually exclusive with `username`, `password` | <CommonLink to="connection" >_Connection_</CommonLink> |     |
| `username`     | Mutually exclusive with `connection`                                                                          | [_EnvVar_](../../concepts/authentication/#envvar)      |     |
| `password`     | Mutually exclusive with `connection`                                                                          | [_EnvVar_](../../concepts/authentication/#envvar)      |     |
| **`url`**      | HTTP URL, if a URL is specified on both the connection and check, the URL on the check takes precedence.      | _string_                                               | Yes |
| `ntlm`         | When true, will do authentication using NTLM v1 protocol                                                      | _bool_                                                 |     |
| `ntlmv2`       | When true, will do authentication using NTLM v2 protocol                                                      | _bool_                                                 |     |
