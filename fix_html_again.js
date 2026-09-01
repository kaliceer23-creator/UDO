const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const htmlRegex = /<!-- State 2: Expanded AI Input \(Modern Chat Style\) -->[\s\S]*?(?=\n    <\/div>\n  <\/div>\n\n`;)/;

const newHTML = `<!-- State 2: Expanded AI Input (Modern Chat Style) -->
      <div id="dock-input-state" class="absolute inset-0 w-full h-full flex items-center px-2 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 transform translate-x-12 pointer-events-none">
        
        <!-- Cancel/Close Button (<) -->
        <button id="dock-cancel-btn" class="text-gray-500 hover:text-black p-2 transition-colors shrink-0 rounded-full mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- AI Icon (Thin Magnifying Glass only) -->
        <div class="relative flex items-center justify-center shrink-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke-width="1.2">
            <path stroke="#1d1d1f" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        
        <!-- Modern Input Field (Black placeholder, normal font weight) -->
        <input type="text" id="dock-ai-input" placeholder="ถาม UDO AI..." class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[16px] md:text-[17px] text-gray-900 font-normal placeholder-black w-full h-full py-2" autocomplete="off" />
        
        <!-- Modern Send Button (Hidden by default, shifted left with mr-2) -->
        <button id="dock-send-btn" class="bg-brand-red hover:bg-[#c91d20] active:scale-95 text-white w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center transition-all duration-300 shadow-md shrink-0 ml-2 mr-1 md:mr-2 opacity-0 scale-75 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] h-[14px] md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>

      </div>`;

if (content.match(htmlRegex)) {
    content = content.replace(htmlRegex, newHTML);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated HTML successfully.");
} else {
    console.log("Still could not find HTML to replace");
}
