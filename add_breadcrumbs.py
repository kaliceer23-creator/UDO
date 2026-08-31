import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# We need to inject the breadcrumbs right after <main class="..."> and before <!-- 1. Filter Bar & Sort By -->
breadcrumbs_html = """  <!-- Breadcrumbs -->
  <div class="bg-white">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">
      <a href="/" class="hover:text-brand-red">หน้าหลัก</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-brand-red">เครื่องมือช่างและฮาร์ดแวร์</a>
      <span class="text-gray-400">&gt;</span>
      <a href="#" class="hover:text-brand-red">เครื่องเชื่อมและอุปกรณ์</a>
      <span class="text-gray-400">&gt;</span>
      <span class="text-[#252525]">ลวดเชื่อม</span>
    </div>
  </div>

"""

# Let's replace the first part of the main section
pattern = r'(<main class="w-full bg-\[#FAFAFA\] pb-20 min-h-screen">)'
content = re.sub(pattern, r'\1\n' + breadcrumbs_html, content, count=1)

with open(filepath, 'w') as f:
    f.write(content)

print("Added breadcrumbs successfully")
