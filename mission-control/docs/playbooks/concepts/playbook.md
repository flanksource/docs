# Playbook


_Fig: Playbooks Page_

## Spec

| Field         | Description                                                  | Scheme                                               | Required |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------- | -------- |
| `description` | A short description                                          | `string`                                             | `true`   |
| `icon`        | Icon for the playbook                                        | [`Icon`](/reference/types#icon)                                              |          |
| `on`          | Specify events to automatically trigger the Playbook. .      | [`[]Trigger`](#trigger)                              |          |
| `runsOn`      | Specify the [runners](./runners.md) that can run this playbook. One will be chosen on random. When empty, the playbook will run on the main instance itself | `[]string`                                           |          |
| `templatesOn` | Specify where the templating of the action spec should occur | `host` or `agent`                                      |          |
| `checks`      | Specify selectors for checks that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `configs`     | Specify selectors for config items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `components`  | Specify selectors for component items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `parameters`  | Define a set of labeled parameters for the Playbook.         | [`[]Parameter`](#parameter)                          |          |
| `actions`     | Specify the set of actions to run.                           | [`[]Action`](#action)                                | `true`   |
| `approval`    | Specify who can approve runs on this playbook.               | [`Approval`](./approval#approval)                    |          |

### Trigger

| Field       | Description                                          | Scheme                                          | Required |
| ----------- | ---------------------------------------------------- | ----------------------------------------------- | -------- |
| `canary`    | Setup trigger on canary events                       | [`EventTrigger`](../concepts/events#event-spec) |          |
| `component` | Setup trigger on health check events.                | [`EventTrigger`](../concepts/events#event-spec) |          |
| `webhook`   | Setup a webhook endpoint that triggers the playbook. | [`WebhookTrigger`](../concepts/webhook#spec)    |          |



## Run

A run is the execution of a Playbook consisting of a sequence of actions. A run can be trigger either

- manually
- on events
- on schedule (upcoming)

For example, a playbook can be executed when a health check passes or fails.

![Playbook Runs](/img/playbook-runs.png)
_Fig: Playbooks Runs_

### Start Time

Every run must have a start time which is the time the run is scheduled to start. By default, the it is set to the current time.

Start time can be in future or even in the past.


#### Templating

The CEL expression receives a environment variable that contain details about the corresponding config, check or component and the parameter (if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |


