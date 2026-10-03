"""Generate the request-page diagram (wide + phone layouts) as a Zola shortcode."""
from html import escape
from pathlib import Path

from gen_diagram import BLUE, GRAY, MAGENTA, MAGENTA_LIGHT, NAVY, NAVY_LIGHT, Svg, text_width

OUT = Path(__file__).resolve().parent.parent / "templates" / "shortcodes" / "request_diagram.html"

# (tint, accent) per kind of box
STYLE = {
    "ask": ("#e8ecf4", NAVY),
    "check": ("#eaf3ff", BLUE),
    "yes": ("#e3eaf1", NAVY_LIGHT),
    "route": ("#fbe9f2", MAGENTA),
    "done": (NAVY, MAGENTA),
}


def lines(s, x, y, rows, size, weight, colour, gap, max_w, anchor="start"):
    """Write text rows; refuse any row whose estimated width exceeds max_w."""
    for j, row in enumerate(rows):
        assert text_width(row, size) * 0.92 <= max_w, f"{row!r} too wide for {max_w}"
        s.add(f'<text x="{x}" y="{y + j * gap}" font-size="{size}" font-weight="{weight}" fill="{colour}" '
              f'text-anchor="{anchor}">{escape(row)}</text>')


def box(s, x, y, w, h, kind):
    tint, accent = STYLE[kind]
    s.box(x, y, w, h, tint, accent, "bar")


def hline(s, x1, x2, y):
    s.add(f'<path d="M{x1} {y} L{x2 - 6} {y}" stroke="{NAVY}" stroke-width="3"/>')
    s.add(f'<path d="M{x2 - 14} {y - 8} L{x2 - 4} {y} L{x2 - 14} {y + 8}" fill="none" stroke="{NAVY}" '
          f'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')


