# Science Live website

Source of [sciencelive4all.org](https://sciencelive4all.org), the public website of Science Live: an open platform for publishing scientific claims, replications and reviews as signed, FAIR nanopublications.

This repository holds the website only. The platform itself runs at [platform.sciencelive4all.org](https://platform.sciencelive4all.org).

## Who is behind Science Live

- **[LifeWatch ERIC](https://www.lifewatch.eu)**: development. Anne Fouilloux, CTO of LifeWatch ERIC, develops the Science Live platform and its open tools: FORRT Research MCP, Replication Radar and fip-mcp.
- **[VitenHub AS](https://vitenhub.no/)**: infrastructure and operations. Jean Iaquinta, CEO of VitenHub AS, manages the infrastructure behind the platform. VitenHub AS operates Science Live and delivers the paid replication services.
- **[Knowledge Pixels](https://knowledgepixels.com)**: the nanopublication infrastructure that Science Live publishes to.

Science Live was developed with support from the [Astera Institute](https://astera.org) until June 2026. With thanks to [Prophet Town](https://www.ptown.tech) for developing the platform and the Zotero plugin during that period.

## Build and preview

The site is built with [Zola](https://www.getzola.org) **0.17.2** (the version used in CI). There is no other toolchain.

```bash
zola serve   # local preview with live reload at http://127.0.0.1:1111
zola build   # writes the site to ./public
zola check   # checks links and markup
```

## Deployment

Every push to `main` runs `.github/workflows/build.yml`, which builds the site and publishes it to GitHub Pages under the custom domain `sciencelive4all.org`. A second workflow, `prewarm-stories.yml`, warms the platform's cache for the replication stories shown on the homepage every 3 hours.

## Where to edit what

| What | Where |
|---|---|
| Homepage text, navigation, team, featured stories | `[extra]` in `config.toml` |
| Content pages (tools, contribute, request a replication, for funders, privacy, terms) | `content/*.md` |
| Layout | `templates/` |
| Styles | `static/css/science-live.css` |
| Figures | `figures/gen_*.py`, run offline; they regenerate `templates/shortcodes/*.html` |

Keep text in `config.toml` or `content/`, not in templates, and use US English.

## Contributing

Open a pull request against `main`; changes are reviewed before merge.

## License

[CC BY-SA 4.0](LICENSE)
