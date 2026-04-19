# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The marketing / landing site for **sciencelive4all.org** — a static site built with **Zola 0.17.2** (note: the parent `../CLAUDE.md` incorrectly calls it Hugo) and deployed to GitHub Pages via GitHub Actions.

This site is *not* the Science Live platform itself. The platform lives at `platform.sciencelive4all.org` and is built in `../science-live-platform/`. This repo only produces the public-facing marketing pages.

## Commands

```bash
zola serve      # Local dev server with live reload (default http://127.0.0.1:1111)
zola build      # Produces ./public (the deploy artifact)
zola check      # Validate links and markup
```

No package manager, no node_modules. The only toolchain is the `zola` binary.

## Deployment

`.github/workflows/build.yml` runs on push to `main`:
1. Installs `zola@0.17.2` via `taiki-e/install-action`.
2. Runs `zola build`.
3. Publishes `./public` to the `gh-pages` branch with `peaceiris/actions-gh-pages@v4`.
4. Sets the custom domain via `cname: sciencelive4all.org` (also pinned in `CNAME`).

Do not commit the `public/` directory as a substitute for a build — CI rebuilds it.

## Repository layout

```
config.toml          # Zola config. Most landing-page copy lives here under [extra].
navigation.toml      # Legacy/unused nav file (current nav is [[extra.nav_links]] in config.toml).
content/             # Markdown pages (_index.md, privacy.md, terms.md, policies.md, etc.)
templates/           # Tera templates
  base.html          # Shared layout
  index.html         # Homepage (reads most data from [extra])
  page.html          # Generic content page
  pricing.html       # Pricing page
  thank-you.html     # Form submission landing
  macros/            # head.html, analytics.html, debug.html
  partials/          # hero-visual.html
static/              # Served verbatim at site root
  css/science-live.css
  js/scripts.js, nanopub-elements.js
  assets/img/        # sciencelive-logo.png, lifewatch-eric-logo.png
  favicon.ico
.github/workflows/build.yml
CNAME                # sciencelive4all.org
```

## Where to edit what

- **Landing-page copy** (hero, CTA, footer, features headings): `[extra]` in `config.toml`, not in templates.
- **Navigation links**: `[[extra.nav_links]]` blocks in `config.toml`.
- **Legal / static pages** (privacy, terms, policies, credits, verification): `content/*.md`.
- **Layout / structure**: `templates/`.
- **Styles**: `static/css/science-live.css` (no Sass pipeline is in use despite `compile_sass = true`).
- **Analytics**: GTM id `GTM-WSJ3ZZ29` is set in `config.toml` and wired via `templates/macros/analytics.html`.

### TOML scoping gotcha

`config.toml` has a prominent comment:

> All `[extra]` flat keys must come BEFORE any `[extra.subsection]` headers.

Respect this — adding a flat key under `[extra]` after an `[extra.foo]` table will silently attach it to the wrong table.

## Content conventions

- Pages under `content/` use Zola front matter (`+++ ... +++`), not Hugo/Jekyll YAML.
- `content/_index.md` is intentionally near-empty; the homepage is rendered from `templates/index.html` + `[extra]`.
- `generate_feed = true` produces `/rss.xml`; `feed_limit = 20`.
- Taxonomies `categories` and `tags` are declared but the current content doesn't use them.
- **Use US English consistently** (organization, color, center, analyze, license — not organisation/colour/centre/analyse/licence). The site is already uniform; do not introduce UK spellings even if a contributor/user writes them in UK English elsewhere.

## External links & cross-project references

- Platform app: `https://platform.sciencelive4all.org` (built from `../science-live-platform/`).
- GitHub org: `https://github.com/sciencelivehub`.
- Contact form target issues tracker: `https://github.com/ScienceLiveHub/sciencelivehub.github.io/issues/new`.

When changing button URLs or CTAs, update `config.toml` (`hero_*_button_url`, `cta_*_button_url`) — they are not hardcoded in templates.

## Things not to do

- Don't introduce a JS build step (webpack/vite/etc.) or npm dependencies — the site is deliberately toolchain-light.
- Don't rename `public/` to something else or commit it; the workflow expects `./public`.
- Don't change `cname:` in the workflow or the `CNAME` file without confirming DNS implications.
- Don't mix platform (`../science-live-platform/`) work into this repo — this is marketing only.
