import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace border-gray-300 with border-[#252525] for the filter buttons
old_btn = 'border border-gray-300 text-[16px] font-medium text-[#252525] hover:border-[#333333] transition-colors bg-transparent'
new_btn = 'border border-[#252525] text-[16px] font-medium text-[#252525] hover:border-brand-red transition-colors bg-transparent'

content = content.replace(old_btn, new_btn)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated filter button border color")
