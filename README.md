# Hamzas-github.github.io — Data Analyst portfolio

My personal portfolio site, built with [Docusaurus](https://docusaurus.io/) and
deployed to **GitHub Pages** at <https://Hamzas-github.github.io>.

It showcases my data-analysis work — featuring the
[London Rental Market Analysis](https://github.com/Hamzas-github/london-rental-analysis)
case study — along with an about page and a writing section.

## Edit your details in one place

Open [`docusaurus.config.js`](docusaurus.config.js) and edit the `personal` object
at the top (name, role, GitHub, **LinkedIn**, email). The whole site updates from it.

## Local development

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
```

## Build

```bash
npm run build      # static output in ./build
npm run serve      # preview the production build locally
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site
and publishes it to GitHub Pages.

> One-time setup: in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions**.
