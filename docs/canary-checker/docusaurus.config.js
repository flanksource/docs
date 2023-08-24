const sectionPrefix = require('./src/remark/plugin.js');
const inlineSVG = require("@jsdevtools/rehype-inline-svg");
module.exports = {
  title: 'Canary Checker',
  tagline: '',
  url: 'https://canarychecker.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  customFields: {
    oss: process.env.CANARY_CHECKER_OSS === 'true',
  },
  favicon: 'img/canary-checker-icon.svg',
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
        srcDark: 'img/canary-checker-white.svg',
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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          // remarkPlugins: [sectionPrefix],
          // rehypePlugins: [[inlineSVG, { maxImageSize: 5000 }]],
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
