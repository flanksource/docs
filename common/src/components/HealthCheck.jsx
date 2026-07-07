import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

export default function HealthCheck({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()

  const oss = siteConfig.customFields.oss;

  rows = rows.filter(row => row.field != null &&
    (row.field != "artifacts" || !oss));

  const commonsRows = [
    {
      field: "name",
      description: "Name of the check, must be unique within the canary",
      scheme: "string",
      required: true
    },
    {
      field: "description",
      description: "Description for the check",
      scheme: "string"
    },
    {
      field: "icon",
      description: "Icon for overwriting default icon on the dashboard",
      scheme: "Icon"
    },
    {
      field: "labels",
      description: "Labels for check",
      scheme: "map[string]string"
    },
    {
      field: "namespace",
      description: "Namespace to insert the check result into when it differs from the canary namespace",
      scheme: "string"
    },
    {
      field: "dependsOn",
      description: "Checks that must complete before this check runs",
      scheme: "[]string"
    },
    {
      field: ["mongo", "mongodb", "redis"].includes(name) ? null : "test",
      description: "Evaluate whether a check is healthy",
      scheme: "[`Expression`](../concepts/expressions/health-evaluation)"
    },
    {
      field: ["mongo", "mongodb", "redis"].includes(name) ? null : "display",
      description: "Expression to change the formatting of the display",
      scheme: "[`Expression`](../concepts/expressions/display-formatting)"
    },
    {
      field: "markFailOnEmpty",
      description: "If a transformation or datasource returns empty results, the check should fail",
      scheme: "bool"
    },
    {
      field: "transformDeleteStrategy",
      description: "Status to apply to transformed checks when the source check no longer returns them",
      scheme: "string"
    },
    {
      field: ["pubsub", "mongo", "mongodb"].includes(name) ? null : "relationships",
      description: "Relationships that link check results to components or configs",
      scheme: "Relationship"
    },
    {
      field: ["mongo", "mongodb", "redis"].includes(name) ? null : "transform",
      description: "Transform data from a check into multiple individual checks",
      scheme: "[`Expression`](../concepts/expressions/transforms)"
    },
    {
      field: "metrics",
      description: "Metrics to export from",
      scheme: "[`[]Metrics`](../concepts/metrics)"
    }

  ]

  return <Fields rows={rows} common={commonsRows} {...props} />

}
