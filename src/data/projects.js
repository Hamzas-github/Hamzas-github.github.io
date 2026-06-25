/**
 * Single source of truth for the projects shown on the site.
 *
 * TO ADD A PROJECT:
 * 1. Add an object to the TOP of this array (newest first).
 * 2. (Optional) Write a full case study at docs/<slug>.md, it auto-appears
 * in the Projects sidebar, and set `to: '/projects/<slug>'`.
 * 3. Commit & push. GitHub Actions rebuilds and redeploys automatically.
 *
 * Fields:
 * title, project name
 * year, shown as a small mono label
 * summary, one or two sentences
 * stack, array of tech tags
 * to, internal case-study link (optional)
 * repo, GitHub URL (optional)
 * image, path under static/ for a thumbnail (optional)
 */
const projects = [
  {
    title: 'AI Portfolio Chatbot',
    year: '2026',
    summary:
      'A floating chat on this site that answers questions about me in the first person, and reads each answer aloud in a clone of my own voice. A framework-free widget backed by a Cloudflare Worker that keeps the API keys server-side and proxies to Groq and ElevenLabs, finished with an iOS-style liquid-glass panel.',
    stack: ['JavaScript', 'Cloudflare Workers', 'Groq LLM', 'ElevenLabs', 'Liquid glass UI'],
    to: '/projects/ai-chatbot',
    repo: 'https://github.com/Hamzas-github/ai-portfolio-chatbot',
    image: 'img/projects/ai-chatbot/cover.svg',
  },
  {
    title: 'Fintech Fraud & Risk Monitoring',
    year: '2026',
    summary:
      'A London-fintech-style fraud analytics project: synthetic card transactions, Python validation, SQLite warehouse, SQL risk queries, investigation queues, and dashboard-ready fraud KPIs.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Risk Analytics', 'Power BI-ready'],
    to: '/projects/fintech-fraud-risk-monitoring',
    repo: 'https://github.com/Hamzas-github/fintech-fraud-risk-monitoring',
    image: 'img/projects/fintech-fraud/fraud_rate_by_category.png',
  },
  {
    title: 'E-commerce Sales & Customer Analytics',
    year: '2026',
    summary:
      'Two years of real online-retail transactions (~1M sales lines) turned into a commercial story, revenue seasonality, RFM customer segmentation, cohort retention, and a Power BI dashboard. Built around the questions a retail business actually asks.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI', 'RFM'],
    to: '/projects/ecommerce-sales-analysis',
    repo: 'https://github.com/Hamzas-github/ecommerce-sales-analysis',
    image: 'img/projects/ecommerce/01_monthly_revenue.png',
  },
  {
    title: 'Retail Sales Performance Dashboard',
    year: '2026',
    summary:
      'An interactive Power BI dashboard on the Superstore dataset: $2.30M of sales broken down by category, sub-category profitability, customer segment, region and monthly trend, with slicers so a manager can answer their own questions.',
    stack: ['Power BI', 'DAX', 'Excel', 'Data viz'],
    to: '/projects/retail-sales-dashboard',
    repo: 'https://github.com/Hamzas-github/retail-sales-dashboard-powerbi',
    image: 'img/projects/retail-powerbi/dashboard-overview.png',
  },
  {
    title: 'London Rental Market Analysis',
    year: '2025',
    summary:
      'An end-to-end analysis of 2,838 London rental listings, data cleaning, a SQLite database, eight documented SQL queries, publication-quality charts, and a Power BI dashboard.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI'],
    to: '/projects/london-rental-analysis',
    repo: 'https://github.com/Hamzas-github/london-rental-analysis',
    image: 'img/projects/london-rental/02_most_expensive_areas.png',
  },
  {
    title: 'EyeSpeak, eye-tracking communication board',
    year: '2026',
    summary:
      'A webcam AAC board that lets someone talk by looking at a card and blinking, real-time gaze tracking and blink detection running entirely on-device in the browser. Built with WebGazer and MediaPipe. A different muscle from my analytics work.',
    stack: ['Computer vision', 'MediaPipe', 'WebAssembly', 'Web Speech API', 'JavaScript'],
    to: '/projects/eyespeak',
    repo: 'https://github.com/Hamzas-github/eyespeak',
    image: 'img/projects/eyespeak/cover.png',
  },
];

export default projects;
