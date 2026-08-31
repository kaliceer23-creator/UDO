filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Add the 2-level title before the filter bar
title_html = """
  <!-- Page Title (Reference Style) -->
  <div class="w-full flex justify-center items-center gap-4 text-[15px] font-medium text-[#252525] pt-8 pb-8">
    <span class="hover:text-gray-600 cursor-pointer transition-colors">หมวดหมู่สินค้า</span>
    <span class="text-gray-300 font-light">|</span>
    <span class="cursor-pointer">ลวดเชื่อม</span>
  </div>

"""

# We added pt-10 to the filter bar in the last step. Let's remove that pt-10 and use the pt-8 in the title instead.
old_filter_div = '<!-- 2. Filter Bar -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 mb-6">'
new_filter_div = title_html + '<!-- 2. Filter Bar -->\n  <div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-6">'

content = content.replace(old_filter_div, new_filter_div)

with open(filepath, 'w') as f:
    f.write(content)

print("Added title back")
