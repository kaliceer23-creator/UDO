import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

article_section_html = """
    <!-- Section: Articles / Portfolio (Landy Home Style) -->
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

        <!-- Grid Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          <!-- Article 1 -->
          <a href="#" class="group cursor-pointer">
            <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <!-- Optional dark overlay on hover -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              แนะนำ 5 เทคนิคการเชื่อม TIG สำหรับมือใหม่ ให้ได้เกล็ดที่สวยงามและแข็งแรง
            </h3>
          </a>

          <!-- Article 2 -->
          <a href="#" class="group cursor-pointer">
            <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <h3 class="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-[#E32626] transition-colors line-clamp-2 leading-snug">
              การเลือกใช้ลวดเชื่อมฟลักซ์คอร์สให้เหมาะกับเหล็กหนาในงานโครงสร้างขนาดใหญ่
            </h3>
          </a>

          <!-- Article 3 -->
          <a href="#" class="group cursor-pointer">
            <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
              <img src="/images/banners/Banner_0.png" alt="Article 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <!-- Mock Circle play or arrow button like reference (optional) -->
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

        </div>
      </div>
    </section>

"""

# Insert before <!-- Footer -->
content = content.replace(
    '<!-- Footer -->',
    article_section_html + '  <!-- Footer -->'
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

