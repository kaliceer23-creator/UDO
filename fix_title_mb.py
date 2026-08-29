import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change mb-4 to mb-6
content = content.replace(
    '<h2 class="text-[22px] font-bold text-[#252525] mb-4">คุณสมบัติสินค้า</h2>',
    '<h2 class="text-[22px] font-bold text-[#252525] mb-6">คุณสมบัติสินค้า</h2>'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Adjusted title margin to mb-6.")
