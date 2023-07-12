---
title: Transforms
---

# Transformation

The `transform` can be used to convert one canary check into multiple checks programmatically.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: alertmanager-check
spec:
  schedule: "*/5 * * * *"
  alertmanager:
    - host: alertmanager.example.com
      alerts:
        - .*
      ignore:
        - KubeScheduler.*
      transform:
        javascript: |
          var out = _.map(results, function(r) {
            return {
              name: r.name,
              labels: r.labels,
              icon: 'alert',
              message: r.message,
              description: r.message,
            }
          })
          JSON.stringify(out);
```

In the above example, the check will return multiple alerts from alertmanager. By default, all of those alerts will be grouped in a single check.

But if we want to display each alert as its own check in the UI, we can use the `transform` function for this. The transform function takes a `Template` as input and the output from the template expected are the checks in JSON format.

For example, if there are 9 different alerts, each alert will have its own check that can be managed and interacted with equally.
