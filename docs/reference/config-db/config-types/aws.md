## AWS
This config type is used to scrape information about your AWS infrastructure.

??? example
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


| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `compliance` | Specify compliance metadata for scraping |  |
| `patch_states` | Set boolean value for scraping of patch state status, and report | boolean  |
| `trusted_advisor_check` | Set boolean value for enabling/disabling trusted advisor | boolean |
| `patch_details` | Set boolean value  | boolean |  |
| [`cost_reporting`](#CostReporting) | Specify cost reporting for scraping of data |
| [`cloud_trail`](#cloudtrail-cloudtrail) |
| `include` | Specify AWS resources to include for scraping |  |
| `exclude` | Specify AWS resources to exclude from scraping |  |
| `inventory` | Specify *metadata* for AWS resources for scraping inventory data |  |

### CloudTrail (`cloudtrail`)

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `exclude` | Set events to be excluded from scraping | string |
| `max_age` | Set maximum age of events for scraping | string |

### CostReporting (`cost_reporting`)

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `s3_bucket_path` | Set path for S3 bucket to scrape published AWS billing reports |  |
| `table` | Specify table containing cost and usage data |  |
| `database` | Specify database containing cost and usage data |  |
| `region` | Specify region for S3 bucket |