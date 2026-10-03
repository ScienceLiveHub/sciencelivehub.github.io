"""Generate the constellation diagram (evidence evolves over time) as a Zola shortcode."""
from html import escape
from pathlib import Path

from gen_diagram import BLUE, GRAY, MAGENTA, MAGENTA_LIGHT, NAVY, NAVY_LIGHT, Svg
from gen_request import lines

OUT = Path(__file__).resolve().parent.parent / "templates" / "shortcodes" / "constellation_diagram.html"

# Real case: Soroye et al. 2020, Science, doi:10.1126/science.aax8591. Verdicts from the nanopub network
# (replication_status), dates from the Zenodo records 19756174, 20113778, 20113787.
# (when, title, verdict chip, chip fill, note lines, open?)
STEPS = [
    ("Apr 2026", "Replication", "confirms", "#fbe9f2", ["Iberian bumble", "bees, new data"], False),
    ("May 2026", "Replication", "confirms", "#fbe9f2", ["Extended to", "projections"], False),
    ("May 2026", "Replication", "qualifies", "#fbe9f2", ["Rankings depend", "on grid size"], False),
    ("Next", "Your turn", "open", "#e3eaf1", ["Another region", "or method?"], True),
]


def year_pill(s, x, y, text):
    w = len(text) * 15 * 0.62 + 24
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="28" rx="14" fill="{NAVY_LIGHT}"/>')
    s.add(f'<text x="{x + w / 2}" y="{y + 19}" text-anchor="middle" font-size="15" font-weight="800" fill="#ffffff">{text}</text>')


def down_arrow(s, x, y1, y2, colour=NAVY, dashed=False):
    dash = ' stroke-dasharray="7 6"' if dashed else ""
    s.add(f'<path d="M{x} {y1} L{x} {y2 - 6}" stroke="{colour}" stroke-width="3"{dash}/>')
    s.add(f'<path d="M{x - 8} {y2 - 12} L{x} {y2} L{x + 8} {y2 - 12}" fill="none" stroke="{colour}" '
          f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')


def step_card(s, x, y, w, h, step):
    when, title, verdict, fill, notes, is_open = step
    if is_open:
        s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#ffffff" stroke="{BLUE}" '
              f'stroke-width="2.5" stroke-dasharray="8 6"/>')
    else:
        s.box(x, y, w, h, "#ffffff", MAGENTA, "bar")
    year_pill(s, x + 24, y + 18, when)
    lines(s, x + 24, y + 80, [title], 22, 800, NAVY, 0, w - 40)
    s.chips(x + 24, y + 94, [verdict], fill, NAVY, x + w - 16)
    note_top = y + h - 18 - 20 * (len(notes) - 1)
    assert note_top - 15 >= y + 94 + 34 + 6, "notes overlap the verdict chip"
    lines(s, x + 24, note_top, notes, 15, 400, GRAY, 20, w - 40)


def question(s, x, y, w, h):
    s.box(x, y, w, h, "#e3eaf1", NAVY_LIGHT, "bar")
    lines(s, x + 26, y + 34, ["RESEARCH QUESTION"], 13, 800, NAVY_LIGHT, 0, w - 40)
    lines(s, x + 26, y + 64, ["Does extreme heat", "drive bumble bee", "declines?"], 19, 800, NAVY, 24, w - 40)


def state_bar(s, x, y, w, h, compact=False):
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{NAVY}"/>')
    s.add(f'<rect x="{x}" y="{y}" width="8" height="{h}" rx="4" fill="{MAGENTA}"/>')
    s.icon("live", x + 58, y + h / 2, MAGENTA)
    if compact:
        lines(s, x + 106, y + 38, ["State of the evidence"], 19, 800, "#ffffff", 0, w - 120)
        lines(s, x + 106, y + 64, ["today: validated, with"], 19, 800, "#ffffff", 0, w - 120)
        lines(s, x + 106, y + 90, ["one qualification"], 19, 800, "#ffffff", 0, w - 120)
        lines(s, x + 106, y + 116, ["Every step signed and dated,"], 15, 700, MAGENTA_LIGHT, 0, w - 120)
        lines(s, x + 106, y + 136, ["traceable back to the question"], 15, 700, MAGENTA_LIGHT, 0, w - 120)
    else:
        lines(s, x + 106, y + h / 2 - 4, ["State of the evidence today: validated, with one qualification"], 24, 800, "#ffffff", 0, w - 130)
        lines(s, x + 106, y + h / 2 + 24, ["Every step signed and dated, traceable back to the question"],
              17, 700, MAGENTA_LIGHT, 0, w - 130)


def claim_label(s, x, y):
    lines(s, x, y, ["Claim"], 22, 800, NAVY, 0, 220)
    lines(s, x, y + 24, ["Soroye et al. 2020, Science"], 14, 700, NAVY_LIGHT, 0, 220)
    lines(s, x, y + 44, ["Heat raises local extinction"], 14, 400, GRAY, 0, 220)


