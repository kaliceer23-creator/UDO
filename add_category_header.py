import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. We will insert the new header BEFORE <!-- 2. Filter Bar -->
new_header = """
  <!-- 1. Category Title & View Controls -->
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex items-end justify-between pt-10 mb-6">
    <!-- Left: Title and Count -->
    <div>
      <h1 class="text-[24px] md:text-[28px] font-bold text-[#252525] leading-tight">ลวดเชื่อม (Top Sale)</h1>
      <p class="text-[14px] text-gray-500 mt-1">8 รายการ</p>
    </div>

    <!-- Right: View Toggles & Sort By -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Grid/List Toggles -->
      <div class="flex items-center gap-1">
        <!-- Grid Active -->
        <button class="w-10 h-10 bg-[#252525] text-white rounded-[4px] flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        </button>
        <!-- List Inactive -->
        <button class="w-10 h-10 text-gray-400 hover:text-[#252525] rounded-[4px] flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="h-6 w-px bg-gray-300 mx-1"></div>

      <!-- Sort By -->
      <div class="relative group/sort cursor-pointer">
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
  </div>

"""

content = content.replace('<!-- 2. Filter Bar -->', new_header + '  <!-- 2. Filter Bar -->')

# The filter bar container no longer needs pt-10, just mb-6
content = content.replace('gap-6 pt-10 mb-6', 'gap-6 mb-6')

# 2. Remove the old "Sort By" from the filter bar
old_sort_html = r'<!-- Right: Sort By -->.*?</div>\s*</div>\s*</div>'
content = re.sub(old_sort_html, '</div>\n  </div>', content, flags=re.DOTALL)

# 3. Remove the centered "8 Items" count
old_count_html = r'<!-- 4\. Items count -->.*?</div>'
content = re.sub(old_count_html, '', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Added title/sort header row")
