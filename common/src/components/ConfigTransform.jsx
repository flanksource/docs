import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import Fields from './Fields'

export function ConfigTransform({ rows, ...props }) {
  const { siteConfig } = useDocusaurusContext()
  const commonRows = [

    {
      field: 'expr',
      description: 'Specify Cel expression',
      scheme: '[CEL](/docs/guide/config-db/concepts/tranform#scripting)',
    },
    {
      field: 'changes',
      description: 'Apply transformation on the scraped changes',
      scheme: '[[]Changes](/docs/guide/config-db/concepts/tranform#changes)',

    },
    {
      field: 'exclude',
      description:
        'Fields to remove from the config, useful for removing sensitive data and fields that change often without a material impact i.e. Last Scraped Time',
      scheme: '[[]Exclude](/docs/guide/config-db/concepts/tranform#exclusion)',

    },
    {
      field: 'mask',
      description:
        'Specify configurations to replace sensitive fields with hash functions or static string.',
      scheme: '[[]Mask](/docs/guide/config-db/concepts/tranform#mask)',

    },
    {
      field: 'relationship',
      description: 'Form relationships between config items using selectors',
      scheme: '[[]Relationships](/docs/guide/config-db/concepts/relationships)',

    }
  ]

  return <Fields rows={rows} common={commonRows} {...props} />
}
