---
title: AWS
---

The AWS helm chart installs a [catalog scraper](/config-db/scrapers/aws)

## Setup

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-aws flanksource/mission-control-aws
```

After running `helm install` you should get a success message:

```sh
NAME: mission-control-aws
LAST DEPLOYED: Thu Feb 14 19:00:32 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
AWS scraper added
```

When you go to the catalog now, you can now see all the AWS Resources

![AWS Catalog](/img/aws-registry-catalog-scraper.png)


## Prerequisites

1. Connection to AWS must be authenticated via IAM Roles for Service Accounts or AWS Access and Secret Key. [Click Here to see how to configure AWS](/installation/aws-eks)

2. The role should have permissions to fetch the AWS Resources

3. Cost Reporting should also be setup if you want to associate costs to each resource. [Check the guide here](/installation/aws-eks#cost-reporting)

### Values

This document provides an overview of configurable values for deploying Mission Control Registry on AWS using Helm.

## Configuration

The following table lists the configurable parameters and their default values:

| Parameter | Description | Default |
| --- | --- | --- |
| `labels` | Additional labels to apply to resources. | {} |
| `scraper.name` | Name of the AWS scraper. | "aws" |

### Connection Details

| Parameter | Description | Schema | Default |
| --- | --- | --- | --- |
| `connectionDetails.connection` | AWS connection details. | string | "" |
| `connectionDetails.accessKey` | Name of the access key. | <CommonLink to="secrets">*EnvVar*</CommonLink> | "" |
| `connectionDetails.secretKey` | Name of the secret key. | <CommonLink to="secrets">*EnvVar*</CommonLink> | "" |
| `connectionDetails.region` | AWS region. | string | "" |
| `connectionDetails.endpoint` | AWS endpoint. | string | "" |
| `connectionDetails.skipTLSVerify` | Skip TLS verification.| bool | false |
| `connectionDetails.assumeRole` | Assume AWS role. | string | "" |

:::info
If you have setup IAM Roles for Service Account, you do not have to do anything else. If you do not have that setup, you can use AWS Access and Secret Keys as well

Example:
```yaml title="values.yaml"
connectionDetails:
  accessKey:
    valueFrom:
      secretKeyRef:
        name: aws-credentials
        key: AWS_ACCESS_KEY
  secretKey:
    valueFrom:
      secretKeyRef:
        name: aws-credentials
        key: AWS_SECRET_KEY
```

:::


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
