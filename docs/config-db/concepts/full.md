### `full` flag

When `full` is set to `true`, `config-db` will extract changes and the config itself from the scraped configuration.

Example: consider that we have a configuration for `config-db`

```yaml
full: true
file:
  - type: Car
    id: $.reg_no
    paths:
      - fixtures/data/car_changes.json
```

The config points to this file

```json
{
  "reg_no": "A123",
  "config": {
    "meta": "this is the actual config that'll be stored."
  },
  "changes": [
    {
      "action": "drive",
      "summary": "car color changed to blue",
      "unrelated_stuff": 123
    }
  ]
}
```

Since `full=true`, `config-db` will extract the `config` and `changes` from the scraped JSON config. So, the actual config will simply be

```json
{
  "meta": "this is the actual config that'll be stored."
}
```

and the following new config change would be registered for that particular config item

```json
{
  "action": "drive",
  "summary": "car color changed to blue",
  "unrelated_stuff": 123
}
```