def path_arrow(s, d, end_x, end_y, direction="right"):
    s.add(f'<path d="{d}" fill="none" stroke="{NAVY}" stroke-width="3" stroke-linejoin="round"/>')
    if direction == "right":
        s.add(f'<path d="M{end_x - 10} {end_y - 8} L{end_x} {end_y} L{end_x - 10} {end_y + 8}" fill="none" '
              f'stroke="{NAVY}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    else:  # down
        s.add(f'<path d="M{end_x - 8} {end_y - 10} L{end_x} {end_y} L{end_x + 8} {end_y - 10}" fill="none" '
              f'stroke="{NAVY}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')


def pill(s, cx, cy, text, fill, colour):
    w = text_width(text, 16) + 26
    s.add(f'<rect x="{cx - w / 2}" y="{cy - 15}" width="{w}" height="30" rx="15" fill="{fill}"/>')
    s.add(f'<text x="{cx}" y="{cy + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="{colour}">{text}</text>')


def wide():
    s = Svg()
    # 1 you ask
    box(s, 30, 185, 220, 180, "ask")
    s.icon("person", 80, 236, NAVY)
    lines(s, 54, 304, ["You ask"], 25, 800, NAVY, 0, 180)
    lines(s, 54, 332, ["Signed with", "your ORCID"], 17, 400, GRAY, 22, 180)
    hline(s, 250, 290, 275)
    # 2 already replicated?
    box(s, 290, 185, 230, 180, "check")
    s.icon("search", 340, 234, BLUE)
    lines(s, 314, 290, ["Already", "replicated?"], 25, 800, NAVY, 28, 196)
    lines(s, 314, 348, ["Replication Radar"], 17, 700, "#2269bd", 0, 196)
    # branches
    s.add(f'<path d="M520 275 L548 275" stroke="{NAVY}" stroke-width="3"/>')
    path_arrow(s, "M548 275 L548 105 L582 105", 588, 105)
    path_arrow(s, "M548 275 L582 275", 588, 275)
    path_arrow(s, "M548 275 L548 430 L582 430", 588, 430)
    pill(s, 548, 190, "yes", "#d3dbe9", NAVY_LIGHT)
    pill(s, 548, 352, "no", "#f5cfe2", MAGENTA)
    # yes: read the verdict
    box(s, 590, 40, 300, 130, "yes")
    lines(s, 618, 86, ["Read the verdict"], 24, 800, NAVY, 0, 260)
    lines(s, 618, 116, ["Existing evidence,", "with its limits"], 17, 400, GRAY, 22, 260)
    # no: community or experts
    box(s, 590, 210, 300, 130, "route")
    lines(s, 618, 256, ["The community"], 24, 800, NAVY, 0, 260)
    lines(s, 618, 286, ["Free: any researcher takes", "it on and is credited"], 17, 400, GRAY, 22, 260)
    lines(s, 740, 357, ["or"], 18, 800, MAGENTA, 0, 40, anchor="middle")
    box(s, 590, 365, 300, 130, "route")
    lines(s, 618, 411, ["Our experts"], 24, 800, NAVY, 0, 260)
    lines(s, 618, 441, ["Feasibility check, then", "a quote (from €2,000)"], 17, 400, GRAY, 22, 260)
    # published
    hline(s, 890, 932, 275)
    path_arrow(s, "M890 430 L912 430 L912 380 L926 380", 932, 380)
    box(s, 932, 150, 240, 260, "done")
    s.icon("live", 984, 204, MAGENTA)
    lines(s, 956, 280, ["Published on", "Science Live"], 25, 800, "#ffffff", 30, 200)
    lines(s, 956, 350, ["A signed FORRT chain", "that cites your request"], 16, 700, MAGENTA_LIGHT, 22, 205)
    return s, 530


def narrow():
    s = Svg()
    W = 480
    # 1 you ask
    box(s, 16, 20, W - 32, 96, "ask")
    s.icon("person", 64, 68, NAVY)
    lines(s, 112, 62, ["You ask"], 24, 800, NAVY, 0, 330)
    lines(s, 112, 90, ["Signed with your ORCID"], 16, 400, GRAY, 0, 330)
    s.arrow(W / 2, 116, 144)
    # 2 already replicated?
    box(s, 16, 144, W - 32, 96, "check")
    s.icon("search", 64, 190, BLUE)
    lines(s, 112, 186, ["Already replicated?"], 24, 800, NAVY, 0, 330)
    lines(s, 112, 214, ["Checked with Replication Radar"], 16, 700, "#2269bd", 0, 330)
    # split into two columns
    lx, rx, cw = 16, 252, 212
    path_arrow(s, f"M{W / 2} 240 L{W / 2} 256 L{lx + cw / 2} 256 L{lx + cw / 2} 300", lx + cw / 2, 300, "down")
    path_arrow(s, f"M{W / 2} 256 L{rx + cw / 2} 256 L{rx + cw / 2} 300", rx + cw / 2, 300, "down")
    pill(s, lx + cw / 2, 280, "yes", "#d3dbe9", NAVY_LIGHT)
    pill(s, rx + cw / 2, 280, "no", "#f5cfe2", MAGENTA)
    # yes column
    box(s, lx, 304, cw, 126, "yes")
    lines(s, lx + 24, 342, ["Read the", "verdict"], 21, 800, NAVY, 26, 176)
    lines(s, lx + 24, 400, ["Existing evidence"], 15, 400, GRAY, 0, 176)
    # no column
    box(s, rx, 304, cw, 126, "route")
    lines(s, rx + 24, 342, ["The", "community"], 21, 800, NAVY, 26, 176)
    lines(s, rx + 24, 400, ["Free, and credited"], 15, 400, GRAY, 0, 176)
    lines(s, rx + cw / 2, 454, ["or"], 17, 800, MAGENTA, 0, 40, anchor="middle")
    box(s, rx, 466, cw, 126, "route")
    lines(s, rx + 24, 504, ["Our", "experts"], 21, 800, NAVY, 26, 176)
    lines(s, rx + 24, 562, ["From €2,000"], 15, 400, GRAY, 0, 176)
    # published
    path_arrow(s, f"M{rx + cw / 2} 592 L{rx + cw / 2} 624", rx + cw / 2, 630, "down")
    box(s, 16, 630, W - 32, 110, "done")
    s.icon("live", 64, 685, MAGENTA)
    lines(s, 112, 676, ["Published on Science Live"], 21, 800, "#ffffff", 0, 330)
    lines(s, 112, 704, ["A signed FORRT chain that"], 15, 700, MAGENTA_LIGHT, 0, 330)
    lines(s, 112, 724, ["cites your request"], 15, 700, MAGENTA_LIGHT, 0, 330)
    return s, 760


DESC = ("How a replication request moves. You ask, signed with your ORCID. Replication Radar checks whether the "
        "claim has already been replicated. If yes, you read the verdict: the existing evidence, with its limits. "
        "If not, the community takes it on for free and is credited, or our experts check feasibility and quote, "
        "from 2,000 euros. Either way the result is published on Science Live as a signed FORRT chain that cites "
        "your request.")


def render(s, width, height, cls, suffix):
    return (f'<svg class="{cls}" viewBox="0 0 {width} {height}" role="img" '
            f'aria-labelledby="request-diagram-title-{suffix} request-diagram-desc-{suffix}" xmlns="http://www.w3.org/2000/svg">\n'
            f'<title id="request-diagram-title-{suffix}">How a replication request moves</title>\n'
            f'<desc id="request-diagram-desc-{suffix}">{escape(DESC)}</desc>\n'
            + "\n".join(p for p in s.parts if p) + "\n</svg>")


def main():
    ws, wh = wide()
    ns, nh = narrow()
    html = ('<figure class="sl-diagram">\n'
            + render(ws, 1200, wh, "sl-diagram--wide", "wide") + "\n"
            + render(ns, 480, nh, "sl-diagram--narrow", "narrow") + "\n"
            + '<figcaption>Either way, the answer stays linked to the question that asked for it.</figcaption>\n'
              '</figure>\n')
    open(OUT, "w").write(html)
    print("wide", wh, "narrow", nh)


if __name__ == "__main__":
    main()
