module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started'
    },
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
        title: 'Installation',
        // description: 'Learn about the most important Docusaurus concepts!',
        slug: '/installation',
        keywords: ['guides'],
      },
      items: [

        {
          type: 'doc',
          id: 'helm',
          label: 'Helm',
        },
        {
          type: 'doc',
          id: 'database',
          label: 'Database',
        },
        {
          type: 'doc',
          id: 'cli',
          label: 'CLI',
        },
        {
          type: 'doc',
          id: 'concepts/image-variants',
          label: 'Image Variants',
        },

      ]
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'doc',
          id: 'concepts/metrics-exporter',
          label: 'Metrics Exporter',
        },
        {
          type: 'doc',
          id: 'concepts/artifacts',
          label: 'Artifacts',
        },
        {
          type: 'doc',
          id: 'concepts/scaling',
          label: 'Scaling Canaries',
        },
        {
          type: 'doc',
          id: 'concepts/secret-management',
          label: 'Secret Management',
        },

        {
          type: 'category',
          label: 'Expressions',
          link: {
            type: 'generated-index',
            title: 'Expressions',
            slug: '/concepts/expressions',
          },
          items: [
            {
              type: 'doc',
              id: 'concepts/display-formatting',
              label: 'Display Formatting',
            },
            {
              type: 'doc',
              id: 'concepts/health-evaluation',
              label: 'Health Evaluation',
            },

            {
              type: 'doc',
              id: 'concepts/transforms',
              label: 'Transforms',
            },

          ]
        },

        {
          type: 'doc',
          id: 'concepts/grafana',
          label: 'Grafana',
        },

        {
          type: 'doc',
          id: 'concepts/troubleshooting',
          label: 'Troubleshooting',
        },
      ],
    },
    {
      type: 'category',
      label: 'Probes / Alerts',
      link: {
        type: 'generated-index',
        title: 'Probes / Alerts',
        slug: '/types',
        keywords: ['guides'],
        image: '/img/docusaurus.png',
      },
      items: [
        {
          type: 'doc',
          id: 'reference/http',
          label: 'HTTP',
        },
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
          id: 'reference/icmp',
          label: 'ICMP',
        },
        {
          type: 'doc',
          id: 'reference/alert-manager',
          label: 'Alert Manager',
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
      label: 'Folder / Backups',
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

      ]
    },

    {
      type: 'category',
      label: 'Data / Queries',
      items: [
        {
          type: 'doc',
          id: 'reference/prometheus',
          label: 'Prometheus',
        },

        {
          type: 'doc',
          id: 'reference/aws-config',
          label: 'AWS Config',
        },
        {
          type: 'doc',
          id: 'reference/configdb',
          label: 'Flanksource Config DB',
        },
        {
          type: 'doc',
          id: 'reference/kubernetes',
          label: 'Kubernetes Resources',
        },
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
      label: 'Active / Integration',
      items: [
        {
          type: 'doc',
          id: 'reference/exec',
          label: 'Exec',
        },
        {
          type: 'doc',
          id: 'reference/junit',
          label: 'JUnit',
        },
        {
          type: 'doc',
          id: 'reference/azure-devops',
          label: 'Azure DevOps',
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
    {
      type: 'category',
      label: "Examples",
      items: [
        {
          type: 'doc',
          id: 'reference/k6',
          label: 'K6',
        },
        {
          type: 'doc',
          id: 'reference/newman',
          label: 'Newman / Postman',
        },
        {
          type: 'doc',
          id: 'reference/playwright',
          label: 'Playwright',
        },
        {
          type: 'doc',
          id: 'reference/jmeter',
          label: 'JMeter',
        },
      ]
    },
    {
      type: 'category',
      label: 'Scripting',
      items: [
        {
          type: 'doc',
          id: 'scripting/gotemplate',
          label: 'Go Templates',
        },
        {
          type: 'doc',
          id: 'scripting/cel',
          label: 'Expressions',
        },
        {
          type: 'doc',
          id: 'scripting/javascript',
          label: 'Javascript',
        },
      ],
    },

    {
      type: 'category',
      label: 'Comparisons',
      items: [
        {
          type: 'doc',
          id: 'comparisons/blackbox-exporter',
          label: 'Blackbox Exporter',
        },
      ],
    },
    {
      type: 'category',
      label: 'References',
      items: [
        {
          type: 'doc',
          id: 'reference/connections',
          label: 'Connections',
        },
      ],
    }
  ],
};
