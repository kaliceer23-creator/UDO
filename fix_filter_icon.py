import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

old_pill = """      <!-- Main Filter Icon Button (Label) -->
      <button class="flex items-center gap-2 px-5 py-2 rounded-lg border border-[#252525] text-[16px] font-medium text-[#252525] bg-transparent cursor-default">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        ตัวกรอง (2)
      </button>"""

new_pill = """      <!-- Main Filter Icon Button (Just Icon) -->
      <button class="flex items-center justify-center w-10 h-10 text-[#252525] hover:bg-gray-100 rounded-lg transition-colors shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      </button>"""

content = content.replace(old_pill, new_pill)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated Filter Icon to be borderless and textless")
