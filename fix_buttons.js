const fs = require('fs');
const files = ['frontend/src/main.js', 'frontend/src/category.js', 'frontend/src/product.js'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the start of Sticky Right Buttons
  const startMarker = '<!-- Sticky Right Buttons (Why UDO & LINE) -->';
  const endMarker = '<!-- Fixed Bottom Dock (UDO Custom) -->';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const cleanBlock = `<!-- Sticky Right Buttons (Why UDO & LINE) -->
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
      <a href="#" class="w-[90px] h-[90px] md:w-[108px] md:h-[108px] bg-[#E12427] hover:bg-[#c41f22] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(181,56,50,0.25)] transition-transform hover:scale-105 duration-300">
        <span class="text-white text-[14px] md:text-[17px] leading-[1.3] text-center font-medium">ทำไมต้อง<br>ซื้อกับ<br>UDO</span>
      </a>
    </div>
  </div>
  
  `;
    
    const newContent = content.substring(0, startIndex) + cleanBlock + content.substring(endIndex);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});
