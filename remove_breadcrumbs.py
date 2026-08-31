import re

filepath = '/Users/aliceer/UDO/frontend/src/category.js'
with open(filepath, 'r') as f:
    content = f.read()

# Locate the breadcrumbs section
# <!-- 1. Centered Breadcrumbs -->
#   <div class="w-full flex justify-center items-center gap-4 text-[13px] text-gray-600 pt-10 mb-10">
#     <a href="/" class="hover:text-black">หน้าแรก</a>
#     <span class="text-gray-400">|</span>
#     <a href="#" class="hover:text-black">หมวดหมู่สินค้า</a>
#     <span class="text-gray-400">|</span>
#     <span class="font-medium text-black">ลวดเชื่อม</span>
#   </div>

pattern = r'<!-- 1\. Centered Breadcrumbs -->.*?</div>'
content = re.sub(pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Removed breadcrumbs")
