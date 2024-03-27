# Scraping


Every config item has the following metadata:

| Field        | Description                                                  | Example                                          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| id           | A `UUID` representing the item, where possible the resource providers `id` is used |                                                  |
| name         |                                                              |                                                  |
| type         | The config item type                                                | `EC2::Instance`, `Kubernetes::Pod`, `Azure:VM`   |
| config_class | A non-cloud specific class of resources | `VM`                                             |
| external_id  | One or more aliases that refer to the same item              | `AmazonEC2/i-abcd`, `aws::ec2::instance:/i-abcd` |
| status       | The externally reported status of the item using  [is-healthy](https://github.com/flanksource/is-healthy)  | `Healthy`,`Progressing`, `Terminated`            |
| config       | The JSON representation of an item <br/> _e.g. the json returned from `kubectl get -o json`_ |                                                  |
|              |                                                              |                                                  |


## Transformation

### Exclusions

Exclusions allow you to remove fields from the `config` of an item. This is useful when you want to remove sensitive or overly verbose from being recorded.

```yaml title="kubernetes-exclude-superfluous-fields.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        exclude:
          - jsonpath: '.metadata.ownerReferences'
          - types:
              - Kubernetes::Pod
            jsonpath: '.metadata.generateName'
```



| Field      | Description                                                  | Scheme                                            | Required |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| `jsonpath` | All matching elements will be removed from the `config`      | <CommonLink to="jsonpath">`jsonpath`</CommonLink> | `true`   |
| `types`    | Only run exclusion rules for these config types, if empty apply to all | `[]string`                                        |          |



### Masking

Masking allows replacing sensitive fields with a hash or static string.

```yaml title="file-mask-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-mask-scraper
spec:
  file:
    - type: Config
      id: $.id
      name: $.name
      transform:
        mask:
          - selector: config.name == 'Config1'
            jsonpath: $.password
            value: md5sum
          - selector: config.name == 'Config1'
            jsonpath: $.secret
            value: '***'
      paths:
        - fixtures/data/single-config.json
```

| Field      | Description                                 | Scheme                                            | Required | Context                                       |
| ---------- | ------------------------------------------- | ------------------------------------------------- | -------- | --------------------------------------------- |
| `selector` | Filter which config items to apply masks on | <CommonLink to="cel">`CEL`</CommonLink>           | `true`   | [`ScrapeResult`](../references/scrape-result) |
| `jsonpath` | Values to mask                              | <CommonLink to="jsonpath">`jsonpath`</CommonLink> | `true`   |                                               |
| `value`    | The replacement value of matched elements   | `md5` or any static string e.g. `***`             | `true`   |                                               |

:::info
Masks are applied in the order they are specified in the configuration file.
:::

