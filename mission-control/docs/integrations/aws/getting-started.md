---
title: Getting Started
sidebar_position: 0
sidebar_custom_props:
  icon: getting-started
---

import Schema from '@site/modules/mission-control-registry/charts/aws/values.schema.json'

Installs a [catalog scraper](/docs/guide/config-db/scrapers/aws) that:

- Scrapes AWS Resources and detects changes in the resource definition
- Ingests changes from CloudTrail
- Ingests cost data from AWS Cost & Usage Reporting
- Links AWS EKS resources to the corresponding Kubernetes resources

:::info Prerequisites

- IAM Role for scraping AWS API's
- Mission Control configured to use Pod Identity/IRSA or an AWS access key

For Cost & Usage Reporting

- [Cost and Usage Reports](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) are configured with an [Athena](https://docs.aws.amazon.com/cur/latest/userguide/use-athena-cf.html) table
- The `AWSQuicksightAthenaAccess` policy or similar is attached to config-db IAM role
  :::

<Tabs>

<TabItem label="Pod Identity" value="role" default >
1. Configure the `config-db-sa` service account with a [AWS IAM Pod Identity / Role](/docs/integrations/aws/iam?type=pod)
2. Install the  [mission-control-aws](https://artifacthub.io/packages/helm/flanksource/mission-control-aws) chart

<Helm chart="mission-control-aws"
  schema={Schema}
  createNamespace={false}
  createRepo={false}
 />

</TabItem>

<TabItem label="Access Keys" value="keys">
1. Create a new connection for an [AWS Access Key](/docs/integrations/aws/iam?type=accessKey)
1. Install the [mission-control-aws](https://artifacthub.io/packages/helm/flanksource/mission-control-aws) chart

<Helm chart="mission-control-aws"
schema={Schema}
createNamespace={false}
createRepo={false}
values={{
    connection: "connection://mission-control/aws"
  }}
/>

</TabItem>

</Tabs>

When you go to the catalog now, you can now see all the AWS Resources

<Screenshot img="/img/aws-registry-catalog-scraper.png"/>

## Next Steps

<Cards>

  <Card size="sm" title="AWS Cloudformation" icon="aws-cloudformation">
          <Tag label="relationship"/>
  </Card>

  <Card size="sm" title="AWS Cloudwatch Alarms" icon="aws-cloudwatch" link="/docs/guide/canary-checker/reference/aws-cloudwatch">
  Aggregate Alarms
        <Tag label="health-check"/>

  </Card>

   <Card size="sm" title="AWS Config" icon="aws-config" link="/docs/guide/canary-checker/reference/aws-config">
      Check for AWS resources matching a query
            <Tag label="health-check"/>

  </Card>
   <Card size="sm" title="AWS Config Rules" icon="aws-config" link="/docs/guide/canary-checker/reference/aws-config-rule">
      Check for non-compliant AWS resources
      <Tag label="health-check"/>
  </Card>

    <Card size="sm" title="ScrapeConfig" icon="k8s-customresourcedefinition" link="/docs/guide/config-db/scrapers/aws">
      <Tag label="CRD"/>

  </Card>
</Cards>
