import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

export default function HealthCheck({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()


  // | **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
  // | `description` | Description for the check                                   | `string`                                     |          |
  // | `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
  // | `labels`      | Labels for check                                            | `map[string]string`                          |          |
  // | `test`        | Evaluate whether a check is healthy                         | [`Expression`](../concepts/health-evaluation)  |          |
  // | `display`     | Expression to change the formatting of the display          | [`Expression`](../concepts/display-formatting) |          |
  // | `transform`   | Transform data from a check into multiple individual checks | [`Expression`](../concepts/transforms)          |          |
  // | `metrics`     | Metrics to export from                                      | [`[]Metrics`](../concepts/metrics-exporter)    |          |

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
      scheme: "[`Expression`](../concepts/health-evaluation)"
    },
    {
      field: "display",
      description: "Expression to change the formatting of the display",
      scheme: "[`Expression`](../concepts/display-formatting)"
    },
    {
      field: "transform",
      description: "Transform data from a check into multiple individual checks",
      scheme: "[`Expression`](../concepts/transforms)"
    },
    {
      field: "metrics",
      description: "Metrics to export from",
      scheme: "[`[]Metrics`](../concepts/metrics-exporter)"
    }

  ]

  return <Fields rows={rows} common={commonsRows} {...props} />

}
