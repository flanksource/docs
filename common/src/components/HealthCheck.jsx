import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

export default function HealthCheck({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()


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
      field: "test",
      description: "Evaluate whether a check is healthy",
      scheme: "[`Expression`](../concepts/expressions/health-evaluation)"
    },
    {
      field: "display",
      description: "Expression to change the formatting of the display",
      scheme: "[`Expression`](../concepts/expressions/display-formatting )"
    },
    {
      field: "transform",
      description: "Transform data from a check into multiple individual checks",
      scheme: "[`Expression`](../concepts/expressions/transforms)"
    },
    {
      field: "metrics",
      description: "Metrics to export from",
      scheme: "[`[]Metrics`](../concepts/metrics/custom-metrics)"
    }

  ]

  return <Fields rows={rows} common={commonsRows} {...props} />

}
