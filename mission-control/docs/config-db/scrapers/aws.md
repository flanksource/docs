---
title: AWS
sidebar_position: 1
---

# <Icon name="aws"/> AWS

This config type is used to scrape information about your AWS infrastructure.



:::tip Registry

The registry has an [AWS](/registry/aws) Helm chart that provides a pre-configured Scraper with some common defaults

:::

```yaml title="aws-scraper.yaml" file=../../../modules/config-db/fixtures/aws.yaml
```

| Field       | Description                                                                  | Scheme                                       | Required |
| ----------- | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | [Cron](/reference/types#cron)                                   |          |
| `retention` | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/config-db/concepts/retention) |          |
| `aws`       | Specifies the list of AWS configurations to scrape.                          | [`[]AWS`](#aws)                            |          |

### AWS

| Field                   | Description                                                 | Scheme                                         | Required |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------- | -------- |
| `cloudtrail`            | Ingest cloudtrail events                            | [`CloudTrail`](#cloudtrail)                    |          |
| `compliance`            | Toggle scraping of compliance metadata                      | `bool`                                         |          |
| `cost_reporting`        | Enable cost and usage reporting                 | [`CostReporting`](#cost-reporting)             |          |
| `exclude`               | AWS resources to exclude from scraping                      | `[]string`                                     |          |
| `include`               | AWS resources to include for scraping                       | `[]string`                                     |          |
| `properties`            | Custom templatable properties for the scraped config items. | [`[]ConfigProperty`](/reference/config-db/properties) |          |
| `transform`       | Field to transform result                                                                        | [`Transform`](/config-db/concepts/transform)                        |          |
| `tags`                  | set custom tags on the scraped config items                 | `map[string]string`                            |          |

## CloudTrail

| Field     | Description                             | Scheme     |
| --------- | --------------------------------------- | ---------- |
| `exclude` | Set events to be excluded from scraping | `[]string` |
| `max_age` | Set maximum age of events for scraping, Defaults to `7d`  | [Duration](/reference/types#duration)  |

## Cost Reporting

| Field            | Description                                                  | Scheme   |
| ---------------- | ------------------------------------------------------------ | -------- |
| `s3_bucket_path` | Set path for S3 bucket to scrape published AWS billing reports | `string` |
| `table`          | Specify table containing cost and usage data                 | `string` |
| `database`       | Specify database containing cost and usage data              | `string` |
| `region`         | Specify region for S3 bucket                                 | `string` |

### Supported Resources

- Account
- CloudTrail
- Config Rules
- Cost & Usage Reporting

- EBS
- EC2
- ECR
- EFS
- EKS
- IAM
- Load Balancers
- RDS
- Route53
- Subnet
- Trusted Advisor
  - Amazon EC2 Reserved Instances Optimization
  - Savings Plan
- VPC
