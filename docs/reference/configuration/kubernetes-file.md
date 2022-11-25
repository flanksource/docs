## KubernetesFile 
The KubernetesFile config type is used to scrape configurations contained in your specified resource e.g Pod.

??? example 
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
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [**BaseScraper**](#basescraper) | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | [*BaseScraper*](#basescraper) | yes |
| [**`selector`**](#resourceselector-selector) | Specify Kubernetes resource for configuration based on `namespace`, `kind`, `name` and more. | *string* | yes |
| `container` | Set container name | *string* |
| [`files`](#PodFile) | Specify path to file contained in Pod | *string* |

### PodFile 
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `path` | Set path to file contained in Pod | *string (list)* |  |
| `format` | Specify format of file | *string* |

### ResourceSelector (`selector`)
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `namespace` | Specify Namespace for Kubernetes resource | *string* |  |
| `kind` | Specify Kind of Kubernetes resource | *string* |
| `name` | Specify name of Kubernetes resource | *string* |
| `labelSelector` | Specify labels attached to Kubernetes resource | *string* |
| `fieldSelector` | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running` | *string* |  |

### BaseScraper

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | A static value or JSONPath expression to use as the ID for the resource. | *string* |  |
| `name` | A static value or JSONPath expression to use as the Name for the resource. | *string* |  |
| `items` | A JSONPath expression to use to extract individual items from the resource | *string* |  |
| `type` | A static value or JSONPath expression to use as the type for the resource. | *string* |  |
| [`transform`](#transform) | Specify field to transform result | *string* |  |
| `format` | Format of config item, defaults to JSON | *string* |

### Transform

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [`script`](#script) | Script to transform scrape result | [*Script*](#script) |
| [`include`](#Filter) | Specify fields to include in the configuration | [*Filter*](#filter)  |  |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields | [*Filter*](#filter) |  |

### Filter 

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | *string* |