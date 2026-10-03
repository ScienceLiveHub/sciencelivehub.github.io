"""Generate the Get-credited diagram (before/after, wide + phone layouts) as a Zola shortcode."""
from html import escape
from pathlib import Path

from gen_diagram import BLUE, GRAY, MAGENTA, NAVY, NAVY_LIGHT, Svg, chip_rows
from gen_request import lines

OUT = Path(__file__).resolve().parent.parent / "templates" / "shortcodes" / "credit_diagram.html"
MUTED, MUTED_LINE, MUTED_BG = "#6b7280", "#d1d5db", "#f3f4f6"

TODAY_ROWS = [  # each mirrors a Science Live card: Replication, Request, Open review
    ("↻", "Replications", "a footnote, or never published"),
    ("…", "Doubts", "voiced, but never recorded"),
    ("?", "Peer review", "once, anonymous, uncredited"),
]
# (title, signer, accent)
CARDS = [
    ("Claim", "Signed by the author", NAVY_LIGHT),
    ("Replication", "Signed by the replicator", MAGENTA),
    ("Request", "Signed by the person who asked", BLUE),
]
VERDICTS = ["confirms", "qualifies", "refutes"]


def orcid_badge(s, cx, cy):
    s.add(f'<circle cx="{cx}" cy="{cy}" r="12" fill="{NAVY_LIGHT}"/>')
    s.add(f'<text x="{cx}" y="{cy + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">iD</text>')


def link_pill(s, cx, cy, text):
    w = len(text) * 16 * 0.6 + 26
    s.add(f'<rect x="{cx - w / 2}" y="{cy - 15}" width="{w}" height="30" rx="15" fill="#ffffff" stroke="{MUTED_LINE}"/>')
    s.add(f'<text x="{cx}" y="{cy + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="{NAVY}">{text}</text>')


