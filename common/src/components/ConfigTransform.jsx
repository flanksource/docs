import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'

export function ConfigTransform({ children, to, anchor }) {
  // Define table rows as an array of TableRow objects
  const tableRows = [
    {
      field: 'gotemplate',
      description: 'Specify Go template for use in script',
      scheme: 'string',
      required: ''
    },
    {
      field: 'javascript',
      description: 'Specify javascript syntax for script',
      scheme: 'string',
      required: ''
    },
    {
      field: 'jsonpath',
      description: 'Specify JSONPath',
      scheme: 'string',
      required: ''
    },
    {
      field: 'expr',
      description: 'Specify Cel expression',
      scheme: 'string',
      required: ''
    },
    {
      field: 'changes',
      description: 'Apply transformation on the scraped changes',
      scheme: '[]Changes',
      schemaLink: '../concepts/transform#changes',
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
            <td>{row.field}</td>
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
  )
}
