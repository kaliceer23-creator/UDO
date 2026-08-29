import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace all w-[34px] h-[34px] with w-[26px] h-[26px]
content = content.replace('w-[34px] h-[34px]', 'w-[28px] h-[28px]')

# Replace ring-offset-[4px] with ring-offset-[2px]
content = content.replace('ring-offset-[4px]', 'ring-offset-2')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Color circles size.")
