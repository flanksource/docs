
import React from 'react';
import { FeatureBody } from './FeatureBody';

const integrations = [
  { icon: "prometheus" },
  // { icon: "datadog" },
  // { icon: "dynatrace" },
  { icon: "aws-cloudwatch" },
  { icon: "k8s", url: "kubernetes" },
  // { icon: "argo" },
  // { icon: "flux" },

  { icon: "http" },

  { icon: "ssl", url: "http#ssl" },
  { icon: "icmp" },
  { icon: "dns" },
  { icon: "ldap" },

  { icon: "sftp", url: "/examples/sftp" },
  { icon: "smb", url: "/examples/smb" },
  { icon: "s3", url: "folder#s3" },
  { icon: "gcs", url: "folder#gcs" },

  { icon: "redis" },
  { icon: "mysql", url: "sql#mysql" },
  { icon: "postgres", url: "sql#postgres" },
  { icon: "mssql", url: "sql#mssql" },
  { icon: "mongo" },
  { icon: "elasticsearch" },
  { icon: "opensearch", url: "elasticsearch" },

  { icon: "jmeter", url: "jmeter" },
  { icon: "k6", url: "/examples/k6" },
  { icon: "postman", url: "/examples/newman" },
  { icon: "playwright", url: "/examples/playwright" },

  { icon: "aws-config" },
  { icon: "helm" },
  { icon: "docker", url: "containerd" },
  { icon: "bash", url: "exec" },
  { icon: "powershell", url: "exec" },

  { icon: "github", url: "git" },
  { icon: "azure-devops" },
];


export function Integrations() {
  return (
    <div className="mx-auto grid w-full max-w-xl grid-cols-6 items-center gap-y-3  lg:mx-0 lg:max-w-none lg:pl-8">
      {integrations.map((integration) => {
        let base = "/docs/reference/";
        if (integration.url && integration.url.startsWith("/")) {
          base = integration.url
        } else if (integration.url) {
          base = base + integration.url
        } else {
          base = base + integration.icon
        }
        return <a href={base} target='_blank' title={integration.icon}>
          <img
            className="max-h-12 w-full object-contain object-left"
            src={`/img/icons/${integration.icon}.svg`}
            alt={integration.icon}
            width={32}
            height={32}
          />
        </a>
      })}
    </div>
  )
}

