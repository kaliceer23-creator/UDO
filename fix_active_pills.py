import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update the active pill container (smaller padding, smaller text)
old_pill_container = 'gap-1.5 bg-[#EDEDED] border border-gray-200 px-3 py-1.5 rounded-full text-[16px] font-medium text-[#252525]'
new_pill_container = 'gap-2 bg-[#EDEDED] border border-gray-200 px-3 py-1 rounded-full text-[14px] font-medium text-[#252525]'
content = content.replace(old_pill_container, new_pill_container)

# 2. Update the X button inside the pills (same color as text, bigger SVG)
# The button:
old_x_btn = 'hover:text-red-500 text-gray-400 transition-colors'
new_x_btn = 'text-[#252525] hover:text-red-500 transition-colors'
content = content.replace(old_x_btn, new_x_btn)

# The SVG size:
old_svg = '<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">'
new_svg = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">'
# Careful, this might replace the X in the "Clear All" button too.
# The Clear all button has class="w-4 h-4" stroke-width="2". 
# But wait, it's safer to just replace it generally if it matches.
# Let's target the exact blocks.
content = content.replace(old_svg, new_svg)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated active pills styling")
