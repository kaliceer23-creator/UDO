import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Tab bar
content = content.replace('bg-[#f2f2f2] border-y border-gray-200 mt-16 sticky', 'bg-[#E5E5E5] mt-16 sticky')

# Section BG
content = content.replace('bg-[#e3e3e3] py-12', 'bg-[#D4D4D4] py-12')

# Rows
content = content.replace('bg-[#d4d4d4]', 'bg-[#E5E5E5]')
content = content.replace('bg-[#dedede]', 'bg-transparent')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Exact colors applied.")
