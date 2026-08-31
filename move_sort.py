import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Remove Grid/List icons and the vertical divider.
# Also extract the "Sort By" block to move it.
pattern_right_header = r'<!-- Right: View Toggles & Sort By -->(.*?)<!-- 2\. Filter Bar -->'
match = re.search(pattern_right_header, content, flags=re.DOTALL)
if match:
    # Just replace that whole right section in the header with nothing (or empty div if we want)
    content = re.sub(pattern_right_header, '<!-- 2. Filter Bar -->', content, flags=re.DOTALL)

# Now, we need to put the Sort By block back to the end of <!-- 2. Filter Bar -->
# The Filter Bar looks like this:
# <!-- 2. Filter Bar -->
# <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
#   <!-- Left: 3 Filter Buttons -->
#   <div class="flex flex-wrap items-center gap-3">
#      ...
#   </div>
# </div>

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
"""

# Find the end of the Left: 3 Filter Buttons div.
# It's after `<!-- ขนาดลวด Dropdown Pill --> ... </div>` (closing of the relative group)
# Then there's `</div>` (closing of the flex-wrap gap-3 container).
# Let's just search for the end of the 2. Filter Bar container.
# We can do this by regex or string replacement.

# Let's find:
#         </div>
#       </div>
#     </div>
# 
#   <!-- 3. Active Pills Row -->
find_str = """      </div>
    </div>
  </div>

  <!-- 3. Active Pills Row -->"""

replace_str = """      </div>
    </div>
""" + sort_by_html + """
  </div>

  <!-- 3. Active Pills Row -->"""

content = content.replace(find_str, replace_str)

with open(filepath, 'w') as f:
    f.write(content)

print("Moved Sort By back to filter bar row")
