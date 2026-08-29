import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_marker = '  <!-- Sticky Right Buttons (Why UDO & LINE) -->'
end_marker = '  </div>\n'

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    new_buttons = """  <!-- Sticky Right Buttons (Why UDO & LINE) -->
  <div class="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[100] flex flex-col items-center gap-3">
    
    <!-- Why UDO Button -->
    <div class="relative group cursor-pointer" id="whyUdoBtnContainer">
      <!-- Close Button (X) -->
      <button onclick="document.getElementById('whyUdoBtnContainer').style.display='none'" class="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors z-10 border-[1.5px] border-white/30 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Main Circle Button -->
      <!-- ขยายปุ่มให้ใหญ่ขึ้น (w-100px) และเปลี่ยนตัวหนังสือให้บางลง (font-medium) -->
      <a href="#" class="w-[84px] h-[84px] md:w-[100px] md:h-[100px] bg-[#E32626] hover:bg-[#c92020] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(227,38,38,0.2)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[13px] md:text-[15px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>

    <!-- LINE Button -->
    <!-- เพิ่มเส้นขอบสีขาว (border-2 border-white) และขยายปุ่มนิดนึง -->
    <a href="#" class="w-[52px] h-[52px] md:w-[60px] md:h-[60px] bg-[#E32626] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[2px] border-white">
      <!-- LINE SVG Icon (ขยายขนาดจาก w-8 เป็น w-10 เพื่อให้คำว่า LINE ข้างในอ่านออกชัดเจนขึ้น) -->
      <svg class="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zM8.344 13.56H6.173c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.171c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H6.697v1.865h1.647c.29 0 .524.234.524.523v1.308c0 .29-.234.524-.524.524H8.344zm3.924 0h-1.646c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h1.646c.29 0 .524.234.524.523v4.48c0 .29-.234.524-.524.524zm4.184 0h-1.288l-1.921-2.617v2.093c0 .29-.234.524-.524.524h-1.647c-.289 0-.523-.234-.523-.524v-4.48c0-.289.234-.523.523-.523h1.289l1.92 2.617V8.553c0-.289.234-.523.524-.523h1.647c.289 0 .523.234.523.523v4.48c0 .29-.234.524-.523.524zm4.07 0h-2.17c-.29 0-.524-.234-.524-.524v-4.48c0-.289.234-.523.524-.523h2.17c.289 0 .523.234.523.523v1.308c0 .29-.234.524-.523.524h-1.646v1.08h1.646c.289 0 .523.234.523.524v1.308c0 .29-.234.524-.523.524h-1.646v1.308c0 .29.234.524.523.524h2.17c.289 0 .524.234.524.524z" />
      </svg>
    </a>
    
  </div>\n"""
    
    content = content[:start_idx] + new_buttons + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Fixed buttons successfully.")
else:
    print("Could not find the start marker.")
