---
title: Parameters
---

```yaml title="scale-deployment.yaml" file=../../../modules/mission-control/fixtures/playbooks/scale-deployment.yaml

```

Playbook parameter defines a parameter that a playbook needs to run.

| Field         | Description                                         | Scheme                                         | Required |
| ------------- | --------------------------------------------------- | ---------------------------------------------- | -------- |
| `name`        | Name of parameter.                                  | `string`                                       | `true`   |
| `default`     | Default value of the parameter.                     | [Go Template](/reference/scripting/gotemplate) |          |
| `label`       | Label of the parameter.                             | `string`                                       |          |
| `required`    | Specify if the parameter is required.               | `bool`                                         |          |
| `icon`        | Icon for the playbook.                              | [`Icon`](/reference/types#icon)                |          |
| `description` | Description of the parameter.                       | `string`                                       |          |
| `type`        | Type of parameter. _(Defaults to "text")_           | `string`                                       |          |
| `properties`  | Properties of parameter. _Varies based on the type_ | `map[string]string`                            |          |

## Defaulting

Parameter values can be defaulted from the selected resource

```yaml title="default parameters.yaml"
#...
kind: Playbook
spec:
  parameters:
    // Use the config items type and name in the parameter
    // highlight-next-line
    - default: 'chore: update $(.config.type)/$(.config.name)'
```

When running the playbook on a `Deployment` named `mysql` the following will be prepopulated:

<img src="/img/parameter-defaulting.png" width="700px" className="border-1 border-solid border-gray-200"/>

## Types

| name         | Description                        | UI Component | Schema    | Properties                |
| ------------ | ---------------------------------- | ------------ | --------- | ------------------------- |
| `check`      | Limits the value to a check.       | Dropdown     | `string`  | [`Check`](#checks)        |
| `checkbox`   | Boolean value toggle               | Checkbox     | `boolean` | -                         |
| `code`       | Text area                          | Code Editor  | `string`  | [`Code`](#code)           |
| `component`  | Limits the value to a component.   | Dropdown     | `string`  | [`Component`](#component) |
| `config`     | Limits the value to a config item. | Dropdown     | `string`  | [`Config`](#config)       |
| `list`       | Specify a custom list of values    | Dropdown     | `string`  | [`List`](#list)           |
| `people`     | Limits the value to people.        | Dropdown     | `string`  | [`People`](#people)       |
| `team`       | Limits the value to teams.         | Dropdown     | `string`  | -                         |
| `text`       | Text input                         | Text Input   | `string`  | [`Text`](#text)           |
| `millicores` | CPU resource                       | Number       | `string`  | -                         |
| `bytes`      | Memory resource                    | Number       | `string`  | -                         |

```yaml title='params-sink.yaml' file=../../../modules/mission-control/fixtures/playbooks/params.yaml {20,24,27,32,39,46,51,56,61,72} showLineNumbers

```

### component

| Field      | Description                            | Schema                                             |
| ---------- | -------------------------------------- | -------------------------------------------------- |
| `filter[]` | Limit the components to the given type | [`ResourceSelector`](/reference/resource-selector) |


### config

| Field         | Description                              | Schema                                             |
| ------------- | ---------------------------------------- | -------------------------------------------------- |
| `filter.type` | Limit the config items to the given type | [`ResourceSelector`](/reference/resource-selector) |


### checks

| Field         | Description                        | Schema                                             |
| ------------- | ---------------------------------- | -------------------------------------------------- |
| `filter.type` | Limit the checks to the given type | [`ResourceSelector`](/reference/resource-selector) |

### code

| Field      | Description                       | Schema   |
| ---------- | --------------------------------- | -------- |
| `language` | e.g. `yaml`, `json`, `toml`, etc. | `string` |

### people

| Field  | Description                        | Schema  |
| ------ | ---------------------------------- | ------- |
| `role` | Limit the people to the given role | `string |

### text

| Field       | Description                 | Schema    |
| ----------- | --------------------------- | --------- |
| `multiline` | Render a multiline textarea | `boolean` |

### list

| Field             | Description                      | Schema   |
| ----------------- | -------------------------------- | -------- |
| `options[].label` | Specify label of the list option | `string` |
| `options[].value` | Specify value of the list option | `string` |
