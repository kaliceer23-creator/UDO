import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace py-1.5 with py-1 for both capacity buttons
old_active = '<button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>'
new_active = '<button class="px-4 py-1 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>'

old_inactive = '<button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>'
new_inactive = '<button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>'

content = content.replace(old_active, new_active)
content = content.replace(old_inactive, new_inactive)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reduced height of capacity buttons.")