def wide():
    s = Svg()
    # row 1: the question, then replications arriving over time
    question(s, 40, 30, 250, 190)
    cw, gap, x0 = 202, 12, 316
    xs = [x0 + i * (cw + gap) for i in range(len(STEPS))]
    for x, step in zip(xs, STEPS):
        step_card(s, x, 30, cw, 190, step)
    # row 2: the claim as a timeline bar
    cy, ch = 280, 96
    s.box(40, cy, 1120, ch, "#ffffff", NAVY, "bar")
    s.add(f'<rect x="40" y="{cy}" width="1120" height="{ch}" rx="16" fill="none" stroke="#d1d5db" stroke-width="2"/>')
    claim_label(s, 68, cy + 34)
    s.add(f'<line x1="300" y1="{cy + ch / 2}" x2="1136" y2="{cy + ch / 2}" stroke="#d1d5db" stroke-width="3"/>')
    s.add(f'<path d="M1126 {cy + ch / 2 - 8} L1138 {cy + ch / 2} L1126 {cy + ch / 2 + 8}" fill="none" stroke="#9ca3af" '
          f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    for x, step in zip(xs, STEPS):
        mx = x + cw / 2
        colour = BLUE if step[5] else MAGENTA
        down_arrow(s, mx, 222, cy + ch / 2 - 8, colour, dashed=step[5])
        s.add(f'<circle cx="{mx}" cy="{cy + ch / 2}" r="7" fill="{colour}"/>')
    lines(s, 1136, cy + ch - 12, ["time"], 14, 700, "#9ca3af", 0, 60, anchor="end")
    # row 3: the state of the evidence today
    down_arrow(s, 600, cy + ch + 2, 420)
    state_bar(s, 40, 420, 1120, 100)
    return s, 550


def narrow():
    s = Svg()
    W = 480
    question(s, 16, 16, W - 32, 128)
    down_arrow(s, W / 2, 146, 174, NAVY_LIGHT)
    s.box(16, 174, W - 32, 96, "#ffffff", NAVY, "bar")
    s.add(f'<rect x="16" y="174" width="{W - 32}" height="96" rx="16" fill="none" stroke="#d1d5db" stroke-width="2"/>')
    claim_label(s, 44, 208)
    # a vertical timeline of what happened to the claim
    tx, y = 40, 298
    step_h, step_gap = 194, 18
    s.add(f'<line x1="{tx}" y1="{y}" x2="{tx}" y2="{y + (step_h + step_gap) * len(STEPS) - step_gap}" stroke="#d1d5db" stroke-width="3"/>')
    for step in STEPS:
        colour = BLUE if step[5] else MAGENTA
        s.add(f'<circle cx="{tx}" cy="{y + 40}" r="8" fill="{colour}"/>')
        step_card(s, 70, y, W - 86, step_h, step)
        y += step_h + step_gap
    down_arrow(s, W / 2, y - 14, y + 16)
    state_bar(s, 16, y + 18, W - 32, 156, compact=True)
    return s, y + 194


DESC = ("A real example. Research question: does extreme heat drive bumble bee declines? Claim, from Soroye et al. "
        "2020 in Science: heat raises local extinction. Replications arrive over time and each tests the claim: in "
        "April 2026 a replication on Iberian bumble bees with independent data confirms it; in May 2026 an extension "
        "to future projections confirms it; also in May 2026 a sensitivity test qualifies it, because projected "
        "rankings depend on the grid resolution. Next, the claim is open to another region or method. The state of "
        "the evidence today is validated, with one qualification, and every step is signed, dated and traceable "
        "back to the question.")


def render(s, width, height, cls, suffix):
    return (f'<svg class="{cls}" viewBox="0 0 {width} {height}" role="img" '
            f'aria-labelledby="constellation-title-{suffix} constellation-desc-{suffix}" xmlns="http://www.w3.org/2000/svg">\n'
            f'<title id="constellation-title-{suffix}">Research is never finished: a real example</title>\n'
            f'<desc id="constellation-desc-{suffix}">{escape(DESC)}</desc>\n'
            + "\n".join(p for p in s.parts if p) + "\n</svg>")


def main():
    ws, wh = wide()
    ns, nh = narrow()
    html = ('<figure class="sl-diagram">\n'
            + render(ws, 1200, wh, "sl-diagram--wide", "wide") + "\n"
            + render(ns, 480, nh, "sl-diagram--narrow", "narrow") + "\n"
            + "<figcaption>Research is never finished: new replications can confirm, qualify or refute a claim, "
              "and every step stays linked to the question it started from.</figcaption>\n</figure>\n")
    open(OUT, "w").write(html)
    print("wide", wh, "narrow", nh)


if __name__ == "__main__":
    main()
