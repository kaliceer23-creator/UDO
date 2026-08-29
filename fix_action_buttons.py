import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_actions = """            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button class="border border-[#76b83f] bg-[#76b83f]/10 hover:bg-[#76b83f]/70 hover:text-white text-[#76b83f] font-medium text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า</button>
              <button class="bg-[#76b83f] hover:bg-[#76b83f]/70 text-white font-medium text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
            </div>"""

new_actions = """            <!-- Action Buttons -->
            <div class="flex gap-3 mb-6 h-[52px]">
              <button class="flex-1 border border-[#76b83f] bg-[#76b83f]/10 hover:bg-[#76b83f]/70 hover:text-white text-[#76b83f] font-medium text-[16px] rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า</button>
              <button class="flex-1 bg-[#76b83f] hover:bg-[#76b83f]/70 text-white font-medium text-[16px] rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
              <a href="tel:021234567" class="w-[52px] h-[52px] shrink-0 border border-gray-300 bg-white hover:border-[#76b83f] hover:text-[#76b83f] text-gray-500 rounded flex items-center justify-center transition-colors group" title="โทรสอบถาม">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>"""

content = content.replace(old_actions, new_actions)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated action buttons with phone icon.")
