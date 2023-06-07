# Incident Rules

You can create rules to monitor selected components and automatically create incidents based on certain parameters.

## Creating an Incident Rule

- Go to the "Rules" page under "Settings" menu.
- Create a new rule and save it.

**Example:**

```yaml
filter:
  status:
    - unhealthy
    - warning
    - error
components:
  - name: HelmReleases
  - name: Flux
```

### Schedule

By default, the rules scan the components every 5 minutes but it's configurable using the `--rules-period` flag.

## Incident Rule Spec

| Field              | Description                                                   | Schema                                      | Required |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------- | -------- |
| `name`             | Name of the rule                                              | `string`                                    | `true`   |
| `components`       | List of components to monitor                                 | [`ComponentSelector`](#component-selector)  | `false`  |
| `template`         | The template for the auto created incident                    | [`IncidentTemplate`](#incident-template)    | `false`  |
| `filter`           | Filter to decide whether an incident should be created or not | [`Filter`](#filter)                         | `false`  |
| `breakOnMatch`     | Stop processing other incident rules, when matched            | `boolean`                                   | `false`  |
| `hoursOfOperation` | Hours of operation                                            | [`[]HoursOfOperation`](#hours-of-operation) | `false`  |

### Component Selector

| Field       | Description                | Schema              | Required |
| ----------- | -------------------------- | ------------------- | -------- |
| `name`      | Name of the component      | `string`            | `false`  |
| `namespace` | Namespace of the component | `string`            | `false`  |
| `selector`  | Selector of the component  | `string`            | `false`  |
| `labels`    | Labels of the component    | `map[string]string` | `false`  |
| `types`     | Types of the component     | `[]string`          | `false`  |

### Incident Template

| Field            | Description                | Schema   | Required |
| ---------------- | -------------------------- | -------- | -------- |
| `id`             | Incident ID                | `uuid`   | `false`  |
| `title`          | Incident title             | `string` | `false`  |
| `description`    | Incident description       | `string` | `false`  |
| `type`           | Incident type              | `string` | `false`  |
| `status`         | Incident status            | `string` | `false`  |
| `severity`       | Incident severity          | `string` | `false`  |
| `createdAt`      | Incident created time      | `time`   | `false`  |
| `updatedAt`      | Incident updated time      | `time`   | `false`  |
| `acknowledged`   | Incident acknowledged time | `time`   | `false`  |
| `resolved`       | Incident resolved time     | `time`   | `false`  |
| `closed`         | Incident closed time       | `time`   | `false`  |
| `createdBy`      | Incident created by        | `uuid`   | `false`  |
| `commanderID`    | Incident commander ID      | `uuid`   | `false`  |
| `communicatorID` | Incident communicator ID   | `uuid`   | `false`  |

### Filter

| Field    | Description             | Schema   | Required |
| -------- | ----------------------- | -------- | -------- |
| `status` | Status of the component | `string` | `true`   |

## Hours of Operation

| Field   | Description | Schema   | Required |
| ------- | ----------- | -------- | -------- |
| `start` | Start time  | `string` | `true`   |
| `end`   | End time    | `string` | `true`   |
