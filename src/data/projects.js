/**
 * Single source of truth for the projects shown on the site.
 *
 * TO ADD A PROJECT:
 *   1. Add an object to the TOP of this array (newest first).
 *   2. (Optional) Write a full case study at docs/<slug>.md — it auto-appears
 *      in the Projects sidebar — and set `to: '/projects/<slug>'`.
 *   3. Commit & push. GitHub Actions rebuilds and redeploys automatically.
 *
 * Fields:
 *   title    — project name
 *   year     — shown as a small mono label
 *   summary  — one or two sentences
 *   stack    — array of tech tags
 *   to       — internal case-study link (optional)
 *   repo     — GitHub URL (optional)
 *   image    — path under static/ for a thumbnail (optional)
 */
const projects = [
  {
    title: 'E-commerce Sales & Customer Analytics',
    year: '2026',
    summary:
      'Two years of real online-retail transactions (~1M sales lines) turned into a commercial story — revenue seasonality, RFM customer segmentation, cohort retention, and a Power BI dashboard. Built around the questions a retail business actually asks.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI', 'RFM'],
    to: '/projects/ecommerce-sales-analysis',
    repo: 'https://github.com/Hamzas-github/ecommerce-sales-analysis',
    image: 'img/projects/ecommerce/01_monthly_revenue.png',
  },
  {
    title: 'London Rental Market Analysis',
    year: '2025',
    summary:
      'An end-to-end analysis of 2,838 London rental listings — data cleaning, a SQLite database, eight documented SQL queries, publication-quality charts, and a Power BI dashboard.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI'],
    to: '/projects/london-rental-analysis',
    repo: 'https://github.com/Hamzas-github/london-rental-analysis',
    image: 'img/projects/london-rental/02_most_expensive_areas.png',
  },
];

export default projects;
