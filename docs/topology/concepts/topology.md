Define what topology is
TODO: Add more details

## Topology

| Field        | Description                                                                  | Scheme                                     | Required |
| ------------ | ---------------------------------------------------------------------------- | ------------------------------------------ | -------- |
| `id`         | Specify unique ID for component                                              | [`ID`](#id)                                |          |
| `components` | Specify the component fields for your service, application, check, etc.      | [`[]Component`](./components.md#component) |          |
| `configs`    | Set configuration used by the specified component.                           | [`Configs`](#configs-configs)              |          |
| `icon`       | Specify icon for component.                                                  | `string`                                   |          |
| `label`      | Set label for component.                                                     | `string`                                   |          |
| `owner`      | Specify owner of component.                                                  | `string`                                   |          |
| `properties` | Customize component properties as to be visualized on Incident commander UI. | [`Properties`](#properties-properties)     |          |
| `schedule`   | Set schedule to update component at the set interval.                        | `string`                                   |          |
| `text`       | Set description or text of choice pertaining to component.                   | `string`                                   |          |
| `tooltip`    | Set tooltip outlining information pertaining to the component.               | `string`                                   |          |
| `type`       | Set type of component e.g. service, API, website, library, database, etc.    | `string`                                   |          |

### ID

| Field        | Description                                | Scheme   | Required |
| ------------ | ------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for ID                  | `string` |          |
| `javascript` | Specify javascript syntax to generate ID   | `string` |          |
| `jsonPath`   | Specify path to JSON element for use in ID | `string` |          |
| `template`   | Specify Go template for use in ID          | `string` |          |
