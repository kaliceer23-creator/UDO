from PIL import Image

# Load the image
img = Image.open('/Users/aliceer/.gemini/antigravity/brain/8984e2ee-f696-4fe2-aec3-f99549af231d/.user_uploaded/media_1787994022805.png')
img = img.convert('RGB')

width, height = img.size
x = width // 2

# Tab bar is near the top, maybe Y = 50
tab_bar = img.getpixel((x, 50))

# Section bg is below tab bar, maybe Y = 150
section_bg = img.getpixel((x, 150))

# Table rows start around Y = 300, let's just scan down and print changes
colors = []
for y in range(250, 450, 5):
    p = img.getpixel((x, y))
    if not colors or p != colors[-1]:
        colors.append(p)

print(f"Tab Bar (approx): {tab_bar}")
print(f"Section BG (approx): {section_bg}")
print("Table Row Colors:")
for c in colors:
    print(c)

