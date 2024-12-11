---
draft: true
title: Cloudtrail
---

# CloudTrail Integration

Mission Control integrates with AWS CloudTrail to track API activity and changes across your AWS accounts. The AWS scraper handles CloudTrail events and trails.

## Features

- Discovers CloudTrail trails across regions
- Maps trail configurations and settings
- Links trails to their associated S3 buckets
- Tracks multi-region trail setups
- Creates relationships between trails and logged resources

## Trail Properties

The following properties are tracked for CloudTrail trails:

- Trail name and ARN
- Associated S3 bucket and prefix
- Multi-region status
- Log file validation settings
- CloudWatch logs configuration
- KMS encryption settings

## Configuration

CloudTrail scraping is enabled by default in the AWS scraper. Include "cloudtrail" in the AWS config to explicitly enable it:

```yaml
spec:
  aws:
    - regions: ['us-east-1']
      includes: ['cloudtrail']
```

This allows Mission Control to maintain a complete audit trail of changes across your AWS infrastructure.
