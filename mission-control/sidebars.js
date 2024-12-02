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
  integrationsSidebar: [
    {
      type: 'doc',
      id: 'integrations/index',
      label: 'Overview'
    },

    // {
    //   type: 'category',
    //   label: 'AWS',
    //   className: "icon hidden aws",
    //   items: [
    //     {
    //       type: 'doc',
    //       id: 'integrations/aws/catalog',
    //       label: 'Getting Started'
    //     },
    //     {
    //       type: 'doc',
    //       id: 'integrations/aws/cloudformation',
    //       label: 'CloudFormation',
    //       className: "icon aws-cloudformation",
    //     },
    //     {
    //       type: 'doc',
    //       id: 'integrations/aws/cloudwatch',
    //       className: "icon aws-cloudwatch",

    //       label: 'CloudWatch'
    //     },
    //     {
    //       type: 'doc',
    //       id: 'integrations/aws/cloudtrail',
    //       className: "icon aws-cloudtrail",

    //       label: 'CloudTrail'
    //     },
    //     // {
    //     //   type: 'doc',
    //     //   id: 'integrations/aws/cur',
    //     //   label: 'Cost & Usage Reports'
    //     // },
    //   ]
    // },

    {
      type: 'category',
      label: 'Flux',
      className: "icon flux",
      items: [
        {
          type: 'doc',
          id: 'integrations/flux/catalog',
          label: 'Catalog'
        },

        {
          type: 'doc',
          id: 'integrations/flux/playbooks',
          label: 'Playbooks'
        },
        {
          type: 'doc',
          id: 'integrations/flux/topology',
          label: 'Topology'
        },

      ]
    },


    {
      type: 'category',
      // id: 'integrations/kubernetes/index',
      label: 'Kubernetes',
      className: "icon kubernetes",
      items: [
        {
          type: 'doc',
          id: 'integrations/kubernetes/catalog',
          label: 'Catalog'
        },

        {
          type: 'doc',
          id: 'integrations/kubernetes/playbooks',
          label: 'Playbooks'
        },

      ]
    },

    // {
    //   type: 'doc',
    //   id: 'integrations/argo',
    //   className: "icon argo",
    //   label: 'Argo'
    // },

    // {
    //   type: 'doc',
    //   id: 'integrations/aws/cloudtrail',
    //   className: "icon postgresql",
    //   label: 'Postgres'
    // },
    // {
    //   type: 'doc',
    //   id: 'integrations/crossplane',
    //   className: "icon crossplane",
    //   label: 'Crossplane'
    // },
    // {
    //   type: 'doc',
    //   id: 'integrations/azure',
    //   className: "icon azure",
    //   label: 'Azure'
    // },


    // {
    //   type: 'doc',
    //   id: 'integrations/aws/cloudtrail',
    //   className: "icon github",
    //   label: 'Github'
    // },
    // {
    //   type: 'doc',
    //   id: 'integrations/aws/cloudtrail',
    //   className: "icon gitlab",
    //   label: 'Gitlab'
    // },
    // {
    //   type: 'doc',
    //   id: 'integrations/aws/cloudtrail',
    //   className: "icon  hidden azuredevops",
    //   label: 'Azure Devops'
    // },


  ],
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
      label: 'Concepts',
      items: [
        {
          type: 'autogenerated',
          dirName: "canary-checker/concepts"
        }]
    },
    {
      type: 'category',
      label: 'Checks',
      items: [
        {
          className: 'condensed',
          type: 'autogenerated',
          dirName: 'canary-checker/reference'
        },

        {
          className: 'condensed',
          type: 'autogenerated',
          dirName: 'canary-checker/examples'
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
    },
    {
      type: 'doc',
      id: 'canary-checker/troubleshooting',
      label: 'Troubleshooting'
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'canary-checker/tutorials/control-plane-testing/index',
          label: 'Control Plane Testing'
        }
      ]

    },

  ],
  configdbSidebar: [
    {
      type: 'autogenerated',
      dirName: 'config-db'

    },
  ],
  playbooksSidebar: [

    {
      type: 'autogenerated',
      dirName: 'playbooks'

    },

  ],
  topologySidebar: [


    {
      type: 'autogenerated',
      dirName: 'topology'

    },

  ],
  notificationsSidebar: [
    {
      type: 'autogenerated',
      dirName: "notifications"
    }
  ],
  registrySidebar: [

    {
      type: 'autogenerated',
      dirName: "registry"
    }
    // {
    //   type: 'doc',
    //   id: 'registry/index',
    //   label: 'Overview'
    // },
    // {
    //   type: 'doc',
    //   id: 'registry/aws',
    //   label: 'AWS'
    // },
    // {
    //   type: 'doc',
    //   id: 'registry/kubernetes',
    //   label: 'Kubernetes'
    // }
  ],
  reference: [
    {
      type: 'autogenerated',
      dirName: "reference"
    }
  ],
  overview: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview'
    },
    {
      type: 'doc',
      id: 'how-it-works',
    },

    {
      type: 'category',
      label: 'Installation',

      items: [
        // {
        //   type: 'doc',
        //   label: 'SaaS',
        //   id: 'installation/saas'
        // },
        {
          type: 'doc',
          label: 'Deployment Models',
          id: 'installation/deployment-models'

        },

        {
          type: 'category',
          label: 'SaaS',

          items: [

            {
              type: 'doc',
              label: 'Getting Started',
              id: 'installation/saas/getting-started',
            },

            {
              type: 'doc',
              id: 'installation/saas/eks',
              label: 'AWS EKS'
            },

            {
              type: 'doc',
              id: 'installation/saas/agent',
              label: 'Agent'
            },

            {
              type: 'doc',
              id: 'installation/saas/kubectl',
              label: 'Kubectl Access'
            },

          ]
        },
        {
          type: 'category',
          label: 'Self-Hosted',
          items: [
            {
              type: 'doc',
              id: 'installation/self-hosted/getting-started',
              label: 'Installation'
            },
            {
              type: 'doc',
              id: 'installation/self-hosted/database',
              label: 'Database'
            },
            {
              type: 'doc',
              id: 'installation/self-hosted/oidc',
              label: 'SSO (OIDC)'
            },

            {
              type: 'doc',
              id: 'installation/self-hosted/eks',
              label: 'AWS EKS'
            }


          ]
        },

        {
          type: 'doc',
          id: 'installation/local-testing',
          label: 'Local Testing'
        }
      ]
    },

    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture'
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'security',
      },
      label: 'Security',
      items: [
        {
          type: 'doc',
          id: 'hardening',
        },
      ]
    }
  ]
}

module.exports = sidebars
