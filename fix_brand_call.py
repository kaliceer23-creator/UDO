import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

old_brand = """            <!-- Brand Badge -->
            <div class="mb-3 flex items-center gap-3">
              <a href="#" class="inline-block bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">Nintendo</a>
              <span class="text-[13px] text-gray-400">SKU: 4902370553451</span>
            </div>"""

new_brand = """            <!-- Top Row: Brand & Call -->
            <div class="mb-3 flex items-center justify-between">
              <!-- Left: Brand & SKU -->
              <div class="flex items-center gap-3">
                <a href="#" class="inline-block bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-medium px-3 py-1 rounded-[3px] tracking-wide transition-colors uppercase">NINTENDO</a>
                <span class="text-[13px] text-gray-400 hidden sm:inline-block">SKU: 4902370553451</span>
              </div>
              
              <!-- Right: Call Button -->
              <a href="tel:021234567" class="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#76b83f] text-[#76b83f] hover:bg-[#76b83f] hover:text-white rounded-[4px] text-[12px] md:text-[13px] font-medium transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                โทรสอบถาม
              </a>
            </div>"""

content = content.replace(old_brand, new_brand)

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Added call button opposite to the brand.")
