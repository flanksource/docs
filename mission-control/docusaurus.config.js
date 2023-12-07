// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config


import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mission Control',
  tagline: '',

  url: 'https://docs.flanksource.com',
  baseUrl: '/',
  organizationName: 'flanksource', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    links: {
      "authentication": '/reference/authentication'
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/flanksource/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
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
          src: 'img/mission-control-logo.svg',
        },
        items: [
          {
            to: '/',
            sidebarId: 'overview',
            // activeBasePath: '/',
            position: 'left',
            label: 'Overview',
          },
          {
            to: 'canary-checker/overview',
            label: 'Health Check',
            activeBasePath: 'canary-checker',
            position: 'left',
          },
          {
            to: 'config-db/overview',
            activeBasePath: 'config-db',
            label: 'Catalog',
            position: 'left',
          },
          {
            to: 'notifications/overview',
            activeBasePath: 'notifications',
            label: 'Notifications',
            position: 'left',
          },
          {
            to: 'topology/overview',
            activeBasePath: 'topology',
            label: 'Topology',
            position: 'left',
          },
          {
            to: 'playbooks/overview',
            activeBasePath: 'playbooks',
            label: 'Playbooks',
            position: 'left',
          },
          {
            to: 'reference/scripting',
            label: 'Reference',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Flanksource Inc.`,
      },
      prism: {
        theme: prismThemes.palenight,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
