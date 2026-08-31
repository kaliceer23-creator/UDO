import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace mb-12 md:mb-16 with mb-16 md:mb-20
content = content.replace('flex-wrap mb-12 md:mb-16">', 'flex-wrap mb-16 md:mb-20">')

with open(filepath, 'w') as f:
    f.write(content)

print("Increased bottom spacing of active pills (space above title)")
