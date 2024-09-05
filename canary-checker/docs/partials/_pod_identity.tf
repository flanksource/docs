variable "cluster" {
  type = string
}

variable "role" {
  type = string
}

variable "namespace" {
  type = string
	default = "mission-control"
}

variable "policy" {
	type = string
	default = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

locals {
  service_accounts = [
		"mission-control-sa",
		"canary-checker-sa",
		"config-db-sa"
  ]
}

data "aws_caller_identity" "current" {}

resource "aws_iam_role" "mission-control" {
  name = "MissionControlRole"
  assume_role_policy = jsonencode({
    Statement = [{
			Action = [
				"sts:AssumeRole",
				"sts:TagSession"
			]
      Effect = "Allow"
      Principal = {
        Service: "pods.eks.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "mission-control" {
  policy_arn = var.policy
  role       = aws_iam_role.mission-control.name
}

resource "aws_eks_pod_identity_association" "pod_identities" {
  for_each   			= local.service_accounts
  cluster_name    = var.cluster
  namespace       = var.namespace
  service_account = each.value
  role_arn        = var.role
}
