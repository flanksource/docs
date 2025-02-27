import React from 'react'
import Admonition from '@theme/Admonition'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import ReactMarkdown from 'react-markdown'
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx'

const schemes = {
  envvar: '[EnvVar](/reference/env-var)',
  matchpattern: '[MatchPattern](/reference/types#match-pattern)',
  '[]envvar': '[[]EnvVar](/reference/env-var)',
  cel: '[CEL](/reference/scripting/cel)',
  javascript: '[Javascript](/reference/scripting/javascript)',
  gotemplate: '[Go Template](/reference/scripting/gotemplate)',
  duration: '[Duration](/reference/types#duration)',
  jsonpathorstring: '`string` or [JSONPath](https://jsonpath.com/)',
  '[]jsonpathorstring': '`[]string` or [[]JSONPath](https://jsonpath.com/)',
  jsonpath: '[JSONPath](https://jsonpath.com/)',
  size: '[Size](/reference/types#size)',
  agent: '[Agent](/reference/types#agent)',
  resourceselector: '[ResourceSelector](/reference/resource-selector)',
  resourceselectors: '[[]ResourceSelector](/reference/resource-selector)',
  connection: '[Connection](/reference/connections)',
  string: '`string`',
  "[]string": '`[]string`',
  icon: '[Icon](/reference/types#icon)',
  bool: '`boolean`',
  int: '`integer`',
  notificationurl: '[Notification](/reference/notifications)',
  notificationconnection: '[Connection](/reference/connections)',
  notificationproperties:
    '[map[string]string](/reference/notifications#properties)'
}

function useSchemeUrl(value) {
  if (value == null) {
    return "string"
  }

  const key = value.toLowerCase();
  if (!(key in schemes)) {
    return value;
  }

  value = schemes[key]
  if (value == null || !value.includes('](/')) {
    return value
  }

  // Extract link text and URL
  const matches = value.match(/\[(.*?)\]\((.*?)\)/);
  if (matches) {
    const [_, text, url] = matches;
    // Only process internal links (starting with /)
    if (url.startsWith('/')) {
      return `[${text}](${useBaseUrl(url)})`;
    }
  }
  return value
}

export default function Fields({ common = [], rows = [], oneOf, anyOf, connection, withTemplates }) {
  const { siteConfig, siteMetadata } = useDocusaurusContext();

  const oss = siteConfig.customFields.oss;


  rows = rows.filter(row => row.field != null &&
    (row.field != "artifacts" || !oss));


  var fieldSorter = function(a, b) {
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
        description: "",
        scheme: "EnvVar"
      },
      {
        field: "secretKey",
        description: "",
        scheme: "EnvVar"
      },
      {
        field: "region",
        description: "The AWS region",
        scheme: "string"
      },
      {
        field: "endpoint",
        scheme: "string",
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
        field: oss ? null : 'connection',
        description:
          'The connection url to use, mutually exclusive with `credentials`',
        scheme: 'Connection'
      },
      {
        field: 'credentials',
        description: 'The credentials to use for authentication',
        scheme: 'EnvVar'
      },
      {
        field: 'endpoint',
        description: 'Custom GCP Endpoint to use',
        scheme: 'string'
      },
      {
        field: 'skipTLSVerify',
        description: 'Skip TLS verification when connecting to GCP',
        scheme: 'bool'
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
  } else if (connection == "openai") {
    rows = rows.concat([
      {
        field: "model",
        description: "OpenAI model to use",
        scheme: "string",
        required: true
      },
      {
        field: "url",
        description: "Optional API endpoint URL",
        scheme: "EnvVar"
      },
      {
        field: "apiKey",
        description: "OpenAI API key for authentication",
        scheme: "EnvVar",
        required: true
      }
    ])
  } else if (connection == "ollama") {
    rows = rows.concat([
      {
        field: "model",
        description: "Ollama model to use",
        scheme: "string",
        required: true
      },
      {
        field: "url",
        description: "Ollama API endpoint URL",
        scheme: "EnvVar",
        required: true
      }
    ])
  } else if (connection == "anthropic") {
    rows = rows.concat([
      {
        field: "model",
        description: "Anthropic model to use",
        scheme: "string",
        required: true
      },
      {
        field: "url",
        description: "Optional API endpoint URL",
        scheme: "EnvVar"
      },
      {
        field: "apiKey",
        description: "Anthropic API key for authentication",
        scheme: "EnvVar",
        required: true
      }
    ])
  }

  rows = rows.filter(i => i.field != null)

  return (
    <>
      <table className="fields">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Scheme</th>
            {withTemplates && <th>Template Env</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <code className={row.required ? 'font-bold' : ''}>
                  {row.field}
                  {row.required ? '*' : ''}
                </code>
              </td>
              <td>
                {typeof (row.description) === 'string' ? (
                  <ReactMarkdown>
                    {(row.description ? row.description : '') +
                      (row.default ? `. Defaults to \`${row.default}\`` : '')}
                  </ReactMarkdown>
                ) : row.description}
              </td>
              <td>
                {row.anyOf && <code>{row.anyOf.join(' | ')}</code>}
                {!row.anyOf && row.scheme && (
                  <ReactMarkdown>
                    {useSchemeUrl(row.scheme)}
                  </ReactMarkdown>
                )}
              </td>
              {withTemplates && (
                <td>
                  {row.templateEnv &&
                    row.templateEnv.map((v) => (
                      <p>
                        <a href={v.url}>
                          <code>{v.name}</code>
                        </a>
                      </p>
                    ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {anyOf && (
        <blockquote
          style={{ borderLeft: '2px solid var(--ifm-color-warning-light)' }}
        >
          <p>
            You must specify <code>{anyOf[0]}</code> and/or{' '}
            <code>{anyOf[1]}</code>
          </p>
        </blockquote>
      )}
      {oneOf && oneOf.length == 2 && (
        <blockquote
          style={{ borderLeft: '2px solid var(--ifm-color-warning-light)' }}
        >
          <p>
            You must specify <code>{oneOf[0]}</code> or <code>{oneOf[1]}</code>{' '}
            but not both
          </p>
        </blockquote>
      )}
      {oneOf && oneOf.length == 3 && (
        <blockquote
          style={{ borderLeft: '2px solid var(--ifm-color-warning-light)' }}
        >
          <p>
            You must specify one of <code>{oneOf[0]}</code>,{' '}
            <code>{oneOf[1]}</code> or <code>{oneOf[2]}</code>
          </p>
        </blockquote>
      )}
    </>
  )
}
