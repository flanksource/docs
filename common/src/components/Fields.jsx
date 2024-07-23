import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'

const schemes = {
  "EnvVar": "[EnvVar](/reference/env-var)",
  "MatchPattern": "[MatchPattern](/reference/types#match-pattern)",
  "[]EnvVar": "[[]EnvVar](/reference/env-var)",
  "CEL": "[CEL](/reference/scripting/cel)",
  "Javascript": "[Javascript](/reference/scripting/javascript)",
  "Gotemplate": "[Go Template](/reference/scripting/gotemplate)",
  "Duration": "[Duration](/reference/types#duration)",
  "JSONPathOrString": "`string` or [JSONPath](https://jsonpath.com/)",
  "[]JSONPathOrString": "`[]string` or [[]JSONPath](https://jsonpath.com/)",
  "JSONPath": "[JSONPath](https://jsonpath.com/)",
  "Size": "[Size](/reference/types#size)",
  "Agent": "[Agent](/reference/types#agent)",
  "ResourceSelector": "[ResourceSelector](/reference/resource-selector)",
  "Connection": "[Connection](/reference/connections)",
  "string": "`string`",
  "Icon": "[Icon](/reference/types#icon)",
  "bool": "`boolean`",
  "int": "`integer`",
  "NotificationURL": "[Notification](/reference/notifications)",
  "NotificationConnection": "[Connection](/reference/connections)",
  "NotificationProperties": "[map[string]string](/reference/notifications#properties)",
}
export default function Fields({ common = [], rows = [], oneOf, anyOf, connection }) {

  const { siteConfig, siteMetadata } = useDocusaurusContext();

  const oss = siteConfig.customFields.oss;


  rows = rows.filter(row => row.field != null &&
    (row.field != "artifacts" || !oss));


  var fieldSorter = function (a, b) {
    if (a.required && !b.required) {
      return -1;
    }
    if (!a.required && b.required) {
      return 1;
    }
    if (a.priority && !b.priority) {
      return -1
    }

    if (!a.priority && b.priority) {
      return 1
    }
    if (a.priority && b.priority && a.priority > b.priority) {
      return -1
    }


    if (a.priority && b.priority && a.priority < b.priority) {
      return 1
    }

    return a.field.localeCompare(b.field)
  }
  rows = rows.concat(common.filter(row => row.required))
  rows.sort(fieldSorter);
  common = common.filter(row => !row.required)
  common.sort(fieldSorter)
  rows = rows.concat(common)


  if (connection == "url") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `username` and `password`",
        scheme: "Connection",
      },
      {
        field: !oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        description: "If `connection` is specified and it also includes a `url`, this field will take precedence",
        scheme: "string",
      },
      {
        field: oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        scheme: "string",
      },
      {
        field: "username",
        scheme: "EnvVar",
      },
      {
        field: "password",
        scheme: "EnvVar",
      }
    ])
  }

  if (connection == "sql") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url or name to use`",
        scheme: "Connection",
      },
      {
        field: !oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        description: "If `connection` is specified and it also includes a `url`, this field will take precedence",
        scheme: "string",
      },
      {
        field: oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        scheme: "string",
      },
      {
        field: "auth.username",
        scheme: "EnvVar",
      },
      {
        field: "auth.password",
        scheme: "EnvVar",
      }
    ])
  } else if (connection == "git") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `username` and `password`",
        scheme: "Connection",
      },
      {
        field: !oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        description: "If `connection` is specified and it also includes a `url`, this field will take precedence",
        scheme: "string",
      },
      {
        field: oss && rows.filter(i => i.field == "url").length == 0 ? "url" : null,
        scheme: "string",
      },
      {
        field: "certificate",
        scheme: "EnvVar",
      },
      {
        field: "username",
        scheme: "EnvVar",
      },
      {
        field: "password",
        scheme: "EnvVar",
      }
    ])
  } else if (connection == "aws") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `accessKey` and `secretKey`",
        scheme: "Connection",
      },
      {
        field: "accessKey",
        scheme: "EnvVar"
      },
      {
        field: "secretKey",
        scheme: "EnvVar"
      },
      {
        field: "region",
        description: "The AWS region",
        scheme: "string"
      },
      {
        field: "endpoint",
        description: "Custom AWS Endpoint to use",
      },
      {
        field: "skipTLSVerify",
        description: "Skip TLS verify when connecting to AWS",
        scheme: 'bool'
      }
    ])
  } else if (connection == "gcp") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `credentials`",
        scheme: "Connection",
      },
      {
        field: "credentials",
        description: "The credentials to use for authentication",
        scheme: "EnvVar"
      }
    ])
  } else if (connection == "sftp") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `host` and `port`",
        scheme: "Connection",
      },
      {
        field: "host",
        description: "SFTP host",
        scheme: "string"
      },
      {
        field: "port",
        description: "SFTP port",
        scheme: "int"
      },
      {
        field: "username",
        scheme: "EnvVar"
      },
      {
        field: "password",
        scheme: "EnvVar"
      }
    ])
  } else if (connection == "smb") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `host`, `share`, and `credentials`",
        scheme: "Connection",
      },
      {
        field: "host",
        description: "The SMB host",
        scheme: "string"
      },
      {
        field: "port",
        scheme: "int"
      },
      {
        field: "domain",
        description: "Windows Domain",
      },
      {
        field: "username",
        scheme: "EnvVar",
      },
      {
        field: "password",
        scheme: "EnvVar",
      }
    ])

  } else if (connection == "kubeconfig") {
    rows = rows.concat([
      {
        field: "kubeconfig",
        description: "Path to a kubeconfig on disk, or a reference to an existing secret",
        scheme: "EnvVar",
      }])
  } else if (connection == "azure") {
    rows = rows.concat([
      {
        field: oss ? null : "connection",
        description: "The connection url to use, mutually exclusive with `tenantId`, `subscriptionId`, `clientId`, and `clientSecret`",
        scheme: "Connection",
      },
      {
        field: "tenantId",
        description: "The Azure Active Directory tenant ID",
        required: true
      },
      {
        field: "subscriptionId",
        description: "The Azure subscription ID",
        required: true,
        scheme: "EnvVar"
      },
      {
        field: "clientId",
        description: "The Azure client/application ID",
        scheme: "EnvVar"
      },
      {
        field: "clientSecret",
        description: "The Azure client/application secret",
        scheme: "EnvVar"
      }
    ])
  }
  rows = rows.filter(i => i.field != null)

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
              <td><ReactMarkdown>{(row.description ? row.description : "") + (row.default ? `. Defaults to \`${row.default}\`` : '')}</ReactMarkdown></td>
              <td>
                {row.anyOf &&
                  <code>{row.anyOf.join(' | ')}</code>
                }
                {!row.anyOf &&
                  <ReactMarkdown>
                    {
                      schemes[row.scheme] || (row.scheme ? row.scheme : 'string')
                    }
                  </ReactMarkdown>
                }
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
        oneOf && oneOf.length == 2 &&
        <blockquote style={{ borderLeft: "2px solid var(--ifm-color-warning-light)" }}>
          <p>You must specify <code>{oneOf[0]}</code> or <code>{oneOf[1]}</code> but not both</p>
        </blockquote>
      }
      {
        oneOf && oneOf.length == 3 &&
        <blockquote style={{ borderLeft: "2px solid var(--ifm-color-warning-light)" }}>
          <p>You must specify one of <code>{oneOf[0]}</code>, <code>{oneOf[1]}</code> or <code>{oneOf[2]}</code></p>
        </blockquote>
      }
    </>
  )
}
