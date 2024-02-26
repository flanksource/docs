# Retention

After scraping we can choose to retain results on the basis of name, age, count and more.

The retention rules are applied for each unique catalog item. If `changes` is specified with type `X` and count `20`, last 20 changes of `X` type would be kept for each catalog item

| Field     | Description                         | Scheme                                   | Required |
| --------- | ----------------------------------- | ---------------------------------------- | -------- |
| `changes` | Specify retention rules for changes | [`[]ChangeRetention`](#change-retention) | `false`  |

## Change Retention

```yaml
retention:
  changes:
    - name: CreateRole
      age: 30d # Any change older than 30 days is removed
      count: 50 # Only 50 last changes will be retained

    - name: PullSuceeded
      age: 7d # Only keep one week of PullSuceeded changes

    - name: ProvisioningFailed
      count: 5 # Only 5 latest events are kept
```

| Field   | Description                                             | Scheme   | Required |
| ------- | ------------------------------------------------------- | -------- | -------- |
| `name`  | Name of the change type                                 | `string` | `true`   |
| `age`   | Maximum age of the change type to retain (`12h`, `30d`) | `string` |          |
| `count` | Maximum count to retain the change type                 | `int`    |          |
