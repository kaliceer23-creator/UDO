import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

# We need to replace the entire <section class="mb-14 md:mb-20"> containing the Category Shortcuts.
# Since it's hard to regex the whole block perfectly, we'll use string splitting or precise regex.

# Let's find the start of the section
start_marker = '<!-- Section: Category Shortcuts -->'
end_marker = '<!-- Section 2: สินค้าเข้าใหม่ -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    bento_html = """<!-- Section: Category Shortcuts (Bento Grid 7 Items) -->
      <section class="mb-14 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          
          <!-- Card 1: Span 2 (Dark Style) -->
          <a href="#" class="md:col-span-2 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อมไฟฟ้า (MMA)<br />คุณภาพสูงระดับอุตสาหกรรม
              </h3>
            </div>
            <!-- Mock Image Placeholder -->
            <div class="absolute bottom-0 right-0 w-[50%] h-[80%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 2: Span 1 (Light Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อม<br />อาร์กอน (TIG)
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 3: Span 1 (Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องเชื่อม<br />ซีโอทู (MIG)
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 4: Span 2 (Light Style) -->
          <a href="#" class="md:col-span-2 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                ลวดเชื่อมทุกประเภท<br />พร้อมส่งทั่วประเทศ
              </h3>
            </div>
            <div class="absolute -bottom-10 -right-10 w-[60%] h-[120%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 5: Span 1 (Image Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#e8e8ed] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อุปกรณ์ตัด<br />แก๊ส/พลาสม่า
              </h3>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-gray-300 to-transparent"></div>
          </a>

          <!-- Card 6: Span 1 (Dark Style) -->
          <a href="#" class="col-span-1 relative w-full h-full bg-[#1c1c1e] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-white font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                อะไหล่<br />ปืนเชื่อมต่างๆ
              </h3>
            </div>
            <div class="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-tl from-gray-700 to-transparent rounded-tl-[100px] opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
          </a>

          <!-- Card 7: Span 1 (Light Style) -->
          <a href="#" class="col-span-1 md:col-span-2 lg:col-span-1 relative w-full h-full bg-[#f5f5f7] rounded-[24px] lg:rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
              <h3 class="text-gray-900 font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-snug group-hover:-translate-y-1 transition-transform duration-300">
                เครื่องมือช่าง<br />และเซฟตี้
              </h3>
            </div>
            <div class="absolute -bottom-4 -right-4 w-[80%] h-[80%] bg-gray-200 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
          </a>

        </div>
      </section>
      
      """
    
    new_content = content[:start_idx] + bento_html + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(new_content)
        print("Success")
else:
    print("Markers not found.")
