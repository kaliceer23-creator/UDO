import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Remove sticky, top-[64px] and z-40
content = content.replace(
    'class="w-full bg-white mt-16 sticky top-[64px] z-40"',
    'class="w-full bg-white mt-16"'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Removed sticky behavior from tab bar.")
