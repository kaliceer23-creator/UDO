import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Title to 24px
content = content.replace(
    'text-[22px] md:text-[28px] font-semibold',
    'text-[20px] md:text-[24px] font-semibold'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Title size to 24px.")
