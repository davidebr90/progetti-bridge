#!/usr/bin/env python3
"""
Derive the web assets of the blog article images from the full-size originals.

The site stays dependency-free: this runs offline, on the author's machine, and
only the produced files are committed. Requires Pillow (`pip install Pillow`).

    python scripts/build-article-images.py <source-dir>

The source directory holds the originals named <n>.png, where <n> is the number
of the article in the order of data/articles.json (1 = first = newest).

For every article three files land in assets/blog/:

    <id>-1200.webp   1200x800, the article hero
    <id>-800.webp     800x533, the same hero for narrow viewports
    <id>-thumb.webp   640x427, the card in the blog list
    <id>-og.jpg      1200x630, social preview only

The hero keeps the original 3:2 frame, so nothing is ever cut from what the
reader sees. Only the social file is cropped, because og:image is fixed at
1.91:1 by the platforms and there is no way around it.
"""
import sys
from pathlib import Path

from PIL import Image

# Article order in data/articles.json, newest first.
IDS = [
    "chi-e-sulla-scialuppa",
    "non-si-vende-un-abbraccio",
    "sapere-senza-abitare",
    "attrito-e-otium",
    "il-calzolaio-aveva-ragione",
    "numero-del-freezer",
    "a-cosa-serviamo",
    "dove-crescono",
    "chi-nascera",
    "chi-accende",
    "sapere-basta",
    "chi-e-il-capitale",
]

HERO = (1200, 800)
HERO_SMALL = (800, 533)
THUMB = (640, 427)
OG = (1200, 630)
# Vertical bias of the social crop, per article id: 0.5 is centred, lower keeps
# more of the top. Set only where a centred crop would cut something that
# carries meaning.
OG_FOCUS = {}

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "blog"


def cover(im: Image.Image, size: tuple[int, int], focus: float = 0.5) -> Image.Image:
    """Scale and crop `im` to exactly `size`, keeping `focus` as the vertical anchor."""
    target = size[0] / size[1]
    w, h = im.size
    if w / h > target:
        new_w = int(round(h * target))
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(round(w / target))
        top = int(round((h - new_h) * focus))
        top = max(0, min(top, h - new_h))
        im = im.crop((0, top, w, top + new_h))
    return im.resize(size, Image.LANCZOS)


def main() -> int:
    src_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not src_dir or not src_dir.is_dir():
        print("Usage: python scripts/build-article-images.py <source-dir>")
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for n, article_id in enumerate(IDS, start=1):
        src = src_dir / f"{n}.png"
        if not src.exists():
            print(f"SKIP  {n:>2}. {article_id}: {src.name} not found")
            continue
        im = Image.open(src).convert("RGB")

        hero = im.resize(HERO, Image.LANCZOS)
        hero.save(OUT / f"{article_id}-1200.webp", "WEBP", quality=75, method=6)
        im.resize(HERO_SMALL, Image.LANCZOS).save(
            OUT / f"{article_id}-800.webp", "WEBP", quality=70, method=6
        )
        im.resize(THUMB, Image.LANCZOS).save(
            OUT / f"{article_id}-thumb.webp", "WEBP", quality=72, method=6
        )
        cover(im, OG, OG_FOCUS.get(article_id, 0.5)).save(
            OUT / f"{article_id}-og.jpg", "JPEG", quality=75, optimize=True, progressive=True
        )

        sizes = [
            (OUT / f"{article_id}-{suffix}").stat().st_size / 1024
            for suffix in ("1200.webp", "800.webp", "thumb.webp", "og.jpg")
        ]
        total += sum(sizes)
        print(
            f"OK    {n:>2}. {article_id:<26} "
            f"hero {sizes[0]:5.0f} KB · small {sizes[1]:5.0f} KB · "
            f"thumb {sizes[2]:5.0f} KB · og {sizes[3]:5.0f} KB"
        )

    print(f"\nTotale in assets/blog/: {total / 1024:.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
