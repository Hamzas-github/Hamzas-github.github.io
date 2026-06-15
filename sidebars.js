// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  projectsSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Case studies',
      collapsed: false,
      items: ['london-rental-analysis'],
    },
  ],
};

export default sidebars;
