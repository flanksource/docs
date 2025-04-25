import { dirname } from 'path';
import { fileURLToPath } from 'url';

import type * as Preset from '@docusaurus/preset-classic';

const __dirname = dirname(fileURLToPath(import.meta.url));

import PrismLight from './src/prismLight.ts';
import PrismDark from './src/prismDark.ts';

/** @type {import('@docusaurus/types').Config} */
export default async function createConfigAsync() {

  const codeImport = await import('remark-code-import');

  return {
    title: 'Mission Control',
    tagline: '',
    // staticDirectories: ['images', 'static'],
    url: 'https://flanksource.com',
    baseUrl: process.env.NODE_ENV == "development" || process.env.PREVIEW == "true" ? '/' : '/docs',
    organizationName: 'flanksource', // Usually your GitHub org/user name.
    projectName: 'docs', // Usually your repo name.
    favicon: 'img/flanksource-icon.png',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    // scripts: [
    //   "https://cdn.tailwindcss.com",
    // ],

    customFields: {
      oss: false,
      productName: 'Mission Control',
      links: {
        authentication: '/reference/env-var',
        secrets: '/reference/env-var',
        connection: '/reference/connections',
        cel: '/reference/scripting/cel',
        gotemplate: '/reference/scripting/gotemplate',
        javascript: '/reference/scripting/javascript',
        jsonpath: 'https://jsonpath.com/'
      }
    },

    plugins: [
      // ['docusaurus-plugin-redoc',

      //   {
      //     spec: "https://redocly.github.io/redoc/openapi.yaml",
      //     route: '/openapu'
      //   }
      // ],

      ['@docusaurus/plugin-client-redirects',
        {
          fromExtensions: ['html', 'htm'], // /myPage.html -> /myPage
          toExtensions: ['exe', 'zip'], // /myAsset -> /myAsset.zip (if latter exists)
          redirects: [
            // /docs/oldDoc -> /docs/newDoc
            // {
            //   to: '/guide/canary-checker/reference/sql',
            //   from: ['/guide/canary-checker/reference/postgres', '/guide/canary-checker/reference/mysql', '/guide/canary-checker/reference/mssql'],
            // },

            // {
            //   to: '/guide/canary-checker/reference/folder#s3',
            //   from: '/guide/canary-checker/reference/s3-bucket',
            // },

            {
              to: '/guide/canary-checker',
              from: '/canary-checker',
            },
            {
              to: '/guide/playbooks',
              from: '/playbooks',
            },
            {
              to: '/guide/notifications/',
              from: '/notifications',
            },
            {
              to: '/guide/topology',
              from: '/topology',
            },
            
            // Added redirects for missing links
            {
              to: '/guide/canary-checker',
              from: [
                '/canary-checker',
                '/docs/guide/canary-checker/overview',
                '/docs/guide/canary-checker/examples/concepts/expressions/display-formatting',
                '/docs/guide/canary-checker/examples/concepts/expressions/health-evaluation',
                '/docs/guide/canary-checker/examples/concepts/expressions/transforms',
                '/docs/guide/canary-checker/examples/concepts/metrics'
              ],
            },
            {
              to: '/guide/canary-checker/reference',
              from: [
                '/docs/reference/canary-checker/reference/alert-manager',
                '/docs/reference/canary-checker/reference/aws-cloudwatch',
                '/docs/reference/canary-checker/reference/aws-config',
                '/docs/reference/canary-checker/reference/aws-config-rule',
                '/docs/reference/canary-checker/reference/catalog',
                '/docs/reference/canary-checker/reference/containerd',
                '/docs/reference/canary-checker/reference/dns',
                '/docs/reference/canary-checker/reference/elasticsearch',
                '/docs/reference/canary-checker/reference/exec',
                '/docs/reference/canary-checker/reference/folder',
                '/docs/reference/canary-checker/reference/gcs-database-backup',
                '/docs/reference/canary-checker/reference/git',
                '/docs/reference/canary-checker/reference/helm',
                '/docs/reference/canary-checker/reference/http',
                '/docs/reference/canary-checker/reference/icmp',
                '/docs/reference/canary-checker/reference/jmeter',
                '/docs/reference/canary-checker/reference/junit',
                '/docs/reference/canary-checker/reference/kubernetes',
                '/docs/reference/canary-checker/reference/kubernetes-resource',
                '/docs/reference/canary-checker/reference/ldap',
                '/docs/reference/canary-checker/reference/mongo',
                '/docs/reference/canary-checker/reference/prometheus',
                '/docs/reference/canary-checker/reference/redis',
                '/docs/reference/canary-checker/reference/restic',
                '/docs/reference/canary-checker/reference/s3-protocol',
                '/docs/reference/canary-checker/reference/sql',
                '/docs/reference/canary-checker/reference/tcp'
              ],
            },
            {
              to: '/guide/canary-checker/concepts/metrics',
              from: [
                '/docs/concepts/metrics',
                '/docs/guides/canary-checker/concepts/metrics'
              ],
            },
            {
              to: '/guide/canary-checker/reference/concepts/expressions/display-formatting',
              from: [
                '/docs/guide/canary-checker/reference/concepts/expressions/display-formatting',
                '/docs/guide/topology/lookups/concepts/expressions/display-formatting'
              ],
            },
            {
              to: '/guide/canary-checker/reference/concepts/expressions/health-evaluation',
              from: [
                '/docs/guide/canary-checker/reference/concepts/expressions/health-evaluation'
              ],
            },
            {
              to: '/guide/canary-checker/reference/concepts/expressions/transforms',
              from: [
                '/docs/guide/canary-checker/reference/concepts/expressions/transforms',
                '/docs/guide/topology/lookups/concepts/expressions/transforms'
              ],
            },
            {
              to: '/guide/canary-checker/reference/concepts/metrics',
              from: [
                '/docs/guide/canary-checker/reference/concepts/metrics'
              ],
            },
            
            // Config DB redirects
            {
              to: '/guide/config-db',
              from: [
                '/config-db',
                '/docs/config-db'
              ],
            },
            {
              to: '/guide/config-db/getting-started',
              from: [
                '/docs/guide/config-db/getting-started'
              ],
            },
            {
              to: '/guide/config-db/concepts/plugins/relationships',
              from: [
                '/docs/guide/config-db/concepts/plugins/relationships'
              ],
            },
            {
              to: '/guide/config-db/scrapers/gcp',
              from: [
                '/docs/guide/config-db/scrapers/gcp'
              ],
            },
            
            // Playbooks redirects
            {
              to: '/guide/playbooks/actions/ai/context',
              from: [
                '/docs/guide/playbooks/actions/ai/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/azure_devops_pipeline/context',
              from: [
                '/docs/guide/playbooks/actions/azure_devops_pipeline/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/exec/context',
              from: [
                '/docs/guide/playbooks/actions/exec/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/github/context',
              from: [
                '/docs/guide/playbooks/actions/github/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/gitops/context',
              from: [
                '/docs/guide/playbooks/actions/gitops/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/http/context',
              from: [
                '/docs/guide/playbooks/actions/http/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/notification/context',
              from: [
                '/docs/guide/playbooks/actions/notification/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/pod/context',
              from: [
                '/docs/guide/playbooks/actions/pod/context'
              ],
            },
            {
              to: '/guide/playbooks/actions/sql/context',
              from: [
                '/docs/guide/playbooks/actions/sql/context'
              ],
            },
            {
              to: '/guide/playbooks/reference/env-vars',
              from: [
                '/docs/guide/playbooks/reference/env-vars'
              ],
            },
            {
              to: '/guide/playbooks/concepts/runners',
              from: [
                '/guide/playbooks/concepts/runners'
              ],
            },
            
            // Installation and reference redirects
            {
              to: '/installation/deployment-models',
              from: [
                '/docs/installation/deployment-models'
              ],
            },
            {
              to: '/installation/saas/fully-hosted',
              from: [
                '/docs/installation/saas/fully-hosted'
              ],
            },
            {
              to: '/installation/self-hosted/ingress',
              from: [
                '/docs/installation/self-hosted/ingress'
              ],
            },
            {
              to: '/integration',
              from: [
                '/docs/integration',
                '/integrations'
              ],
            },
            {
              to: '/integration/aws',
              from: [
                '/docs/integration/aws'
              ],
            },
            {
              to: '/integrations/kubernetes/catalog',
              from: [
                '/docs/integrations/kubernetes/catalog'
              ],
            },
            {
              to: '/integrations/kubernetes/flux',
              from: [
                '/docs/integrations/kubernetes/flux'
              ],
            },
            {
              to: '/integrations/flux/azure-devops',
              from: [
                '/docs/integrations/flux/azure-devops'
              ],
            },
            {
              to: '/integrations/flux/github',
              from: [
                '/docs/integrations/flux/github'
              ],
            },
            {
              to: '/integrations/flux/gitlab',
              from: [
                '/docs/integrations/flux/gitlab'
              ],
            },
            {
              to: '/integrations/gcp/getting-started',
              from: [
                '/docs/integrations/gcp/getting-started'
              ],
            },
            
            // Guide and reference redirects
            {
              to: '/guide/reference/http',
              from: [
                '/docs/guide/reference/http'
              ],
            },
            {
              to: '/guide/reference/playbooks/context',
              from: [
                '/docs/guide/reference/playbooks/context'
              ],
            },
            {
              to: '/guide/reference/pod',
              from: [
                '/docs/guide/reference/pod'
              ],
            },
            {
              to: '/guide/notifications',
              from: [
                '/guide/notifications',
                '/reference/guide/notifications/'
              ],
            },
            {
              to: '/guide/topology/concepts/templating',
              from: [
                '/guide/topology/concepts/templating'
              ],
            },
            {
              to: '/guide/config-db/concepts/tags',
              from: [
                '/guide/config-db/concepts/tags'
              ],
            },
            {
              to: '/guide/config-db/concepts/transform',
              from: [
                '/guide/config-db/concepts/transform'
              ],
            },
            
            // Reference redirects
            {
              to: '/reference/config-db/config-types/file/',
              from: [
                '/docs/reference/config-db/config-types/file/'
              ],
            },
            {
              to: '/reference/helm/Pganalyze.com',
              from: [
                '/docs/reference/helm/Pganalyze.com'
              ],
            },
            {
              to: '/reference/helm/mission-control-agent',
              from: [
                '/docs/reference/helm/mission-control-agent'
              ],
            },
            {
              to: '/reference/config-db/changes',
              from: [
                '/reference/config-db/changes'
              ],
            },
            {
              to: '/reference/config-db/properties',
              from: [
                '/reference/config-db/properties'
              ],
            },
            {
              to: '/reference/connections',
              from: [
                '/reference/connections'
              ],
            },
            {
              to: '/reference/connections/aws',
              from: [
                '/reference/connections/aws'
              ],
            },
            {
              to: '/reference/connections/azure',
              from: [
                '/reference/connections/azure'
              ],
            },
            {
              to: '/reference/connections/gcp',
              from: [
                '/reference/connections/gcp'
              ],
            },
            {
              to: '/reference/connections/kubernetes',
              from: [
                '/reference/connections/kubernetes',
                '/reference/connections/kubernetes/'
              ],
            },
            {
              to: '/reference/env-var',
              from: [
                '/reference/env-var'
              ],
            },
            {
              to: '/reference/login',
              from: [
                '/reference/login'
              ],
            },
            {
              to: '/reference/notifications/template_vars',
              from: [
                '/reference/notifications/template_vars'
              ],
            },
            {
              to: '/reference/old-home',
              from: [
                '/reference/old-home'
              ],
            },
            {
              to: '/reference/permissions/actions',
              from: [
                '/reference/permissions/actions'
              ],
            },
            {
              to: '/reference/rbac',
              from: [
                '/reference/rbac'
              ],
            },
            {
              to: '/reference/scripting/cel',
              from: [
                '/reference/scripting/cel'
              ],
            },
            {
              to: '/reference/types',
              from: [
                '/reference/types'
              ],
            },
            {
              to: '/topology',
              from: [
                '/topology'
              ],
            },
            {
              to: '/registry/azure',
              from: [
                '/docs/registry/azure'
              ],
            }
          ],

        }],

      // async function myPlugin(context, options) {
      //   return {
      //     name: "docusaurus-tailwindcss",
      //     configurePostCss(postcssOptions) {
      //       // Appends TailwindCSS and AutoPrefixer.
      //       postcssOptions.plugins.push(require("tailwindcss"));
      //       postcssOptions.plugins.push(require("autoprefixer"));
      //       return postcssOptions;
      //     },
      //   };
      // },


      async function nodePolyfillPlugin(context, options) {
        return {
          name: 'node-polyfill-plugin',
          configureWebpack(config, isServer) {
            if (!isServer) {
              return {
                resolve: {
                  fallback: {
                    path: require.resolve('path-browserify'),
                    util: require.resolve('util/'),
                    process: require.resolve('process/browser'),
                    buffer: require.resolve('buffer/'),
                    fs: require.resolve("browserify-fs"),
                    url: require.resolve("url/")
                  },
                },

                plugins: [
                  new (require('webpack').ProvidePlugin)({
                    process: ['process'],

                    Buffer: ['buffer', 'Buffer'],
                  }),
                ],
              };
            }
            return {};

          },
        };
      },
      async function resolveSymlinkPlgugin(context, options) {
        return {
          name: 'resolve-symlinks',
          configureWebpack(config, isServer, utils) {
            return {
              resolve: {
                symlinks: false
              }
            }
          }
        }
      }
    ],

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en']
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          googleTagManager: {
            containerId: 'GTM-KZHC2BXZ',
          },
          docs: {
            routeBasePath: '/',
            exclude: [
              "**/*.canary.mdx",
              "**/*.canary.md",
              "**/_*.mdx",
              "**/modules/**",
              "**/_*.md"
            ],
            sidebarPath: './sidebars.js',
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: 'https://github.com/flanksource/docs/tree/main/',
            remarkPlugins: [codeImport],

            // rehypePlugins: [rehypeExpressiveCode],
            // beforeDefaultRehypePlugins: [[rehypeExpressiveCode, { plugins: [pluginCollapsibleSections] }]]
            // rehypePlugins: [rehypeKatex],
          },
          blog: {
            showReadingTime: true,
            blogTitle: 'Flanksource Blog',
            // blogDescription: 'A Docusaurus powered blog!',
            postsPerPage: 'ALL',
            blogSidebarTitle: 'All posts',
            blogSidebarCount: 0,
            feedOptions: {
              type: 'all',
              copyright: `Copyright © ${new Date().getFullYear()} Flanksource, Inc.`,
              createFeedItems: async (params) => {
                const { blogPosts, defaultCreateFeedItems, ...rest } = params;
                return defaultCreateFeedItems({
                  // keep only the 10 most recent blog posts in the feed
                  blogPosts: blogPosts.filter((item, index) => index < 10),
                  ...rest,
                });
              },
            },

          },

          theme: {

            customCss: ['./src/css/out.css', './src/css/mission-control.css']
          }
        } satisfies Preset.Options
        )

      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // Replace with your project's social card
        image: 'img/flanksource-icon.png',
        home: 'docs/index.md',
        themes: [["docusaurus-json-schema-plugin", {}]],
        navbar: {
          title: '',
          logo: {
            alt: 'Flanksource Mission Control',
            src: 'img/mission-control-logo.svg'
          },
          items: [
            {
              to: '/',
              sidebarId: 'overview',
              activeBasePath: 'null',
              position: 'left',
              label: 'Overview'
            },
            {
              to: 'integrations',
              activeBasePath: '/integrations',
              // sidebarId: 'integrationsSidebar',
              position: 'left',
              label: 'Integrations'
            },
            {
              to: 'guide',
              activeBasePath: '/guide',
              // activeBasePath: '/config-db',
              label: 'User Guide',
              position: 'left'
            },
            // {
            //   to: 'playbooks',
            //   activeBasePath: '/playbooks',
            //   label: 'Playbooks',
            //   position: 'left'
            // },
            // {
            //   to: 'topology',
            //   activeBasePath: 'topology',
            //   label: 'Topology',
            //   position: 'left'
            // },
            // {
            //   to: 'canary-checker',
            //   label: 'Health Checks',
            //   activeBasePath: 'canary-checker',
            //   position: 'left'
            // },

            // {
            //   to: 'notifications',
            //   activeBasePath: 'notifications',
            //   label: 'Notifications',
            //   position: 'left'
            // },

            {
              to: 'reference',
              activeBasePath: '/reference',
              label: 'Reference',
              position: 'left'
            },

            { to: 'blog', label: 'Blog', position: 'left' }, // or position: 'right'

            {
              href: "https://demo.flanksource.com/login?username=demo@flanksource.com&password=demo@flanksource.com",
              label: "Demo",
              position: 'right',
            },

            {
              href: "https://app.flanksource.com/",
              label: "Login",
              // html: '<a href="https://app.flanksource.com/" class=" btn rounded bg-white px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" style="border: 1px solid #e5e7eb;">Login</a>',
              position: 'right',
            },
            {
              href: "https://accounts.flanksource.com/sign-up",
              html: '<a href="https://accounts.flanksource.com/sign-up" class="btn btn-primary hover:text-white" >Sign up</a>',
              position: 'right',
            },

          ]
        },

        metadata: [
          {
            name: 'keywords',
            content:
              'internal developer portal, internal developer platform, IDP, kubernetes'
          }
        ],

        algolia: {
          // The application ID provided by Algolia
          appId: '22S6MCHC33',

          // Public API key: it is safe to commit it
          apiKey: 'f430db27345fc6bcf9fd40d8f5e97160',

          indexName: 'flanksource'
        },
        colorMode: {
          defaultMode: 'light',
          disableSwitch: true,
          respectPrefersColorScheme: false
        },
        footer: {
          style: 'dark',
          copyright: `Copyright © ${new Date().getFullYear()} Flanksource Inc.`
        },
        prism: {
          theme: PrismLight,
          darkTheme: PrismDark,
        },
      }),
  }
}