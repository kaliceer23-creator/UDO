import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Breadcrumb background
content = content.replace('<div class="bg-[#e9e9e9] border-b border-gray-200">', '<div class="bg-white border-b border-gray-200">')

# Change Main background
content = content.replace('<main class="bg-[#e9e9e9] min-h-screen pb-24 pt-6">', '<main class="bg-white min-h-screen pb-24 pt-6">')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Changed background to white successfully.")
