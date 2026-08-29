import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

cat_start = content.find('<!-- Section: Category Shortcuts (Bento Grid 7 Items) -->')
cat_end = content.find('</section>', cat_start) + 10

new_grid = """      <!-- Section: Category Shortcuts (Bento Grid 8 Items) -->
      <section class="mb-14 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          
          <!-- Row 1 -->
          <!-- Card 1: กลุ่มลวดเชื่อม (Span 2, Dark Style) -->
          <a href="#" class="md:col-span-2 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                กลุ่มลวดเชื่อม
              </h3>
            </div>
            <!-- Mock Image Placeholder -->
            <div class="absolute bottom-0 right-0 w-[50%] h-[80%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 2: เครื่องเชื่อมและเครื่องตัดพลาสม่า (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อมและ<br />เครื่องตัดพลาสม่า
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Row 2 -->
          <!-- Card 3: อุปกรณ์เชื่อมตัดเผาแก๊ส (Span 1, Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อุปกรณ์เชื่อม<br />ตัดเผาแก๊ส
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 4: ท่อบรรจุก๊าซและวาล์ว (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ท่อบรรจุก๊าซ<br />และวาล์ว
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[70%] h-[70%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 5: ใบตัดใบเจียร (Span 1, Dark Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ใบตัดใบเจียร
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Row 3 -->
          <!-- Card 6: อะไหล่สิ้นเปลือง เครื่องเชื่อม-พลาสม่า (Span 1, Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อะไหล่สิ้นเปลือง<br />เครื่องเชื่อม-พลาสม่า
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 7: วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม (Span 1, Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                วัสดุอุปกรณ์เคมีภัณฑ์<br />สำหรับงานเชื่อม
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 8: เครื่องมือช่าง (Span 1, Dark Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 pr-4">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องมือช่าง
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

        </div>
      </section>"""

content = content[:cat_start] + new_grid + content[cat_end:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Categories updated to 8 items while preserving exact beautiful old styles.")
