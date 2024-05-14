/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  canaryCheckerSidebar: [
    {
      type: 'doc',
      id: 'canary-checker/health-checks',
      label: 'Overview'
    },
    {
      type: 'doc',
      id: 'canary-checker/getting-started',
      label: 'Getting Started'
    },
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
        title: 'Installation',
        slug: '/canary-checker/installation'
      },
      items: [
        {
          type: 'doc',
          id: 'canary-checker/cli',
          label: 'CLI'
        }
      ]
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'doc',
          id: 'canary-checker/concepts/metrics-exporter',
          label: 'Metrics Exporter'
        },
        {
          type: 'doc',
          id: 'canary-checker/concepts/grafana',
          label: 'Grafana'
        },
        {
          type: 'category',
          label: 'Expressions',
          link: {
            type: 'generated-index',
            title: 'Expressions',
            slug: '/canary-checker/concepts/expressions'
          },
          items: [
            {
              type: 'doc',
              id: 'canary-checker/concepts/display-formatting',
              label: 'Display Formatting'
            },
            {
              type: 'doc',
              id: 'canary-checker/concepts/health-evaluation',
              label: 'Health Evaluation'
            },

            {
              type: 'doc',
              id: 'canary-checker/concepts/transforms',
              label: 'Transforms'
            }
          ]
        },

        {
          type: 'doc',
          id: 'canary-checker/concepts/troubleshooting',
          label: 'Troubleshooting'
        }
      ]
    },

    {
      type: 'category',
      label: 'Checks',
      items: [
        {
          className: 'condensed',
          type: 'autogenerated',
          dirName: 'canary-checker/reference'
        }
      ]
    },
    {
      type: 'category',
      label: 'Comparisons',
      items: [
        {
          type: 'doc',
          id: 'canary-checker/comparisons/blackbox-exporter',
          label: 'Blackbox Exporter'
        }
      ]
    }
  ],
  configdbSidebar: [
    {
      type: 'autogenerated',
      dirName: 'config-db'
    }
  ],
  playbooksSidebar: [
    {
      type: 'autogenerated',
      dirName: 'playbooks'
    }
  ],
  topologySidebar: [
    {
      type: 'autogenerated',
      dirName: 'topology'
    }
  ],
  notificationsSidebar: [
    {
      type: 'doc',
      id: 'notifications/index',
      label: 'Overview'
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'doc',
          id: 'notifications/concepts/filtering',
          label: 'Filtering'
        },
        {
          type: 'doc',
          id: 'notifications/concepts/templating',
          label: 'Templating'
        }
      ]
    },
    {
      type: 'category',
      label: 'Events',
      link: {
        type: 'generated-index',
        title: 'Notification Events',
        slug: '/notifications/events'
      },
      items: [
        {
          type: 'doc',
          id: 'notifications/events/components',
          label: 'Components'
        },
        {
          type: 'doc',
          id: 'notifications/events/health-checks',
          label: 'Health Checks'
        }
        // {
        //   type: 'doc',
        //   id: 'notifications/events/incidents',
        //   label: 'Incidents'
        // }
      ]
    },
    {
      type: 'doc',
      id: 'notifications/channels',
      label: 'Channels'
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        {
          type: 'doc',
          id: 'notifications/examples/slack',
          label: 'Slack'
        }
      ]
    }
  ],
  registrySidebar: [
    {
      type: 'doc',
      id: 'registry/index',
      label: 'Overview'
    },
    {
      type: 'doc',
      id: 'registry/aws',
      label: 'AWS'
    },
    {
      type: 'doc',
      id: 'registry/kubernetes',
      label: 'Kubernetes'
    }
  ],
  reference: [
    {
      type: 'autogenerated',
      dirName: 'reference'
    }
  ],
  overview: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview'
    },
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
        title: 'Installation',
        slug: '/installation'
      },
      items: [
        {
          type: 'doc',
          label: 'SaaS',
          id: 'installation/saas'
        },
        {
          type: 'category',
          label: 'Self-Hosted',
          items: [
            {
              type: 'doc',
              id: 'installation/helm',
              label: 'Helm'
            },
            {
              type: 'doc',
              id: 'installation/database',
              label: 'Database'
            },
            {
              type: 'doc',
              id: 'installation/oidc',
              label: 'SSO (OIDC)'
            },
            {
              type: 'doc',
              id: 'installation/monitoring-and-tracing',
              label: 'Monitoring & Tracing'
            },
            {
              type: 'doc',
              id: 'installation/chart-permissions',
              label: 'Security'
            }
          ]
        },

        {
          type: 'category',
          label: 'Cloud Providers',
          items: [
            {
              type: 'doc',
              id: 'installation/aws-eks',
              label: 'AWS EKS'
            }
          ]
        },

        {
          type: 'category',
          label: 'Local Testing',
          items: [
            {
              type: 'doc',
              id: 'installation/kind_linux',
              label: 'Kind'
            },
            {
              type: 'doc',
              id: 'installation/minikube_windows',
              label: 'Minikube (Windows)'
            }
          ]
        }
      ]
    },

    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture'
    },
    {
      type: 'doc',
      id: 'security',
      label: 'Security'
    }
  ]
}

module.exports = sidebars
