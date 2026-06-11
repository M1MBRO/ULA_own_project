#!/usr/bin/env python3
"""
make_stickers.py — пакетна обробка зображень у die-cut наліпки з білою обводкою.

Що робить з кожним файлом у stickers/input/:
  1. Прибирає фон (rembg / u2net) -> прозорий alpha.
  2. Додає білу обводку по контуру з округленими кутами (як на 1-й картинці).
  3. Вирівнює розмір під друк (300 DPI, заданий фізичний розмір) + bleed.
  4. Експортує:
       output/png/<ім'я>.png       — готова наліпка (RGBA, 300 DPI)
       output/dieline/<ім'я>.png   — лінія різу (контур) для друкарні
       output/dieline/<ім'я>.svg   — векторна лінія різу
     і наприкінці output/preview/contact_sheet.png — аркуш для перегляду.

Налаштування — у блоці CONFIG нижче.
Щоб додати нові наліпки: поклади картинки в stickers/input/ і запусти знову.
"""

import os
import glob
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
from scipy.ndimage import distance_transform_edt, label
from skimage import measure

# ──────────────────────────── CONFIG ────────────────────────────
DPI            = 300        # роздільність для друку
TARGET_CM      = 5.0        # довша сторона наліпки (фігура+обводка) у см
BORDER_RATIO   = 0.045      # товщина білої обводки = частка від довшої сторони фігури
BORDER_PX      = None       # жорстко задати товщину обводки в px (інакше — за ratio)
SMOOTH_RATIO   = 0.6        # округлення кутів обводки (частка від товщини обводки)
BLEED_MM       = 3.0        # прозорий припуск навколо для друку
ALPHA_THRESH   = 16         # поріг alpha, що вважається "фігурою"
MIN_COMP_RATIO = 0.005      # прибирати дрібні уламки < цієї частки від площі найбільшого
ADD_KEYLINE    = False      # тонка сіра лінія ЗОВНІ білого (як ледь видно на 1-й картинці)
KEYLINE_COLOR  = (190, 190, 190, 255)
CUT_COLOR      = (255, 0, 255, 255)  # колір лінії різу (стандартний magenta)
# ─────────────────────────────────────────────────────────────────

HERE      = os.path.dirname(os.path.abspath(__file__))
IN_DIR    = os.path.join(HERE, "input")
OUT_PNG   = os.path.join(HERE, "output", "png")
OUT_DIE   = os.path.join(HERE, "output", "dieline")
OUT_PREV  = os.path.join(HERE, "output", "preview")
for d in (OUT_PNG, OUT_DIE, OUT_PREV):
    os.makedirs(d, exist_ok=True)

TARGET_LONG_PX = round(TARGET_CM / 2.54 * DPI)
BLEED_PX       = round(BLEED_MM / 25.4 * DPI)

_session = None
def get_session():
    global _session
    if _session is None:
        from rembg import new_session
        _session = new_session("u2net")
    return _session


def remove_bg(img: Image.Image) -> Image.Image:
    """Прибрати фон через rembg, повернути RGBA."""
    from rembg import remove
    out = remove(img.convert("RGBA"), session=get_session(),
                 post_process_mask=True)
    return out.convert("RGBA")


def trim_to_alpha(img: Image.Image, pad: int = 0) -> Image.Image:
    """Обрізати прозорі поля до bbox непрозорого вмісту."""
    a = np.array(img.getchannel("A"))
    ys, xs = np.where(a > ALPHA_THRESH)
    if len(xs) == 0:
        return img
    x0, x1 = xs.min(), xs.max() + 1
    y0, y1 = ys.min(), ys.max() + 1
    cropped = img.crop((x0, y0, x1, y1))
    if pad:
        w, h = cropped.size
        canvas = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
        canvas.paste(cropped, (pad, pad))
        return canvas
    return cropped


def clean_alpha(img: Image.Image) -> Image.Image:
    """Прибрати дрібні відокремлені уламки (артефакти видалення фону)."""
    a = np.array(img.getchannel("A"))
    mask = a > ALPHA_THRESH
    lbl, n = label(mask)
    if n <= 1:
        return img
    sizes = np.bincount(lbl.ravel())
    sizes[0] = 0
    biggest = sizes.max()
    keep = {i for i, s in enumerate(sizes) if s >= biggest * MIN_COMP_RATIO}
    keep_mask = np.isin(lbl, list(keep))
    a2 = np.where(keep_mask, a, 0).astype(np.uint8)
    out = img.copy()
    out.putalpha(Image.fromarray(a2))
    return out


def build_sticker_mask(alpha: np.ndarray, border_px: int, smooth_px: int):
    """Маска наліпки = фігура, розширена на border_px, зі згладженими кутами."""
    figure = alpha > ALPHA_THRESH
    # відступ полотна, щоб обводка не обрізалась
    pad = border_px + smooth_px + 4
    figure = np.pad(figure, pad, mode="constant", constant_values=False)
    # рівномірне круглове розширення через distance transform
    dist = distance_transform_edt(~figure)
    sticker = dist <= border_px
    # згладжування/округлення кутів
    if smooth_px > 0:
        m = Image.fromarray((sticker * 255).astype(np.uint8))
        m = m.filter(ImageFilter.GaussianBlur(radius=smooth_px))
        arr = np.array(m).astype(np.float32) / 255.0
        sticker = arr >= 0.5
    return sticker, pad


