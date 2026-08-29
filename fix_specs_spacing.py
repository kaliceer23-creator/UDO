import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Reduce title margin (mb-8 -> mb-4)
content = content.replace(
    '<h2 class="text-[22px] font-bold text-[#252525] mb-8">คุณสมบัติสินค้า</h2>',
    '<h2 class="text-[22px] font-bold text-[#252525] mb-4">คุณสมบัติสินค้า</h2>'
)

# 2. Reduce row padding (py-3.5 -> py-2)
content = content.replace('py-3.5 px-6', 'py-2 px-6')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reduced table row padding and title margin.")
