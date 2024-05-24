---
title: AWS
---

The AWS bundle installs a [catalog scraper](/config-db/scrapers/aws) that:

- Scrapes AWS Resources and detects changes in the resource definition
- Ingests changes from CloudTrail
- Ingests cost data from AWS Cost & Usage Reporting
- Links AWS EKS resources to the corresponding Kubernetes resources

## Setup

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-aws flanksource/mission-control-aws
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
| `connectionDetails.connection` | AWS connection details. | [Connection](/reference/connections/aws) | "" |
| `connectionDetails.accessKey` | Name of the access key. | [EnvVar](/reference/env-var) | "" |
| `connectionDetails.secretKey` | Name of the secret key. | [EnvVar](/reference/env-var) | "" |
| `connectionDetails.region` | AWS region. | string | "" |
| `connectionDetails.endpoint` | AWS endpoint. | string | "" |
| `connectionDetails.skipTLSVerify` | Skip TLS verification.| bool | false |
| `connectionDetails.assumeRole` | Assume AWS role. | string | "" |
| `cloudtrail.maxAge` | Maximum age for CloudTrail. | "" |  |
| `cloudtrail.exclude` | List of excluded items for CloudTrail. | [] |  |
| `compliance` | Enable or disable compliance. | true |  |
|  | |  |  |
| `costReporting.enabled` | Enable or disable cost reporting. | false |  |
| `costReporting.database` | Cost reporting database. | "" |  |
| `costReporting.region` | Cost reporting region. | "" |  |
| `costReporting.s3BucketPath` | S3 bucket path for cost reporting. | "" |  |
| `costReporting.table` | Table for cost reporting. | "" |  |
|  | |  |  |
|  | |  |  |
|                                   |                                        |                                          |         |
| regions |  |  |  |
| `includeResources` | List of resources to include. | [] |  |
| `excludeResources` | List of resources to exclude. | [] |  |
|  |  |  |  |

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



<Step step={6} name="Cost & Usage Reporting" anchor="cur">

:::info Prerequisites
- [Cost and Usage Reports](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) are configured with an [Athena](https://docs.aws.amazon.com/cur/latest/userguide/use-athena-cf.html) table
- The `AWSQuicksightAthenaAccess` policy or similar is attached to config-db IAM role
:::


</Step>



### 
