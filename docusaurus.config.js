// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// ---------------------------------------------------------------------------
// Single source of truth for personal details. Edit these and the whole site
// (navbar, footer, homepage, meta tags) updates.
// ---------------------------------------------------------------------------
const personal = {
  name: 'Hamza Farooq',
  fullName: 'Muhammad Hamza Farooq',
  role: 'Data Analyst',
  availability: 'Open to data analyst roles',
  location: 'United Kingdom',
  github: 'https://github.com/Hamzas-github',
  linkedin: 'https://www.linkedin.com/in/hamza-farooq-tech-savvy/',
  email: 'hamzaf14@gmail.com',
  // Profile photo: drop an image at static/img/<file> and set the path here
  // (e.g. 'img/hamza.jpg'). While null, a clean monogram placeholder is shown.
  photo: 'img/hamza.jpg',
};

const description =
  'Hamza Farooq is a Data Analyst specializing in SQL, Python, and data ' +
  'visualization — turning raw data into clear, decision-ready insights, ' +
  'reports, and dashboards.';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${personal.name} — Data Analyst`,
  tagline: 'SQL · Python · Power BI · Data visualization',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://Hamzas-github.github.io',
  baseUrl: '/',

  organizationName: 'Hamzas-github',
  projectName: 'Hamzas-github.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Type system: Bricolage Grotesque (editorial display), Inter (body),
  // JetBrains Mono (technical labels / metrics).
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
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
  ],

  customFields: {
    personal,
    // Chatbot proxy URL (the deployed Cloudflare Worker in chat-worker/).
    // While null, the chat widget is hidden. Set to your workers.dev URL to enable.
    chatEndpoint: 'https://hamza-chat-worker.hamzas-dev.workers.dev',
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
        blog: false,
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
        {name: 'description', content: description},
        {
          name: 'keywords',
          content:
            'Hamza Farooq, data analyst, data analysis, data scientist, SQL, ' +
            'Python, pandas, Power BI, data visualization, business intelligence, ' +
            'analytics, dashboards, portfolio',
        },
        {name: 'author', content: personal.fullName},
        {property: 'og:type', content: 'profile'},
      ],
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: personal.name,
        hideOnScroll: true,
        items: [
          {to: '/#work', label: 'Projects', position: 'left'},
          {to: '/about', label: 'About', position: 'left'},
          {href: personal.github, label: 'GitHub', position: 'right'},
          {href: personal.linkedin, label: 'LinkedIn', position: 'right'},
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Explore',
            items: [
              {label: 'Projects', to: '/#work'},
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
        copyright: `© ${new Date().getFullYear()} ${personal.fullName}`,
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['sql', 'python', 'bash'],
      },
    }),
};

export default config;
