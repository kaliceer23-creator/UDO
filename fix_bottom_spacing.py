import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace mb-10 with mb-16 md:mb-20 for larger bottom spacing
content = content.replace('gap-3 flex-wrap mb-10">', 'gap-3 flex-wrap mb-16 md:mb-20">')

with open(filepath, 'w') as f:
    f.write(content)

print("Increased bottom spacing of active pills")