def vertical_arrow(s, x, y_from, y_to):
    """Arrow from y_from to y_to (either direction)."""
    d = 1 if y_to > y_from else -1
    s.add(f'<path d="M{x} {y_from} L{x} {y_to - 6 * d}" stroke="{NAVY}" stroke-width="3"/>')
    s.add(f'<path d="M{x - 8} {y_to - 10 * d} L{x} {y_to} L{x + 8} {y_to - 10 * d}" fill="none" stroke="{NAVY}" '
          f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')


def today(s, x, y, w, h, centres=None):
    """centres: y of the paper card and of each row, to line them up with their Science Live counterparts."""
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{MUTED_BG}"/>')
    lines(s, x + 30, y + 42, ["TODAY"], 16, 800, MUTED, 0, 200)
    if centres is None:
        centres = [y + 116] + [y + 220 + i * 80 for i in range(len(TODAY_ROWS))]
    assert centres[-1] + 40 <= y + h, "today panel too short"
    # the paper
    py = centres[0]
    s.add(f'<rect x="{x + 30}" y="{py - 50}" width="{w - 60}" height="100" rx="12" fill="#ffffff" stroke="{MUTED_LINE}" stroke-width="2"/>')
    s.icon("doc", x + 80, py, MUTED)
    lines(s, x + 128, py - 6, ["The paper"], 23, 800, "#374151", 0, w - 170)
    lines(s, x + 128, py + 22, ["Credit goes to its authors"], 17, 400, MUTED, 0, w - 170)
    # what stays invisible
    for (glyph, title, desc), cy in zip(TODAY_ROWS, centres[1:]):
        s.add(f'<circle cx="{x + 60}" cy="{cy}" r="20" fill="#ffffff" stroke="{MUTED_LINE}" stroke-width="2"/>')
        s.add(f'<text x="{x + 60}" y="{cy + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="{MUTED}">{glyph}</text>')
        lines(s, x + 98, cy - 6, [title], 20, 800, "#374151", 0, w - 130)
        lines(s, x + 98, cy + 18, [desc], 17, 400, MUTED, 0, w - 130)


REVIEWS = ["approve", "disapprove", "comment"]


def live(s, x, y, w):
    """Draw the Science Live panel; returns its height."""
    s.parts.append("")  # panel background, filled in once the height is known
    bg = len(s.parts) - 1
    s.icon("live", x + 62, y + 50, MAGENTA)
    lines(s, x + 108, y + 58, ["ON SCIENCE LIVE"], 16, 800, MAGENTA, 0, 260)
    cx, cw = x + 30, w - 60

    def chips_height(items):
        n = len(chip_rows(items, cw - 44))
        return 88 + n * 34 + (n - 1) * 8 + 18

    heights = [96, chips_height(VERDICTS), 96]
    gap = 50
    cy = y + 100
    tops = []
    for (title, signer, accent), ch in zip(CARDS, heights):
        tops.append((cy, ch))
        s.box(cx, cy, cw, ch, "#ffffff", accent, "bar")
        lines(s, cx + 28, cy + 38, [title], 23, 800, NAVY, 0, cw - 50)
        orcid_badge(s, cx + 40, cy + 66)
        lines(s, cx + 60, cy + 72, [signer], 17, 400, GRAY, 0, cw - 80)
        if title == "Replication":
            s.chips(cx + 28, cy + 88, VERDICTS, "#fbe9f2", NAVY, cx + cw - 16)
        cy += ch + gap
    # the replication cites both the claim it tests and the request it answers
    ax = cx + cw - 70
    (c_top, c_h), (r_top, r_h), (q_top, _) = tops
    vertical_arrow(s, ax, r_top - 2, c_top + c_h + 2)
    link_pill(s, ax - 70, (c_top + c_h + r_top) / 2, "tests")
    vertical_arrow(s, ax, r_top + r_h + 2, q_top - 2)
    link_pill(s, ax - 82, (r_top + r_h + q_top) / 2, "answers")
    # open review: on any of these nanopublications
    cy -= gap - 16
    s.add(f'<line x1="{cx}" y1="{cy}" x2="{cx + cw}" y2="{cy}" stroke="{NAVY_LIGHT}" stroke-width="2" stroke-dasharray="6 6"/>')
    lines(s, cx, cy + 32, ["AND ON ANY OF THEM"], 14, 800, NAVY_LIGHT, 0, cw)
    cy += 48
    rh = chips_height(REVIEWS)
    s.box(cx, cy, cw, rh, "#ffffff", NAVY, "bar")
    lines(s, cx + 28, cy + 38, ["Open review, any time"], 23, 800, NAVY, 0, cw - 50)
    orcid_badge(s, cx + 40, cy + 66)
    lines(s, cx + 60, cy + 72, ["Signed by each reviewer"], 17, 400, GRAY, 0, cw - 80)
    s.chips(cx + 28, cy + 88, REVIEWS, "#e8ecf4", NAVY, cx + cw - 16)
    h = cy + rh + 24 - y
    s.parts[bg] = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#e3eaf1"/>'
    centres = [t + ch / 2 for t, ch in tops] + [cy + rh / 2]
    return h, centres


def wide():
    s = Svg()
    s.parts.append("")  # the "today" panel, drawn once the Science Live panel's height is known
    slot = len(s.parts) - 1
    h, centres = live(s, 560, 30, 610)
    left = Svg()
    today(left, 30, 30, 450, h, centres)
    s.parts[slot] = "\n".join(left.parts)
    mid = 30 + h / 2
    s.add(f'<path d="M494 {mid} L540 {mid}" stroke="{MAGENTA}" stroke-width="5" stroke-linecap="round"/>')
    s.add(f'<path d="M528 {mid - 14} L546 {mid} L528 {mid + 14}" fill="none" stroke="{MAGENTA}" stroke-width="5" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
    return s, h + 60


def narrow():
    s = Svg()
    W = 480
    today(s, 16, 16, W - 32, 440)
    s.add(f'<path d="M{W / 2} 470 L{W / 2} 500" stroke="{MAGENTA}" stroke-width="5" stroke-linecap="round"/>')
    s.add(f'<path d="M{W / 2 - 14} 490 L{W / 2} 506 L{W / 2 + 14} 490" fill="none" stroke="{MAGENTA}" stroke-width="5" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
    h, _ = live(s, 16, 518, W - 32)
    return s, 518 + h + 16


DESC = ("Today: a paper credits only its authors. Replications end up as a footnote or are never published, doubts "
        "are voiced but never recorded, and peer review happens once, anonymously and without credit. On Science Live, each "
        "contribution is its own signed nanopublication: the claim, signed by its author; the replication, signed by "
        "the replicator, whether it confirms, qualifies or refutes; and the request, signed by the person who asked. "
        "The replication cites both the claim it tests and the request it answers. And on any of them, open review: "
        "anyone can approve, disapprove or comment, at any time, each signed by the reviewer.")


def render(s, width, height, cls, suffix):
    return (f'<svg class="{cls}" viewBox="0 0 {width} {height}" role="img" '
            f'aria-labelledby="credit-diagram-title-{suffix} credit-diagram-desc-{suffix}" xmlns="http://www.w3.org/2000/svg">\n'
            f'<title id="credit-diagram-title-{suffix}">Who gets credit, today and on Science Live</title>\n'
            f'<desc id="credit-diagram-desc-{suffix}">{escape(DESC)}</desc>\n'
            + "\n".join(p for p in s.parts if p) + "\n</svg>")


def main():
    ws, wh = wide()
    ns, nh = narrow()
    html = ('<figure class="sl-diagram">\n'
            + render(ws, 1200, wh, "sl-diagram--wide", "wide") + "\n"
            + render(ns, 480, nh, "sl-diagram--narrow", "narrow") + "\n"
            + "<figcaption>Your name stays on your work, and so does everyone else's.</figcaption>\n</figure>\n")
    open(OUT, "w").write(html)
    print("wide", wh, "narrow", nh)


if __name__ == "__main__":
    main()
