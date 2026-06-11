#!/usr/bin/env python3
"""
make_print_sheet.py — зібрати всі готові наліпки в один аркуш A4, готовий до друку.

Бере stickers/output/png/*.png і відповідні лінії різу з output/dieline/,
розкладає на аркуші A4 @300DPI з проміжками й накладає контури різу (magenta).
Зберігає PDF + PNG у output/print/.
"""
import os, glob
from PIL import Image

HERE   = os.path.dirname(os.path.abspath(__file__))
PNG    = os.path.join(HERE, "output", "png")
DIE    = os.path.join(HERE, "output", "dieline")
OUT    = os.path.join(HERE, "output", "print")
os.makedirs(OUT, exist_ok=True)

DPI    = 300
A4_W   = round(210 / 25.4 * DPI)   # 2480
A4_H   = round(297 / 25.4 * DPI)   # 3508
MARGIN = round(10 / 25.4 * DPI)    # 10 мм поле
GAP    = round(6  / 25.4 * DPI)    # 6 мм між наліпками
COLS   = 3
WITH_CUTLINES = True               # накладати лінії різу

def main():
    files = sorted(glob.glob(os.path.join(PNG, "*.png")))
    if not files:
        print("Немає наліпок у output/png/")
        return
    stickers = []
    for f in files:
        s = Image.open(f).convert("RGBA")
        name = os.path.basename(f)
        die_path = os.path.join(DIE, name)
        die = Image.open(die_path).convert("RGBA") if (WITH_CUTLINES and os.path.exists(die_path)) else None
        stickers.append((s, die))

    sheet = Image.new("RGBA", (A4_W, A4_H), (255, 255, 255, 255))
    col_w = (A4_W - 2 * MARGIN - (COLS - 1) * GAP) // COLS

    x = MARGIN
    y = MARGIN
    col = 0
    row_h = 0
    placed = 0
    for s, die in stickers:
        # масштабуємо, якщо ширша за колонку
        if s.width > col_w:
            k = col_w / s.width
            s = s.resize((round(s.width * k), round(s.height * k)), Image.LANCZOS)
            if die:
                die = die.resize(s.size, Image.LANCZOS)

        if col == COLS:  # новий рядок
            col = 0
            x = MARGIN
            y += row_h + GAP
            row_h = 0

        # центр у колонці
        cx = x + (col_w - s.width) // 2
        sheet.paste(s, (cx, y), s)
        if die:
            sheet.alpha_composite(die, (cx, y))

        row_h = max(row_h, s.height)
        x += col_w + GAP
        col += 1
        placed += 1

    out_pdf = os.path.join(OUT, "sticker_pack_A4_print.pdf")
    out_png = os.path.join(OUT, "sticker_pack_A4_print.png")
    rgb = sheet.convert("RGB")
    rgb.save(out_png, dpi=(DPI, DPI))
    rgb.save(out_pdf, "PDF", resolution=DPI)
    print(f"Розміщено {placed} наліпок на A4.")
    print(f"PDF: {out_pdf}")
    print(f"PNG: {out_png}")

if __name__ == "__main__":
    main()
