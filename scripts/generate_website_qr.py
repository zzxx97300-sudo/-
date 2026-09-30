"""Generate a print-ready QR code for the production website URL."""

import argparse
from pathlib import Path
from urllib.parse import urlparse

import qrcode
from qrcode.constants import ERROR_CORRECT_H


def main() -> None:
    parser = argparse.ArgumentParser(description="为正式网站生成二维码 PNG")
    parser.add_argument("url", help="正式公网地址，必须以 https:// 开头")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("public/website-qrcode.png"),
        help="输出 PNG 路径",
    )
    args = parser.parse_args()

    parsed = urlparse(args.url)
    if parsed.scheme != "https" or not parsed.netloc or parsed.query or parsed.fragment:
        parser.error("请输入不带查询参数和片段的正式 HTTPS 地址")

    url = args.url.rstrip("/") + "/"
    code = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )
    code.add_data(url)
    code.make(fit=True)
    image = code.make_image(fill_color="#111111", back_color="#ffffff")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    image.save(args.output)
    print(f"{args.output}: {url} ({image.size[0]}×{image.size[1]} px)")


if __name__ == "__main__":
    main()
