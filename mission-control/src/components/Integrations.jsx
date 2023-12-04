
import React from 'react';
import { FeatureBody } from './FeatureBody';

const integrations = [
  { icon: "prometheus" },
  // { icon: "datadog" },
  { icon: "dynatrace" },
  { icon: "aws-cloudwatch" },
  { icon: "k8s", url: "kubernetes" },
  // { icon: "argo" },
  // { icon: "flux" },

  { icon: "http" },

  { icon: "ssl", url: "http#ssl" },
  { icon: "icmp" },
  { icon: "dns" },
  { icon: "ldap" },

  { icon: "sftp" },
  { icon: "smb" },
  { icon: "s3" },
  { icon: "gcs", url: "gcs-bucket" },

  { icon: "redis" },
  { icon: "mysql" },
  { icon: "postgres" },
  { icon: "mssql" },
  { icon: "mongo" },
  { icon: "elasticsearch" },
  { icon: "opensearch", url: "elasticsearch" },

  { icon: "jmeter" },
  { icon: "k6" },
  { icon: "postman" },
  { icon: "playwright" },
  { icon: "aws-ec2-instance" },

  { icon: "aws-config" },
  { icon: "helm" },
  { icon: "docker" },
  { icon: "bash", url: "exec" },
  { icon: "powershell", url: "exec" },

  { icon: "github" },
  { icon: "azure-devops" },
];
export function Integrations() {
  return (
    <div className="mx-auto grid w-full max-w-xl grid-cols-6 items-center gap-y-3  lg:mx-0 lg:max-w-none lg:pl-8">
      {integrations.map((integration) => (
        <a href={`/reference/${integration?.url || integration.icon}`} target='_blank' title={integration.icon}>
          <img
            className="max-h-12 w-full object-contain object-left"
            src={`/img/icons/${integration.icon}.svg`}
            alt={integration.icon}
            width={32}
            height={32}
          />
        </a>
      ))}
    </div>
  )
}

