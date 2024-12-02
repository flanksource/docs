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
    url: 'https://docs.flanksource.com',
    baseUrl: '/',
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
        connection: '/reference/connection',
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
            {
              to: '/canary-checker/reference/sql',
              from: ['/canary-checker/reference/postgres', '/canary-checker/reference/mysql', '/canary-checker/reference/mssql'],
            },

            {
              to: '/canary-checker/reference/folder#s3',
              from: '/canary-checker/reference/s3-bucket',
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
            showReadingTime: true
          },

          theme: {

            customCss: './src/css/out.css'
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
            // {
            //   to: 'integrations',
            //   activeBasePath: '/integrations',
            //   position: 'left',
            //   label: 'Integrations'
            // },
            {
              to: 'config-db',
              activeBasePath: '/config-db',
              label: 'Catalog',
              position: 'left'
            },
            {
              to: 'playbooks',
              activeBasePath: '/playbooks',
              label: 'Playbooks',
              position: 'left'
            },
            {
              to: 'topology',
              activeBasePath: 'topology',
              label: 'Topology',
              position: 'left'
            },
            {
              to: 'canary-checker',
              label: 'Health Checks',
              activeBasePath: 'canary-checker',
              position: 'left'
            },

            {
              to: 'notifications',
              activeBasePath: 'notifications',
              label: 'Notifications',
              position: 'left'
            },

            {
              to: 'registry',
              activeBasePath: 'registry',
              label: 'Registry',
              position: 'left'
            },
            {
              to: 'reference',
              activeBasePath: '/reference',
              label: 'Reference',
              position: 'left'
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
          appId: 'OB826SK7ZD',

          // Public API key: it is safe to commit it
          apiKey: 'b6f91e146e1ed100664b6da07151f287',

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
      })
  }
}
