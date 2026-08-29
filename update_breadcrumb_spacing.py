import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Change container from font-medium to font-normal, and gap-2 to gap-4
content = content.replace(
    'py-3 text-[14px] font-medium text-gray-700 flex items-center gap-2',
    'py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4'
)

# 2. Remove font-medium from the active page text
content = content.replace(
    '<span class="text-[#252525] font-medium">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</span>',
    '<span class="text-[#252525]">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</span>'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Breadcrumb gap and font-weight.")
