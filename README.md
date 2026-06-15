# Hamzas-github.github.io — Data Analyst portfolio

My portfolio site, built with [Docusaurus](https://docusaurus.io/) and deployed to
**GitHub Pages** at <https://hamzas-github.github.io>.

## Edit your details in one place

Open [`docusaurus.config.js`](docusaurus.config.js) and edit the `personal` object
at the top — name, role, availability, location, GitHub, LinkedIn, email, and photo.
The whole site updates from it.

## Adding a project (it auto-publishes)

1. Open [`src/data/projects.js`](src/data/projects.js) and add an object to the **top**
   of the array (newest first): title, year, summary, stack, optional `repo`, `to`,
   and `image`.
2. *(Optional, recommended)* Write a full write-up at `docs/<slug>.md`. It appears in
   the Projects sidebar automatically, and you can link to it with `to: '/projects/<slug>'`.
3. Commit and push to `main`.

That's it — the GitHub Actions workflow rebuilds and redeploys the live site on every
push, so a new project shows up on its own. No manual deploy step.

## Adding your photo later

Drop an image in `static/img/` (e.g. `static/img/hamza.jpg`) and set
`photo: 'img/hamza.jpg'` in the `personal` object. The homepage swaps the monogram
placeholder for your photo automatically. Until then, the placeholder shows your initials.

## Local development

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
npm run build      # static output in ./build
npm run serve      # preview the production build locally
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages. One-time setup (already done):
repo **Settings → Pages → Source → GitHub Actions**.
