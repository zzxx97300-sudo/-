"""Create small public images from local originals, hiding certificate numbers."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images"
for name in ("profile", "projects", "awards", "research", "certificates", "gallery"):
    (OUT / name).mkdir(parents=True, exist_ok=True)

portrait = Image.open(ROOT / "就业推荐表正面.jpg").convert("RGB")
portrait = portrait.crop((1196, 885, 1477, 1115)).rotate(90, expand=True)
portrait.save(OUT / "profile" / "portrait.webp", "WEBP", quality=86, method=6)

cache = ROOT / ".private-audit" / "asset-renders"
cache.mkdir(parents=True, exist_ok=True)
source = {
    "national-third": "毕昇杯全国总决赛三等奖证书.pdf",
    "regional-first": "毕昇杯重庆赛区一等奖证书 (3).pdf",
    "challenge-school-first": "挑战杯校赛一等奖证书.pdf",
    "electronics-simulation-first": "2026全国大学生电子设计竞赛证书-张鑫_张兆华_左承铭 (1).pdf",
}

for slug, filename in source.items():
    page = 2 if slug == "electronics-simulation-first" else 1
    prefix = cache / slug
    subprocess.run(
        ["pdftoppm", "-f", str(page), "-l", str(page), "-scale-to", "1600", "-jpeg", str(ROOT / "证书" / filename), str(prefix)],
        check=True,
        capture_output=True,
    )
    raster = next(cache.glob(f"{slug}-*.jpg"))
    image = Image.open(raster).convert("RGB")
    if slug == "electronics-simulation-first":
        image = image.rotate(270, expand=True)
    elif slug in {"regional-first", "challenge-school-first"}:
        image = image.rotate(90, expand=True)

    draw = ImageDraw.Draw(image)
    scale = image.width / 1500
    if slug == "national-third":
        draw.rectangle(tuple(round(n * scale) for n in (130, 845, 480, 900)), fill=(252, 250, 247))
    if slug == "regional-first":
        draw.rectangle(tuple(round(n * scale) for n in (235, 835, 570, 900)), fill=(252, 250, 247))

    image.thumbnail((1400, 1000), Image.Resampling.LANCZOS)
    image.save(OUT / "certificates" / f"{slug}.webp", "WEBP", quality=83, method=6)
    thumb = image.copy()
    thumb.thumbnail((640, 450), Image.Resampling.LANCZOS)
    thumb.save(OUT / "awards" / f"{slug}-thumb.webp", "WEBP", quality=78, method=6)

font_path = Path("C:/Windows/Fonts/Noto Sans SC (TrueType).otf")
font_bold_path = Path("C:/Windows/Fonts/Noto Sans SC Bold (TrueType).otf")
og = Image.new("RGB", (1200, 630), (249, 249, 247))
draw = ImageDraw.Draw(og)
draw.rectangle((48, 48, 1152, 582), outline=(210, 214, 210), width=2)
draw.rectangle((48, 48, 63, 582), fill=(74, 121, 109))
title_font = ImageFont.truetype(str(font_bold_path), 88)
body_font = ImageFont.truetype(str(font_path), 36)
small_font = ImageFont.truetype(str(font_path), 26)
draw.text((110, 155), "张鑫", font=title_font, fill=(26, 31, 29))
draw.text((110, 280), "自动化 · 嵌入式开发 · 机器视觉", font=body_font, fill=(64, 72, 68))
draw.text((110, 490), "PORTFOLIO  /  2026", font=small_font, fill=(74, 121, 109))
og.save(ROOT / "public" / "og-image.png", optimize=True)
print("Public portrait, sanitized award previews and Open Graph image created.")
