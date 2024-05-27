import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

export default function Lookup({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()

  const commonsRows = [

    {
      field: "display",
      required: true,
      description: "Expression to change the formatting of the display",
      scheme: "[`Expression`](../concepts/expressions/display-formatting )"
    },
    {
      field: "transform",
      description: "Transform data from a check into multiple individual checks",
      scheme: "[`Expression`](../concepts/expressions/transforms)"
    },


  ]

  return <Fields rows={rows} common={commonsRows} {...props} />

}
