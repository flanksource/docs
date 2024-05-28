import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import Fields from './Fields'

const customScraperFields = [
  {
    "field": "id",
    "description": "A deterministic or natural id for the resource",
    "scheme": "JSONPathOrString",
    "required": true
  },
  {
    "field": "name",
    default: "`id`",
    "scheme": "JSONPathOrString"
  },
  {
    "field": "items",
    "description": "Extract multiple config items from this array",
    "scheme": "JSONPath"
  },
  {
    "field": "type",
    "description": "e.g. `File::Host`, `File::Tomcat`, `File::Pom`",
    "scheme": "JSONPathOrString",
    "required": "true"
  },
  {
    "field": "class",
    "scheme": "JSONPathOrString"
  },
  {
    "field": "format",
    "description": "Format of config item e.g. `xml`, `properties`",
    "default": "`JSON`",
    "scheme": "string"
  },
  {
    "field": "timestampFormat",
    "description": "Format to parse timestamps in `createFields` and `deletedFields`",
    "default": "RFC3339",
    "scheme": "Go time format"
  },
  {
    "field": "createFields",
    "description": "Identify the created time for a resource (if different to scrape time). If multiple fields are specified, the first non-empty value will be used",
    "scheme": "[]JSONPathOrString"
  },
  {
    "field": "deleteFields",
    "description": "Identify when a config item was deleted. If multiple fields are specified, the first non-empty value will be used",
    "scheme": "[]JSONPathOrString"
  },
]

const commonsRows = [

  {
    "field": "ignore",
    "description": "Fields to ignore and strip out of the config",
    "scheme": "[]JSONPath"
  },
  {
    "field": "properties",
    "description": "Custom templatable properties for the scraped config items.",
    "scheme": "[`[]ConfigProperty`](/reference/config-db/properties)"
  },
  {
    "field": "tags",
    "description": "Additional tags ",
    "scheme": "map[string]string"
  },
]

export function Scraper({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()


  return <Fields rows={rows} common={commonsRows} {...props} />

}

export function CustomScraper({ name, edition, rows, ...props }) {

  const { siteConfig } = useDocusaurusContext()
  return <Fields rows={rows} common={commonsRows.concat(customScraperFields)} {...props} />

}
