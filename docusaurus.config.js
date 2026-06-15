// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// ---------------------------------------------------------------------------
// Single source of truth for personal details. Edit these and the whole site
// (navbar, footer, homepage, meta tags) updates.
// ---------------------------------------------------------------------------
const personal = {
  name: 'Muhammad Hamza Farooq',
  shortName: 'Hamza Farooq',
  role: 'Data Analyst',
  github: 'https://github.com/Hamzas-github',
  linkedin: 'https://www.linkedin.com/in/hamza-farooq-tech-savvy/',
  email: 'hamzaf14@gmail.com',
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${personal.shortName} · ${personal.role}`,
  tagline: 'Turning raw data into decisions — SQL, Python, and clear visual storytelling.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production URL for a GitHub user page (https://<user>.github.io)
  url: 'https://Hamzas-github.github.io',
  baseUrl: '/',

  organizationName: 'Hamzas-github', // GitHub user/org
  projectName: 'Hamzas-github.github.io', // repo name
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Classical type system: Cinzel (inscriptional Roman capitals) for display,
  // EB Garamond (a book serif) for body — the "encyclopedia" voice.
  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cinzel+Decorative:wght@700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',
  ],

  // Make personal details available in client components via siteConfig.customFields
  customFields: {
    personal,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'projects',
        },
        blog: {
          blogTitle: 'Writing',
          blogDescription: 'Notes and walkthroughs on data analysis.',
          showReadingTime: true,
          routeBasePath: 'writing',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
      image: 'img/social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'data analyst, data analysis, SQL, Python, pandas, Power BI, data visualization, portfolio'},
        {name: 'author', content: personal.name},
      ],
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: personal.shortName,
        items: [
          {to: '/projects/overview', label: 'Projects', position: 'left'},
          {to: '/writing', label: 'Writing', position: 'left'},
          {to: '/about', label: 'About', position: 'left'},
          {
            href: personal.github,
            label: 'GitHub',
            position: 'right',
          },
          {
            href: personal.linkedin,
            label: 'LinkedIn',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Explore',
            items: [
              {label: 'Projects', to: '/projects/overview'},
              {label: 'Writing', to: '/writing'},
              {label: 'About', to: '/about'},
            ],
          },
          {
            title: 'Connect',
            items: [
              {label: 'GitHub', href: personal.github},
              {label: 'LinkedIn', href: personal.linkedin},
              {label: 'Email', href: `mailto:${personal.email}`},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} ${personal.name}. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['sql', 'python', 'bash'],
      },
    }),
};

export default config;
