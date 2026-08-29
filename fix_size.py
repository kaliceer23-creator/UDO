import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Price: change md:text-[42px] to text-[34px] (and mobile to 30px)
content = content.replace(
    'text-[36px] md:text-[42px] font-medium',
    'text-[30px] md:text-[34px] font-medium'
)

# 2. Title: reduce from 32px to 26px (and mobile to 22px)
content = content.replace(
    'text-[26px] md:text-[32px] font-semibold',
    'text-[22px] md:text-[28px] font-semibold'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated text sizes.")
