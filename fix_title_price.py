import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Title: increase weight to semibold (600)
content = content.replace(
    'font-medium text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch',
    'font-semibold text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch'
)

# 2. Price: decrease weight to medium (500)
content = content.replace(
    'font-bold text-[#E12427] leading-none">฿18,412',
    'font-medium text-[#E12427] leading-none">฿18,412'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Title and Price font weights.")
