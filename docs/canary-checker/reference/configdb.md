# <img src='../../images/flanksource-icon.png' style='height: 32px'/> Config DB Query

ConfigDB check connects to the specified database host, run a specified query for your configuration data, and return the result.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: configdb-check
spec:
  interval: 30
  configDB:
    - name: ConfigDB Check
      query: <insert-query>
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`** | Name of the check | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| `description` | Description for the check | *string* |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `labels` | Labels for the check | [*Labels*](#labels) |  |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `transform` | Template to transform results to | [*Template*](../concepts/templating.md) |  |
