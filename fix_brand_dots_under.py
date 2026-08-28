with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# 1. Add pb-8 back to the section
content = content.replace('id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand"', 'id="brandSliderSection" class="mb-10 md:mb-14 relative w-full group/brand pb-8"')

# 2. Move dots to bottom-0 right-0 (so they sit in the pb-8 padding area, below the cards, aligned right)
content = content.replace('<div class="absolute bottom-4 right-4 flex items-center gap-1.5 brand-dots z-10">', '<div class="absolute bottom-0 right-0 flex items-center gap-1.5 brand-dots z-10">')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Fixed dots positioning to be under the card.")
