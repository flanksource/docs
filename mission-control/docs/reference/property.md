# Property

| Field            | Description                         | Schema   | Required |
| ---------------- | ----------------------------------- | -------- | -------- |
| `label`          | The label of the property.          | `string` |          |
| `name`           | The name of the property.           | `string` |          |
| `tooltip`        | The tooltip of the property.        | `string` |          |
| `icon`           | The icon of the property.           | `string` |          |
| `type`           | The type of the property.           | `string` |          |
| `color`          | The color of the property.          | `string` |          |
| `order`          | The order of the property.          | `int`    |          |
| `headline`       | The headline of the property.       | `bool`   |          |
| `text`           | The text of the property.           | `string` |          |
| `value`          | The value of the property.          | `int`    |          |
| `unit`           | The unit of the property.           | `string` |          |
| `max`            | The max of the property.            | `int`    |          |
| `min`            | The min of the property.            | `int`    |          |
| `status`         | The status of the property.         | `string` |          |
| `lastTransition` | The lastTransition of the property. | `string` |          |
| `links`          | The links of the property.          | `[]Link` |          |

## Link

| Field     | Description              | Schema   | Required |
| --------- | ------------------------ | -------- | -------- |
| `type`    | The type of the link.    | `string` |          |
| `url`     | The url of the link.     | `string` |          |
| `tooltip` | The tooltip of the link. | `string` |          |
| `icon`    | The icon of the link.    | `string` |          |
| `text`    | The text of the link.    | `string` |          |
| `label`   | The label of the link.   | `string` |          |
