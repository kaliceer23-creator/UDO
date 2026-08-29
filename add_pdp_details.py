import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

details_html = """
            <!-- Product Description & Specs -->
            <div class="mt-6">
              <p class="text-[#252525] text-[14px] leading-relaxed mb-4">
                <span class="font-bold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
              </p>
              
              <ul class="list-disc pl-5 text-[#252525] text-[14px] space-y-1.5 mb-6 marker:text-gray-400">
                <li>หน้าจอขนาดใหญ่ LCD 7.9 นิ้ว</li>
                <li>ความละเอียด Full HD 1080p</li>
                <li>Joy-Con สามารถใช้เป็นเมาส์ได้</li>
                <li>มาพร้อมเกม Mario Kart World</li>
              </ul>
              
              <div class="text-[14px] text-[#252525] font-semibold mb-8">
                **รับประกัน 18 เดือน ศูนย์ไทย ส่งเคลมได้ที่ UDO ทุกสาขา
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center gap-6 mb-8">
              <span class="text-[15px] font-medium text-[#252525]">จำนวน</span>
              <div class="flex items-center border border-gray-300 bg-gray-100 rounded h-10 w-[120px]">
                <button class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#252525] hover:bg-gray-200 transition-colors text-lg rounded-l">-</button>
                <input type="text" value="1" class="w-full h-full text-center border-none bg-transparent focus:outline-none text-[15px] text-[#252525] font-medium">
                <button class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#252525] hover:bg-gray-200 transition-colors text-lg rounded-r">+</button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button class="border border-[#76b83f] bg-[#76b83f]/10 hover:bg-[#76b83f]/20 text-[#76b83f] font-bold text-[16px] py-3.5 rounded transition-colors flex items-center justify-center">หยิบใส่ตะกร้า</button>
              <button class="bg-[#76b83f] hover:bg-[#65a332] text-white font-bold text-[16px] py-3.5 rounded transition-colors shadow-sm flex items-center justify-center">ซื้อสินค้า</button>
            </div>

            <!-- Social Links -->
            <div class="flex items-center gap-8 text-[14px] text-gray-600 border-t border-gray-200 pt-6">
              <button class="flex items-center gap-2 hover:text-[#76b83f] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#76b83f] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                เปรียบเทียบสินค้า
              </button>
              <button class="flex items-center gap-2 hover:text-[#E12427] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#E12427] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                เพิ่มเป็นรายการโปรด
              </button>
              <button class="flex items-center gap-2 hover:text-[#76b83f] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 group-hover:text-[#76b83f] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                แชร์
              </button>
            </div>
"""

# Find the end of the pricing block and insert the new details HTML
target_str = 'ราคาหลังหักส่วนลด\n              </div>\n            </div>'
insert_pos = content.find(target_str) + len(target_str)

new_content = content[:insert_pos] + details_html + content[insert_pos:]

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(new_content)

print("Added product details, quantity, and buttons successfully.")
