import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

grid_start = content.find('<!-- Section: Category Shortcuts (Bento Grid 7 Items) -->')
grid_end = content.find('</section>', grid_start) + 10

new_grid_html = """<!-- Section: Category Shortcuts (Bento Grid 10 Items from old site) -->
      <section class="mb-14 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[140px] md:auto-rows-[160px]">
          
          <!-- Item 1: กลุ่มลวดเชื่อม (Big Hero) -->
          <a href="#" class="md:col-span-2 md:row-span-3 relative w-full h-full bg-gray-900 rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-snug text-center px-6">
              กลุ่มลวดเชื่อม
            </h3>
          </a>

          <!-- Item 2: ท่อบรรจุก๊าซ และวาล์ว -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              ท่อบรรจุก๊าซ และวาล์ว
            </h3>
          </a>

          <!-- Item 3: ใบตัดใบเจียร -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              ใบตัดใบเจียร
            </h3>
          </a>

          <!-- Item 4: อุปกรณ์เชื่อมตัดเผาแก๊ส -->
          <a href="#" class="md:col-span-1 md:row-span-1 relative w-full h-full bg-gray-800 rounded-[16px] lg:rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-snug text-center px-4">
              อุปกรณ์เชื่อมตัดเผาแก๊ส
            </h3>
          </a>

          <!-- Item 5: เครื่องเชื่อมและเครื่องตัดพลาสม่า -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              เครื่องเชื่อมและเครื่องตัดพลาสม่า
            </h3>
          </a>

          <!-- Item 6: อะไหล่สิ้นเปลือง -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม
            </h3>
          </a>

          <!-- Item 7: วัสดุอุปกรณ์เคมีภัณฑ์ -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม
            </h3>
          </a>

          <!-- Item 8: เครื่องมือช่าง -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-900 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <h3 class="relative z-10 text-white font-bold text-[20px] md:text-[24px] leading-snug text-center px-6">
              เครื่องมือช่าง
            </h3>
          </a>

          <!-- Item 9: COMING SOON -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-800/80 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-default pointer-events-none border border-gray-200/20">
            <h3 class="relative z-10 text-white/50 font-bold text-[20px] md:text-[24px] leading-snug text-center px-6 tracking-wider">
              COMING SOON
            </h3>
          </a>

          <!-- Item 10: COMING SOON -->
          <a href="#" class="md:col-span-1 md:row-span-2 relative w-full h-full bg-gray-800/80 rounded-[20px] lg:rounded-[28px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-default pointer-events-none border border-gray-200/20">
            <h3 class="relative z-10 text-white/50 font-bold text-[20px] md:text-[24px] leading-snug text-center px-6 tracking-wider">
              COMING SOON
            </h3>
          </a>

        </div>
      </section>"""

content = content[:grid_start] + new_grid_html + content[grid_end:]
with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Updated Bento Grid categories.")
