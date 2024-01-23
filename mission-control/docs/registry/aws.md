# AWS

The AWS helm chart installs a [catalog scraper](/config-db/scrapers/aws)

## Setup

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install {release-name} flanksource/mission-control-aws
```

### Values

This document provides an overview of configurable values for deploying Mission Control Registry on AWS using Helm.

## Configuration

The following table lists the configurable parameters and their default values:

| Parameter | Description | Default |
| --- | --- | --- |
| `nameOverride` | Overrides the name of the chart. | "" |
| `fullnameOverride` | Overrides the full name of the chart. | "" |
| `labels` | Additional labels to apply to resources. | {} |
| `scraper.name` | Name of the AWS scraper. | "aws" |

### Connection Details

| Parameter | Description | Default |
| --- | --- | --- |
| `connectionDetails.connection` | AWS connection details. | "" |
| `connectionDetails.accessKey.name` | Name of the access key. | "" |
| `connectionDetails.accessKey.value` | Value of the access key. | "" |
| `connectionDetails.accessKey.valueFrom.serviceAccount` | Service account for fetching the value. | "" |
| `connectionDetails.accessKey.valueFrom.helmRef.key` | Key for Helm reference. | "" |
| `connectionDetails.accessKey.valueFrom.helmRef.name` | Name for Helm reference. | "" |
| `connectionDetails.accessKey.valueFrom.configMapKeyRef.key` | Key for ConfigMap key reference. | "" |
| `connectionDetails.accessKey.valueFrom.configMapKeyRef.name` | Name for ConfigMap key reference. | "" |
| `connectionDetails.accessKey.valueFrom.secretKeyRef.key` | Key for Secret key reference. | "" |
| `connectionDetails.accessKey.valueFrom.secretKeyRef.name` | Name for Secret key reference. | "" |
| `connectionDetails.secretKey.name` | Name of the secret key. | "" |
| `connectionDetails.secretKey.value` | Value of the secret key. | "" |
| `connectionDetails.secretKey.valueFrom.serviceAccount` | Service account for fetching the value. | "" |
| `connectionDetails.secretKey.valueFrom.helmRef.key` | Key for Helm reference. | "" |
| `connectionDetails.secretKey.valueFrom.helmRef.name` | Name for Helm reference. | "" |
| `connectionDetails.secretKey.valueFrom.configMapKeyRef.key` | Key for ConfigMap key reference. | "" |
| `connectionDetails.secretKey.valueFrom.configMapKeyRef.name` | Name for ConfigMap key reference. | "" |
| `connectionDetails.secretKey.valueFrom.secretKeyRef.key` | Key for Secret key reference. | "" |
| `connectionDetails.secretKey.valueFrom.secretKeyRef.name` | Name for Secret key reference. | "" |
| `connectionDetails.region` | AWS region. | "" |
| `connectionDetails.endpoint` | AWS endpoint. | "" |
| `connectionDetails.skipTLSVerify` | Skip TLS verification. | "" |
| `connectionDetails.assumeRole` | Assume AWS role. | "" |

### Cloudtrail

| Parameter | Description | Default |
| --- | --- | --- |
| `cloudtrail.maxAge` | Maximum age for CloudTrail. | "" |
| `cloudtrail.exclude` | List of excluded items for CloudTrail. | [] |

### Compliance

| Parameter | Description | Default |
| --- | --- | --- |
| `compliance` | Enable or disable compliance. | true |

### Cost Reporting

| Parameter | Description | Default |
| --- | --- | --- |
| `costReporting.enabled` | Enable or disable cost reporting. | false |
| `costReporting.database` | Cost reporting database. | "" |
| `costReporting.region` | Cost reporting region. | "" |
| `costReporting.s3BucketPath` | S3 bucket path for cost reporting. | "" |
| `costReporting.table` | Table for cost reporting. | "" |

### Inventory

| Parameter | Description | Default |
| --- | --- | --- |
| `inventory` | Enable or disable inventory. | true |

### Patch Details

| Parameter | Description | Default |
| --- | --- | --- |
| `patchDetails` | Enable or disable patch details. | true |

### Patch States

| Parameter | Description | Default |
| --- | --- | --- |
| `patchStates` | Enable or disable patch states. | true |

### Trusted Advisor Check

| Parameter | Description | Default |
| --- | --- | --- |
| `trustedAdvisorCheck` | Enable or disable Trusted Advisor check. | false |

### AWS Regions

| Parameter | Description | Default |
| --- | --- | --- |
| `regions` | List of AWS regions to pull from. | [] |

### Include Resources

| Parameter | Description | Default |
| --- | --- | --- |
| `includeResources` | List of resources to include. | [] |

### Exclude Resources

| Parameter | Description | Default |
| --- | --- | --- |
| `excludeResources` | List of resources to exclude. | [] |
