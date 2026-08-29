import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_cap = """            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1 rounded-[4px] bg-[#E12427] border border-[#E12427] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#E12427] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>"""

new_cap = """            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>"""

content = content.replace(old_cap, new_cap)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted capacity buttons to green.")
