import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace Title
content = content.replace('text-[24px] md:text-[28px] font-bold text-[#252525]', 'text-[26px] font-bold text-[#252525]')

# Replace Count
content = content.replace('text-[14px] text-gray-500 mt-1', 'text-[16px] text-[rgba(0,0,0,0.45)] mt-1')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated Title and Count styles")
