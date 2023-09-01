# Common Fields

All check types support the following fields:

| Field         | Description                                        | Scheme                                            | Required |
| ------------- | -------------------------------------------------- | ------------------------------------------------- | -------- |
| **`name`**    | Name of the check                                  | `string`                                          | Yes      |
| `filters`     | A map of label to value prefixes to find alerts on | `map[string]string`                               |          |
| `description` | Description for the check                          | `string`                                          |          |
| `icon`        | Icon for overwriting default icon on the dashboard | `string`                                          |          |
| `labels`      | Labels for check                                   | `map[string]string`                               |          |
| `test`        | Template to test the result against                | [`Template`](../concepts/templating)              |          |
| `display`     | Template to display the result in                  | [`Template`](../concepts/templating)              |          |
| `transform`   | Template for transformation                        | [`Template`](../concepts/templating)              |          |
| `metrics`     | Metrics to export from check results               | [`[]Metrics`](../concepts/metrics#custom-metrics) |          |
