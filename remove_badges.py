import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Define the exact block to remove
badges_block = """            <!-- Badges -->
            <div class="flex gap-2 mb-8">
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">ดูเพิ่มเติม</span>
              </div>
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">iCare</span>
              </div>
            </div>"""

content = content.replace(badges_block, "")

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Removed badges section.")
