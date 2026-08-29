import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change aspect-square to aspect-[4/3] (which is a bit wider than a square, common for product photos) 
# Or aspect-[4/5] (a bit taller)
content = content.replace('aspect-square', 'aspect-[4/3]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Changed aspect ratio successfully.")
