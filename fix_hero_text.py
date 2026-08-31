import re

filepath = '/Users/aliceer/UDO/frontend/src/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace Slide 1 and Slide 2 with the versions containing the text overlays, while keeping the grid auto-height img.
pattern = re.compile(r'<!-- Slide 1 -->.*?<!-- Navigation Arrows', re.DOTALL)

new_slides = """<!-- Slide 1 -->
        <div class="col-start-1 row-start-1 w-full opacity-100 z-10 transition-opacity duration-300 ease-in-out relative">
          <img src="/images/banners/Banner_0.png" alt="Banner 1" class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] object-cover object-center block" />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          
          <!-- Text Content -->
          <div class="absolute inset-0 z-10 w-full h-full max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center pointer-events-none">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left pointer-events-auto">
              <h1 class="text-white font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ผู้เชี่ยวชาญ<br />ด้านงานเชื่อม
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                รองรับงานโครงการทุกระดับ<br />ช่วยลดต้นทุน เพิ่มประสิทธิภาพ
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 py-2 md:py-2.5 text-[14px] md:text-[15px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-sm">
                ขอใบเสนอราคา
              </a>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="col-start-1 row-start-1 w-full opacity-0 z-0 transition-opacity duration-300 ease-in-out relative">
          <img src="/images/banners/Banner_0.png" alt="Banner 2" class="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] object-cover object-center block" />
          
          <div class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent z-0"></div>
          
          <div class="absolute inset-0 z-10 w-full h-full max-w-[1250px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center pointer-events-none">
            <div class="max-w-2xl ml-auto md:mr-10 lg:mr-20 text-left pointer-events-auto">
              <h1 class="text-white font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight">
                ลวดเชื่อมคุณภาพ<br />ระดับโลก
              </h1>
              <p class="text-white/95 text-[18px] md:text-[20px] lg:text-[24px] font-medium mb-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-[1.5]">
                มาตรฐานอุตสาหกรรมสากล<br />พร้อมสต็อกสินค้าพร้อมส่งทันที
              </p>
              <a href="#" class="inline-flex items-center justify-center px-6 py-2 md:py-2.5 text-[14px] md:text-[15px] font-bold text-white bg-brand-green hover:bg-[#8eb543] rounded-full transition-colors duration-300 shadow-sm">
                ดูสินค้าทั้งหมด
              </a>
            </div>
          </div>
        </div>

        
      </div>

      <!-- Navigation Arrows"""

# We must be careful to only replace what's between <!-- Slide 1 --> and <!-- Navigation Arrows
start_marker = "<!-- Slide 1 -->"
end_marker = "      <!-- Navigation Arrows"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_slides + content[end_idx + len(end_marker):]
else:
    print("Could not find markers!")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored text overlays to the banners")
