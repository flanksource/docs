import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'

export function ConfigTransform() {
  const { siteConfig } = useDocusaurusContext()
  const tableRows = [
    {
      field: 'gotemplate',
      description: 'Go template to transform the scraped config item',
      scheme: 'string',
      required: ''
    },
    {
      field: 'javascript',
      description: 'Javascript to transform the scraped config item',
      scheme: 'string',
      required: ''
    },
    {
      field: 'jsonpath',
      description: 'Specify JSONPath',
      scheme: 'jsonpath',
      schemaLink: siteConfig.customFields.links['jsonpath'],
      required: ''
    },
    {
      field: 'expr',
      description: 'Specify Cel expression',
      scheme: 'cel-expression',
      schemaLink: siteConfig.customFields.links['cel'],
      required: ''
    },
    {
      field: 'changes',
      description: 'Apply transformation on the scraped changes',
      scheme: '[]Changes',
      schemaLink: '../concepts/changes',
      required: ''
    },
    {
      field: 'exclude',
      description:
        'Fields to remove from the config, useful for removing sensitive data and fields that change often without a material impact i.e. Last Scraped Time',
      scheme: '[]Exclude',
      schemaLink: '../concepts/exclusion',
      required: ''
    },
    {
      field: 'mask',
      description:
        'Specify configurations to replace sensitive fields with hash functions or static string.',
      scheme: '[]Mask',
      schemaLink: '../concepts/masking',
      required: ''
    },
    {
      field: 'relationship',
      description: 'Form relationships between config items using selectors',
      scheme: '[]RelationshipConfig',
      schemaLink: '../concepts/relationship#relationship-config',
      required: ''
    }
  ]

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Scheme</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <code>{row.field}</code>
              </td>
              <td>{row.description}</td>
              <td>
                {row.schemaLink ? (
                  <Link to={row.schemaLink}>
                    <code>{row.scheme}</code>
                  </Link>
                ) : (
                  <code>{row.scheme}</code>
                )}
              </td>
              <td>{row.required}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Admonition type="info">
        <p>
          Both the go template and javascript receive{' '}
          <a href="/config-db/references/scrape-result">ScrapeResult</a> as the
          template variable.
        </p>
      </Admonition>
    </>
  )
}
