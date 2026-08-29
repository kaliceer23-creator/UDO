import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Remove ' p-1' from all thumbnail wrappers
content = content.replace('cursor-pointer p-1">', 'cursor-pointer">')
content = content.replace('hover:opacity-100 p-1">', 'hover:opacity-100">')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Removed thumbnail padding.")
