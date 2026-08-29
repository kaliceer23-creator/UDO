import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace(
    '<h3 class="text-[24px] md:text-[28px] font-bold text-[#252525] mb-8">',
    '<h3 class="text-[24px] font-semibold text-[#252525] mb-8">'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated rich content main headline.")
