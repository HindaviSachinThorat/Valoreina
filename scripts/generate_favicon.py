from PIL import Image

png_path = "public/favicon.png"
ico_path = "public/favicon.ico"
img = Image.open(png_path)
if img.mode not in ("RGBA", "RGB"):
    img = img.convert("RGBA")
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
img.save(ico_path, format="ICO", sizes=sizes)
print(f"Saved {ico_path}")
