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
