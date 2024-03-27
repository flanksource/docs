---
hide_title: true
---
## Agent

An agent can be specified using:

- `local` - The primary mission control instance
- `uuid` of an agent
- `name` of and agent
- `all`  match all/any agents

## Cron

```
# ┌───────────── minute (0–59)
# │ ┌───────────── hour (0–23)
# │ │ ┌───────────── day of the month (1–31)
# │ │ │ ┌───────────── month (1–12)
# │ │ │ │ ┌───────────── day of the week (0–6) (Sunday to Saturday)
# │ │ │ │ │
# │ │ │ │ │
# │ │ │ │ │
  0 * * * *
```

| Shortcut                       | Description                                                | Equivalent  |
| ------------------------------ | ---------------------------------------------------------- | ----------- |
| `@every` [Duration](#duration) | e.g. `@every 5m`                                           |             |
| `@yearly` (or `@annually`)     | Run once a year at midnight of 1 January                   | `0 0 1 1 *` |
| `@monthly`                     | Run once a month at midnight of the first day of the month | `0 0 1 * *` |
| `@weekly`                      | Run once a week at midnight on Sunday                      | `0 0 * * 0` |
| `@daily` (or `@midnight`)      | Run once a day at midnight                                 | `0 0 * * *` |
| `@hourly`                      | Run once an hour at the beginning of the hour              | `0 * * * *` |



## Duration

Valid time units are "s", "m", "h", "d", "w", "y". Eg:

- `1m15s`
- `1h5m`
- `23h`
- `1d8h`
- `1w6d8h`
- `19w0d8h`


## Icon

One of the icons in the [flanksource-icons](https://github.com/flanksource/flanksource-icons/tree/main/svg) project

e.g.

- `kubernetes`
- `Kubernetes::Pod`
- `argo`
- `aws-ebs-volume`
