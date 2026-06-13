# Artem Sakhniuk — Portfolio

Personal landing page and CV website, built with **Astro 5**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack

- **Astro 5** — Static site generation
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Three.js** — 3D interactive background
- **Lucide Icons** — SVG icon system
- **Puter.js** — AI chat integration

## Project Structure

```
src/
├── components/    # Astro components (Header, Hero, Skills, etc.)
├── data/          # Structured data from CV (profile, skills, timeline)
├── layouts/       # BaseLayout (SEO, theme, fonts)
├── pages/         # index.astro
└── styles/        # global.css (Tailwind v4)
public/            # Static assets (PDF, images, PWA files)
```

## Development

```bash
nvm use
npm run dev      # Start dev server with HMR
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Deployment

Push to `main` — the GitHub Actions workflow at `.github/workflows/deploy.yml` automatically builds and deploys to GitHub Pages.

## Live Site

https://nanograf31415926535.github.io/artem-sakhniuk.github.io/
