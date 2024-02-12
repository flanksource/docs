# Accessing result of previous actions

```yaml title="check-count.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: check-count
spec:
  parameters:
    - name: path
      label: Path to save the result
  actions:
    - name: make dummy API call
      exec:
        script: |
          echo '{
            "result": "success",
            "count": 20
          }'
    - name: Notify if the count is low
      if: 'getLastAction().result.stdout.JSON().count < 5'
      notification:
        title: 'Count is low'
        message: Count is low
        connection: connection://slack/flanksource
    - name: Log if count is high
      if: 'getAction("make dummy API call").result.stdout.JSON().count > 15'
      exec:
        script: echo 'HIGH' > {{.params.path}}
```
