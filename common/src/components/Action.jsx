import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

export default function Action({ rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()
  const commonsRows = [
    {
      field: "name",
      description: "Step Name",
      scheme: "string",
      required: true
    },
    {
      field: "runsOn",
      description: "Which [runner](/docs/guide/playbooks/concepts/runners) (agent) to run the action on",
      scheme: "[`[]Agent`](/docs/reference/types#agent)",
      required: false
    },
    {
      field: "templatesOn",
      description: "Where templating (and secret management) of actions should occur",
      scheme: "`host` or `agent`",

    },
    {
      field: "delay",
      description: "A delay before running the action e.g. `8h`",
      scheme: "[`Duration`](/docs/reference/types#duration)  or  [CEL](/docs/reference/scripting/cel) with [Playbook Context](/docs/reference/playbooks/context)",

    },
    {
      field: "filter",
      description: "Conditionally run an action",
      scheme: "[CEL](/docs/reference/scripting/cel) with [Playbook Context](/docs/reference/playbooks/context)",

    },
    {
      field: "timeout",
      description: "Timeout on this action.",
      scheme: "duration",
    }
  ]

  return <Fields rows={rows} common={commonsRows} {...props} />

}
