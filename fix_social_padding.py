import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_social = '<div class="flex items-center justify-between text-[16px] font-medium text-[#252525] border-t border-gray-200 pt-6">'
new_social = '<div class="flex items-center justify-between text-[16px] font-medium text-[#252525] border-t border-gray-200 pt-4">'

content = content.replace(old_social, new_social)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated social links padding-top to pt-4.")
