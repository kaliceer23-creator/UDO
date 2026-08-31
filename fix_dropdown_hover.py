import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update the dropdown container padding
content = content.replace('<div class="py-2 max-h-[250px] overflow-y-auto">', '<div class="p-2 max-h-[250px] overflow-y-auto">')

# 2. Update the label styling to match mega menu
old_label = '<label class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">'
new_label = '<label class="flex items-center gap-3 px-3 py-2.5 mb-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">'
content = content.replace(old_label, new_label)

# 3. Increase font size inside dropdown to 16px to match mega menu
old_text = '<span class="text-[15px] text-[#252525]">'
new_text = '<span class="text-[16px] text-[#252525]">'
content = content.replace(old_text, new_text)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated dropdown hover styles")
