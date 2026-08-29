import re

with open('/Users/aliceer/UDO/frontend/src/product.js', 'r') as f:
    content = f.read()

# 1. Restore the HTML from Title down to the end of the Color mockup.
start_marker = '<h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">'
end_marker = '<!-- Quantity Selector -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

reverted_html = """<h1 class="text-[20px] md:text-[24px] font-semibold text-[#252525] leading-tight mb-2">เครื่องเล่นเกม Nintendo Switch 2 + Mario Kart World Bundle</h1>
            
            <div class="text-[14px] text-black/45 mb-6 flex items-center gap-4">
              <span>แบรนด์: <a href="#" class="text-[#252525] font-medium hover:underline">NINTENDO</a></span>
              <span class="text-black/45">|</span>
              <span>SKU: 4902370553451</span>
            </div>

            <!-- Pricing -->
            <div class="flex items-end gap-3 mb-2">
              <div class="flex items-baseline gap-1.5">
                <div class="text-[30px] md:text-[34px] font-medium text-[#E12427] leading-none">฿18,412</div>
                <span class="text-black/45 text-[15px] font-medium">/ห่อ</span>
              </div>
              <div class="text-[18px] text-black/45 line-through mb-1">฿18,000</div>
              <div class="text-[#E12427] text-[13px] border border-[#E12427] rounded px-2 py-0.5 mb-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                ราคาหลังหักส่วนลด
              </div>
            </div>

            <!-- Installment -->
            <div class="flex items-center gap-2 mb-6 text-[13px] text-black/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              รับประกัน 1 ปี
            </div>

            <!-- Badges -->
            <div class="flex gap-2 mb-8">
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">ดูเพิ่มเติม</span>
              </div>
              <div class="bg-[#F8F9FA] rounded px-3 py-1 flex items-center gap-2 border border-black/5">
                <span class="text-[13px] font-medium text-[#252525]">iCare</span>
              </div>
            </div>

            <p class="text-[14px] text-gray-600 mb-6 leading-relaxed">
              <span class="font-semibold">เครื่องเล่นเกม Nintendo Switch 2</span> พลิกโฉมประสบการณ์การเล่นเกม ที่ UDO ด้วยการอัปเกรดครั้งใหญ่ทั้งในด้านประสิทธิภาพ และหน้าจอใหญ่ขึ้น สีสันสดใส เล่นเกมได้อย่างลื่นไหล พร้อม Joy-Con รุ่นใหม่ที่ติดแน่นกับตัวเครื่องด้วยแรงแม่เหล็ก สนุกไปกับเกมใหม่ ๆ ที่เล่นได้เฉพาะบน Nintendo Switch 2
            </p>

            <!-- Capacity / บรรจุ -->
            <div class="mb-10">
              <span class="block text-[16px] text-[#252525] mb-4">บรรจุ</span>
              <div class="flex items-center gap-3">
                <button class="px-4 py-1.5 rounded-[4px] bg-[#76b83f] border border-[#76b83f] text-white font-medium text-[14px] shadow-sm transition-colors">ห่อ</button>
                <button class="px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-[#252525] font-medium text-[14px] hover:border-[#76b83f] transition-colors">ลัง (4 ห่อ)</button>
              </div>
            </div>

            <!-- Color Selection (Mockup) -->
            <div class="mb-12">
              <div class="flex items-baseline gap-4 mb-5">
                <span class="text-[16px] text-[#252525]">สี</span>
                <span class="text-[16px] font-bold text-[#252525]">ดำ</span>
              </div>
              <div class="flex items-center gap-5">
                <button class="w-[24px] h-[24px] rounded-full bg-[#1c1c1c] ring-[1.5px] ring-offset-[4px] ring-[#252525]"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#efefef] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#a9b9cc] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#beb6c8] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
                <button class="w-[24px] h-[24px] rounded-full bg-[#aab38d] border border-gray-300 hover:ring-[1.5px] hover:ring-offset-[4px] hover:ring-gray-300 transition-all"></button>
              </div>
            </div>

            """
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + reverted_html + content[end_idx:]

# 2. Delete the JS Logic at the bottom
js_start = '// --- Interactive Logic ---'
js_idx = content.find(js_start)

if js_idx != -1:
    content = content[:js_idx] # Keep everything before JS

# Also remove the IDs from Quantity just in case
content = content.replace('id="btn-qty-minus" ', '')
content = content.replace('id="qty-display" ', '')
content = content.replace('id="btn-qty-plus" ', '')

with open('/Users/aliceer/UDO/frontend/src/product.js', 'w') as f:
    f.write(content)

print("Reverted completely back to the pristine Nintendo Switch state.")
