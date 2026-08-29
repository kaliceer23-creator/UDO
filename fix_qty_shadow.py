import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace(
    'bg-white border border-gray-300 rounded-[4px] shadow-sm',
    'bg-white border border-gray-300 rounded-[4px]'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Removed shadow-sm from quantity box.")
