### Properties

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `color` | Set color for component property | *string* |
| `configLookup` | Specify lookup for component config | [*ConfigLookup*](#configlookup)
| `headline` | Toggle headline for component property | *bool* |
| `icon` | Specify icon for component | *string* |
| `label` | Specify label for component property | *string*
| `lastTransition` | Set transition for component property | *string* |
| `links` | Set links pertaining to component | [*Links*](#links-links)
| `lookup` | Set based on Canary checks as documented in [Check reference](/reference/checks/).
| `max` | Set maximum value for components to display | *int64*
| `min` | Set minimum value for components to display | *int64*
| `name` | Set name for component property | *string*
| `order` | Set integer value order for component property | *int*
| `status` | Specify status for component property | *string*
| `summary` | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info | [*Summary*](#summary-summary)
| `text` | Set description or text of choice pertaining to component property | *string* |
| `tooltip` | Set tooltip outlining information pertaining to the component | *string* |
| `type` | Specify type of component property | *string* |
| `unit` | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc. | *string*
| `value` |  | *int64* |

### ConfigLookup

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | Specify unique ID for config | *string*
| `config` | Specify config for lookup | [*Configs*](#configs)
| `field` | Specify field for config lookup | *string*
| `display` | Set display format for config | [*Display*](#display)
