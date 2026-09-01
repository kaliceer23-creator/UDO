const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('<!-- Fixed Bottom Dock (UDO Custom) -->'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.trim() === '</div>' && lines[i+2].trim() === '`;');

if (startIndex !== -1 && endIndex !== -1) {
    const newDockHTML = `  <!-- Modern Fluid Bottom Dock (UDO Custom Framer-style) -->
  <div id="mobile-bottom-dock" class="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-white/50 hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-fit min-w-[320px] h-[56px] md:h-[60px] overflow-hidden">
    
    <!-- Relative Wrapper to hold both states overlapping -->
    <div class="relative w-full h-full flex items-center">
      
      <!-- State 1: Default Buttons (Grid/Flex) -->
      <div id="dock-default-state" class="absolute inset-0 w-full h-full flex items-center justify-center gap-1 md:gap-2 px-2 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 transform translate-x-0">
        <!-- Item 1: ถาม UDO AI -->
        <a href="#" id="dock-ai-btn" class="flex flex-col items-center justify-center gap-0.5 group px-3 md:px-4 cursor-pointer h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
          </svg>
          <span class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ถาม UDO AI</span>
        </a>

        <!-- Divider -->
        <div class="w-[1px] h-[24px] bg-gray-200"></div>

        <!-- Item 2: โทรเช็กสต็อก -->
        <a href="#" class="flex flex-col items-center justify-center gap-0.5 group px-3 md:px-4 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">โทรเช็กสต็อก</span>
        </a>

        <!-- Divider -->
        <div class="w-[1px] h-[24px] bg-gray-200"></div>

        <!-- Item 3: ขอใบเสนอราคา -->
        <a href="#" class="flex flex-col items-center justify-center gap-0.5 group px-3 md:px-4 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-[26px] md:h-[26px] group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.4">
            <path stroke="#71C04C" stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M15 11.25h.008v.008H15v-.008z" />
          </svg>
          <span class="text-[13px] md:text-[14px] font-semibold text-gray-800 group-hover:text-brand-red transition-colors whitespace-nowrap tracking-tight leading-none">ขอใบเสนอราคา</span>
        </a>
      </div>

      <!-- State 2: Expanded AI Input (Modern Chat Style) -->
      <div id="dock-input-state" class="absolute inset-0 w-full h-full flex items-center px-2 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 transform translate-x-12 pointer-events-none">
        
        <!-- Cancel/Close Button -->
        <button id="dock-cancel-btn" class="text-gray-400 hover:text-gray-600 p-2.5 transition-colors shrink-0 rounded-full hover:bg-gray-100 mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- AI Icon -->
        <div class="relative flex items-center justify-center shrink-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M19.128 6.554l-.45-1.554-.45 1.554a2.25 2.25 0 00-1.554 1.554l-1.554.45 1.554.45a2.25 2.25 0 001.554 1.554l.45 1.554.45-1.554a2.25 2.25 0 001.554-1.554l1.554-.45-1.554-.45a2.25 2.25 0 00-1.554-1.554z" />
            <path stroke="#E12427" stroke-linecap="round" stroke-linejoin="round" d="M11 14l-1-3-3-1 3-1 1-3 1 3 3 1-3 1-1 3z" opacity="0.5"/>
          </svg>
        </div>
        
        <!-- Modern Input Field -->
        <input type="text" id="dock-ai-input" placeholder="ถาม UDO AI เพื่อหาสินค้า..." class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[16px] md:text-[17px] text-gray-900 font-medium placeholder-gray-400 w-full h-full py-2" autocomplete="off" />
        
        <!-- Modern Send Button (Black Pill with Arrow) -->
        <button class="bg-[#1d1d1f] hover:bg-[#333336] active:scale-95 text-white w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>

      </div>
    </div>
  </div>`;
    
    lines.splice(startIndex, endIndex - startIndex + 1, newDockHTML);
    content = lines.join('\n');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated HTML successfully.");
} else {
    console.log("Error finding bounds", startIndex, endIndex);
}
