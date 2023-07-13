module.exports = {
    title: 'Canary Checker',
    tagline: '',
    url: 'https://canarychecker.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/canary-checker.svg',
    organizationName: 'flanksource',
    projectName: 'canary-checker',
    themeConfig: {
      algolia: {
        // The application ID provided by Algolia
        appId: 'UBMLWJ0MA2',

        // Public API key: it is safe to commit it
        apiKey: '6f7d25ae5d5b3b677c1039246031e049',

        indexName: 'canarychecker',
      },
      docs: {
          sidebar: {
              hideable: true,
          }
      },
      navbar: {
        logo: {
          alt: 'Canary Checker Logo',
          src: 'img/canary-checker.svg',
        },
        items: [
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
        respectPrefersColorScheme: false,
      },
      footer: {
        style: 'light',
      },
      header: {
        hideOnScroll: true,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
      },
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        {
          docs: {
            routeBasePath: '/',
            breadcrumbs: true,
            exclude: [
                '**/_*/**',
                '**/*.test.{js,jsx,ts,tsx}',
                '**/__tests__/**',
              ],
            sidebarPath: require.resolve('./sidebars.js'),
          },
        },
      ],
    ],
  };
  