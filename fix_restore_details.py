import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

start_marker = '<!-- Pricing -->'
end_marker = '<!-- ขนาดลวด (Size) -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_html = """<!-- Pricing -->
            <div class="flex flex-col mb-4">
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

            <!-- Warranty / Guarantees -->
            <div class="flex items-center gap-2 mb-4 text-[14px] text-black/60 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              รับประกันสินค้าของแท้ 100%
            </div>

            <!-- Badges -->
            <div class="flex gap-2 mb-6">
              <div class="bg-gray-100 rounded px-3 py-1 flex items-center gap-2 border border-gray-200">
                <span class="text-[13px] font-medium text-[#252525]">ออกใบกำกับภาษีได้</span>
              </div>
              <div class="bg-gray-100 rounded px-3 py-1 flex items-center gap-2 border border-gray-200">
                <span class="text-[13px] font-medium text-[#252525]">จัดส่งด่วนพิเศษ</span>
              </div>
            </div>

            <!-- Short Description -->
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">
              <span class="font-semibold">ลวดเชื่อมพรีเมียม</span> ลวดเชื่อมคุณภาพสูง ควบคุมการหลอมละลายได้ดีเยี่ยม ควันน้อย สะเก็ดไฟน้อย เหมาะสำหรับงานเชื่อมที่ต้องการความเรียบร้อยและแข็งแรงสูง ทนทานต่อการเกิดสนิม และผ่านมาตรฐานอุตสาหกรรม
            </p>

            """

content = content[:start_idx] + new_html + content[end_idx:]

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Restored product details section.")
