import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Revert Title weight back to 600 (font-semibold)
content = content.replace(
    'text-[20px] md:text-[24px] font-bold',
    'text-[20px] md:text-[24px] font-semibold'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted Title weight to 600.")
