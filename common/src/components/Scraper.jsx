import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Fields from './Fields'

const commonsRows = [
  {
    field: 'transform',
    description: "Transform configs after they've been scraped",
    scheme: '[`Transform`](/docs/guide/config-db/concepts/transform)'
  },
  {
    field: 'properties',
    description: 'Custom templatable properties for the scraped config items.',
    scheme: '[`[]ConfigProperty`](/docs/reference/config-db/properties)'
  },
  {
    field: 'labels',
    description: 'Labels for each config item.',
    scheme: '`map[string]string`'
  },
  {
    field: 'tags',
    description: 'Tags for each config item. Max allowed: 5',
    scheme: '[`[]ConfigTag`](/docs/guide/config-db/concepts/tags)'
  }
]

export function Scraper({ name, edition, rows, ...props }) {
  const { siteConfig } = useDocusaurusContext()
  return <Fields rows={rows} common={commonsRows} {...props} />
}

export function CustomScraper({ name, edition, rows, ...props }) {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Fields
      rows={rows}
      common={commonsRows}
      {...props}
    />
  )
}
