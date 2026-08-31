import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update Filter Buttons
# Old: border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent
# New: border border-gray-300 text-[16px] font-medium text-[#252525] hover:border-[#333333] transition-colors bg-transparent
old_filter_btn = 'border border-gray-400 text-[13px] font-medium text-black hover:border-black transition-colors bg-transparent'
new_filter_btn = 'border border-gray-300 text-[16px] font-medium text-[#252525] hover:border-[#333333] transition-colors bg-transparent'
content = content.replace(old_filter_btn, new_filter_btn)

# 2. Update Active Pills row (Clear All button and normal pills)
# Clear All Old: border border-gray-400 text-black hover:bg-gray-100
# Clear All New: border border-gray-300 text-[#252525] hover:border-[#333333] hover:bg-gray-100
old_clear = 'border border-gray-400 text-black hover:bg-gray-100 transition-colors shrink-0'
new_clear = 'border border-gray-300 text-[#252525] hover:border-[#333333] hover:bg-gray-100 transition-colors shrink-0'
content = content.replace(old_clear, new_clear)

# Active Pill Old: bg-[#D1D5DB] text-[13px] font-medium text-black
# Active Pill New: bg-gray-100 border border-gray-200 text-[16px] font-medium text-[#252525]
old_pill = 'bg-[#D1D5DB] text-[13px] font-medium text-black'
new_pill = 'bg-gray-100 border border-gray-200 text-[16px] font-medium text-[#252525]'
content = content.replace(old_pill, new_pill)

# Update the SVG colors inside active pills to match
# hover:text-gray-600 -> hover:text-red-500 or just hover:text-black
old_x = 'hover:text-gray-600 transition-colors'
new_x = 'hover:text-red-500 text-gray-400 transition-colors'
content = content.replace(old_x, new_x)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated filter styles in category.js")
