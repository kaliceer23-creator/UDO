const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /<!-- Sticky Right Buttons \(Why UDO & LINE\) -->[\s\S]*?<!-- Modern Fluid Bottom Dock \(UDO Custom Framer-style\) -->/;

const newContainer = `<!-- Sticky Right Buttons (Why UDO & LINE) -->
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
      <a href="#" class="w-[90px] h-[90px] md:w-[108px] md:h-[108px] bg-[#E12427] hover:bg-[#c41f22] rounded-full flex flex-col items-center justify-center shadow-[0_8px_16px_rgba(225,36,39,0.15)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>
    
    <!-- Floating LINE Button (Bottom Right) -->
    <a href="#" class="w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-[#E12427] rounded-full border-[3px] border-white shadow-[0_6px_16px_rgba(225,36,39,0.15)] flex items-center justify-center hover:scale-110 hover:shadow-[0_8px_20px_rgba(225,36,39,0.2)] transition-all duration-300 cursor-pointer relative">
      <svg viewBox="0 0 24 24" class="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
        <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.62 1.44 4.94 3.71 6.37.47.3.56.88.42 1.4l-.45 1.7c-.12.44.36.78.74.52 1.41-.95 4-2.73 5.42-3.41.28-.14.58-.2.88-.2h.28C17.52 16.88 22 13.08 22 10.5 22 5.8 17.52 2 12 2z"/>
      </svg>
      <span class="absolute font-black text-[#E12427] text-[10px] md:text-[11px] tracking-tight" style="margin-top:-2px;">LINE</span>
    </a>
  </div>

  <!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->`;

if (content.match(regex)) {
    content = content.replace(regex, newContainer);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated LINE button text and reduced shadows.");
} else {
    console.log("Could not find the target HTML block.");
}
