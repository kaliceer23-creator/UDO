import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace text-[13px] text-black with text-[15px] text-[#252525] in dropdowns
content = content.replace('text-[13px] text-black', 'text-[15px] text-[#252525]')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated dropdown text styles")
