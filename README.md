# secuenz-domain

The marketing site for [secuenz.com](https://secuenz.com) — Secuenz and its product, ChaosEngine.

Built with [Astro](https://astro.build), deployed to GitHub Pages via GitHub Actions.
Output is fully static and ships no external JavaScript.

## Local development

```bash
npm install
npm run dev      # dev server with hot reload at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The custom domain is set by `public/CNAME`.

**One-time GitHub setup:** in the repository's *Settings → Pages*:

1. Set **Source** to **GitHub Actions**.
2. Set the custom domain to `secuenz.com` and enable HTTPS after DNS validation succeeds.

The committed `public/CNAME` keeps the domain in the generated artifact, but the custom domain
and DNS records must also be configured outside the repository.

## Adding content

### A blog post

Create `src/content/blog/my-post.md`. The filename becomes the URL (`/blog/my-post/`).

```markdown
---
title: Post title
description: One-line summary used in listings, meta tags, and RSS.
pubDate: 2026-08-20
author: Secuenz
tags: ['reconnaissance', 'workflows']
draft: true
---

Body content in markdown.
```

Set `draft: false` to publish. Drafts are excluded from listings, the RSS feed, and the sitemap.

### An announcement

Same format, in `src/content/announcements/`. Appears at `/announcements/`.

### A changelog entry

Create `src/content/changelog/2026-08-20-thing.md` with `title` and `pubDate`.
Entries render newest-first on `/changelog/`.

### Update the extensibility model

Update `src/pages/integrations/index.astro` when the public model for catalog actions, scripts,
agents, configurations, structured outputs, or MCP changes. Do not publish named third-party
tool pages unless product positioning changes deliberately.

### A new standalone page

Create `src/pages/whatever.astro` and wrap the content in the shared layout:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Page title | Secuenz" description="Meta description.">
    <section class="page-hero">
        <div class="breadcrumb"><a href="/">Home</a> / Whatever</div>
        <h1>Heading</h1>
    </section>
    <section class="content-section">
        <div class="prose">…</div>
    </section>
</Layout>
```

## Structure

```
src/
├── components/    Nav, Footer, PostList
├── layouts/       Layout (page shell + SEO), PostLayout (blog/announcement posts)
├── pages/         one file per route; [slug].astro files generate multiple pages
├── content/       markdown for blog, announcements, changelog
├── data/          product features, workflows, use cases, and shared site constants
└── styles/        global.css — the entire theme
public/            served as-is: favicon, fonts, CNAME, robots.txt, .well-known/
```

Nav and footer links live in `src/components/Nav.astro` and `Footer.astro` — edit them once,
every page updates.

## Machine-readable / AI discoverability

The site is built to be parsed accurately by search engines and AI assistants:

| Path | What it is |
|---|---|
| `/llms.txt` | Curated index of the site ([llmstxt.org](https://llmstxt.org) format) |
| `/llms-full.txt` | Full plain-text content of every page in one file |
| `/sitemap-index.xml` | Auto-generated sitemap |
| `/rss.xml` | Blog + announcements feed |
| `/robots.txt` | Explicitly allows major AI crawlers |
| `/.well-known/security.txt` | RFC 9116 security contact |

Both `llms.txt` files are **generated from `dist/` after every build** by
`scripts/generate-llms.mjs`, so new pages appear automatically and descriptions never
drift from the pages themselves. Don't hand-edit them.

Structured data (JSON-LD) is emitted as: `Organization` + `WebSite` + `SoftwareApplication`
on the homepage, `BreadcrumbList` on every interior page (via `Breadcrumb.astro`), and
`BlogPosting` on each post (via `PostLayout.astro`).

To change AI crawler policy, edit `public/robots.txt`. Crawlers are currently **allowed** —
the goal is for ChaosEngine to be accurately described and citable in AI answers.

## Notes

- `sitemap-index.xml`, `rss.xml`, and the `llms*.txt` files are generated at build time; don't hand-edit them.
- Contact addresses live in `src/data/site.ts` — changing an inbox there updates every page.
- The copyright year in the footer is computed at build time.
- `public/.nojekyll` stops GitHub Pages from running Jekyll, which would strip `.well-known/`.
- Decorative SVG icons carry `aria-hidden="true"`; every icon sits beside a visible text label.
