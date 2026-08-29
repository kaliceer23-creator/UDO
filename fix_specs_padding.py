import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change py-12 to py-16
content = content.replace(
    '<div class="w-full bg-[#F8F8F8] py-12 border-b border-gray-200">',
    '<div class="w-full bg-[#F8F8F8] py-16 border-b border-gray-200">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Increased vertical padding of Specs section to py-16.")
