import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

start_marker = '<!-- Pricing -->'
end_marker = '<!-- ขนาดลวด (Size) -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_price_html = """<!-- Pricing -->
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
            </div>

            """
    content = content[:start_idx] + new_price_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
        f.write(content)
    print("Fixed Price HTML.")
else:
    print("Markers not found.")
