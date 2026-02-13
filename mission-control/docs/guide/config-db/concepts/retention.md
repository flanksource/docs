---
title: Retention

sidebar_custom_props:
  icon: lucide:archive-x
---

After scraping we can choose to retain results on the basis of name, age, count and more.

## Default Retention Periods

When retention rules are not explicitly configured, config-db applies the following default retention periods:

| Type            | Default Period | Description                                         |
| --------------- | -------------- | --------------------------------------------------- |
| Config Items    | 7 days         | Configuration items are retained for 7 days         |
| Changes         | 60 days        | Change records are retained for 60 days             |
| Config Analysis | 60 days        | Configuration analysis data is retained for 60 days |

These defaults ensure that your database doesn't grow unbounded while maintaining a reasonable history of configuration changes and analysis.

The retention rules are applied for each unique catalog item. If `changes` is specified with type `X` and count `20`, last 20 changes of `X` type would be kept for each catalog item

| Field          | Description                                                        | Scheme                                     |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| `types`        | Specify retention rules for config items                           | [`[]ConfigItem`](#config-items)            |
| `changes`      | Specify retention rules for changes                                | [`[]Change`](#changes)                     |
| `staleItemAge` | Config items that were last scraped after this age will be deleted | [Duration](/docs/reference/types#duration) |

## Config Items

| Field        | Description                                                       | Scheme                                     |
| ------------ | ----------------------------------------------------------------- | ------------------------------------------ |
| `name`       | Specify retention rules for changes                               | `string`                                   |
| `createdAge` | Age after a config item is created it will be deleted             | [Duration](/docs/reference/types#duration) |
| `updatedAge` | Age after a config item last updated, that it will be deleted     | [Duration](/docs/reference/types#duration) |
| `deletedAge` | Age after a config item is soft deleted, will it be hard deleted. | [Duration](/docs/reference/types#duration) |

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
  // highlight-start
    types:
      - name: Kubernetes::Pod
        deletedAge: 7d # keep deleted pods around for 7 days
      - name: Kubernetes::Replicaset
        deletedAge: 60m # we don't care about replicasets remove then quickly
  // highlight-end
  kubernetes:
    clusterName: local
```

### Stale Config Items

With some scrapers (particularly custom scrapers), there is no defined event or field update to mark an item as deleted, in these cases `stateItemAge` will cleanup items that have not been scraped for specified period

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
    //highlight-next-line
    staleItemAge: 30m
  kubernetes:
    clusterName: local
```

## Changes

Changes can quickly accumulate and grow large over time. While it's important to retain some changes, others can be discarded after a period.

| Field   | Description                                             | Scheme                                     | Required |
| ------- | ------------------------------------------------------- | ------------------------------------------ | -------- |
| `name`  | Name of the change type                                 | `string`                                   | `true`   |
| `age`   | Maximum age of the change type to retain (`12h`, `30d`) | [Duration](/docs/reference/types#duration) |          |
| `count` | Maximum count to retain the change type                 | `int`                                      |          |

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
  // highlight-start
    changes:
      - name: PullSucceeded
        age: 7d # Only keep one week of PullSucceeded changes
  // highlight-end
  kubernetes:
    clusterName: local
```
