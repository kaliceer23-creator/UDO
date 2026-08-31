import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the entire Title and Count block
old_block = """  <!-- 3. Title and Count -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full mb-10">
    <h1 class="text-[26px] font-bold text-[#252525] leading-tight">ลวดเชื่อม (Top Sale)</h1>
    <p class="text-[16px] text-[rgba(0,0,0,0.45)] mt-1">8 รายการ</p>
  </div>"""

new_block = """  <!-- 3. Items Count (Centered) -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex justify-center mb-8">
    <p class="text-[16px] text-[rgba(0,0,0,0.45)]">8 รายการ</p>
  </div>"""

content = content.replace(old_block, new_block)

with open(filepath, 'w') as f:
    f.write(content)

print("Removed title and centered the item count")
