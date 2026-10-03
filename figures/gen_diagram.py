"""Generate the Tools-page diagram (wide + phone layouts) as a Zola shortcode."""
import math
from html import escape
from pathlib import Path

NAVY, MAGENTA, BLUE = "#0f2547", "#be2e78", "#4a9eff"
NAVY_LIGHT, MAGENTA_LIGHT = "#2a5788", "#f0a6cb"  # Science Live tokens: primary-light, secondary-light tint
GRAY = "#4b5563"
OUT = Path(__file__).resolve().parent.parent / "templates" / "shortcodes" / "tools_diagram.html"

# (tint, accent, question colour, icon, title, description, chips, question)
LAYERS = [
    ("#e3eaf1", NAVY_LIGHT, NAVY_LIGHT, "doc", "FAIR rules", "A template for every step",
     ["FORRT chain", "Claim", "Dataset"], "What rules to follow?"),
    ("#eaf3ff", BLUE, "#2269bd", "db", "FAIR resources", "Identifiers and repositories",
     ["ORCID", "DOI", "OpenAIRE", "Zenodo", "RO-Crate"], "Which standards to use?"),
    ("#fbe9f2", MAGENTA, MAGENTA, "gear", "Deterministic guardrails", "Checks independent of the model",
     ["FORRT Research MCP", "Replication template"], "How to keep it consistent?"),
    ("#f3f4f6", NAVY, NAVY, "robot", "AI agents do the work", "Inside the guardrails, from the question",
     ["Replication Radar", "OpenAIRE MCP"], "Who does the work?"),
    ("#ffffff", NAVY, NAVY, "person", "Researchers validate", "Review what the agent produced",
     ["Verdict", "Limits", "ORCID signature"], "Who is accountable?"),
    (NAVY, MAGENTA, NAVY, "live", "Published on Science Live", "Signed and credited to you",
     ["Search", "Stories", "Cite"], "Where does it go?"),
]
LAST = len(LAYERS) - 1
AI = 3
LOGO_SRC = Path(__file__).resolve().parent / "sciencelive-logo.svg"  # copy of the platform logo


def logo_inner():
    """The official Science Live logo (platform SVG), made safe to inline twice in one HTML page:
    no <style> (its .top/.left/.right classes would leak into the site CSS), no ids, no comments."""
    import re
    src = open(LOGO_SRC).read()
    body = src[src.index(">", src.index("<svg")) + 1:src.rindex("</svg>")]
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    body = re.sub(r"<defs>.*?</defs>", "", body, flags=re.S)
    body = re.sub(r'\s+id="[^"]*"', "", body)
    colours = {"top": "#ff78c8", "left": "#be2e78", "right": "#0f2547"}
    for cls, col in colours.items():
        body = body.replace(f'class="{cls}"', f'fill="{col}"')
    body = body.replace('class="edge"', 'stroke="#000000" stroke-width="0.7" stroke-linejoin="round"')
    assert "class=" not in body and "id=" not in body
    return re.sub(r"\s*\n\s*", " ", body).strip()


LOGO = logo_inner()
CHIP_SIZE = 17
CHIP_PAD = 18  # horizontal padding inside a chip, each side


def text_width(text, size):
    # Generous estimate (bold sans-serif); chip labels are then pinned to it with textLength.
    return len(text) * size * 0.6


def chip_width(text):
    return int(text_width(text, CHIP_SIZE) + 2 * CHIP_PAD)


def chip_colours(i, tint):
    if i == LAST:
        return "#1c3a64", "#ffffff"
    return ("#e8ecf4" if tint == "#ffffff" else "#ffffff"), NAVY


