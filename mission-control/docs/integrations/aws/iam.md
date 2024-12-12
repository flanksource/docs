---
title: IAM
sidebar_custom_props:
  icon: logos:aws-iam
---


Depending on how you want to use Mission Control you need to create an IAM role for mission control to use:

| Use Case                                     | Role                                      |
| -------------------------------------------- | ----------------------------------------- |
| Read Only Scraping                           | `arn:aws:iam::aws:policy/ReadOnlyAccess`  |
| Playbooks to create and update AWS Resources | `arn:aws:iam::aws:policy/PowerUserAccess` |

<details summary="Create new IAM Policy (Alternative)">
<div>

You can also create a new policy with just the permissions required by Mission Control

```json title="iam-policy.json"
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
				"config:BatchGetAggregateResourceConfig",
				"config:BatchGetResourceConfig",
				"config:Describe*",
				"config:Get*",
				"config:List*",
				"config:SelectAggregateResourceConfig",
				"config:SelectResourceConfig",
				"ec2:Describe*",
				"ecr:Describe*",
				"eks:Describe*",
				"eks:ListClusters",
				"elasticfilesystem:Describe*",
				"elasticloadbalancing:Describe*",
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
				"rds:Describe*",
				"sts:GetCallerIdentity"
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

</div>
</details>

## Configure IAM Roles for Mission Control
<Tabs queryString="type">
<TabItem label="IAM Roles for Service Accounts" value="IRSA">

<Tabs>
<TabItem label="eksctl" value="cli">
1. Setup variables
	```bash
	# The name of the EKS cluster mission control is being deployed to
	export CLUSTER= <CLUSTER_NAME>
	# the default namespace the mission-control helm chart uses
	export NAMESPACE=mission-control
	export ACCOUNT=$(aws sts get-caller-identity  --query 'Account' --output text)
	```
	<p/>

2. Enable [EKS IAM Roles for Service Accounts](https://eksctl.io/usage/iamserviceaccounts/)

   ```bash
   eksctl utils associate-iam-oidc-provider --cluster=$CLUSTER
   ```

   <p />

3. Create the IAM Role mappings

   ```yaml title="eksctl.yaml"
   iam:
   	withOIDC: true
   	serviceAccounts:
   	- metadata:
   			name: mission-control-sa
   			namespace: mission-control
   		roleName: MissionControlRole
   		roleOnly: true
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"
   	- metadata:
   			name: canary-checker-sa
   			namespace: mission-control
   		roleName: CanaryCheckerRole
   		roleOnly: true
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"
   	- metadata:
   			name: config-db-sa
   			namespace: mission-control
   		roleName: ConfigDBRole
   		roleOnly: true
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"

   ```

   ```bash
   eksctl create iamserviceaccount --cluster $CLUSTER -c eksctl.yaml
   ```


</TabItem>
</Tabs>

</TabItem>

<TabItem label="Pod Identity" value="pod" default>

<Tabs>
<TabItem label="eksctl" value="cli">

1. Ensure the [AWS Pod Identity Agent](https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html) is configured and running

1. Create a mapping file for `eksctl`
	```yaml title="eksctl.yaml"
   podIdentityAssociations:
   	- namespace: mission-control
   		serviceAccountName:  mission-control-sa
   		permissionPolicyARNs: arn:aws:iam::aws:policy/ReadOnlyAccess

   	- namespace: mission-control
   		serviceAccountName:  config-db-sa
   		permissionPolicyARNs: arn:aws:iam::aws:policy/ReadOnlyAccess

   	- namespace: mission-control
   		serviceAccountName:  canary-checker-sa
   		permissionPolicyARNs: arn:aws:iam::aws:policy/ReadOnlyAccess
   iam:
   	# note withOIDC is not required for Pod Identity
   	serviceAccounts:
   	# used by mission control for notifications / playbooks
   	- metadata:
   			name: mission-control-sa
   			namespace: mission-control
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"
   # used for cloudwatch, S3 and other AWS health checks
   	- metadata:
   			name: canary-checker-sa
   			namespace: mission-control
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"
   # used to scrape resources, AWS CloudTrail and AWS Cost & Usage Reports
   	- metadata:
   			name: config-db-sa
   			namespace: mission-control
   		attachPolicyARNs:
   		- "arn:aws:iam::aws:policy/ReadOnlyAccess"
	```
	<p />

	<details summary="Using an existing IAM Role" className="mt-10">
	<span className="bg-white">
	<p>If you are using a pre-existing IAM role when creating a pod identity association, you must configure the role to trust the newly introduced EKS service principal (`pods.eks.amazonaws.com`)</p>

	```json title="iam-trust-policy.json"
	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Principal": {
					"Service": "pods.eks.amazonaws.com"
				},
				"Action": ["sts:AssumeRole", "sts:TagSession"]
			}
		]
	}
	```

	</span>

	</details>

3. Apply the Pod Identities using `eksctl`

   ```bash
   eksctl create podidentityassociation  -c eksctl.yaml
   ```

   <p />



</TabItem>
<TabItem label="Terraform" value="terraform">
1. Ensure the [AWS Pod Identity Agent](https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html) is configured and running

2. Create `main.tf`

   ```hcl title="main.tf"  file=<rootDir>/docs/partials/_pod_identity.tf
   ```
	<p/>
3. Apply the terraform
   ```bash
   TF_VAR_role=$CLUSTER  terraform apply
   ```
	 <p/>

</TabItem>

<TabItem label="Cloudformation" value="cloudformation">

1. Setup variables
	```bash
	# The name of the EKS cluster mission control is being deployed to
	export CLUSTER= <CLUSTER_NAME>
	# the default namespace the mission-control helm chart uses
	export NAMESPACE=mission-control
	```
	<p/>

1. Create a cloudformation template

   ```yaml title="mission-control-iam-cloudformation.yaml"  file=<rootDir>/docs/partials/_pod_identity.yaml
   ```
	 <p/>

2. Create a new stack
	```bash
	aws cloudformation deploy \
		--stack-name mission-control-roles \
		--template-file file://mission-control-iam-cloudformation.yaml \
		--parameter-overrides Cluster==$CLUSTER Namespace=$NAMESPACE
	```
	<p/>



</TabItem>
</Tabs>

</TabItem>

<TabItem label="Access Key" value="accessKey">

:::warning Security Warning
Using Access Keys and Secrets is not recommended from a security perspective
:::

First we create a secret called `aws` containing the access key and secret.

1. Create a new IAM User and Access Key

   ```bash
   USER_NAME="mission-control-sa"

   aws iam create-user --user-name $USER_NAME
   aws iam attach-user-policy \
	 	--user-name $USER_NAME \
		--policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
   key=$(aws iam create-access-key --user-name $USER_NAME)
   ```
	 <p/>

2. Create a new secret `aws` containing the access and secret key

   ```bash
   kubectl create secret  generic aws \
   	--from-literal=AWS_ACCESS_KEY_ID=$(echo $key | jq -r '.AccessKey.AccessKeyId') \
   	--from-literal=AWS_SECRET_ACCESS_KEY=$(echo $key | jq -r '.AccessKey.SecretAccessKey')
   ```
	 <p/>
3. Create a new [connection](/reference/connections)

	```yaml title="aws-connection.yaml"
	apiVersion: mission-control.flanksource.com/v1
	kind: Connection
	metadata:
		name: aws
		namespace: mission-control
	spec:
		region: eu-west-1
		accessKey:
			valueFrom:
				secretKeyRef:
					name: aws
					key: AWS_ACCESS_KEY_ID
		secretKey:
			valueFrom:
				secretKeyRef:
					name: aws
					key: AWS_ACCESS_KEY_ID

	```
	 <p/>

1. When creating Scrapers / Registry bundles you can now refer to `connection://mission-control/aws`

</TabItem>
</Tabs>

