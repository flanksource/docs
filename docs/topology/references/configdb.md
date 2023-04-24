# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/config.svg' style='height: 32px'/> ConfigDB

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
      host: <insert-database-host>
      authentication:
        username:
          valueFrom:
          secretKeyRef:
            name: configdb-credentials
            key: USERNAME
        password:
          valueFrom:
          secretKeyRef:
            name: configdb-credentials
            key: PASSWORD
      query: <insert-query>
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `authentication` | Username and password value, configMapKeyRef or SecretKeyRef for ConfigDB server | [*Authentication*](../concepts/authentication.md) |  |
| `description` | Description for the check | *string* |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) |  |
| **`host`** | Host is the server against which check needs to be executed | *string* | Yes |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `labels` | Labels for the check | [*Labels*](#labels) |  |
| **`name`** | Name of the check | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `transform` | Template to transform results to | [*Template*](../concepts/templating.md) |  |
