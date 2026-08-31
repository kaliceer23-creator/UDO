import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Change "นำไปใช้" to "ดูสินค้า"
content = content.replace('นำไปใช้', 'ดูสินค้า')

# 2. Remove top border and match background
# Old: class="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50"
# New: class="flex items-center justify-between px-4 pb-3 pt-1 bg-white"
content = content.replace('flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50', 'flex items-center justify-between px-4 pb-4 pt-2 bg-white')

# 3. Change hover logic to click logic
# Remove group/filter from the wrapper
content = content.replace('group/filter', '')

# Remove group-hover/filter:block from the dropdowns
content = content.replace('hidden group-hover/filter:block', 'hidden filter-dropdown')

# Add a class to the buttons so we can attach click events
content = content.replace('<button class="flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525]', '<button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525]')
content = content.replace('<button class="flex items-center gap-2 px-5 py-2 rounded-full border border-brand-green', '<button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-full border border-brand-green')

with open(filepath, 'w') as f:
    f.write(content)

print("HTML structure updated for click logic")
