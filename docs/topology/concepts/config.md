Configs can be associated to a component using the `config` property. A linked config shows up in the component page in the right hand side panel.

![Component Config relationship](../images/component-config-relationship.jpg)

```yaml
components:
  - configs:
      - name: flanksource-canary-cluster
        type: EKS
```

## Config

| Field       | Description                               | Scheme              | Required   |
| ----------- | ----------------------------------------- | ------------------- | ---------- |
| `name`      | Specify the name of the config item.      | `string`            | `optional` |
| `namespace` | Specify the namespace of the config item. | `string`            | `optional` |
| `type`      | Specify type of config item.              | `string`            | `optional` |
| `tags`      | Specify tags of config item.              | `map[string]string` | `optional` |

This `Config` object is used to find the config item to associate with the component. It's important to note that there can be multiple config items that can match the same `Config` object. The first match is used in that case.

To get a better result, you can provide more information in the `Config` object; example: provide name, namespace and type instead of just providing the namespace.
