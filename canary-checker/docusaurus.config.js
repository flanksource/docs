// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/palenight');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
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
      '@docusaurus/preset-classic',
      {
        googleTagManager: {
          containerId: 'GTM-5H2R2N48',
        },

        theme: {
          customCss: require.resolve('./src/css/canary-checker.css'),
        },
        docs: {
          // remarkPlugins: [sectionPrefix],
          // rehypePlugins: [[inlineSVG, { maxImageSize: 5000 }]],
          routeBasePath: '/',
          breadcrumbs: true,
          // exclude: [
          //   '**/_*/**',
          //   '**/*.test.{js,jsx,ts,tsx}',
          //   '**/__tests__/**',
          // ],
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
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
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
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
        additionalLanguages: ['powershell', 'yaml', 'bash', 'shell-session'],
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme
        //'log',jq'promql', 'regex','shell-session','uri', 'mermaid'
      },
    }),
};

module.exports = config;
