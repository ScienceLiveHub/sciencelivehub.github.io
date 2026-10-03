"""Generate the funders-page figure ("On which foundations…", wide + phone layouts) as a Zola shortcode."""
from html import escape
from pathlib import Path

from gen_diagram import BLUE, GRAY, MAGENTA, NAVY, NAVY_LIGHT, Svg
from gen_request import lines

OUT = Path(__file__).resolve().parent.parent / "templates" / "shortcodes" / "foundations_diagram.html"
MUTED_LINE = "#9ca3af"
ART_W, ART_H = 360, 300

PANELS = [
    ("1", NAVY_LIGHT, "Verified research",
     ["Every stone is checked and every", "builder is credited. The next", "discovery can safely rest on it."], "pyramid"),
    ("2", BLUE, "AI without evidence",
     ["Fluent and convincing, but", "resting on nothing at all."], "ai"),
    ("3", MAGENTA, "Unverified research",
     ["Cited again and again, patched", "and propped up. It spreads,", "but leads nowhere."], "tree"),
]


def badge_id(s, cx, cy, r=8):
    s.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{NAVY_LIGHT}"/>')
    s.add(f'<text x="{cx}" y="{cy + r * 0.42}" text-anchor="middle" font-size="{r * 1.1:.0f}" font-weight="800" fill="#ffffff">iD</text>')


def art_pyramid(s):
    bw, bh, base_y = 52, 34, 262
    s.add(f'<rect x="30" y="{base_y}" width="300" height="14" rx="3" fill="{NAVY}"/>')
    rows = 5
    credited = {(0, 1), (1, 2), (2, 0), (3, 1)}
    for r in range(rows):
        n = rows - r
        x0 = 180 - n * bw / 2
        y = base_y - (r + 1) * bh
        for i in range(n):
            x = x0 + i * bw
            s.add(f'<rect x="{x + 1.5}" y="{y + 1.5}" width="{bw - 3}" height="{bh - 3}" rx="3" fill="#e3eaf1" stroke="{NAVY_LIGHT}" stroke-width="2"/>')
            # every stone is checked
            s.add(f'<path d="M{x + bw / 2 - 7} {y + bh / 2} l5 5 l9 -10" fill="none" stroke="{NAVY_LIGHT}" stroke-width="2.5" '
                  f'stroke-linecap="round" stroke-linejoin="round"/>')
            if (r, i) in credited:  # and its builder credited
                badge_id(s, x + bw - 6, y + 6, 7)
    # the next discovery, resting safely on top
    top_y = base_y - rows * bh
    s.add(f'<polygon points="180,{top_y - 46} 204,{top_y - 22} 180,{top_y - 2} 156,{top_y - 22}" fill="{MAGENTA}"/>')
    s.add(f'<polygon points="180,{top_y - 46} 204,{top_y - 22} 180,{top_y - 22}" fill="#d456a0"/>')
    for dx, dy in ((-34, -38), (34, -38), (0, -62)):
        s.add(f'<line x1="{180 + dx * 0.72}" y1="{top_y - 24 + dy * 0.72}" x2="{180 + dx}" y2="{top_y - 24 + dy}" '
              f'stroke="{MAGENTA}" stroke-width="3" stroke-linecap="round"/>')


def art_ai(s):
    # thought bubbles: a wrong equation and a citation to a paper from the future
    s.add(f'<ellipse cx="238" cy="54" rx="92" ry="34" fill="#eaf3ff" stroke="{BLUE}" stroke-width="2"/>')
    s.add(f'<text x="238" y="63" text-anchor="middle" font-size="25" font-weight="800" fill="{NAVY}">E = mc³</text>')
    s.add(f'<ellipse cx="92" cy="74" rx="78" ry="28" fill="#eaf3ff" stroke="{BLUE}" stroke-width="2"/>')
    s.add(f'<text x="92" y="80" text-anchor="middle" font-size="15" font-weight="700" fill="{NAVY}">[Smith et al., 2031]</text>')
    for cx, cy, r in ((150, 112, 6), (160, 128, 4.5), (214, 100, 6), (204, 118, 4.5)):
        s.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#eaf3ff" stroke="{BLUE}" stroke-width="2"/>')
    # the robot, confident
    s.add(f'<line x1="180" y1="132" x2="180" y2="146" stroke="{NAVY}" stroke-width="4"/>')
    s.add(f'<circle cx="180" cy="130" r="6" fill="{MAGENTA}"/>')
    s.add(f'<rect x="140" y="146" width="80" height="62" rx="16" fill="#ffffff" stroke="{NAVY}" stroke-width="4"/>')
    s.add(f'<path d="M158 172 q6 -7 12 0 M190 172 q6 -7 12 0" fill="none" stroke="{NAVY}" stroke-width="3.5" stroke-linecap="round"/>')
    s.add(f'<path d="M166 190 q14 10 28 0" fill="none" stroke="{NAVY}" stroke-width="3.5" stroke-linecap="round"/>')
    s.add(f'<rect x="154" y="210" width="52" height="22" rx="8" fill="#ffffff" stroke="{NAVY}" stroke-width="4"/>')
    # …standing on a floor that is not there
    s.add(f'<path d="M110 246 L250 246" stroke="{BLUE}" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round"/>')
    s.add(f'<text x="180" y="286" text-anchor="middle" font-size="26" font-weight="800" fill="{MUTED_LINE}">?</text>')


