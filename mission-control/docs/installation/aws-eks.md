# Install Mission Control on AWS EKS cluster

## Prerequisites

1. Kubernetes 1.22+ with Identity Federation enabled
2. [cert-manager](https://cert-manager.io/docs/)

---
## Deployment steps

1. `helm repo add flanksource [https://flanksource.github.io/charts]`
2. `helm repo update`
3. `helm install flanksource flanksource/mission-control -n flanksource`
4. To set custom values file for your mission-control helm chart installation, override existing values in [mission-control-chart](https://github.com/flanksource/mission-control-chart/tree/main/chart). Some common values that can be changed can be found [here](https://docs.flanksource.com/#install-chart)
---


## Creating a read-only IAM role

Create a role to allow mission-control to configuration of your AWS resources. Attach the following AWS managed policies to the role:

1. ReadOnlyAccess
2. AWSConfigUserAccess
3. AWSQuicksightAthenaAccess

Sample IAM Policy:
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "mission-control-config-role",
			"Effect": "Allow",
			"Action": [
				"acm:Describe*",
				"acm:Get*",
				"acm:List*",
				"cloudtrail:LookupEvents",
				"ec2:Describe*",
				"ecr:Describe*",
				"eks:ListClusters",
				"eks:Describe*",
				"rds:Describe*",
				"elasticfilesystem:Describe*",
				"elasticloadbalancing:Describe*",
				"sts:GetCallerIdentity"
				"config:BatchGetAggregateResourceConfig",
				"config:BatchGetResourceConfig",
				"config:Describe*",
				"config:Get*",
				"config:List*",
				"config:SelectAggregateResourceConfig",
				"config:SelectResourceConfig",
				"guardduty:Describe*",
				"guardduty:Get*",
				"guardduty:List*",
				"iam:GetAccountName",
				"iam:GetAccountSummary",
				"iam:GetGroup",
				"iam:GetGroupPolicy",
				"iam:GetInstanceProfile",
				"iam:GetLoginProfile",
				"iam:GetPolicy",
				"iam:GetRole",
				"iam:GetRolePolicy",
				"iam:GetUser",
				"iam:List*",
				"lambda:List*",
				"trustedadvisor:Describe*",
				"trustedadvisor:DownloadRisk",
				"trustedadvisor:Get*",
				"trustedadvisor:List*",
			],
			"Resource": "*"
		}
	]
}
```

Modify the trust policy of the IAM role by changing the OIDC arn, OIDC endpoint and the namespace below. 
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::7458xxxxxxxx:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/4D3C9C8xxxx"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "oidc.eks.us-east-1.amazonaws.com/id/4D3C9C8xxxx:sub": "system:serviceaccount:namespace:config-db-sa",
                    "oidc.eks.us-east-1.amazonaws.com/id/4D3C9C8xxxx:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
```

## Cost reporting

### Enable AWS cost and usage reports

Mission Control can read the cost and usage reports stored in the S3 bucket and map it to the resources it discovers in your AWS environment. To achieve this, 
1. Setup Cost and Usage Reports in your AWS account and integrate it with Athena. Refer this [AWS documentation](https://docs.aws.amazon.com/cur/latest/userguide/use-athena-cf.html)

2. Modify the config db IAM role used by the config scraper above to give Mission Control the permissions to read the cost reports. Attach a Customer managed policy to the role with [this json policy document](https://github.com/flanksource/docs/blob/main/mission-control/docs/installation/resources/iam-policy.json)

Cost reporting needs to be setup on AWS: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html

3. We also need to allow athena query executions

Sample IAM Policy required for cost reporting:
```json
{
	"Effect": "Allow",
	"Action": [
		"athena:GetQueryExecution",
		"athena:GetQueryResults",
		"athena:StartQueryExecution"
	],
	"Resource": "arn:aws:athena:eu-west-1:765618022540:workgroup/primary"
},

```

### Annotate the service account

- Modify the helm chart values for incident commander and pass the role ARN 
```yaml title='values.yaml'
config-db:
  serviceAccount:
    name: "config-db-sa"
    annotations:
      eks.amazonaws.com/role-arn: IAM Role ARN
```

- Upgrade the helm chart to apply the changes


## Setup catalog scraping

You can now install a [helm chart from the registry](/registry/aws)
