import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# I will insert the new Filter pill right after `<div class="flex flex-wrap items-center gap-3">`
filter_pill = """
      <!-- Main Filter Icon Button (Label) -->
      <button class="flex items-center gap-2 px-5 py-2 rounded-lg border border-[#252525] text-[16px] font-medium text-[#252525] bg-transparent cursor-default">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        ตัวกรอง (2)
      </button>
"""

content = content.replace('<div class="flex flex-wrap items-center gap-3">', '<div class="flex flex-wrap items-center gap-3">\n' + filter_pill)

with open(filepath, 'w') as f:
    f.write(content)

print("Added Filter Pill")
