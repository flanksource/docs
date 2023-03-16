This config type is used to scrape information about your AWS infrastructure.

```yaml
aws:
  - region:
      - eu-west-2
      - us-east-1
      - af-south-1
      - ap-south-1
      - eu-central-1
compliance: true
patch_states: false
trusted_advisor_check: false
patch_details: false
cost_reporting:
  s3_bucket_path: s3://flanksource-cost-reports/query-results
  database: athenacurcfn_flanksource_report
  table: flanksource_report
  region: af-south-1
inventory: true
exclude:
  - Amazon EC2 Reserved Instances Optimization
  - Savings Plan
transform:
  exclude:
    - jsonpath: $.tags
    - jsonpath: $.privateDnsNameOptionsOnLaunch
    - jsonpath: outpostArn
    - jsonpath: mapCustomerOwnedIpOnLaunch
    - jsonpath: subnetArn
```

### AWS

| Field                                              | Description                                                                                                                                                             | Scheme                                  | Required |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `id`                                               | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                | `true`   |
| `name`                                             | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                | `false`  |
| `items`                                            | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                | `false`  |
| `type`                                             | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                | `true`   |
| `transform`                                        | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md) | `false`  |
| `format`                                           | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                | `false`  |
| `timestampFormat`                                  | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                | `false`  |
| `createFields`                                     | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                              | `false`  |
| `deleteFields`                                     | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                              | `false`  |
| `compliance`                                       | Toggle scraping of compliance metadata                                                                                                                                  | _bool_                                  |          |
| `patch_states`                                     | Set boolean value for scraping of patch state status, and report                                                                                                        | _bool_                                  |          |
| `trusted_advisor_check`                            | Set boolean value for enabling/disabling trusted advisor                                                                                                                | _bool_                                  |          |
| `patch_details`                                    | Set boolean value to enable/disable scraping of patch details                                                                                                           | _bool_                                  |          |
| [`cost_reporting`](#cost-reporting)                | Specify cost reporting for scraping of data                                                                                                                             | [_CostReporting_](#cost-reporting)      |          |
| [`cloud_trail`](#cloudtrail-cloudtrail-cloudtrail) | Set CloudTrail specifications                                                                                                                                           | [_CloudTrail_](#cloudtrail-cloudtrail)  |          |
| `include`                                          | Specify AWS resources to include for scraping                                                                                                                           | _\[\]string_                            |          |
| `exclude`                                          | Specify AWS resources to exclude from scraping                                                                                                                          | _\[\]string_                            |          |
| `inventory`                                        | Toggle scrape of _metadata_ for AWS resources                                                                                                                           | _bool_                                  |          |

### CloudTrail (`cloudtrail`)

| Field     | Description                             | Scheme       | Required |
| --------- | --------------------------------------- | ------------ | -------- |
| `exclude` | Set events to be excluded from scraping | _\[\]string_ |          |
| `max_age` | Set maximum age of events for scraping  | _string_     |          |

### Cost Reporting (`cost_reporting`)

| Field            | Description                                                    | Scheme   | Required |
| ---------------- | -------------------------------------------------------------- | -------- | -------- |
| `s3_bucket_path` | Set path for S3 bucket to scrape published AWS billing reports | _string_ |          |
| `table`          | Specify table containing cost and usage data                   | _string_ |          |
| `database`       | Specify database containing cost and usage data                | _string_ |          |
| `region`         | Specify region for S3 bucket                                   | _string_ |          |

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
- Trusted Advisir
- VPC
