---
title: Playbooks
sidebar_custom_props:
  icon: playbook
---

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import Schema from '@site/modules/mission-control-registry/charts/playbooks-kubernetes/values.schema.json'
import OpenAPI from '@site/src/components/OpenAPI'

Self-service playbooks empower teams to manage their Kubernetes resources efficiently:

- **Reduced operational overhead**: Teams can perform common tasks without DevOps intervention
- **Standardized operations**: Ensure consistent execution of tasks across clusters
- **Faster incident response**: Enable developers to troubleshoot and resolve issues
- **Improved security**: Controlled access to cluster operations through predefined playbooks
- **Better developer experience**: User-friendly interface for complex Kubernetes operations
  Common use cases include:
- Developers checking application logs and debugging issues
- Teams scaling deployments during high traffic periods
- Application owners updating container images for new releases
- Project teams requesting access to namespaces
- DevOps automating resource cleanup and management

The following playbooks are available for use:
| Playbook | <Icon name="k8s-pod"/> Pod | <Icon name="k8s-deployment"/> Deployment | <Icon name="k8s-namespace"/> Namespace | <Icon name="k8s"/> Cluster |
| ------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| <Icon name="remove-trash"> Delete</Icon> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | | |
| <Icon name="k8s"/> Logs | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | |
| <Icon name="scale-out"/> Scale<sup><span className="text-gray-600 text-xs">†</span></sup> <Tooltip>Updates `.spec.replicas`</Tooltip> | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | | |
| <Icon name="scale-up"/> Update Resources <Tooltip icon={<Icon name="git"/>} link="../flux#clickops"></Tooltip><Tooltip>Updates `.spec.containers[0].resources`</Tooltip> | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | | |
| <Icon name="docker"/> Update Image <Tooltip>Updates `.spec.containers[0].image`</Tooltip> | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | | |
| <Icon name="k8s-deployment"/> Create Helm Chart <Tooltip>Creates and installs a new helm chart using `helm install`</Tooltip> | | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | |
| <Icon name="helm"/> Create Deployment | | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | |
| <Icon name="k8s-rolebinding"/> Request Access <Tooltip>Creates a new `RoleBinding` for the specified user with an optional expiry</Tooltip> | | | <IoIosCheckmarkCircleOutline color='green' size={24} /> | |
| <Icon name="k8s-namespace"/> Create Namespace | | | | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| | | | | |
| | | | | |

## Getting Started

:::info Prerequisites
To enable the Kubernetes integration you need:

- Mission Control [installed](/installation)
- [kubectl](/installation/saas/kubectl) access to the Mission Control instance
  :::

1. Install the `mission-control-playbooks-kubernetes` helm chart.

If you are using the SaaS, then this needs to be installed on the SaaS vCluster using [kubectl](/installation/saas/kubectl)

<Helm chart="mission-control-playbooks-kubernetes"
  schema={Schema}
  createNamespace={false}
  createRepo={false}
  />

:::info Note
The playbooks chart only needs to be installed once, unlike the `mission-control-kubernetes` chart which is per cluster
:::

## Customizing playbooks

Copy the playbook from [here](https://github.com/flanksource/mission-control-registry/tree/main/charts/playbooks-kubernetes/templates) to your own repository.
