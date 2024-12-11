---
draft: true
title: Cost & Usage Reports
---

# Cost & Usage Reports

Mission Control can track AWS Cost and Usage Reports (CUR) to help monitor and analyze your AWS spending. The AWS scraper handles CUR data collection.

## Features

- Discovers configured Cost and Usage Reports
- Maps report delivery settings and schedules
- Links reports to their S3 buckets
- Tracks report time ranges and formats
- Creates relationships to billed resources

## Report Properties

The following properties are tracked for Cost and Usage Reports:

- Report name and ARN
- S3 bucket and prefix path
- Time granularity settings
- File format and compression
- Report content configuration
- Resource IDs and tagging

## Configuration

CUR scraping is enabled by default in the AWS scraper. Include "cur" in the AWS config to explicitly enable it:

```yaml
spec:
  aws:
    - regions: ['us-east-1']
      includes: ['cur']
```

This allows Mission Control to help track and analyze your AWS infrastructure costs.
