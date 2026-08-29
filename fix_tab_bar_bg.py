import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Force the tab bar to be bg-white and remove any border if any
content = re.sub(
    r'<div class="w-full bg-\[[^\]]+\] mt-16 sticky top-\[64px\] z-40">',
    '<div class="w-full bg-white mt-16 sticky top-[64px] z-40">',
    content
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed tab bar background to white.")
