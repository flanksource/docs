import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import ReactMarkdown from 'react-markdown'
import useBaseUrl from '@docusaurus/useBaseUrl';

let schemes = {
  envvar: '[EnvVar](/docs/reference/env-var)',
  "map[string]string": '`[map[string]string]`',
  matchpattern: '[MatchPattern](/docs/reference/types#match-pattern)',
  '[]envvar': '[[]EnvVar](/docs/reference/env-var)',
  cel: '[CEL](/docs/reference/scripting/cel)',
  javascript: '[Javascript](/docs/reference/scripting/javascript)',
  gotemplate: '[Go Template](/docs/reference/scripting/gotemplate)',
  duration: '[Duration](/docs/reference/types#duration)',
  jsonpathorstring: '`string` or [JSONPath](https://jsonpath.com/)',
  '[]jsonpathorstring': '`[]string` or [[]JSONPath](https://jsonpath.com/)',
  jsonpath: '[JSONPath](https://jsonpath.com/)',
  size: '[Size](/docs/reference/types#size)',
  "[]metric": '[[]Metric](/docs/guides/canary-checker/concepts/metrics#custom-metrics)',
  agent: '[Agent](/docs/reference/types#agent)',
  resourceselector: '[ResourceSelector](/docs/reference/resource-selector)',
  resourceselectors: '[[]ResourceSelector](/docs/reference/resource-selector)',
  connection: '[Connection](/docs/reference/connections)',
  string: '`string`',
  "[]string": '`[]string`',
  icon: '[Icon](/docs/reference/types#icon)',
  bool: '`boolean`',
  int: '`integer`',
  "map[string]EnvVar": '`[map[string]EnvVar](/docs/reference/env-var)`',
  notificationurl: '[Notification](/docs/reference/notifications)',
  notificationconnection: '[Connection](/docs/reference/connections)',
  notificationproperties:
    '[map[string]string](/docs/reference/notifications#properties)'
}

let ossSchemes = {
  icon: '[Icon](/types#icon)',
  envvar: '[EnvVar](/concepts/secret-management)',
  matchpattern: '[MatchPattern](/types#match-pattern)',
  '[]envvar': '[[]EnvVar](/concepts/secret-management)',
  cel: '[CEL](/scripting/cel)',
  javascript: '[Javascript](/scripting/javascript)',
  gotemplate: '[Go Template](/scripting/gotemplate)',
  duration: '[Duration](/types#duration)',
  size: '[Size](/types#size)',
  "[]metric": '[[]Metric](/concepts/metrics#custom-metrics)',
  resourceselector: '[ResourceSelector](/resource-selector)',
  resourceselectors: '[[]ResourceSelector](/resource-selector)',
}

