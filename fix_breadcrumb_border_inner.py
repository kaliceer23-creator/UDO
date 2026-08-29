import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_bc = """  <!-- Breadcrumb -->
    <div class="bg-white border-b border-black/5">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap">"""

new_bc = """  <!-- Breadcrumb -->
    <div class="bg-white">
      <div class="max-w-[1250px] mx-auto px-4 md:px-8 py-3 text-[14px] font-normal text-gray-700 flex items-center gap-4 overflow-x-auto whitespace-nowrap border-b border-black/10">"""

content = content.replace(old_bc, new_bc)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Moved border to inner container.")
