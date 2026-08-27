import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_marker = '<!-- Section: Articles / Portfolio (Landy Home Style) -->'
end_marker = '<!-- Footer -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    articles_html = """<!-- Section: Articles / Portfolio (Landy Home Style) -->
    <section class="w-full bg-[#f8f9fa] py-14 md:py-20 mt-10 md:mt-16">
      <div class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8 md:mb-10">
          <h2 class="text-[28px] md:text-[34px] font-bold tracking-tight">
            <span class="text-gray-900">เทคนิค</span><span class="text-[#E32626]">งานเชื่อม</span>
          </h2>
          <a href="#" class="text-[15px] font-semibold text-gray-800 hover:text-[#E32626] transition-colors flex items-center gap-1">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Horizontal Slider (Cut-off style) -->
        <div class="flex items-start gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          
          <!-- Article 1 -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              แนะนำ 5 เทคนิคการเชื่อม TIG สำหรับมือใหม่ ให้ได้เกล็ดที่สวยงามและแข็งแรง
            </h3>
          </a>

          <!-- Article 2 -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              การเลือกใช้ลวดเชื่อมฟลักซ์คอร์สให้เหมาะกับเหล็กหนาในงานโครงสร้างขนาดใหญ่
            </h3>
          </a>

          <!-- Article 3 (This one will be cut off on desktop) -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div class="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              รีวิวการใช้งานตู้เชื่อมซีโอทู (MIG) ช่วยลดต้นทุนการผลิตในโรงงานอุตสาหกรรม
            </h3>
          </a>
          
          <!-- Article 4 (Extra card to allow scrolling further) -->
          <a href="#" class="snap-start shrink-0 w-[85%] md:w-[60%] lg:w-[42%] group cursor-pointer">
            <div class="w-full aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 4" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              เจาะลึก 3 ข้อควรระวังในการเชื่อมเหล็กหล่อ เพื่อป้องกันรอยแตกร้าว
            </h3>
          </a>

        </div>
      </div>
    </section>

"""

    new_content = content[:start_idx] + articles_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(new_content)
        print("Success")
else:
    print("Markers not found.")
