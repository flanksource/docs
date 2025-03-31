---
title: AWS
sidebar_position: 1
sidebar_custom_props:
  icon: aws
---

# <Icon name="aws"/> AWS

This config type is used to scrape information about your AWS infrastructure.

:::tip Registry

The Mission Control Registry includes an [AWS](/integration/aws) Helm chart that provides a pre-configured Scraper with common defaults

:::

```yaml title="aws-scraper.yaml" file=<rootDir>/modules/config-db/fixtures/aws.yaml

```

| Field       | Description                                                                  | Scheme                                             | Required |
| ----------- | ---------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | [Cron](/reference/types#cron)                      |          |
| `retention` | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/guide/config-db/concepts/retention) |          |
| `aws`       | Specifies the list of AWS configurations to scrape.                          | [`[]AWS`](#aws)                                    |          |

### AWS

| Field            | Description                                                 | Scheme                                                | Required |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------------------- | -------- |
| `cloudtrail`     | Ingest cloudtrail events                                    | [`CloudTrail`](#cloudtrail)                           |          |
| `compliance`     | Toggle scraping of compliance metadata                      | `bool`                                                |          |
| `cost_reporting` | Enable cost and usage reporting                             | [`CostReporting`](#cost-reporting)                    |          |
| `exclude`        | AWS resources to exclude from scraping                      | `[]string`                                            |          |
| `include`        | AWS resources to include for scraping                       | `[]string`                                            |          |
| `properties`     | Custom templatable properties for the scraped config items. | [`[]ConfigProperty`](/reference/config-db/properties) |          |
| `transform`      | Field to transform result                                   | [`Transform`](/guide/config-db/concepts/transform)    |          |
| `tags`           | set custom tags on the scraped config items                 | `map[string]string`                                   |          |

## CloudTrail

| Field     | Description                                              | Scheme                                |
| --------- | -------------------------------------------------------- | ------------------------------------- |
| `exclude` | Set events to be excluded from scraping                  | `[]string`                            |
| `max_age` | Set maximum age of events for scraping, Defaults to `7d` | [Duration](/reference/types#duration) |

## Cost Reporting

| Field            | Description                                                    | Scheme   |
| ---------------- | -------------------------------------------------------------- | -------- |
| `s3_bucket_path` | Set path for S3 bucket to scrape published AWS billing reports | `string` |
| `table`          | Specify table containing cost and usage data                   | `string` |
| `database`       | Specify database containing cost and usage data                | `string` |
| `region`         | Specify region for S3 bucket                                   | `string` |

## Trusted Advisor

The scraper integrates with AWS Trusted Advisor to collect real-time guidance across cost optimization, performance, fault tolerance, security, and service limits to help optimize your AWS infrastructure.

:::warning Rate Limitations
Trusted Advisor checks run with a minimum interval of 16 hours (due to API rate limitations).
This can be overridden by setting the property `scraper.aws.trusted_advisor.minInterval`.
:::

To disable Trusted Advisor altogether, you can add an exclusion rule:

```yaml
exclude:
  - trusted_advisor
```

## Supported Resources

| Resource Type       | AWS Type                                  | Config Class       | Description                             |
| ------------------- | ----------------------------------------- | ------------------ | --------------------------------------- |
| Account             | AWS::IAM::Account                         | Account            | AWS Account information                 |
| CloudFormationStack | AWS::CloudFormation::Stack                | Stack              | CloudFormation stacks                   |
| DHCPOptions         | AWS::EC2::DHCPOptions                     | DHCP               | DHCP Options Sets                       |
| DNSZone             | AWS::Route53::HostedZone                  | DNSZone            | Route53 Hosted Zones                    |
| EBSVolume           | AWS::EBS::Volume                          | DiskStorage        | Elastic Block Store Volumes             |
| EC2Instance         | AWS::EC2::Instance                        | VirtualMachine     | EC2 Instances                           |
| ECRRepository       | AWS::ECR::Repository                      | ContainerRegistry  | Elastic Container Registry Repositories |
| ECSCluster          | AWS::ECS::Cluster                         | ECSCluster         | ECS Clusters                            |
| ECSService          | AWS::ECS::Service                         | ECSService         | ECS Services                            |
| ECSTask             | AWS::ECS::Task                            | ECSTask            | ECS Tasks                               |
| ECSTaskDefinition   | AWS::ECS::TaskDefinition                  | ECSTaskDefinition  | ECS Task Definitions                    |
| EFSFileSystem       | AWS::EFS::FileSystem                      | FileSystem         | Elastic File System                     |
| EKSCluster          | AWS::EKS::Cluster                         | KubernetesCluster  | Elastic Kubernetes Service Clusters     |
| ElastiCache         | AWS::ElastiCache::CacheCluster            | Cache              | ElastiCache Clusters                    |
| FargateProfile      | AWS::EKS::FargateProfile                  | FargateProfile     | EKS Fargate Profiles                    |
| IAMInstanceProfile  | AWS::IAM::InstanceProfile                 | Profile            | IAM Instance Profiles                   |
| IAMRole             | AWS::IAM::Role                            | Role               | IAM Roles                               |
| IAMUser             | AWS::IAM::User                            | User               | IAM Users                               |
| LambdaFunction      | AWS::Lambda::Function                     | Lambda             | Lambda Functions                        |
| LoadBalancer        | AWS::ElasticLoadBalancing::LoadBalancer   | LoadBalancer       | Classic Load Balancers                  |
| LoadBalancerV2      | AWS::ElasticLoadBalancingV2::LoadBalancer | LoadBalancer       | Application/Network Load Balancers      |
| RDSInstance         | AWS::RDS::DBInstance                      | RelationalDatabase | RDS Database Instances                  |
| RouteTable          | AWS::EC2::RouteTable                      | Route              | VPC Route Tables                        |
| S3Bucket            | AWS::S3::Bucket                           | ObjectStorage      | S3 Buckets                              |
| SecurityGroup       | AWS::EC2::SecurityGroup                   | SecurityGroup      | Security Groups                         |
| SNSTopic            | AWS::SNS::Topic                           | Topic              | Simple Notification Service Topics      |
| SQSQueue            | AWS::SQS::Queue                           | Queue              | Simple Queue Service Queues             |
| Subnet              | AWS::EC2::Subnet                          | Subnet             | VPC Subnets                             |
| VPC                 | AWS::EC2::VPC                             | VPC                | Virtual Private Clouds                  |