class Svg:
    def __init__(self):
        self.parts = []

    def add(self, s):
        self.parts.append(s)

    def chips(self, x, y, items, fill, colour, max_x):
        x0 = x
        for t in items:
            cw = chip_width(t)
            if x + cw > max_x and x != x0:
                x, y = x0, y + 42
            assert x + cw <= max_x, f"chip {t!r} does not fit"
            self.add(f'<rect x="{x}" y="{y}" width="{cw}" height="34" rx="17" fill="{fill}"/>')
            # textLength pins the label to the chip's inner width whatever font the browser uses
            self.add(f'<text x="{x + CHIP_PAD}" y="{y + 23}" font-size="{CHIP_SIZE}" font-weight="600" fill="{colour}" '
                     f'textLength="{cw - 2 * CHIP_PAD:.0f}" lengthAdjust="spacingAndGlyphs">{escape(t)}</text>')
            x += cw + 10
        return y + 34

    def arrow(self, x, y1, y2):
        self.add(f'<path d="M{x} {y1 + 4} L{x} {y2 - 6}" stroke="{NAVY}" stroke-width="3"/>')
        self.add(f'<path d="M{x - 8} {y2 - 14} L{x} {y2 - 4} L{x + 8} {y2 - 14}" fill="none" stroke="{NAVY}" '
                 f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')

    def icon(self, kind, cx, cy, c):
        a = self.add
        if kind == "doc":
            a(f'<path d="M{cx - 20} {cy - 28} h28 l14 14 v42 h-42 z" fill="#fff" stroke="{c}" stroke-width="3.5" stroke-linejoin="round"/>')
            for dy in (-6, 4, 14):
                a(f'<line x1="{cx - 11}" y1="{cy + dy}" x2="{cx + 12}" y2="{cy + dy}" stroke="{c}" stroke-width="3" stroke-linecap="round"/>')
        elif kind == "db":
            a(f'<path d="M{cx - 24} {cy - 20} v40 a24 9 0 0 0 48 0 v-40" fill="#fff" stroke="{c}" stroke-width="3.5"/>')
            a(f'<ellipse cx="{cx}" cy="{cy - 20}" rx="24" ry="9" fill="#fff" stroke="{c}" stroke-width="3.5"/>')
            a(f'<path d="M{cx - 24} {cy} a24 9 0 0 0 48 0" fill="none" stroke="{c}" stroke-width="3"/>')
        elif kind == "gear":
            pts = []
            for i in range(16):
                r = 28 if i % 2 == 0 else 21
                ang = math.pi * 2 * i / 16 - math.pi / 16
                pts.append(f"{cx + r * math.cos(ang):.1f},{cy + r * math.sin(ang):.1f}")
            a(f'<polygon points="{" ".join(pts)}" fill="#fff" stroke="{c}" stroke-width="3.5" stroke-linejoin="round"/>')
            a(f'<circle cx="{cx}" cy="{cy}" r="9" fill="none" stroke="{c}" stroke-width="3.5"/>')
        elif kind == "robot":
            a(f'<line x1="{cx}" y1="{cy - 30}" x2="{cx}" y2="{cy - 20}" stroke="{c}" stroke-width="3.5"/>')
            a(f'<circle cx="{cx}" cy="{cy - 32}" r="5" fill="{MAGENTA}"/>')
            a(f'<rect x="{cx - 26}" y="{cy - 20}" width="52" height="40" rx="10" fill="#fff" stroke="{c}" stroke-width="3.5"/>')
            a(f'<circle cx="{cx - 10}" cy="{cy}" r="5" fill="{c}"/><circle cx="{cx + 10}" cy="{cy}" r="5" fill="{c}"/>')
        elif kind == "person":
            a(f'<circle cx="{cx}" cy="{cy - 12}" r="12" fill="#fff" stroke="{c}" stroke-width="3.5"/>')
            a(f'<path d="M{cx - 24} {cy + 26} a24 20 0 0 1 48 0 z" fill="#fff" stroke="{c}" stroke-width="3.5" stroke-linejoin="round"/>')
        elif kind == "search":
            a(f'<circle cx="{cx - 4}" cy="{cy - 4}" r="16" fill="#fff" stroke="{c}" stroke-width="3.5"/>')
            a(f'<line x1="{cx + 8}" y1="{cy + 8}" x2="{cx + 20}" y2="{cy + 20}" stroke="{c}" stroke-width="4" stroke-linecap="round"/>')
        elif kind == "live":  # the Science Live logo on a white tile
            a(f'<rect x="{cx - 32}" y="{cy - 32}" width="64" height="64" rx="14" fill="#ffffff"/>')
            a(f'<svg x="{cx - 28}" y="{cy - 28}" width="56" height="56" viewBox="0 0 96 96">{LOGO}</svg>')

    def box(self, x, y, w, h, tint, accent, style):
        if style == "bordered":
            self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{tint}" stroke="{accent}" stroke-width="2.5"/>')
        else:
            self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{tint}"/>')
            self.add(f'<rect x="{x}" y="{y}" width="8" height="{h}" rx="4" fill="{accent}"/>')


def chip_rows(chips, col_w):
    rows, row = [], []
    for t in chips:
        if row and sum(chip_width(c) + 10 for c in row) + chip_width(t) > col_w:
            rows.append(row)
            row = []
        row.append(t)
    if row:
        rows.append(row)
    return rows


def wide():
    s = Svg()
    y = 40
    entry = last = None
    for i, (tint, accent, qc, icon, title, desc, chips, q) in enumerate(LAYERS):
        stacked = i in (AI, AI + 1)  # narrow boxes: chips under the text
        x, w = (330, 570) if stacked else (60, 840)
        col_w = 300
        cs, ce = x + w - 24 - col_w, x + w - 24
        rows = chip_rows(chips, col_w)
        chips_h = len(rows) * 34 + (len(rows) - 1) * 8
        h = 140 if stacked else max(112, chips_h + 40)
        title_col = "#ffffff" if i == LAST else NAVY
        desc_col = MAGENTA_LIGHT if i == LAST else GRAY
        fill, colour = chip_colours(i, tint)
        if not stacked:
            text_end = x + 122 + max(text_width(title, 27), text_width(desc, 19)) * 0.9
            assert text_end < cs - 16, f"text of {title!r} runs into the chips"
        if i == AI:  # the question or request feeds the agents
            entry = (y, h)
            s.add(f'<rect x="60" y="{y}" width="230" height="{h}" rx="16" fill="#eef2f7"/>')
            s.icon("search", 100, y + h / 2, NAVY)
            for j, line in enumerate(["Research", "question or", "replication", "request"]):
                s.add(f'<text x="134" y="{y + h / 2 - 28 + j * 23}" font-size="19" font-weight="800" fill="{NAVY}">{line}</text>')
            s.add(f'<path d="M298 {y + h / 2} L320 {y + h / 2}" stroke="{NAVY}" stroke-width="3"/>')
            s.add(f'<path d="M314 {y + h / 2 - 8} L324 {y + h / 2} L314 {y + h / 2 + 8}" fill="none" stroke="{NAVY}" '
                  f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
        s.box(x, y, w, h, tint, accent, "bordered" if i == AI + 1 else "bar")
        s.icon(icon, x + 62, y + h / 2, accent)
        if stacked:
            s.add(f'<text x="{x + 122}" y="{y + 44}" font-size="27" font-weight="800" fill="{title_col}">{escape(title)}</text>')
            s.add(f'<text x="{x + 122}" y="{y + 74}" font-size="19" fill="{desc_col}">{escape(desc)}</text>')
            s.chips(x + 122, y + h - 50, chips, fill, colour, x + w - 20)
        else:
            s.add(f'<text x="{x + 122}" y="{y + h / 2 - 4}" font-size="27" font-weight="800" fill="{title_col}">{escape(title)}</text>')
            s.add(f'<text x="{x + 122}" y="{y + h / 2 + 26}" font-size="19" font-weight="{700 if i == LAST else 400}" fill="{desc_col}">{escape(desc)}</text>')
            cy = y + (h - chips_h) / 2
            for r in rows:
                s.chips(cs, cy, r, fill, colour, ce)
                cy += 42
        s.add(f'<line x1="934" y1="{y + 16}" x2="934" y2="{y + h - 16}" stroke="{qc}" stroke-width="3"/>')
        words = q.split()
        mid = math.ceil(len(words) / 2)
        for j, line in enumerate([" ".join(words[:mid]), " ".join(words[mid:])]):
            s.add(f'<text x="952" y="{y + h / 2 - 6 + j * 28}" font-size="21" font-weight="700" fill="{qc}">{escape(line)}</text>')
        if i == LAST:
            last = (y, h)
        y += h
        if i < LAST:
            s.arrow(480 if i < 2 else 615, y, y + 30)
            y += 30
    # loop: published records feed new questions and replication requests
    ly, lh = last
    ey, eh = entry
    y1, y2 = ly + lh / 2, ey + eh / 2
    s.add(f'<path d="M58 {y1} L40 {y1} Q26 {y1} 26 {y1 - 14} L26 {y2 + 14} Q26 {y2} 40 {y2} L50 {y2}" fill="none" '
          f'stroke="{MAGENTA}" stroke-width="3" stroke-dasharray="8 6"/>')
    s.add(f'<path d="M46 {y2 - 7} L56 {y2} L46 {y2 + 7}" fill="none" stroke="{MAGENTA}" stroke-width="3" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
    s.add(f'<rect x="72" y="{(y1 + y2) / 2 - 36}" width="236" height="72" rx="12" fill="#fbe9f2"/>')
    s.add(f'<text x="190" y="{(y1 + y2) / 2 - 8}" text-anchor="middle" font-size="17" font-weight="700" fill="{MAGENTA}">feeds new questions</text>')
    s.add(f'<text x="190" y="{(y1 + y2) / 2 + 18}" text-anchor="middle" font-size="17" font-weight="700" fill="{MAGENTA}">and replication requests</text>')
    return s, y + 40


def narrow():
    s = Svg()
    W = 480
    y = 20
    for i, (tint, accent, qc, icon, title, desc, chips, q) in enumerate(LAYERS):
        if i == AI:
            s.add(f'<rect x="16" y="{y}" width="{W - 32}" height="56" rx="28" fill="#eef2f7"/>')
            s.icon("search", 54, y + 28, NAVY)
            s.add(f'<text x="86" y="{y + 35}" font-size="18" font-weight="800" fill="{NAVY}">Question or replication request</text>')
            y += 56
            s.arrow(W / 2, y, y + 28)
            y += 28
        top = y
        py = y + 34
        s.parts.append("")  # the box goes here once its height is known
        idx = len(s.parts) - 1
        label_col = MAGENTA_LIGHT if i == LAST else qc
        s.add(f'<text x="40" y="{py}" font-size="15" font-weight="800" letter-spacing="1.2" fill="{label_col}">{escape(q.upper())}</text>')
        s.icon(icon, 66, py + 52, accent)
        s.add(f'<text x="112" y="{py + 46}" font-size="24" font-weight="800" fill="{"#ffffff" if i == LAST else NAVY}">{escape(title)}</text>')
        s.add(f'<text x="112" y="{py + 74}" font-size="16" fill="{MAGENTA_LIGHT if i == LAST else GRAY}">{escape(desc)}</text>')
        fill, colour = chip_colours(i, tint)
        bottom = s.chips(40, py + 100, chips, fill, colour, W - 36) + 6
        h = bottom - top + 18
        box = Svg()
        box.box(16, top, W - 32, h, tint, accent, "bordered" if i == AI + 1 else "bar")
        s.parts[idx] = "\n".join(box.parts)
        y = top + h
        if i < LAST:
            s.arrow(W / 2, y, y + 28)
            y += 28
    s.add(f'<text x="{W / 2}" y="{y + 34}" text-anchor="middle" font-size="17" font-weight="700" fill="{MAGENTA}">'
          f'↺ feeds new questions and replication requests</text>')
    return s, y + 56


DESC = ("How the Science Live tools fit together, layer by layer. FAIR rules: a nanopublication template for every "
        "step (FORRT chain, claim, dataset). FAIR resources: ORCID, DOI, OpenAIRE, Zenodo, RO-Crate. Deterministic "
        "guardrails that do not depend on the model: the FORRT Research MCP and the replication template. AI agents "
        "do the work inside the guardrails, starting from a research question or a replication request, using "
        "Replication Radar and the OpenAIRE MCP. Researchers validate: they decide the verdict and its limits and "
        "sign with their ORCID. The result is published on Science Live, signed and credited to them, where people "
        "can search it, read it as a story and cite it. Published results feed new questions and replication requests.")


def render(s, width, height, cls, suffix):
    return (f'<svg class="{cls}" viewBox="0 0 {width} {height}" role="img" '
            f'aria-labelledby="tools-diagram-title-{suffix} tools-diagram-desc-{suffix}" xmlns="http://www.w3.org/2000/svg">\n'
            f'<title id="tools-diagram-title-{suffix}">From FAIR rules to trusted, credited research on Science Live</title>\n'
            f'<desc id="tools-diagram-desc-{suffix}">{escape(DESC)}</desc>\n'
            + "\n".join(p for p in s.parts if p) + "\n</svg>")


def main():
    ws, wh = wide()
    ns, nh = narrow()
    html = ('<figure class="sl-diagram">\n'
            + render(ws, 1200, wh, "sl-diagram--wide", "wide") + "\n"
            + render(ns, 480, nh, "sl-diagram--narrow", "narrow") + "\n"
            + '<figcaption>The rules, resources and checks are fixed. The AI agent works inside them, a researcher signs '
              'off on the science, and the result is published on Science Live, credited to them, where it feeds new '
              'questions and replication requests.</figcaption>\n</figure>\n')
    open(OUT, "w").write(html)
    print("wide", wh, "narrow", nh)


if __name__ == "__main__":
    main()
