import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change the Specs Section wrapper background to #F8F8F8
content = content.replace(
    '<div class="w-full bg-white py-12 border-b border-gray-200">',
    '<div class="w-full bg-[#F8F8F8] py-12 border-b border-gray-200">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated section background to #F8F8F8.")
