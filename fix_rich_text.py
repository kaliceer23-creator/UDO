import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

content = content.replace(
    'class="text-[20px] md:text-[22px] font-bold text-[#252525] mb-4">เมื่อเป็น 2',
    'class="text-[19px] font-semibold text-[#252525] mb-4">เมื่อเป็น 2'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated text size and weight.")
