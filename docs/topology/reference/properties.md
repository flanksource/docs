### Property

| Field            | Description                                                                        | Scheme                          | Required |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `color`          | Set color for component property                                                   | _string_                        |
| `configLookup`   | Specify lookup for component config                                                | [_ConfigLookup_](#configlookup) |
| `headline`       | Toggle headline for component property                                             | _bool_                          |
| `icon`           | Specify icon for component                                                         | _string_                        |
| `label`          | Specify label for component property                                               | _string_                        |
| `lastTransition` | Set transition for component property                                              | _string_                        |
| `links`          | Set links pertaining to component                                                  | [_Links_](#links-links)         |
| `lookup`         | Set based on Canary checks as documented in [Check reference](/reference/checks/). |
| `max`            | Set maximum value for components to display                                        | _int64_                         |
| `min`            | Set minimum value for components to display                                        | _int64_                         |
| `name`           | Set name for component property                                                    | _string_                        |
| `order`          | Set integer value order for component property                                     | _int_                           |
| `status`         | Specify status for component property                                              | _string_                        |
| `summary`        | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info       | [_Summary_](#summary-summary)   |
| `text`           | Set description or text of choice pertaining to component property                 | _string_                        |
| `tooltip`        | Set tooltip outlining information pertaining to the component                      | _string_                        |
| `type`           | Specify type of component property                                                 | _string_                        |
| `unit`           | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc.       | _string_                        |
| `value`          |                                                                                    | _int64_                         |

### ConfigLookup

| Field     | Description                     | Scheme                | Required |
| --------- | ------------------------------- | --------------------- | -------- |
| `id`      | Specify unique ID for config    | _string_              |
| `config`  | Specify config for lookup       | [_Configs_](#configs) |
| `field`   | Specify field for config lookup | _string_              |
| `display` | Set display format for config   | [_Display_](#display) |
