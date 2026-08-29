import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Replace Active button
content = content.replace(
    'class="min-w-[80px] px-5 py-2.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[15px] shadow-sm transition-colors"',
    'class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors"'
)

# Replace Inactive button
content = content.replace(
    'class="min-w-[80px] px-5 py-2.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[15px] hover:border-[#76b83f] transition-colors"',
    'class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors"'
)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Capacity buttons size.")
