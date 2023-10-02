# <Icon name="git"/> Git

<Standard/>

Execute as SQL style query against a github repo using [mergestat-lite](https://github.com/mergestat/mergestat-lite).

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: github-check
spec:
  schedule: "@every 1m"
  github:
    - githubToken: <token>
     query: SELECT count(*) FROM commits WHERE author_email = 'user@email.com'
```

| Field          | Description                                                  | Scheme                                            | Required |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| **`query`**    | Query to be executed. See [mergestat-lite](https://github.com/mergestat/mergestat-lite).for more details regarding syntax. | `string`                                          |          |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |                                                              |                                                   |          |
| `connection`   | Path of an existing connection e.g. `connection://github/org`. Mutually exclusive with `credentials`  <br/> <Commercial/> | [Connection](../../concepts/connections)          |          |
| `githubToken`  | Github access token. Mutually exclusive with `connection`    | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
