import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace pt-10 with pt-16 md:pt-20 for a very large top spacing
content = content.replace('gap-6 pt-10 mb-4', 'gap-6 pt-16 md:pt-20 mb-4')

with open(filepath, 'w') as f:
    f.write(content)

print("Increased top spacing of filter bar")
