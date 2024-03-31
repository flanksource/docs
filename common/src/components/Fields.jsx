import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'

const schemes = {
  "EnvVar": "[EnvVar](/reference/env-var)",
  "[]EnvVar": "[[]EnvVar](/reference/env-var)",
  "CEL": "[CEL](/reference/scripting/cel)",
  "Duration": "[Duration](/reference/types#duration)",
  "Agent": "[Agent](/reference/types#agent)",
  "ResourceSelector": "[ResourceSelector](/reference/resource-selector)",
  "Connection": "[Connection](/reference/connection)",
  "string": "`string`",
  "bool": "`boolean`",
  "NotificationURL": "[url](/reference/notifications/channels)",
  "NotificationConnection": "[Connection](/reference/connection)",
  "NotificationProperties": "[map[string]string](/reference/notifications/channels#properties)",
}
export default function Fields({ rows, oneOf, anyOf }) {

  return (
    <>
      <table className='fields'>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Scheme</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <code className={row.required ? "font-bold" : ""}>{row.field}{row.required ? "*" : ""}</code>
              </td>
              <td><ReactMarkdown>{row.description + (row.default ? `. Defaults to \`${row.default}\`` : '')}</ReactMarkdown></td>
              <td>
                <ReactMarkdown>
                  {schemes[row.scheme] || row.scheme}
                </ReactMarkdown>
              </td>
            </tr>
          ))}

        </tbody>
      </table >
      {anyOf &&
        <blockquote style={{ borderLeft: "2px solid var(--ifm-color-warning-light)" }}>
          <p>You must specify <code>{anyOf[0]}</code> and/or  <code>{anyOf[1]}</code></p>
        </blockquote>
      }
      {
        oneOf &&
        <blockquote style={{ borderLeft: "2px solid var(--ifm-color-warning-light)" }}>
          <p>You must specify <code>{oneOf[0]}</code> or <code>{oneOf[1]}</code> but not both</p>
        </blockquote>
      }
    </>
  )
}
