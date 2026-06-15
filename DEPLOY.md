# Deploying this portfolio to GitHub Pages

The site is built and committed locally. Three steps put it live at
**https://hamzas-github.github.io**.

## 1. Create the repo (≈30 seconds)

Go to <https://github.com/new> and create a repo named **exactly**:

```
Hamzas-github.github.io
```

- Visibility: **Public**
- Do **NOT** add a README, .gitignore, or license (this folder already has them)

> The `<username>.github.io` name is special — GitHub serves it as your personal site.

## 2. Push this folder

From inside the `portfolio` folder:

```bash
git remote add origin https://github.com/Hamzas-github/Hamzas-github.github.io.git
git push -u origin main
```

The first push opens a browser to sign in to GitHub — that's expected (it refreshes
your saved credential).

## 3. Turn on Pages

In the new repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

That's it. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
every push to `main`. Watch progress under the repo's **Actions** tab; the site is live
a minute or two after the workflow turns green.

## Before you push — update your details

Open `docusaurus.config.js` and edit the `personal` object at the top:

- `linkedin` — currently a placeholder (`/in/your-linkedin/`)
- `email` — confirm it's the address you want recruiters to use

The whole site (navbar, footer, homepage, about) updates from those values.
