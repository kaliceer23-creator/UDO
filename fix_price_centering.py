import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace Brand block margin
old_brand = '<div class="text-[14px] text-black/45 mb-6 flex items-center gap-4">'
new_brand = '<div class="text-[14px] text-black/45 mb-5 flex items-center gap-4">'
content = content.replace(old_brand, new_brand)

# Replace Pricing block margin
old_price = '<div class="flex items-end gap-3 mb-2">'
new_price = '<div class="flex items-end gap-3 mb-5">'
content = content.replace(old_price, new_price)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Pricing block spacing to be perfectly centered.")
