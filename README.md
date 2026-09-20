# CORK — Site PoC

Proof of concept for the CORK public site, built with [Astro](https://astro.build).

## Why this structure

- **Layout lives in a few files**, built once: `src/layouts/BaseLayout.astro`,
  `src/components/Header.astro`, `Footer.astro`, `NewsCard.astro`,
  `ResultsTable.astro`, `EventItem.astro`. All colors/spacing/fonts are
  tokens in `src/styles/global.css` — change the look there, once.
- **Content is separate from layout.** News posts are Markdown files in
  `src/content/news/`. Athlete results are JSON files in
  `src/content/results/`. Adding a news post or a result is adding a file —
  no HTML/CSS touched, and no rebuild-by-hand needed (the site regenerates
  the news list and results table automatically from whatever files exist).
- **Pages** (`src/pages/*.astro`) assemble layout + components + content for
  each section: home, news, calendar, results, minutes & budgets
  (`atas-orcamentos`), board (`direcao`), history, contacts, and the
  suggestions/complaints forms.

## Running locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # serve the built ./dist locally
```

## Deploying to GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<your-org>.github.io` and
   `base` to `/<repo-name>` (already set to placeholders — update them).
2. Push to GitHub. In the repo's **Settings → Pages**, set the source to
   **GitHub Actions**.
3. `.github/workflows/deploy.yml` is already included — it builds and
   deploys automatically on every push to `main`.

## What's still a placeholder / needs a decision

- **Newsletter signup** (`src/pages/index.astro`, `#newsletter` section):
  the form currently submits nowhere. GitHub Pages has no backend, so this
  needs an embedded provider (Buttondown, Mailchimp, Brevo) — swap the
  `<form>` for their embed snippet.
- **Suggestions / complaints forms** (`sugestoes.astro`, `reclamacoes.astro`):
  same issue — point `action` at a form backend (Formspree, or native form
  handling if you move hosting to Netlify/Cloudflare Pages).
- **Calendar** (`calendario.astro`): currently a hardcoded list. Options:
  move to a content collection like news/results, or embed a public Google
  Calendar if the club already schedules there.
- **Minutes & budgets** (`atas-orcamentos.astro`): document links are
  placeholders (`href="#"`). Real PDFs would live in `public/documentos/`
  or an external drive, linked per entry.
- **Board members photos, club history dates, contact details**: all
  placeholder content — search for `[ano]`, `[texto`, and the sample names
  to replace.

## Content-editing without touching code

For non-technical board members to post news or edit content without
opening a code editor, add [Decap CMS](https://decapcms.org) (free,
git-based) on top of this — it provides a web form that commits directly to
these same content files. Ask if you want this wired in.
