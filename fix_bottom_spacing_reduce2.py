import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace mb-12 md:mb-16 with mb-8 md:mb-10
content = content.replace('flex-wrap mb-12 md:mb-16">', 'flex-wrap mb-8 md:mb-10">')

with open(filepath, 'w') as f:
    f.write(content)

print("Reduced bottom spacing of active pills to pull the item count up")
