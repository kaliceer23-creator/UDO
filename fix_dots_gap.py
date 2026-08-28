with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# Reduce padding from pb-8 to pb-6
content = content.replace('class="mb-10 md:mb-14 relative w-full group/brand pb-8"', 'class="mb-10 md:mb-14 relative w-full group/brand pb-6"')

# Move dots up slightly (from bottom-0 to bottom-1.5)
content = content.replace('<div class="absolute bottom-0 right-0 flex items-center gap-1.5 brand-dots z-10">', '<div class="absolute bottom-1 right-0 flex items-center gap-1.5 brand-dots z-10">')

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Moved dots closer to card.")
