---
title: Azure
sidebar_position: 2
sidebar_custom_props:
  icon: azure
---

# <Icon name="azure"/> Azure

:::tip Registry
The registry has an [Azure](/registry/azure) Helm chart that provides a pre-configured Scraper with some common defaults
:::

The Azure scrapers scrapes your azure account to fetch all the resources & save them as configs.

```yaml title="azure-scraper.yaml" file=<rootDir>/modules/config-db/fixtures/azure.yaml

```

## Scraper

| Field       | Description                                                                  | Scheme                                       | Required |
| ----------- | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`  | Specify the level of logging.                                                | `string`                                     |          |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | `string`                                     |          |
| `retention` | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/guide/config-db/concepts/retention) |          |
| `azure`     | Azure scrape config                                                          | [`[]Azure`](#azure)                          |          |

### Azure

| Field            | Description                                                                | Scheme                                                | Required |
| ---------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- | -------- |
| `connection`     | Specify the connection that provides the clientID, clientSecret & tenantID | `string`                                              |          |
| `subscriptionID` | Azure subscription ID                                                      | `string`                                              |          |
| `organisation`   | Azure organisation ID                                                      | `string`                                              |          |
| `tenantID`       | Azure tenant ID                                                            | `string`                                              |          |
| `clientID`       | Microsoft Entra ID app client id                                           | <CommonLink to="secrets">_EnvVar_</CommonLink>        |          |
| `clientSecret`   | Microsoft Entra ID app client secret                                       | <CommonLink to="secrets">_EnvVar_</CommonLink>        |          |
| `exclusions`     | Specifies the Azure projects to scrape                                     | [`Exclusion`](#exclusion)                             |          |
| `properties`     | Custom templatable properties for the scraped config items.                | [`[]ConfigProperty`](/reference/config-db/properties) |          |
| `transform`      | Field to transform result                                                  | [`Transform`](/guide/config-db/concepts/transform)          |          |
| `tags`           | Set custom tags on the scraped config items                                | `map[string]string`                                   |          |

:::note
Either the `connection` name or the credentials (`clientID`, `clientSecret` & `tenantID`) are required
:::

#### Exclusion

| Field          | Description                                        | Scheme     | Required |
| -------------- | -------------------------------------------------- | ---------- | -------- |
| `activityLogs` | A list of operations to exclude from activity logs | `[]string` |          |

## Resource Types

The following Azure resources are scraped and mapped to Mission Control config types:

| Resource Type                              | Config Class          |
| ------------------------------------------ | --------------------- | --- |
| microsoft.compute/virtualmachines          | VirtualMachine        |
| microsoft.compute/virtualmachinescalesets  | Node                  |
| microsoft.network/loadbalancers            | LoadBalancer          |
| microsoft.network/virtualnetworks          | VirtualNetwork        |
| microsoft.containerregistry/registries     | ContainerRegistry     |
| microsoft.network/azurefirewalls           | Firewall              |
| microsoft.sql/servers                      | RelationalDatabase    |
| microsoft.dbforpostgresql/servers          | RelationalDatabase    |
| microsoft.containerservice/managedclusters | KubernetesCluster     |
| microsoft.resources/resourcegroups         | ResourceGroup         |
| subscription                               | Subscription          |
| microsoft.storage/storageaccounts          | StorageAccount        |
| microsoft.web/sites                        | AppService            |
| microsoft.network/dnszones                 | DNSZone               |
| microsoft.network/privatednszones          | PrivateDNSZone        |
| microsoft.network/trafficmanagerprofiles   | TrafficManagerProfile |
| microsoft.network/networksecuritygroups    | SecurityGroup         |
| microsoft.network/publicipaddresses        | PublicIPAddress       | +   |
