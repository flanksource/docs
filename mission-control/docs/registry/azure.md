# Azure

The Azure helm chart installs a [catalog scraper](/config-db/scrapers/azure)

## Setup

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-aws flanksource/mission-control-azure
```

After running `helm install` you should get a success message:

```sh
NAME: mission-control-azure
LAST DEPLOYED: Thu Feb 14 19:00:32 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Azure scraper added
```

When you go to the catalog now, you can now see all the Azure Resources

![Azure Catalog](/img/azure-registry-catalog-scraper.png)


## Prerequisites

1. Connection to Azure must be authenticated via Workload Identity for Service Accounts or Client ID and Secret.

2. The role should have permissions to fetch the Azure Resources

### Values

This document provides an overview of configurable values for deploying Mission Control Registry on Azure using Helm.

## Configuration

The following table lists the configurable parameters and their default values:

| Parameter | Description | Schema | Default |
| --- | --- | --- | --- |
| `labels` | Additional labels to apply to resources| map[string]string | {} |
| `scraper.name` | Name of the Azure scraper | string | "azure" |
| `subscriptionID` | Azure Subscription ID | string | "" |
| `tenantID` | Azure Tenant ID | string | "" |

### Connection Details

| Parameter | Description | Schema | Default |
| --- | --- | --- | --- |
| `connectionDetails.connection` | Azure connection details. | string | "" |
| `connectionDetails.clientID` | Azure Client ID | <CommonLink to="secrets">*EnvVar*</CommonLink> | "" |
| `connectionDetails.clientSecret` | Azure Client Secret | <CommonLink to="secrets">*EnvVar*</CommonLink> | "" |

:::info
If you have setup Workload Identity Roles for Service Account, you do not have to do anything else. If you do not have that setup, you can use Client ID and Client Secret

Example:
```yaml title="values.yaml"
connectionDetails:
  clientID:
    valueFrom:
      secretKeyRef:
        name: azure-credentials
        key: CLIENT_ID
  clientSecret:
    valueFrom:
      secretKeyRef:
        name: azure-credentials
        key: CLIENT_SECRET
```

:::


### Exclusions

Certain items can be excluded from being scraped

| Parameter | Description | Default |
| --- | --- | --- |
| `exclusions.activityLogs` | List of activity logs resources to exclude (Example: `['Microsoft.ContainerService/managedClusters/listClusterAdminCredential/action']`) | [] |
