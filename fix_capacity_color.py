import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# Find the Unit Selector block
start_marker = '<!-- Unit Selector -->'
end_marker = '<!-- Quantity Selector -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = """<!-- Capacity / บรรจุ -->
            <div class="mb-6">
              <span class="block text-[16px] text-[#252525] mb-3">บรรจุ</span>
              <div class="flex items-center gap-3">
                <!-- Active Button (Solid Green) -->
                <button class="min-w-[80px] px-5 py-2.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[15px] shadow-sm transition-colors">ห่อ</button>
                <!-- Inactive Button (White with Border) -->
                <button class="min-w-[80px] px-5 py-2.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[15px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>

            <!-- Color Selection (Mockup) -->
            <div class="mb-10">
              <div class="flex items-baseline gap-2 mb-4">
                <span class="text-[16px] text-[#252525]">สี</span>
                <span class="text-[16px] font-bold text-[#252525]">ดำ</span>
              </div>
              <div class="flex items-center gap-5">
                <!-- Active Color (Black with Ring) -->
                <button class="w-[34px] h-[34px] rounded-full bg-[#1c1c1c] ring-[1.5px] ring-offset-[4px] ring-[#252525]"></button>
                
                <!-- Inactive Color (Silver) -->
                <button class="w-[34px] h-[34px] rounded-full bg-[#efefef] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                
                <!-- Inactive Color (Blue) -->
                <button class="w-[34px] h-[34px] rounded-full bg-[#a9b9cc] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                
                <!-- Inactive Color (Purple) -->
                <button class="w-[34px] h-[34px] rounded-full bg-[#beb6c8] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>

                <!-- Inactive Color (Green/Olive) -->
                <button class="w-[34px] h-[34px] rounded-full bg-[#aab38d] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
              </div>
            </div>

            """
    new_content = content[:start_idx] + new_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(new_content)
    print("Updated Capacity and Color sections.")
else:
    print("Could not find Unit Selector block.")
