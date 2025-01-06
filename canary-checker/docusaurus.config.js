// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import PrismLight from './src/prismLight.ts';
import PrismDark from './src/prismDark.ts';

/** @type {import('@docusaurus/types').Config} */
export default async function createConfigAsync() {

  const codeImport = await import('remark-code-import');

  return {
    title: 'Canary Checker',
    tagline: '',
    url: 'https://canarychecker.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    customFields: {
      oss: true,
      productName: "Canary Checker",
      links: {
        "authentication": '/concepts/secret-management',
        "secrets": '/concepts/secret-management',
        "connection": '/concepts/connection', // TODO:
        "cel": "/scripting/cel",
        "gotemplate": "/scripting/gotemplate",
        "javascript": '/scripting/javascript',
        "jsonpath": 'https://jsonpath.com/'
      }
    },
    markdown: {
      mermaid: true,
    },
    favicon: 'img/canary-checker-icon.svg',
    organizationName: 'flanksource',
    projectName: 'canary-checker',


    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          googleTagManager: {
            containerId: 'GTM-5H2R2N48',
          },

          docs: {
            routeBasePath: '/',
            exclude: [
              "**/*.mc.mdx",
              "**/modules/**",
              "**/_*.mdx",
              "**/_*.md",
              "index.mdx"

            ],

            sidebarPath: './sidebars.js',
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: 'https://github.com/flanksource/docs/tree/main/',
            remarkPlugins: [[codeImport, {
              allowImportingFromOutside: true,
              rootDir: resolve('../')
            }]],

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
        })
      ]
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        metadata: [
          { name: 'keywords', content: 'health check, synthetic test, continuous testing, kubernetes operator' }
        ],

        algolia: {
          // The application ID provided by Algolia
          appId: 'UBMLWJ0MA2',

          // Public API key: it is safe to commit it
          apiKey: '6f7d25ae5d5b3b677c1039246031e049',

          indexName: 'canarychecker',
        },
        navbar: {
          logo: {
            alt: 'Canary Checker Logo',
            src: 'img/canary-checker.svg',
            srcDark: 'img/canary-checker-white.svg',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'docs',
              position: 'left',
              label: 'Docs',
            },
            {
              href: 'https://github.com/flanksource/canary-checker',
              label: 'GitHub',
              position: 'right',
            },
            {
              href: 'https://cloud-native.slack.com/messages/canary-checker/',
              label: 'Slack',
              position: 'right',
            },
          ],
        },
        colorMode: {
          defaultMode: 'light',
          disableSwitch: true,
          respectPrefersColorScheme: false
        },
        announcementBar: {
          content:
            '⭐️ If you like Canary Checker, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/flanksource/canary-checker">GitHub</a>! ⭐️',
        },
        footer: {
          style: 'light',
          copyright: `Copyright © ${new Date().getFullYear()} Flanksource, Inc.`,
        },
        prism: {
          theme: PrismLight,
          darkTheme: PrismDark,
        },
      }),
  };
}