def art_tree(s):
    # a short pedestal: one original source
    s.add(f'<rect x="160" y="250" width="40" height="18" rx="3" fill="#e3eaf1" stroke="{NAVY_LIGHT}" stroke-width="2"/>')
    s.add(f'<rect x="146" y="266" width="68" height="10" rx="3" fill="{NAVY_LIGHT}"/>')
    trunk = "M180 250 L176 200 L188 150 L180 112"
    branches = ["M178 176 L120 150 L74 162 L40 136", "M184 160 L238 140 L284 156 L322 128",
                "M180 112 L126 92 L96 60", "M180 112 L236 86 L268 54", "M120 150 L108 112"]
    for d in [trunk] + branches:
        s.add(f'<path d="{d}" fill="none" stroke="{NAVY_LIGHT}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>')
    # patches where it cracked
    for x, y, a in ((182, 186, 20), (130, 146, -25), (250, 136, 15), (152, 102, 30)):
        s.add(f'<rect x="{x - 9}" y="{y - 5}" width="18" height="10" rx="2" fill="{MAGENTA}" transform="rotate({a} {x} {y})"/>')
    # crutches holding it up
    for x, top in ((74, 162), (284, 156), (40, 136), (322, 128)):
        s.add(f'<line x1="{x}" y1="{top + 6}" x2="{x}" y2="276" stroke="{MUTED_LINE}" stroke-width="4" stroke-linecap="round"/>')
        s.add(f'<line x1="{x - 10}" y1="{top + 6}" x2="{x + 10}" y2="{top + 6}" stroke="{MUTED_LINE}" stroke-width="4" stroke-linecap="round"/>')
    # "cited" tags hanging from the branches
    for x, y in ((96, 60), (268, 54), (108, 112), (238, 140)):
        s.add(f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y + 14}" stroke="{MUTED_LINE}" stroke-width="1.5"/>')
        s.add(f'<rect x="{x - 24}" y="{y + 14}" width="48" height="20" rx="4" fill="#ffffff" stroke="{MUTED_LINE}" stroke-width="1.5"/>')
        s.add(f'<text x="{x}" y="{y + 28}" text-anchor="middle" font-size="12" font-weight="700" fill="{GRAY}">cited</text>')


ART = {"pyramid": art_pyramid, "ai": art_ai, "tree": art_tree}


def panel(s, x, y, w, h, spec):
    num, colour, title, desc, art = spec
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>')
    art_svg = Svg()
    ART[art](art_svg)
    s.add(f'<g transform="translate({x + (w - ART_W) / 2} {y + 16})">' + "".join(art_svg.parts) + "</g>")
    ty = y + 16 + ART_H + 30
    s.add(f'<circle cx="{x + 38}" cy="{ty - 8}" r="15" fill="{colour}"/>')
    s.add(f'<text x="{x + 38}" y="{ty - 2}" text-anchor="middle" font-size="16" font-weight="800" fill="#ffffff">{num}</text>')
    lines(s, x + 62, ty, [title], 22, 800, NAVY, 0, w - 80)
    lines(s, x + 24, ty + 34, desc, 16, 400, GRAY, 22, w - 48)


def question(s, cx, y, rows, size):
    lines(s, cx, y, ["INVESTORS · FUNDING AGENCIES · RESEARCHERS"], 14, 800, MAGENTA, 0, 600, anchor="middle")
    lines(s, cx, y + size + 14, rows, size, 800, NAVY, size + 8, 1100, anchor="middle")


def wide():
    s = Svg()
    s.add('<rect x="0" y="0" width="1200" height="660" rx="24" fill="#f3f6fa"/>')
    for i, spec in enumerate(PANELS):
        panel(s, 30 + i * 386, 30, 368, 470, spec)
    question(s, 600, 548, ["On which foundations would you rather invest", "your money, time and effort?"], 32)
    return s, 660


def narrow():
    s = Svg()
    W = 480
    y = 16
    s.parts.append("")
    for spec in PANELS:
        panel(s, 16, y, W - 32, 440, spec)
        y += 456
    question(s, W / 2, y + 26, ["On which foundations would", "you rather invest your money,", "time and effort?"], 25)
    h = y + 26 + 39 + 33 * 3
    s.parts[0] = f'<rect x="0" y="0" width="{W}" height="{h}" rx="20" fill="#f3f6fa"/>'
    return s, h


DESC = ("Three foundations compared. One: verified research, a pyramid in which every stone is checked and every "
        "builder is credited, so the next discovery can safely rest on it. Two: AI without evidence, fluent "
        "and convincing but resting on nothing at all, shown as a confident robot thinking 'E = mc³' and citing a "
        "paper from 2031, standing on a floor that is not there. Three: unverified research, a tree cited again and "
        "again, patched and propped up on crutches, which spreads but leads nowhere. On which foundations would you "
        "rather invest your money, time and effort?")


def render(s, width, height, cls, suffix):
    return (f'<svg class="{cls}" viewBox="0 0 {width} {height}" role="img" '
            f'aria-labelledby="foundations-title-{suffix} foundations-desc-{suffix}" xmlns="http://www.w3.org/2000/svg">\n'
            f'<title id="foundations-title-{suffix}">On which foundations would you rather invest?</title>\n'
            f'<desc id="foundations-desc-{suffix}">{escape(DESC)}</desc>\n'
            + "\n".join(p for p in s.parts if p) + "\n</svg>")


def main():
    ws, wh = wide()
    ns, nh = narrow()
    html = ('<figure class="sl-diagram">\n'
            + render(ws, 1200, wh, "sl-diagram--wide", "wide") + "\n"
            + render(ns, 480, nh, "sl-diagram--narrow", "narrow") + "\n"
            + "</figure>\n")
    open(OUT, "w").write(html)
    print("wide", wh, "narrow", nh)


if __name__ == "__main__":
    main()
