# Mask
Mask allows replacing sensitive fields with hash of that field or with a static string.
_Example_: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

| Field      | Description                                                                                                         | Scheme                          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                                       | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                                          | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. See [supported hash functions](#supported-hash-functions). | `string`                        | `true`   |

As an example let's take the following configuration file for `Config DB`

```yaml
file:
  - type: Config
    id: $.id
    name: $.name
    transform:
      mask:
        - selector:
            type: Config
          jsonpath: $.password
          value: md5sum
        - selector:
            type: Config
          jsonpath: $.secret
          value: '***'
    paths:
      - fixtures/data/single-config.json
```

This configuration specifies 2 different masks. The first one will replace the value of the field `password` with the md5sum of the value. The second one will replace the value of the field `secret` with `***`.

!!! info

    All the masks will be applied in the order they are specified in the configuration file.

## Supported hash functions

At the moment, only `md5sum` is supported. More hash functions will be added in the future.

- md5sum

## MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |

`Config DB` allows selectively applying masks to certain types of configs. So you could apply a mask to all the `Config` types and another mask to all the `Secret` types.
