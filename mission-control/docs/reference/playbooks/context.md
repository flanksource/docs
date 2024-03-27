# Playbook Context

The `filter`, `actions`, `if` and `delays` fields that can be templated have a context with the following variables available:

### Variables

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `.config`    | Config passed to the playbook            | [`ConfigItem`](/reference/config-db/config-item) |
| `.component` | Component passed to the playbook         | [`Component`](/reference/topology/components)    |
| `.check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/check)            |
| `.params`    | User provided parameters to the playbook | `map[string]string`                          |
| `.env`    | Environment variables defined on the playbook | `map[string]string`                          |
| `.user.name`    | Name of the user who invoked the action | `string`                          |
| `.user.email`    | Email of the user who invoked the action | `string`                          |

### Functions

| Function       | Description                              | Return                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
|`getLastAction()` |	Returns the result of the action that just run	| Action Specific |
|`getAction({action})` |	Return the result of a specific action	 |Action Specific |

## Conditionally running actions

Playbook actions can be selectively executed based on CEL expressions. These expressions must either return

- a boolean value (`true` indicating run the action & skip the action otherwise)
- or a special function among the ones listed below

| Function    | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `always()`  | run no matter what; even if the playbook is cancelled/fails |
| `failure()` | run if any of the previous actions failed                   |
| `skip()`    | skip running this action                                    |
| `success()` | run only if all previous actions succeeded (default)        |
| `timeout()` | run only if any of the previous actions timed out           |

**Examples**

- `if: config.deleted_at ? true: false`
- `if: always()`

## Context
