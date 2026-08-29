import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_bc = """  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <!-- Breadcrumb -->
    <div class="bg-white">"""

new_bc = """  <!-- 3. พื้นที่เนื้อหาหลัก (Main Content) -->
  <!-- Breadcrumb -->
    <div class="bg-white border-b border-black/5">"""

content = content.replace(old_bc, new_bc)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Added separator line under breadcrumb.")
