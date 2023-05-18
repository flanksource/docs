# Install Mission Control on AWS EKS cluster


## Prerequisites

1. Dashboard URL
2. cert-manager
3. Ingress controller

---
## Deployment steps

1. `helm repo add flanksource [https://flanksource.github.io/charts]`
2. `helm repo update`
3. `helm install flanksource flanksource/mission-control -n flanksource`
4. To set custom values file for your mission-control helm chart installation to override existing values in [mission-control-chart](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml).
---

## Enable Config Scrapers
<br>

### Create a read-only IAM role

Create a role to allow mission-control to configuration of your AWS resources. Attach the following AWS managed policies to the role:

1. ReadOnlyAccess
2. AWSConfigUserAccess
3. AWSQuicksightAthenaAccess

Attach one Customer managed policy to the role with [this json policy document](https://github.com/flanksource/docs/blob/main/docs/installation/resources/iam-policy.json)

### Annotate the service account

- Modify the helm chart values for incident commander and pass the role ARN 
```
config-db:
    serviceAccount:
        create: true
        name: "config-db-sa"
        annotations:
             eks.amazonaws.com/role-arn: IAM Role ARN
```

- Upgrade the helm chart to apply the changes


### Create config scrapers

- Specify the spec for AWS and K8s
- Check the reference doc for [AWS config scraper](https://github.com/flanksource/docs/blob/main/docs/config-db/scrapers/aws.md) to define your own config scraper
- You can create configs for scrapers from the dashboard or by creating a custom resource like [this one](https://github.com/flanksource/docs/blob/main/docs/installation/resources/scrapers.yaml)


### Validate

- Visit the Config section on incident commander dashboard at https://my-dashboard-url/configs
- ![K8s Config Scraper Screenshot](https://github.com/flanksource/docs/blob/main/docs/installation/resources/k8s-config-scraper.png)
- ![AWS Config Scraper Screenshot](https://github.com/flanksource/docs/blob/main/docs/installation/resources/aws-config-scraper.png)

---