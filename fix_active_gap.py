import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# The container for the active pills
old_div = '<div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-3 flex-wrap mb-10">'
new_div = '<div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-center gap-4 flex-wrap mb-12">'

content = content.replace(old_div, new_div, 1)

with open(filepath, 'w') as f:
    f.write(content)

print("Increased gap for active pills")
