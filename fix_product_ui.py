import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Add "In Stock" badge near the Price
price_block = """            <!-- Pricing -->
            <div class="flex items-end gap-3 mb-2">
              <div class="flex items-baseline gap-1.5">
                <div id="price-display" class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿320</div>
                <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
              </div>
              <span id="original-price-display" class="text-[16px] text-gray-500 line-through mb-1">฿450</span>
            </div>"""

new_price_block = """            <!-- Pricing -->
            <div class="flex flex-col mb-6">
              <div class="flex items-end gap-3 mb-2">
                <div class="flex items-baseline gap-1.5">
                  <div id="price-display" class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿330</div>
                  <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
                </div>
                <span id="original-price-display" class="text-[16px] text-gray-500 line-through mb-1">฿450</span>
              </div>
              <!-- In Stock Badge -->
              <div class="flex items-center gap-1.5 text-[#76b83f] text-[14px] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                มีสินค้าพร้อมจัดส่ง
              </div>
            </div>"""
content = content.replace(price_block, new_price_block)


# 2. Replace Capacity & Color blocks with "ขนาดลวด" and "บรรจุ"
old_ui_start = '<!-- Capacity / บรรจุ -->'
old_ui_end = '<!-- Quantity Selector -->'

start_idx = content.find(old_ui_start)
end_idx = content.find(old_ui_end)

new_ui = """<!-- ขนาดลวด (Size) -->
            <div class="mb-8">
              <div class="flex items-baseline gap-4 mb-4">
                <span class="text-[16px] text-[#252525]">ขนาด</span>
                <span class="text-[16px] font-bold text-[#252525]">2.6 mm</span>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">2.0 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">2.6 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">3.2 mm</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">4.0 mm</button>
              </div>
            </div>

            <!-- บรรจุ (Packaging) -->
            <div class="mb-12">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex flex-wrap items-center gap-3">
                <button id="btn-unit-pack" data-price="330" data-original="450" class="unit-btn px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อละ 1 กก.</button>
                <button id="btn-unit-box" data-price="1,600" data-original="2,200" class="unit-btn px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ห่อละ 5 กก.</button>
              </div>
            </div>

            """
content = content[:start_idx] + new_ui + content[end_idx:]

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Updated Size, Packaging, and Stock UI.")
