import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace the text size for the short description
old_p = '<p class="text-[14px] text-gray-600 mb-6 leading-relaxed">'
new_p = '<p class="text-[16px] text-[#252525] mb-6 leading-[1.6]">'

content = content.replace(old_p, new_p)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated description text size to 16px.")
