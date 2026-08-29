import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change paragraph size
content = content.replace(
    '<p class="text-[#252525] text-[14px] leading-relaxed mb-4">',
    '<p class="text-[#252525] text-[16px] leading-relaxed mb-4">'
)

# Change list size
content = content.replace(
    '<ul class="list-disc pl-5 text-[#252525] text-[14px] space-y-1.5 mb-6 marker:text-gray-400">',
    '<ul class="list-disc pl-5 text-[#252525] text-[16px] space-y-1.5 mb-6 marker:text-gray-400">'
)

# Change warranty size
content = content.replace(
    '<div class="text-[14px] text-[#252525] font-semibold mb-8">',
    '<div class="text-[16px] text-[#252525] font-semibold mb-8">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated product details font size to 16px.")
