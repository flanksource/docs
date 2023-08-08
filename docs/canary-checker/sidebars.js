module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'doc',
          id: 'index',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'cli',
          label: 'CLI',
        },
        {
          type: 'doc',
          id: 'database',
          label: 'Database',
        },
        {
          type: 'doc',
          id: 'helm',
          label: 'Helm',
        },
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'doc',
          id: 'concepts/authentication',
          label: 'Authentication',
        },
        {
          type: 'doc',
          id: 'concepts/metrics',
          label: 'Metrics',
        },
        {
          type: 'doc',
          id: 'concepts/transforms',
          label: 'Transforms',
        },
        {
          type: 'doc',
          id: 'concepts/scripting',
          label: 'Scripting',
        },
        {
          type: 'doc',
          id: 'concepts/connections',
          label: 'Connections',
        },
      ],
    },
    {
      type: 'category',
      label: 'Check Types',
      items: [
        'reference/common',
        {
          type: 'category',
          label: 'Alerts',
          items: [
            {
              type: 'doc',
              id: 'reference/alert-manager',
              label: 'Alert Manager (Prometheus)',
            },
            {
              type: 'doc',
              id: 'reference/cloudwatch',
              label: 'AWS Cloud Watch',
            },
            {
              type: 'doc',
              id: 'reference/aws-config-rule',
              label: 'AWS Config Rule',
            },
          ],
        },
        {
          type: 'category',
          label: 'Backup Checks',
          items: [
            {
              type: 'doc',
              id: 'reference/gcs-database-backup',
              label: 'GCS Database Backup',
            },
            {
              type: 'doc',
              id: 'reference/restic',
              label: 'Restic',
            },

          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          items: [
            {
              type: 'doc',
              id: 'reference/aws-config',
              label: 'AWS Config',
            },
            {
              type: 'doc',
              id: 'reference/configdb',
              label: 'Config DB',
            },
            {
              type: 'doc',
              id: 'reference/kubernetes',
              label: 'Kubernetes Resources',
            },
          ],
        },
        {
          type: 'category',
          label: 'Data Sources',
          items: [
            {
              type: 'doc',
              id: 'reference/elasticsearch',
              label: 'Elasticsearch',
            },
            {
              type: 'doc',
              id: 'reference/ldap',
              label: 'LDAP',
            },
            {
              type: 'doc',
              id: 'reference/mongo',
              label: 'MongoDB',
            },
            {
              type: 'doc',
              id: 'reference/mssql',
              label: 'MSSQL',
            },
            {
              type: 'doc',
              id: 'reference/mysql',
              label: 'MySQL',
            },
            {
              type: 'doc',
              id: 'reference/postgres',
              label: 'Postgres',
            },
            {
              type: 'doc',
              id: 'reference/redis',
              label: 'Redis',
            },
          ],
        },
        {
          type: 'category',
          label: 'DevOps',
          items: [
            {
              type: 'doc',
              id: 'reference/azure-devops',
              label: 'Azure DevOps',
            },
          ],
        },
        {
          type: 'category',
          label: 'Folders',
          items: [
            {
              type: 'doc',
              id: 'reference/folder',
              label: 'Folder',
            },
            {
              type: 'doc',
              id: 'reference/gcs-bucket',
              label: 'GCS Bucket',
            },
            {
              type: 'doc',
              id: 'reference/s3-bucket',
              label: 'S3 Bucket',
            },
            {
              type: 'doc',
              id: 'reference/sftp',
              label: 'SFTP',
            },
            {
              type: 'doc',
              id: 'reference/smb',
              label: 'SMB/CIFS',
            },
          ],
        },
        {
          type: 'category',
          label: 'Integration Testing',
          items: [
            {
              type: 'doc',
              id: 'reference/jmeter',
              label: 'JMeter',
            },
            {
              type: 'doc',
              id: 'reference/junit',
              label: 'JUnit',
            },
            {
              type: 'doc',
              id: 'reference/k6',
              label: 'K6',
            },
            {
              type: 'doc',
              id: 'reference/newman',
              label: 'Newman (Postman Collection)',
            },
            {
              type: 'doc',
              id: 'reference/playwright',
              label: 'Playwright',
            },
          ],
        },
        {
          type: 'category',
          label: 'Metrics',
          items: [
            {
              type: 'doc',
              id: 'reference/prometheus',
              label: 'Prometheus',
            },
          ],
        },
        {
          type: 'category',
          label: 'Network',
          items: [
            {
              type: 'doc',
              id: 'reference/tcp',
              label: 'TCP',
            },
            {
              type: 'doc',
              id: 'reference/dns',
              label: 'DNS',
            },
            {
              type: 'doc',
              id: 'reference/http',
              label: 'HTTP',
            },
            {
              type: 'doc',
              id: 'reference/icmp',
              label: 'ICMP',
            },
          ],
        },
        {
          type: 'category',
          label: 'Infrastructure',
          items: [
            {
              type: 'doc',
              id: 'reference/containerd',
              label: 'Containerd/Docker',
            },
            {
              type: 'doc',
              id: 'reference/helm',
              label: 'Helm',
            },
            {
              type: 'doc',
              id: 'reference/ec2',
              label: 'EC2',
            },
            {
              type: 'doc',
              id: 'reference/pod',
              label: 'Pod',
            },
            {
              type: 'doc',
              id: 'reference/s3-protocol',
              label: 'S3 Protocol',
            },
          ],
        },
      ],
    },
  ],
};
