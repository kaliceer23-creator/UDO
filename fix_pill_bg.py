import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace bg-gray-100 with bg-[#EDEDED] for active pills
# old_pill = 'bg-gray-100 border border-gray-200 text-[16px] font-medium text-[#252525]'
content = content.replace('bg-gray-100 border border-gray-200', 'bg-[#EDEDED] border border-gray-200')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated active pill background color")
