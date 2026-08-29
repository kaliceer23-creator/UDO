import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Reduce inner circle size from 28px to 24px
content = content.replace('w-[28px] h-[28px]', 'w-[24px] h-[24px]')

# Increase the white gap (ring-offset) from 2px to 4px
content = content.replace('ring-offset-2', 'ring-offset-[4px]')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated color circle gap.")
