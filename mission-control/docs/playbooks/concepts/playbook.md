# Playbook

Playbooks are configurable automated processes that can be used to perform a variety of actions for a component or a config item.
They are defined using a YAML configuration.

```yaml title="restart-unhealthy-database.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: restart-unhealthy-database
spec:
  description: Restart when a database becomes unhealthy
  on:
    component:
      - event: unhealthy
        filter: component.type == 'database'
        labels:
          industry: e-commerce
  actions:
    - name: 'Restart kubernetes deployment'
      exec:
        script: kubectl rollout restart deployment {{.component.name}}
```

![Playbooks List](../../images/playbooks-list.png)
_Fig: Playbooks Page_

## Spec

| Field         | Description                                                            | Scheme                                | Required |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------- | -------- |
| `description` | A short description                                                    | `string`                              | `true`   |
| `icon`        | Icon for the playbook                                                  | `string`                              |          |
| `on`          | Specify events to automatically trigger the Playbook. .                | [`[]Trigger`](#trigger)               |          |
| `checks`      | Specify selectors for checks that can be run on the Playbook.          | [`[]ResourceFilter`](#resourcefilter) |          |
| `configs`     | Specify selectors for config items that can be run on the Playbook.    | [`[]ResourceFilter`](#resourcefilter) |          |
| `components`  | Specify selectors for component items that can be run on the Playbook. | [`[]ResourceFilter`](#resourcefilter) |          |
| `parameters`  | Define a set of labeled parameters for the Playbook.                   | [`[]Parameter`](#parameter)           |          |
| `actions`     | Specify the set of actions to run.                                     | [`[]Action`](#action)                 | `true`   |
| `approval`    | Specify who can approve runs on this playbook.                         | [`Approval`](./approval#approval)     |          |

### Trigger

| Field       | Description                                          | Scheme                                          | Required |
| ----------- | ---------------------------------------------------- | ----------------------------------------------- | -------- |
| `canary`    | Setup trigger on canary events                       | [`EventTrigger`](../concepts/events#event-spec) |          |
| `component` | Setup trigger on health check events.                | [`EventTrigger`](../concepts/events#event-spec) |          |
| `webhook`   | Setup a webhook endpoint that triggers the playbook. | [`WebhookTrigger`](../concepts/webhook#spec)    |          |

### ResourceFilter

Filters can define what resources (checks, configs or components) are permitted be run on the Playbook.

| Field  | Description                | Scheme              | Required |
| ------ | -------------------------- | ------------------- | -------- |
| `type` | Specify type of component. | `string`            |          |
| `tags` | Specify tags of component. | `map[string]string` |          |

### Parameter

Playbook parameter defines a parameter that a playbook needs to run.

| Field   | Description                 | Scheme   | Required |
| ------- | --------------------------- | -------- | -------- |
| `name`  | Specify name of parameter.  | `string` | `true`   |
| `label` | Specify label of parameter. | `string` | `true`   |

## Run

A run is the execution of a Playbook consisting of a sequence of actions. A run can be trigger either

- manually
- on events
- on schedule (upcoming)

For example, a playbook can be executed when a health check passes or fails.

![Playbook Runs](../../images/playbook-runs.png)
_Fig: Playbooks Runs_

### Start Time

Every run must have a start time which is the time the run is scheduled to start. By default, the it is set to the current time.

Start time can be in future or even in the past.

## Action

Actions are the fundamental tasks executed by a playbook. A playbook can comprise multiple actions, which are executed sequentially. If any action encounters an error and fails, the execution of the playbook is halted.

| Field          | Description                                                     | Scheme                                             | Required |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------- | -------- |
| `name`         | Name of action.                                                 | `string`                                           | `true`   |
| `delay`        | Delay the execution of the action. _(Sensitive to the minute.)_ | [`DurationString`](#duration-string)               |          |
| `timeout`      | Timeout on this action.                                         | [`DurationString`](#duration-string)               |          |
| `exec`         | Specify exec of action.                                         | [`ExecAction`](../actions/exec.md)                 |          |
| `gitops`       | Specify gitops of action.                                       | [`GitopsAction`](../actions/gitops.md)             |          |
| `http`         | Specify http of action.                                         | [`HttpAction`](../actions/http.md)                 |          |
| `sql`          | Specify sql of action.                                          | [`SqlAction`](../actions/sql.md)                   |          |
| `pod`          | Specify pod of action.                                          | [`PodAction`](../actions/pod.md)                   |          |
| `notification` | Specify notification of action.                                 | [`NotificationAction`](../actions/notification.md) |          |

:::note
Specify one or more actions; but at least one.
:::

![Playbook Action Logs](../../images/playbook-action-logs.png)
_Fig: Playbooks Action Logs_

### Duration String

Duration strings specify duration in a human readable format.

**Examples:**

- `1m15s`
- `1h5m`
- `23h`
- `1d8h`
- `1w6d8h`
- `19w0d8h`
