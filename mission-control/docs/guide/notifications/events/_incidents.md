# Incidents

There are various subcategories for incident related evens

- `incident.created`

**Environment variables:**

| Field       | Description                | Schema                  | Optional |
| ----------- | -------------------------- | ----------------------- | -------- |
| `incident`  | The incident object        | [`Incident`](#incident) |          |
| `permalink` | A link to the health check | `string`                |          |

## Comments

- `incident.comment.added`

**Environment variables:**

| Field       | Description                | Schema                  | Optional |
| ----------- | -------------------------- | ----------------------- | -------- |
| `comment`   | The comment object         | [`Comment`](#comment)   |          |
| `author`    | The author of the comment  | [`Person`](#person)     |          |
| `incident`  | The linked incident object | [`Incident`](#incident) |          |
| `permalink` | A link to the health check | `string`                |          |

## Responders

- `incident.responder.added`
- `incident.responder.removed`

**Environment variables:**

| Field       | Description                | Schema                    | Optional |
| ----------- | -------------------------- | ------------------------- | -------- |
| `responder` | The incident object        | [`Responder`](#responder) |          |
| `incident`  | The linked incident object | [`Incident`](#incident)   |          |
| `permalink` | A link to the health check | `string`                  |          |

## Definition of done

- `incident.dod.added`
- `incident.dod.passed`
- `incident.dod.regressed`

**Environment variables**:

| Field        | Description                              | Schema                      | Optional |
| ------------ | ---------------------------------------- | --------------------------- | -------- |
| `evidence`   | The evidence on which the dod is defined | [`Evidence`](#evidence)     |          |
| `incident`   | The linked incident object               | [`Incident`](#incident)     |          |
| `hypothesis` | The linked hypothesis object             | [`Hypothesis`](#hypothesis) |          |
| `permalink`  | A link to the health check               | `string`                    |          |

## Status

- `incident.status.cancelled`
- `incident.status.closed`
- `incident.status.investigating`
- `incident.status.mitigated`
- `incident.status.open`
- `incident.status.resolved`

**Environment variables:**

| Field       | Description                | Schema                  | Optional |
| ----------- | -------------------------- | ----------------------- | -------- |
| `incident`  | The incident object        | [`Incident`](#incident) |          |
| `permalink` | A link to the health check | `string`                |          |

## References

### Incident

| Field              | Description                                                                             | Schema      | Optional |
| ------------------ | --------------------------------------------------------------------------------------- | ----------- | -------- |
| `id`               | The id of the incident                                                                  | `uuid.UUID` |          |
| `incident_id`      | The incident id                                                                         | `string`    |          |
| `title`            | The title of the incident                                                               | `string`    |          |
| `description`      | The description of the incident                                                         | `string`    |          |
| `type`             | The type of the incident ([Read more](../../incidents/overview.md#types))               | `string`    |          |
| `status`           | The status of the incident ([Read more](../../incidents/overview.md#status))            | `string`    |          |
| `severity`         | The severity of the incident ([Read more](../../incidents/overview.md#severity-levels)) | `string`    |          |
| `created_at`       | The time the incident was created                                                       | `time.Time` |          |
| `updated_at`       | The time the incident was updated                                                       | `time.Time` |          |
| `acknowledged`     | The time the incident was acknowledged                                                  | `time.Time` | `true`   |
| `resolved`         | The time the incident was resolved                                                      | `time.Time` | `true`   |
| `closed`           | The time the incident was closed                                                        | `time.Time` | `true`   |
| `created_by`       | The user who created the incident                                                       | `uuid.UUID` |          |
| `incident_rule_id` | The incident rule id                                                                    | `uuid.UUID` | `true`   |
| `commander_id`     | The commander id                                                                        | `uuid.UUID` | `true`   |
| `communicator_id`  | The communicator id                                                                     | `uuid.UUID` | `true`   |

### Comment

| Field                 | Description                      | Schema      | Optional |
| --------------------- | -------------------------------- | ----------- | -------- |
| `id`                  | The id of the comment            | `uuid.UUID` |          |
| `created_by`          | The user who created the comment | `uuid.UUID` |          |
| `comment`             | The comment                      | `string`    |          |
| `external_id`         | The external id                  | `string`    | `true`   |
| `external_created_by` | The external created by user     | `string`    | `true`   |
| `incident_id`         | The incident id                  | `uuid.UUID` |          |
| `responder_id`        | The responder id                 | `uuid.UUID` | `true`   |
| `hypothesis_id`       | The hypothesis id                | `uuid.UUID` | `true`   |
| `updated_at`          | The time the comment was updated | `time.Time` |          |
| `created_by`          | The user who created the comment | `uuid.UUID` |          |

### Person

| Field        | Description                  | Schema                                 | Optional |
| ------------ | ---------------------------- | -------------------------------------- | -------- |
| `id`         | The id of the person         | `uuid.UUID`                            |          |
| `name`       | The name of the person       | `string`                               |          |
| `email`      | The email of the person      | `string`                               | `true`   |
| `type`       | The type of the person       | `string`                               | `true`   |
| `avatar`     | The avatar of the person     | `string`                               | `true`   |
| `properties` | The properties of the person | [`PersonProperties`](#person-property) | `true`   |

#### Person Property

| Field  | Description             | Schema   | Optional |
| ------ | ----------------------- | -------- | -------- |
| `role` | The key of the property | `string` |          |

### Evidence

| Field                | Description            | Schema           | Optional |
| -------------------- | ---------------------- | ---------------- | -------- |
| `id`                 | The id of the evidence | `uuid.UUID`      |          |
| `hypothesis_id`      | The hypothesis id      | `uuid.UUID`      |          |
| `config_id`          | The config id          | `uuid.UUID`      | `true`   |
| `config_change_id`   | The config change id   | `uuid.UUID`      | `true`   |
| `config_analysis_id` | The config analysis id | `uuid.UUID`      | `true`   |
| `component_id`       | The component id       | `uuid.UUID`      | `true`   |
| `check_id`           | The check id           | `uuid.UUID`      | `true`   |
| `description`        | The description        | `string`         |          |
| `definition_of_done` | The definition of done | `bool`           |          |
| `done`               | The done               | `bool`           | `true`   |
| `factor`             | The factor             | `bool`           | `true`   |
| `mitigator`          | The mitigator          | `bool`           | `true`   |
| `created_by`         | The created by         | `uuid.UUID`      |          |
| `type`               | The type               | `string`         |          |
| `script`             | The script             | `string`         | `true`   |
| `script_result`      | The script result      | `string`         | `true`   |
| `evidence`           | The evidence           | `map[string]any` | `true`   |
| `properties`         | The properties         | `map[string]any` | `true`   |
| `created_at`         | The created at         | `time.Time`      |          |
| `updated_at`         | The updated at         | `time.Time`      |

### Hypothesis

| Field         | Description                 | Schema      | Optional |
| ------------- | --------------------------- | ----------- | -------- |
| `id`          | The id of the hypothesis    | `uuid.UUID` |          |
| `incident_id` | The incident id             | `uuid.UUID` |          |
| `type`        | The type                    | `string`    |          |
| `title`       | The title of the hypothesis | `string`    |          |
| `status`      | The status                  | `string`    |          |
| `parent_id`   | The parent id               | `uuid.UUID` | `true`   |
| `team_id`     | The team id                 | `uuid.UUID` | `true`   |
| `owner`       | ID of the owner             | `uuid.UUID` | `true`   |
| `created_at`  | created timestamp           | `time.Time` |          |
| `updated_at`  | updated timestamp           | `time.Time` |          |
| `created_by`  | created timestamp           | `uuid.UUID` |          |

### Responder

| Field          | Description                                  | schema           | Optional |
| -------------- | -------------------------------------------- | ---------------- | -------- |
| `id`           | The id of the responder                      | `uuid.UUID`      |          |
| `incident_id`  | The incident id                              | `uuid.UUID`      |          |
| `type`         | The type of the responder                    | `string`         |          |
| `index`        | The index of the responder                   | `smallint`       |          |
| `person_id`    | The person id                                | `uuid.UUID`      | `true`   |
| `team_id`      | The team id                                  | `uuid.UUID`      | `true`   |
| `external_id`  | id of the externally linked responder        | `string`         | `true`   |
| `properties`   | properties                                   | `map[string]any` | `true`   |
| `acknowledged` | Whether the responder was acknowledged       | `time.Time`      | `true`   |
| `resolved`     | Timestamp of when the responder was resolved | `time.Time`      | `true`   |
| `closed`       | Timestamp of when the responder was closed   | `time.Time`      | `true`   |
| `created_by`   | ID of the person that created this responder | `uuid.UUID`      |          |
| `created_at`   | created timestamp                            | `time.Time`      |          |
| `updated_at`   | updated timestamp                            | `time.Time`      |          |
| `deleted_at`   | deleted timestamp                            | `time.Time`      |          |

## Notification Template Defaults

### `incident.created`

```
# Title
{{.incident.incident_id}}: {{.incident.title}} ({{.incident.severity}}) created

# Body
Type: {{.incident.type}}

[Reference]({{.permalink}})
```

### `incident.comment.added`

```
# Title
{{.author.name}} left a comment on {{.incident.incident_id}}: {{.incident.title}}

# Body
{{.comment.comment}}

[Reference]({{.permalink}})"
```

### `incident.dod.added`

```
# Title
Definition of Done added | {{.incident.incident_id}}: {{.incident.title}}

# Body
Evidence: {{.evidence.description}}

[Reference]({{.permalink}})
```

### `incident.dod.passed`, `incident.dod.regressed`

```
# Title
Definition of Done {{if .evidence.done}}passed{{else}}regressed{{end}} | {{.incident.incident_id}}: {{.incident.title}}

# Body
Evidence: {{.evidence.description}}
Hypothesis: {{.hypothesis.title}}

[Reference]({{.permalink}})`
```

### `incident.responder.added`

```
# Title
New responder added to {{.incident.incident_id}}: {{.incident.title}}

# Body
Responder {{.responder.name}}

[Reference]({{.permalink}})
```

### `incident.responder.removed`

```
# Title
Responder removed from {{.incident.incident_id}}: {{.incident.title}}

# Body
Responder {{.responder.name}}

[Reference]({{.permalink}})
```

### `incident.status.*`

```
# Title
{{.incident.title}} status updated

# Body
New Status: {{.incident.status}}

[Reference]({{.permalink}})
```