function useSchemeUrl(value, oss) {
  if (value == null) {
    return "string"
  }

  const key = value.toLowerCase();
  if (!(key in schemes)) {
    return value;
  }

  if (oss) {
    for (const key of Object.keys(ossSchemes)) {
      schemes[key] = ossSchemes[key];
    }
  }

  let mapping = schemes[value.toLowerCase()]

  if (mapping == null || !mapping.includes('](/')) {
    return mapping
  }

  value = mapping;

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

  // Common AWS connection fields
  const awsFields = [
    {
      field: oss ? null : "connection",
      description: "The connection url to use, mutually exclusive with `accessKey` and `secretKey`",
      scheme: "Connection",
    },
    {
      field: "accessKey",
      description: "Access Key ID",
      scheme: "EnvVar"
    },
    {
      field: "secretKey",
      description: "Secret Access Key",
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
  ]

  // Common GCP connection fields
  const gcpFields = [
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
  ]

  // Common Azure connection fields
  const azureFields = [
    {
      field: oss ? null : "connection",
      description: "The connection url to use, mutually exclusive with `tenantId`, `clientId`, and `clientSecret`",
      scheme: "Connection",
    },
    {
      field: "tenantId",
      description: "The Azure Active Directory tenant ID",
      scheme: "EnvVar",
      required: true
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
  ]

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
    rows = rows.concat(awsFields)
  } else if (connection == "gcp") {
    rows = rows.concat(gcpFields)
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
  } else if (connection == "kubernetes") {
    rows = rows.concat([
      {
        field: "connection",
        description: "The connection url to use, mutually exclusive with `kubeconfig`",
        scheme: "Connection",
      },
      {
        field: "kubeconfig",
        description: "Source for kubeconfig",
        scheme: "EnvVar"
      },
      {
        field: "eks",
        description: "EKS connection details",
        scheme: "[EKS](/docs/reference/connections/kubernetes/#eks-connection)",
      },
      {
        field: "gke",
        description: "GKE connection details",
        scheme: "[GKE](/docs/reference/connections/kubernetes/#gke-connection)",
      },
      {
        field: "cnrm",
        description: "CNRM connection details",
        scheme: "[CNRM](/docs/reference/connections/kubernetes/#cnrm-connection)",
      }])
  } else if (connection == "azure") {
    rows = rows.concat(azureFields)
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
  } else if (connection == "http") {
    rows = rows.concat([
      {
        field: 'tls.insecureSkipVerify',
        description: 'Skip TLS certificate verification. Use with caution - only enable in trusted environments or for testing',
        scheme: 'boolean'
      },
      {
        field: 'tls.handshakeTimeout',
        description: 'Maximum time to wait for TLS handshake completion. Example: "30s", "1m"',
        scheme: 'duration'
      },
      {
        field: 'tls.ca',
        description: 'Custom Certificate Authority (CA) certificate for TLS verification. Used for self-signed or internal certificates',
        scheme: 'EnvVar'
      },
      {
        field: 'tls.cert',
        description: 'Client TLS certificate for mutual TLS authentication (mTLS)',
        scheme: 'EnvVar'
      },
      {
        field: 'tls.key',
        description: 'Private key corresponding to the client TLS certificate for mTLS',
        scheme: 'EnvVar'
      },
      {
        field: 'connection',
        description: 'Reference to a pre-configured HTTP connection. Use this to reuse connection settings across multiple scrapers',
        scheme: 'string'
      },
      {
        field: 'bearer',
        description: 'Bearer token for authentication',
        scheme: 'EnvVar'
      },
      {
        field: 'username',
        description: 'Username for Basic or Digest authentication.',
        scheme: 'EnvVar'
      },
      {
        field: 'password',
        description: 'Password for Basic or Digest authentication.',
        scheme: 'EnvVar'
      },
      {
        field: 'ntlm',
        description: 'Enable Windows NTLM authentication protocol. Typically used in corporate environments',
        scheme: 'boolean'
      },
      {
        field: 'ntlmv2',
        description: 'Enable NTLMv2 authentication protocol, a more secure version of NTLM',
        scheme: 'boolean'
      },
      {
        field: 'digest',
        description: 'Enable Digest authentication, a more secure alternative to Basic authentication',
        scheme: 'boolean'
      },
      {
        field: 'oauth.clientID',
        description: 'OAuth 2.0 client identifier',
        scheme: 'EnvVar'
      },
      {
        field: 'oauth.clientSecret',
        description: 'OAuth 2.0 client secret',
        scheme: 'EnvVar'
      },
      {
        field: 'oauth.tokenURL',
        description: 'OAuth 2.0 token endpoint URL',
        scheme: 'string'
      },
      {
        field: 'oauth.scopes',
        description: 'List of OAuth 2.0 scopes',
        scheme: '[]string'
      },
      {
        field: 'oauth.params',
        description: 'Additional OAuth 2.0 parameters to include in the token request',
        scheme: 'map[string]string'
      },
      {
        field: 'url',
        description: 'The URL to send the HTTP request to. Must include the scheme _(http:// or https://)_',
        scheme: 'string',
        required: true
      },
    ])
  } else if (connection == "s3") {
    rows = rows.concat([
      {
        field: "bucket",
        description: "S3 bucket name",
        scheme: "string",
        required: true
      },
      {
        field: "objectPath",
        description: "Glob path to restrict matches to a subset of objects",
        scheme: "string"
      },
      {
        field: "usePathStyle",
        description: "Use path style URL (http://s3.amazonaws.com/BUCKET/KEY) instead of virtual hosted-style (http://BUCKET.s3.amazonaws.com/KEY)",
        scheme: "bool"
      }
    ])
  } else if (connection == "eks") {
    rows = rows.concat([
      {
        field: "cluster",
        description: "Name of the EKS cluster",
        scheme: "string",
        required: true
      }
    ])
  } else if (connection == "gke") {
    rows = rows.concat([
      {
        field: "projectID",
        description: "Google Cloud project ID containing the GKE cluster",
        scheme: "string",
        required: true
      },
      {
        field: "zone",
        description: "Zone or region where the GKE cluster is located",
        scheme: "string",
        required: true
      },
      {
        field: "cluster",
        description: "Name of the GKE cluster",
        scheme: "string",
        required: true
      }
    ])
  } else if (connection == "gcs") {
    rows = rows.concat([
      {
        field: "bucket",
        description: "GCS bucket name",
        scheme: "string",
        required: true
      }
    ])
  } else if (connection == "cnrm") {
    rows = rows.concat([
      {
        field: "gke.projectID",
        description: "Google Cloud project ID containing the management GKE cluster",
        scheme: "string",
        required: true
      },
      {
        field: "gke.zone",
        description: "Zone or region where the management GKE cluster is located",
        scheme: "string",
        required: true
      },
      {
        field: "gke.cluster",
        description: "Name of the management GKE cluster",
        scheme: "string",
        required: true
      },
      {
        field: "clusterResource",
        description: "Name of the ContainerCluster resource managed by Config Connector",
        scheme: "string",
        required: true
      },
      {
        field: "clusterResourceNamespace",
        description: "Namespace containing the ContainerCluster resource",
        scheme: "string",
        required: true
      }
    ])
  } else if (connection == "prometheus") {
    // Prometheus extends HTTP connection, so HTTP fields will be included
    rows = rows.concat([])
  } else if (connection == "aws_kms") {
    rows = rows.concat(awsFields.concat([
      {
        field: "keyID",
        description: "KMS key ID, alias, or ARN. Can include region specification for aliases (e.g., alias/ExampleAlias?region=us-east-1)",
        scheme: "string",
        required: true
      }
    ]))
  } else if (connection == "gcp_kms") {
    rows = rows.concat(gcpFields.concat([
      {
        field: "keyID",
        description: "KMS key resource path in the format: projects/PROJECT/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY",
        scheme: "string",
        required: true
      }
    ]))
  } else if (connection == "azure_key_vault") {
    rows = rows.concat(azureFields.concat([
      {
        field: "keyID",
        description: "Key Vault key URL in the format: https://vault-name.vault.azure.net/keys/key-name",
        scheme: "string",
        required: true
      }
    ]))
  }

  rows = rows.concat(common.filter(row => row.required)).filter(i => i.field != null)
  rows.sort(fieldSorter);

  common = common.filter(row => !row.required).filter(i => i.field != null)
  common.sort(fieldSorter)

  rows = rows.concat(common)

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
                    {useSchemeUrl(row.scheme, oss)}
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
