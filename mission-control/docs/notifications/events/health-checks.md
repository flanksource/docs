---
description: Events that fire when health checks pass or fail
title: Health Checks
---

Health checks emit 2 events

* **`check.passed`**:
    * **Title:** `Check {{.check.name}} has passed`
    * **Body:**
        ```
        Canary: {{.canary.name}}
        {{if .agent}}Agent: {{.agent.name}}{{end}}
        {{if .status.message}}Message: {{.status.message}} {{end}}
        ### Labels:
        {{range $k, $v := .check.labels}}**{{$k}}**: {{$v}}
        {{end}}
        [Reference]({{.permalink}})
        ```

* **`check.failed`**:
    * **Title:** `Check {{.check.name}} has failed`
    * **Body:**
        ```
        Canary: {{.canary.name}}
        {{if .agent}}Agent: {{.agent.name}}{{end}}
        Error: {{.status.error}}
        ### Labels:
        {{range $k, $v := .check.labels}}**{{$k}}**: {{$v}}
        {{end}}
        [Reference]({{.permalink}})
        ```

## Variables

| Field       | Description                   | Schema                         | Optional |
| ----------- | ----------------------------- | ------------------------------ | -------- |
| `canary`    | The parent canary object      | [`Canary`](#canary)            |          |
| `check`     | The check                     | [`Check`](#check)              |          |
| `agent`     | Agent details (if applicable) | [`Agent`](#check)              | `true`   |
| `status`    | Check status details          | [`CheckStatus`](#check-status) |          |
| `permalink` | A link to the health check    | `string`                       |          |

### Canary

| Field        | Description                  | Schema              | Optional |
| ------------ | ---------------------------- | ------------------- | -------- |
| `id`         | The id of the canary         | `uuid`              |          |
| `name`       | The name of the canary       | `string`            |          |
| `namespace`  | The namespace of the canary  | `string`            |          |
| `agent_id`   | The agent id of the canary   | `string`            |          |
| `labels`     | The labels of the canary     | `map[string]string` | `true`   |
| `source`     | The source of the canary     | `string`            |          |
| `created_at` | The created at of the canary | `string`            |          |
| `updated_at` | The updated at of the canary | `string`            |          |
| `deleted_at` | The deleted at of the canary | `string`            | `true`   |

### Check

| Field                  | Description                            | Schema                | Optional |
| ---------------------- | -------------------------------------- | --------------------- | -------- |
| `id`                   | The id of the check                    | `uuid`                |          |
| `type`                 | The type of the check                  | `string`              |          |
| `name`                 | The name of the check                  | `string`              |          |
| `labels`               | The labels of the check                | `map[string]string`   | `true`   |
| `description`          | The description of the check           | `string`              |          |
| `status`               | Check status details                   | `string`              |          |
| `severity`             | The severity of the check              | `string`              | `true`   |
| `uptime`               | The past 1 hour uptime summary         | [`Uptime`](#uptime)   | `true`   |
| `latency`              | The past 1 hour latency summary        | [`Latency`](#latency) | `true`   |
| `transformed`          | Whether the check has been transformed | `bool`                |          |
| `last_runtime`         | The last runtime of the check          | `time.Time`           | `true`   |
| `next_runtime`         | The next runtime of the check          | `time.Time`           | `true`   |
| `last_transition_time` | The last transition time of the check  | `time.Time`           | `true`   |
| `created_at`           | The created at of the check            | `time.Time`           |          |
| `updated_at`           | The updated at of the check            | `time.Time`           |          |
| `deleted_at`           | The deleted at of the check            | `time.Time`           | `true`   |

#### Uptime

| Field       | Description                          | Schema      | Optional |
| ----------- | ------------------------------------ | ----------- | -------- |
| `passed`    | The number of checks that passed     | `int`       |          |
| `failed`    | The number of checks that failed     | `int`       |          |
| `p100`      | The percentage of checks that passed | `float64`   |          |
| `last_pass` | The last time a check passed         | `time.Time` | `true`   |
| `last_fail` | The last time a check failed         | `time.Time` | `true`   |

#### Latency

| Field       | Description              | Schema    | Optional |
| ----------- | ------------------------ | --------- | -------- |
| `p99`       | The latency of the check | `float64` | `true`   |
| `p97`       | The latency of the check | `float64` | `true`   |
| `p95`       | The latency of the check | `float64` | `true`   |
| `rolling1h` | The latency of the check | `float64` |          |

### Agent

| Field         | Description                    | Schema   | Optional |
| ------------- | ------------------------------ | -------- | -------- |
| `id`          | The id of the agent            | `uuid`   |          |
| `name`        | The name of the agent          | `string` |          |
| `description` | Short description of the agent | `string` |          |

### Check Status

| Field        | Description                                     | Schema      | Optional |
| ------------ | ----------------------------------------------- | ----------- | -------- |
| `check_id`   | The id of the check associated with this status | `uuid`      |          |
| `status`     | The status of the check                         | `bool`      |          |
| `invalid`    | Whether the check errored out                   | `bool`      |          |
| `time`       | The time of the check                           | `string`    |          |
| `duration`   | The duration of the check                       | `int`       |          |
| `message`    | The success message of the check                | `string`    |          |
| `error`      | The error of the check in case of failure       | `string`    |          |
| `created_at` | The created at of the check                     | `time.Time` |          |

## Notification Template Defaults


