import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Add ID to Minus
content = content.replace(
    '<button class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">',
    '<button id="btn-qty-minus" class="flex items-center justify-center text-gray-300 hover:text-gray-400 transition-colors cursor-not-allowed">'
)

# Add ID to Number Box
content = content.replace(
    '<div class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">',
    '<div id="qty-display" class="w-[70px] h-[40px] flex items-center justify-center font-medium text-[16px] text-[#252525] bg-white border border-gray-300 rounded-[4px]">'
)

# Add ID to Plus
content = content.replace(
    '<button class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">',
    '<button id="btn-qty-plus" class="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Added IDs to Quantity elements.")
