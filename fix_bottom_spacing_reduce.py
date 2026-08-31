import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace mb-16 md:mb-20 with mb-12 md:mb-16
content = content.replace('flex-wrap mb-16 md:mb-20">', 'flex-wrap mb-12 md:mb-16">')

with open(filepath, 'w') as f:
    f.write(content)

print("Reduced bottom spacing of active pills a little bit")
