The KubernetesFile config type is used to scrape configurations contained in your specified resource e.g Pod.

```yaml
  kubernetesFile:
    - selector:
      namespace: demo
      kind: Statefulset
      name: postgresql
    files:
      - path:
          - /var/lib/postgresql/data/pgdata/postgresql.conf
        format: properties
```

### KubernetesFile (`kubernetesFile`)

| Field                                        | Description                                                                                  | Scheme                        | Required |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| [**BaseScraper**](#basescraper)              | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format`              | [_BaseScraper_](#basescraper) | yes      |
| [**`selector`**](#resourceselector-selector) | Specify Kubernetes resource for configuration based on `namespace`, `kind`, `name` and more. | _string_                      | yes      |
| `container`                                  | Set container name                                                                           | _string_                      |
| [`files`](#PodFile)                          | Specify path to file contained in Pod                                                        | _string_                      |

### PodFile

| Field    | Description                       | Scheme       | Required |
| -------- | --------------------------------- | ------------ | -------- |
| `path`   | Set path to file contained in Pod | _\[\]string_ |          |
| `format` | Specify format of file            | _string_     |

### ResourceSelector (`selector`)

| Field           | Description                                                                               | Scheme   | Required |
| --------------- | ----------------------------------------------------------------------------------------- | -------- | -------- |
| `namespace`     | Specify Namespace for Kubernetes resource                                                 | _string_ |          |
| `kind`          | Specify Kind of Kubernetes resource                                                       | _string_ |
| `name`          | Specify name of Kubernetes resource                                                       | _string_ |
| `labelSelector` | Specify labels attached to Kubernetes resource                                            | _string_ |
| `fieldSelector` | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running` | _string_ |          |

### BaseScraper

| Field                     | Description                                                                | Scheme   | Required |
| ------------------------- | -------------------------------------------------------------------------- | -------- | -------- |
| `id`                      | A static value or JSONPath expression to use as the ID for the resource.   | _string_ |          |
| `name`                    | A static value or JSONPath expression to use as the Name for the resource. | _string_ |          |
| `items`                   | A JSONPath expression to use to extract individual items from the resource | _string_ |          |
| `type`                    | A static value or JSONPath expression to use as the type for the resource. | _string_ |          |
| [`transform`](#transform) | Specify field to transform result                                          | _string_ |          |
| `format`                  | Format of config item, defaults to JSON                                    | _string_ |

### Transform

| Field                | Description                                                                                   | Scheme              | Required |
| -------------------- | --------------------------------------------------------------------------------------------- | ------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result                                                             | [_Script_](#script) |
| [`include`](#Filter) | Specify fields to include in the configuration                                                | [_Filter_](#filter) |          |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields | [_Filter_](#filter) |          |

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | _string_ |
