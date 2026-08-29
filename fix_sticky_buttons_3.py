import re

with open('/Users/aliceer/UDO/frontend/src/main.js', 'r') as f:
    content = f.read()

start_marker = '  <!-- Sticky Right Buttons (Why UDO & LINE) -->'
end_marker = '  </div>\n'

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    new_buttons = """  <!-- Sticky Right Buttons (Why UDO & LINE) -->
  <div class="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[100] flex flex-col items-center gap-3 md:gap-4">
    
    <!-- Why UDO Button -->
    <div class="relative group cursor-pointer" id="whyUdoBtnContainer">
      <!-- Close Button (X) -->
      <button onclick="document.getElementById('whyUdoBtnContainer').style.display='none'" class="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-6 h-6 md:w-8 md:h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors z-10 border-[1.5px] border-white/30 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Main Circle Button (ย่อลงมานิดนึง เป็น 108px) -->
      <a href="#" class="w-[90px] h-[90px] md:w-[108px] md:h-[108px] bg-[#E32626] hover:bg-[#c92020] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(227,38,38,0.25)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>

    <!-- LINE Button -->
    <a href="#" class="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-[#E32626] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[1px] border-white/80">
      <!-- LINE SVG Icon แบบสร้างใหม่ (ใช้ Text จริงๆ การันตีว่าอ่านออก 100%) -->
      <svg class="w-9 h-9 md:w-11 md:h-11 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ลูกโป่งสีขาว -->
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992z" fill="white"/>
        <!-- ตัวหนังสือ LINE ข้างใน (เปลี่ยนสีตาม hover ได้ด้วย) -->
        <text x="12" y="13.2" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="7.5" fill="#E32626" text-anchor="middle" class="group-hover:fill-[#00B900] transition-colors duration-300">LINE</text>
      </svg>
    </a>
    
  </div>\n"""
    
    content = content[:start_idx] + new_buttons + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Fixed buttons successfully again.")
else:
    print("Could not find the start marker.")