def make_sticker(in_path: str):
    name = os.path.splitext(os.path.basename(in_path))[0]
    src = Image.open(in_path)
    cut = remove_bg(src)
    cut = clean_alpha(cut)
    cut = trim_to_alpha(cut)

    w, h = cut.size
    long_side = max(w, h)
    border_px = BORDER_PX if BORDER_PX else max(2, round(long_side * BORDER_RATIO))
    smooth_px = max(0, round(border_px * SMOOTH_RATIO))

    alpha = np.array(cut.getchannel("A"))
    sticker_mask, pad = build_sticker_mask(alpha, border_px, smooth_px)
    H, W = sticker_mask.shape

    # біла підкладка за формою наліпки
    white = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    white.putalpha(Image.fromarray((sticker_mask * 255).astype(np.uint8)))
    white_rgb = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    white_rgb.putalpha(Image.fromarray((sticker_mask * 255).astype(np.uint8)))

    composite = white_rgb

    # опційна тонка сіра лінія зовні білого
    if ADD_KEYLINE:
        key_px = max(1, round(border_px * 0.12))
        figure_pad = np.pad(alpha > ALPHA_THRESH, pad,
                            mode="constant", constant_values=False)
        dist = distance_transform_edt(~figure_pad)
        outer = (dist <= border_px + key_px) & (dist > border_px)
        key_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        key_layer.putalpha(Image.fromarray((outer * 255).astype(np.uint8)))
        key_solid = Image.new("RGBA", (W, H), KEYLINE_COLOR)
        key_solid.putalpha(Image.fromarray((outer * 255).astype(np.uint8)))
        composite = Image.alpha_composite(composite, key_solid)

    # накладаємо оригінал зверху по центру (з урахуванням pad)
    fg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fg.paste(cut, (pad, pad), cut)
    composite = Image.alpha_composite(composite, fg)

    # обрізаємо до маски наліпки
    composite = trim_to_alpha(composite)

    # масштабуємо до цільового розміру для друку
    cw, ch = composite.size
    scale = TARGET_LONG_PX / max(cw, ch)
    new_size = (max(1, round(cw * scale)), max(1, round(ch * scale)))
    composite = composite.resize(new_size, Image.LANCZOS)

    # додаємо bleed (прозорий припуск)
    fw, fh = composite.size
    final = Image.new("RGBA", (fw + 2 * BLEED_PX, fh + 2 * BLEED_PX), (0, 0, 0, 0))
    final.paste(composite, (BLEED_PX, BLEED_PX), composite)

    out_png = os.path.join(OUT_PNG, name + ".png")
    final.save(out_png, dpi=(DPI, DPI))

    export_dieline(final, name)
    print(f"  ✓ {name}: border={border_px}px, size={final.size}")
    return out_png


def export_dieline(final: Image.Image, name: str):
    """Контур наліпки як лінія різу: PNG (накреслений) + SVG (вектор)."""
    mask = (np.array(final.getchannel("A")) > 8).astype(np.uint8)
    contours = measure.find_contours(mask, 0.5)
    if not contours:
        return
    contours = sorted(contours, key=len, reverse=True)

    # PNG: малюємо контур поверх прозорого полотна
    die_png = Image.new("RGBA", final.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(die_png)
    lw = max(2, round(final.size[0] * 0.004))
    for c in contours[:3]:
        pts = [(float(x), float(y)) for y, x in c]
        d.line(pts + [pts[0]], fill=CUT_COLOR, width=lw)
    die_png.save(os.path.join(OUT_DIE, name + ".png"), dpi=(DPI, DPI))

    # SVG: найбільший контур як полігон, розмір у мм
    W, H = final.size
    w_mm = W / DPI * 25.4
    h_mm = H / DPI * 25.4
    main = contours[0]
    step = max(1, len(main) // 600)  # спрощення
    pts = main[::step]
    path = " ".join(f"{x:.2f},{y:.2f}" for y, x in pts)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{w_mm:.2f}mm" height="{h_mm:.2f}mm" '
        f'viewBox="0 0 {W} {H}">\n'
        f'  <polygon points="{path}" fill="none" '
        f'stroke="magenta" stroke-width="{max(1, W*0.003):.1f}"/>\n'
        f'</svg>\n'
    )
    with open(os.path.join(OUT_DIE, name + ".svg"), "w") as f:
        f.write(svg)


def build_contact_sheet(png_paths, cols=3, cell=420, margin=24, bg=(235, 235, 238)):
    if not png_paths:
        return
    rows = (len(png_paths) + cols - 1) // cols
    W = cols * cell + (cols + 1) * margin
    H = rows * cell + (rows + 1) * margin
    sheet = Image.new("RGBA", (W, H), bg + (255,))
    for i, p in enumerate(png_paths):
        r, c = divmod(i, cols)
        img = Image.open(p).convert("RGBA")
        img.thumbnail((cell, cell), Image.LANCZOS)
        x = margin + c * (cell + margin) + (cell - img.size[0]) // 2
        y = margin + r * (cell + margin) + (cell - img.size[1]) // 2
        sheet.paste(img, (x, y), img)
    out = os.path.join(OUT_PREV, "contact_sheet.png")
    sheet.convert("RGB").save(out, dpi=(150, 150))
    print(f"\nКонтактний аркуш: {out}")


def main():
    files = sorted(
        f for f in glob.glob(os.path.join(IN_DIR, "*"))
        if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
    )
    if not files:
        print(f"Немає зображень у {IN_DIR}")
        return
    print(f"Знайдено {len(files)} зображень. Цільовий розмір: "
          f"{TARGET_LONG_PX}px @ {DPI}DPI (~{TARGET_CM}см), bleed {BLEED_PX}px.\n")
    out_pngs = []
    for f in files:
        try:
            out_pngs.append(make_sticker(f))
        except Exception as e:
            print(f"  ✗ {os.path.basename(f)}: {e}")
    build_contact_sheet(out_pngs)
    print("\nГотово.")


if __name__ == "__main__":
    main()
