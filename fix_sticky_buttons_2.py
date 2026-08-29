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
      
      <!-- Main Circle Button (ใหญ่ขึ้น ฟอนต์ใหญ่ขึ้น) -->
      <a href="#" class="w-[96px] h-[96px] md:w-[115px] md:h-[115px] bg-[#E32626] hover:bg-[#c92020] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(227,38,38,0.25)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>

    <!-- LINE Button -->
    <!-- ขอบขาวบางลง (border-[1px] border-white/80) -->
    <a href="#" class="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-[#E32626] hover:bg-[#00B900] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 duration-300 relative group border-[1px] border-white/80">
      <!-- LINE SVG Icon (เปลี่ยนมาใช้ FontAwesome Path ที่คมชัดและตัวหนังสือไม่บี้) -->
      <svg class="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" viewBox="0 0 496 512" fill="currentColor">
        <path d="M248 8C111.1 8 0 99.1 0 211.8c0 51.5 22.3 98.4 59.8 135.5 13.9 13.8 15.3 19.3 11.2 37.1-3.6 15.9-10.3 35.8-13.6 47.9-1.9 6.8 5.6 9.8 10.3 7 10.3-6 45.4-26.3 64.9-42.3 10.3-8.4 19.2-12.8 30.6-10.7 27.6 5.1 56.6 7.9 86.8 7.9 136.9 0 248-91.1 248-203.8S384.9 8 248 8zM161.4 274.5c0 6.6-5.4 12-12 12h-47c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h47c6.6 0 12 5.4 12 12v12h-35v19h35c6.6 0 12 5.4 12 12v12zm68.3 0c0 6.6-5.4 12-12 12h-17.7c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h17.7c6.6 0 12 5.4 12 12v88zm81.4 0c0 6.6-5.4 12-12 12h-18l-32.9-46.7v34.7c0 6.6-5.4 12-12 12h-17.7c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h18l32.9 46.7V186.5c0-6.6 5.4-12 12-12h17.7c6.6 0 12 5.4 12 12v88zm83.3-33h-35v19h35c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12h-47c-6.6 0-12-5.4-12-12v-88c0-6.6 5.4-12 12-12h47c6.6 0 12 5.4 12 12v12h-35v19h35c6.6 0 12 5.4 12 12v12z"/>
      </svg>
    </a>
    
  </div>\n"""
    
    content = content[:start_idx] + new_buttons + content[end_idx:]
    with open('/Users/aliceer/UDO/frontend/src/main.js', 'w') as f:
        f.write(content)
    print("Fixed buttons successfully again.")
else:
    print("Could not find the start marker.")
