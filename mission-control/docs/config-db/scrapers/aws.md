# AWS

This config type is used to scrape information about your AWS infrastructure.



:::tip Registry

The registry has an [AWS](/registry/aws) Helm chart that provides a pre-configured Scraper with some common defaults

:::

```yaml title="aws-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: aws-scraper
spec:
  aws:
    - region:
        - eu-west-1
      properties:
        - name: AWS Link
          filter: 'config_type == AWS::IAM::Role'
          icon: aws-iam
          links:
            - text: AWS Link
              url: 'https://us-east-1.console.aws.amazon.com/iamv2/home#/roles/details/{{.name}}?section=permissions'
      cost_reporting:
        s3_bucket_path: s3://flanksource-cost-reports/query-results
        database: athenacurcfn_flanksource_report
        table: flanksource_report
        region: eu-west-1
      exclude:
        - Amazon EC2 Reserved Instances Optimization
        -  Amazon EC2 Reserved Instances Optimization
      transform:
        relationship:
          # EKS Cluster to Kubernetes Cluster & Kubernetes Node
          - filter: config_type == 'AWS::EKS::Cluster'
            expr: |
              [
                {"type": "Kubernetes::Cluster","labels": {"aws/account-id": tags['account'],"eks-cluster-name": tags["alpha.eksctl.io/cluster-name"]}},
                {"type": "Kubernetes::Node","labels": {"aws/account-id": tags['account'],"alpha.eksctl.io/cluster-name": tags["alpha.eksctl.io/cluster-name"]}}
              ].toJSON()
          # EC2 Instance to kubernetes node
          - filter: config_type == 'AWS::EC2:Instance'
            expr: |
              [{"type": "Kubernetes::Node", "labels": {"alpha.eksctl.io/instance-id": config["instance_id"]}}].toJSON()
          # IAM Role to Kubernetes Node
          - filter: config_type == 'AWS::IAM::Role'
            expr: |
              [{"type": "Kubernetes::Node", "labels": {"aws/iam-role": config["Arn"]}}].toJSON()
          # AvailabilityZone to Zone ID & Kubernetes Node
          - filter: config_type == 'AWS::AvailabilityZone'
            expr: |
              [
                {"type": "Kubernetes::Node", "labels": {"aws/account-id": tags['account'], "topology.kubernetes.io/zone": name}},
                {"type": "AWS::AvailabilityZoneID", "name": config["ZoneId"]}
              ].toJSON()
          # Region to ZoneID
          - filter: config_type == 'AWS::Region'
            expr: |
              [{"type": "AWS::AvailabilityZoneID", "labels": {"region": name}}].toJSON()
        exclude:
          - jsonpath: $.tags
          - jsonpath: $.privateDnsNameOptionsOnLaunch
          - jsonpath: outpostArn
          - jsonpath: mapCustomerOwnedIpOnLaunch
          - jsonpath: subnetArn
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
| `properties`            | Custom templatable properties for the scraped config items. | [`[]ConfigProperty`](../../reference/property) |          |
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
