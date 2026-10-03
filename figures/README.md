# Science Live website figures

Authoring scripts for the five SVG figures on sciencelive4all.org. They are NOT part of the
site build: the site is built by Zola only (Zola ignores this folder), from the generated
files committed in `templates/shortcodes/`:

| Script | Writes | Page |
|---|---|---|
| gen_diagram.py | tools_diagram.html | /tools/ |
| gen_request.py | request_diagram.html | /request-a-replication/ |
| gen_credit.py | credit_diagram.html | /contribute/ |
| gen_constellation.py | constellation_diagram.html | /contribute/ and the homepage |
| gen_foundations.py | foundations_diagram.html | /for-funders/ |

To change a figure: edit the script, run it from this folder with `python3 gen_<name>.py`
(plain Python 3, no dependencies), then commit both the script and the regenerated
shortcode. The scripts refuse to write a figure if any text or chip would overflow its box.

`gen_diagram.py` holds the shared drawing helpers (boxes, chips, icons, palette); the other
scripts import from it and from `gen_request.py`. `sciencelive-logo.svg` is a copy of the
platform logo (`science-live-platform/frontend/public/sciencelive-logo.svg`); refresh it if
the logo changes.

Palette: navy #0f2547, magenta #be2e78, accent blue #4a9eff (no green).
