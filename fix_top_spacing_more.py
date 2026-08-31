import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace pt-16 md:pt-20 with pt-20 md:pt-32
content = content.replace('gap-6 pt-16 md:pt-20 mb-4', 'gap-6 pt-20 md:pt-32 mb-4')

with open(filepath, 'w') as f:
    f.write(content)

print("Increased top spacing even more")
