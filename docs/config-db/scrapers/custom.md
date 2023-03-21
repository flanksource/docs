If you have the need to extract configuration and changes from the scraped configuration itself, the `full` flag will enable you to do so. This is a very niche use case and might only make sense when the source returns arbitrary data; example: HTTP, SQL, git, etc...

### Example

Consider that we have the following configuration file

```yaml
full: true
file:
  - type: Car
    id: $.reg_no
    paths:
      - fixtures/data/car_changes.json
```

where `fixtures/data/car_changes.json` is

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

It is expected that config and changes are available with keys `config` and `changes` respectively.
