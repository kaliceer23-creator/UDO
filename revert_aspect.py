import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace('aspect-[4/3]', 'aspect-square')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted aspect ratio back to square successfully.")
