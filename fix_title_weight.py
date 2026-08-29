import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Change Title weight to 700 (font-bold)
content = content.replace(
    'text-[20px] md:text-[24px] font-semibold',
    'text-[20px] md:text-[24px] font-bold'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Title weight to 700.")
