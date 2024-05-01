# Inserting checks into different namespaces

You can specify different namespaces for checks using the `namespace` field. This is helpful when checks are dynamically generated via transformation
and need to be assigned their respective namespace.

```yaml title="alertmanager.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: alertmanager
spec:
  interval: 30
  alertmanager:
    - url: https://alertmanager.demo.aws.flanksource.com
      name: alertmanager-check
      alerts:
        - .*
      ignore:
        - KubeScheduler.*
      exclude_filters:
        namespace: elastic-system
      transform:
        expr: |
          results.alerts.map(r, {
            'name': r.name + r.fingerprint,
            // highlight-next-line
            'namespace': 'namespace' in r.labels ? r.labels.namespace : '',
            'labels': r.labels,
            'icon': 'alert',
            'message': r.message,
            'description': r.message,
          }).toJSON()
```

The above alertmanager canary can reside on any namespace and the check it generates are assigned the correct namespace derived from the alerts.
