```yaml
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
      responseContent: ""
      maxSSLExpiry: 7
    - url: https://httpbin.demo.aws.flanksource.com/status/404
      thresholdMillis: 3000
      responseCodes: [404]
      responseContent: ""
      maxSSLExpiry: 7
    - url: https://httpbin.demo.aws.flanksource.com/status/500
      thresholdMillis: 3000
      responseCodes: [500]
      responseContent: ""
      maxSSLExpiry: 7
```