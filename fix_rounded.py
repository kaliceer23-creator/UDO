import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update Filter Buttons
# Inactive filter button: <button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-full border border-[#252525] ...
content = content.replace('rounded-full border border-[#252525]', 'rounded-lg border border-[#252525]')

# Active filter button: <button class="filter-btn flex items-center gap-2 px-5 py-2 rounded-full border border-brand-green ...
content = content.replace('rounded-full border border-brand-green', 'rounded-lg border border-brand-green')

# 2. Update Active Pills row
# Active Pills: <div class="flex items-center gap-2 bg-[#EDEDED] border border-gray-200 px-3 py-1 rounded-full ...
content = content.replace('px-3 py-1 rounded-full text-[14px]', 'px-3 py-1.5 rounded-lg text-[14px]')

# 3. Update Clear All Circle (X Circle)
# <button class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 ...
# Should it remain a circle or become a square? "สี่เหลี่ยมมุมมนทั้งหมด" -> probably rounded-lg too.
content = content.replace('w-8 h-8 rounded-full border border-gray-300', 'w-8 h-8 rounded-lg border border-gray-300')


with open(filepath, 'w') as f:
    f.write(content)

print("Changed rounded-full to rounded-lg")
