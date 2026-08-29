import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_badge = '<div class="text-[#E12427] text-[13px] font-medium bg-red-100 border-0 rounded px-2.5 py-0.5 mb-1 flex items-center gap-1" style="border: none !important; outline: none;">'
new_badge = '<div class="text-[#E12427] text-[13px] font-medium bg-[#E12427]/10 border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">'

content = content.replace(old_badge, new_badge)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated discount badge with red border and red background.")
