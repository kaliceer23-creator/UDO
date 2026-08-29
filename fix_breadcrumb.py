import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Remove bottom border
content = content.replace(
    '<div class="bg-white border-b border-gray-200">',
    '<div class="bg-white">'
)

# 2. Change text-[13px] to text-[14px] and add font-medium to the container
content = content.replace(
    'py-3 text-[13px] text-gray-700 flex',
    'py-3 text-[14px] font-medium text-gray-700 flex'
)

# 3. Change separator back to gray (text-gray-400)
content = content.replace(
    '<span class="text-black/45">&gt;</span>',
    '<span class="text-gray-400">&gt;</span>'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Fixed Breadcrumb styling successfully.")
