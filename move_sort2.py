import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

sort_by_html = """
    <!-- Right: Sort By -->
    <div class="relative group/sort cursor-pointer ml-auto">
      <div class="flex items-center gap-2 text-[15px] text-[#252525] hover:text-brand-red transition-colors">
        เรียงตาม: <span class="font-medium">เกี่ยวข้อง</span> 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <!-- Dropdown -->
      <div class="absolute right-0 top-full mt-2 w-[180px] bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg py-2 hidden group-hover/sort:block z-40 text-left">
        <a href="#" class="block px-4 py-2 text-[14px] text-[#252525] bg-gray-50 font-medium">เกี่ยวข้อง</a>
        <a href="#" class="block px-4 py-2 text-[14px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: ต่ำไปสูง</a>
        <a href="#" class="block px-4 py-2 text-[14px] text-gray-600 hover:text-[#252525] hover:bg-gray-50">ราคา: สูงไปต่ำ</a>
      </div>
    </div>
  </div>
"""

# The section currently ends with:
#       </div>
#     </div>
# 
#     </div>
#   </div>
#
#   <!-- 3. Active Pills Row -->

pattern = r'      </div>\s*</div>\s*</div>\s*</div>\s*<!-- 3\. Active Pills Row -->'
replacement = f'      </div>\n    </div>\n{sort_by_html}\n  <!-- 3. Active Pills Row -->'
content = re.sub(pattern, replacement, content)

with open(filepath, 'w') as f:
    f.write(content)

print("Moved Sort By perfectly")
