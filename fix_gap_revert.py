import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('gap-4 md:gap-5', 'gap-3')
content = content.replace('<div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-4 flex-wrap mb-12">', '<div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-3 flex-wrap mb-10">')

with open(filepath, 'w') as f:
    f.write(content)

print("Reverted gaps back to gap-3")
