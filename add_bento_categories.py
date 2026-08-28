import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# We will insert this new section right after the Hero Slider Section ends
hero_end = content.find('</section>', content.find('<!-- Hero Slider Section')) + 10

bento_html = """
    <!-- Section: Bento Categories (Landy Home Style) -->
    <section class="max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
        
        <!-- Row 1 -->
        <!-- Card 1: 2/3 width (col-span-4) -->
        <a href="#" class="relative block h-[220px] md:h-[300px] md:col-span-4 bg-[#86BFE6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">กลุ่มลวดเชื่อม</h3>
          </div>
        </a>
        
        <!-- Card 2: 1/3 width (col-span-2) -->
        <a href="#" class="relative block h-[220px] md:h-[300px] md:col-span-2 bg-[#EBF0F5] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">ท่อบรรจุก๊าซ<br>และวาล์ว</h3>
          </div>
        </a>
        
        <!-- Row 2 -->
        <!-- Card 3: Full width (col-span-6) -->
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-6 bg-[#332E2C] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">เครื่องเชื่อมและ<br>เครื่องตัดพลาสม่า</h3>
          </div>
        </a>
        
        <!-- Row 3 -->
        <!-- Card 4, 5, 6: 1/3 width each (col-span-2) -->
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#1A1A1A] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-white leading-tight">ขั้นตอน<br>การใช้งาน</h3>
          </div>
        </a>
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#F3F4F6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">อุปกรณ์เชื่อม<br>ตัดเผาแก๊ส</h3>
          </div>
        </a>
        <a href="#" class="relative block h-[240px] md:h-[320px] md:col-span-2 bg-[#EAE8E3] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">ใบตัดใบเจียร</h3>
          </div>
        </a>
        
        <!-- Row 4 -->
        <!-- Card 7, 8: 1/2 width each (col-span-3) -->
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-3 bg-[#EAF0EC] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">อะไหล่สิ้นเปลือง</h3>
          </div>
        </a>
        <a href="#" class="relative block h-[200px] md:h-[260px] md:col-span-3 bg-[#F0EBE6] rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <h3 class="text-[22px] md:text-[28px] font-bold text-gray-900 leading-tight">เครื่องมือช่าง</h3>
          </div>
        </a>
        
      </div>
    </section>
"""

content = content[:hero_end] + "\n" + bento_html + content[hero_end:]

with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
    f.write(content)
print("Bento categories added.")
