# Changes

| Field                | Description                             | Scheme           |
| -------------------- | --------------------------------------- | ---------------- |
| `action`             | Action of the change                    | `delete` or `ignore` |
| `change_type`        | Type of the change                      | `string`         |
| `config_type`        | Type of the config                      | `string`         |
| `config`        | Config Source                     | `JSON`         |
| `created_at`         | Creation time of the change             | `time.Time`      |
| `created_by`         | User who created the change             | `string`         |
| `details`            | Details of the change                   | `map[string]any` |
| `diff`               | Diff of the change                      | `string`         |
| `external_change_id` | ID of the change in the external system | `string`         |
| `external_id`        | ID of the change                        | `string`         |
| `patches`            | Patches of the change                   | `string`         |
| `severity`           | Severity of the change                  | `string`         |
| `source`             | Source of the change                    | `string`         |
| `summary`            | Summary of the change                   | `string`         |
