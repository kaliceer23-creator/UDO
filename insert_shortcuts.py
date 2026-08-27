import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

shortcuts_html = """
      <!-- Section: Category Shortcuts -->
      <section class="mb-14 md:mb-20">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          
          <!-- Card 1 (Dark Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อม<br />ไฟฟ้า (MMA)
              </h3>
            </div>
            <!-- Mock Image Placeholder -->
            <div class="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 2 (Light Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อม<br />อาร์กอน (TIG)
              </h3>
            </div>
            <!-- Mock Image Placeholder -->
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 3 (Image Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อม<br />ซีโอทู (MIG)
              </h3>
            </div>
            <!-- Mock Image Placeholder (Image background simulation) -->
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 4 (Light Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ลวดเชื่อม<br />ทุกประเภท
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 5 (Image Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อุปกรณ์ตัด<br />แก๊ส/พลาสม่า
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 6 (Dark Style) -->
          <a href="#" class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-5 left-5 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อะไหล่<br />ปืนเชื่อมต่างๆ
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

        </div>
      </section>
"""

content = content.replace(
    '<!-- Section 2: สินค้าเข้าใหม่ -->',
    shortcuts_html + '\n      <!-- Section 2: สินค้าเข้าใหม่ -->'
)

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)

