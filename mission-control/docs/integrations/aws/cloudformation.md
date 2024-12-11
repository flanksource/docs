---
draft: true
title: Cloudformation
sidebar_custom_props:
  icon: aws-cloudformation
---

# <span class=" iconify-color logos--aws-cloudformation"></span> CloudFormation

CloudFormation stacks and their relationships are automatically tracked by Mission Control through the AWS scraper. Here's how it works:

![](/img/cloudformation.svg)

## Features

- Tracks all CloudFormation stacks across enabled regions
- Automatically discovers stack dependencies and relationships
- Links resources created by CloudFormation stacks back to their parent stack
- Provides status and health monitoring of stacks
- Creates deep links to the AWS Console
- Retains stack deletion history and reasons

## Stack Relationships

Any AWS resource that has an `aws:cloudformation:stack-id` tag is automatically linked to its parent CloudFormation stack. The scraper:

1. Discovers the stack ID from resource tags
2. Creates a parent relationship from the resource to the stack
3. Moves any default parent relationships to soft relationships
4. Maintains the full stack tree hierarchy

## Stack Properties

The following properties are tracked for each stack:

- Stack name and ID
- Creation time
- Deletion time and reason (if deleted)
- Current status and health state
- Stack status reason messages
- Console URL link

## Configuration

CloudFormation scraping is enabled by default when AWS scraping is configured. Include "cloudformation" in the AWS scraper config to explicitly enable it:

```yaml
spec:
  aws:
    - regions: ['us-east-1']
      includes: ['cloudformation']
```

## Learn More

- [AWS](/config-db/scrapers/aws) Scraper
