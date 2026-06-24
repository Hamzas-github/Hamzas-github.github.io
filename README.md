# Hamza Farooq, Data Analyst Portfolio

**Live site: [hamzas-github.github.io](https://hamzas-github.github.io)**

The source for my personal portfolio, a data analyst site that introduces me and walks
through my projects as full case studies (the question, how I built it, what I found, and
links to each project's code).

## What's in it

- A homepage with a short intro and a list of selected projects.
- A case study page for each project (SQL, Python, Power BI, and one computer-vision build),
  with charts and write-ups under `docs/`.
- An About page and contact links.

## Features

- **Animated WebGL background.** The hero runs a small fragment-shader smoke effect
  (`src/pages/index.js`), rendered at half resolution and capped to ~30fps so it stays light.
- **Two-theme colour flip.** Dark mode is orange-on-black; light mode switches to the
  complementary teal-blue. The shader reads the theme colours so the background recolours too.
- **Custom cursor.** A magnetic accent dot that fades onto links and images on hover.
- **Scroll reveals.** Sections fade in as they enter the viewport (IntersectionObserver).
- Respects `prefers-reduced-motion`, and works without JavaScript or WebGL (graceful fallbacks).

## Tech

- [Docusaurus 3](https://docusaurus.io/) (React) for the site and docs.
- JavaScript and custom CSS (CSS variables for theming), with a hand-written WebGL2 shader
  for the background.
- Hosted on **GitHub Pages**, deployed automatically by GitHub Actions on every push to `main`.

## Run it locally

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # static output in ./build
```
