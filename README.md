# Hamza Farooq — Data Analyst Portfolio

**🔗 Live site: [hamzas-github.github.io](https://hamzas-github.github.io)**

Source code for my personal portfolio — a static site that showcases my data
analysis work, from fraud and risk analytics to e-commerce dashboards and a
browser-based computer vision project. Each project links to a full case-study
write-up and its own code repository.

## Featured projects

| Project | Year | What it is | Tech |
| --- | --- | --- | --- |
| **Fintech Fraud & Risk Monitoring** | 2026 | Synthetic card-transaction data run through Python validation into a SQLite warehouse, with SQL risk queries, investigation queues, and fraud KPIs. | Python, pandas, SQL, SQLite, Power BI |
| **E-commerce Sales & Customer Analytics** | 2026 | ~1M rows of online-retail transactions analysed for revenue seasonality, RFM customer segmentation, and cohort retention. | Python, pandas, SQL, SQLite, Power BI |
| **Retail Sales Performance Dashboard** | 2026 | Interactive Power BI dashboard on the Superstore dataset ($2.30M sales) broken down by category, segment, region, and trend. | Power BI, DAX, Excel |
| **London Rental Market Analysis** | 2025 | End-to-end analysis of 2,838 rental listings: cleaning, a SQLite database, documented SQL queries, and a Power BI dashboard. | Python, pandas, SQL, SQLite, Power BI |
| **EyeSpeak** | 2026 | A webcam AAC board that lets someone communicate via gaze and blink detection, running entirely on-device in the browser. | WebGazer, MediaPipe, WebAssembly, Web Speech API, JavaScript |

## What the site includes

- A homepage with an intro, a "what I do" skills overview, and a selected-work grid
- A dedicated case-study page for each project
- An About page and contact links (GitHub, LinkedIn, email)
- SEO metadata, social cards, and light/dark theming out of the box
- Continuous deployment — every push to `main` rebuilds and republishes the live site

## Built with

- **[Docusaurus 3](https://docusaurus.io/)** (React) — the static-site framework
- **JavaScript & CSS** — site content, components, and styling
- **GitHub Pages + GitHub Actions** — hosting and automated build/deploy

## Running locally

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
npm run build      # static output in ./build
npm run serve      # preview the production build
```

## Repository layout

```
src/      site components, pages, and project data
docs/      project case-study write-ups
static/    images and other static assets
.github/   GitHub Actions deploy workflow
```
