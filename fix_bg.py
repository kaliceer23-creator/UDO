import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace bg-[#FAFAFA] with bg-white in the main tag
content = content.replace('<main class="w-full bg-[#FAFAFA] pb-20 min-h-screen">', '<main class="w-full bg-white pb-20 min-h-screen">')

with open(filepath, 'w') as f:
    f.write(content)

print("Changed background to white")
