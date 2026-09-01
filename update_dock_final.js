const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// 1. Replace the State 2 HTML completely
const state2Regex = /<!-- State 2: Expanded AI Input \(Modern Chat Style\) -->[\s\S]*?(?=<\/div>\n    <\/div>\n  <\/div>\n\n  <!-- 3\. พื้นที่เนื้อหาหลัก)/;

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

if (content.match(state2Regex)) {
    content = content.replace(state2Regex, newHTML);
} else {
    console.log("Could not find HTML to replace");
}

// 2. Replace the JS
const jsRegex = /\/\/ --- Fluid Framer-like Mobile Dock AI Search Logic ---[\s\S]*?(?=\}\n\n\}, 100\);\n)/;

const newJS = `// --- Fluid Framer-like Mobile Dock AI Search Logic ---
  const dockAiBtn = document.getElementById('dock-ai-btn');
  const dockDefaultState = document.getElementById('dock-default-state');
  const dockInputState = document.getElementById('dock-input-state');
  const dockAiInput = document.getElementById('dock-ai-input');
  const dockCancelBtn = document.getElementById('dock-cancel-btn');
  const mobileBottomDock = document.getElementById('mobile-bottom-dock');
  const dockSendBtn = document.getElementById('dock-send-btn');

  if (dockAiBtn && dockDefaultState && dockInputState && dockCancelBtn && mobileBottomDock) {
    
    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      // 1. Expand the dock width smoothly
      mobileBottomDock.classList.remove('min-w-[330px]', 'md:min-w-[360px]', 'w-fit');
      mobileBottomDock.classList.add('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]');
      
      // 2. Slide out & fade out default buttons
      dockDefaultState.classList.remove('opacity-100', 'translate-x-0');
      dockDefaultState.classList.add('opacity-0', '-translate-x-8', 'pointer-events-none');
      
      // 3. Slide in & fade in the input state
      dockInputState.classList.remove('opacity-0', 'translate-x-12', 'pointer-events-none');
      dockInputState.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
      
      // 4. Focus input automatically after transition starts
      setTimeout(() => dockAiInput.focus(), 150);
    };

    const closeAiSearch = (e) => {
      if(e) e.preventDefault();
      
      // 1. Shrink dock width back
      mobileBottomDock.classList.remove('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]');
      mobileBottomDock.classList.add('min-w-[330px]', 'md:min-w-[360px]', 'w-fit');
      
      // 2. Hide input state
      dockInputState.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
      dockInputState.classList.add('opacity-0', 'translate-x-12', 'pointer-events-none');
      
      // 3. Show default buttons
      dockDefaultState.classList.remove('opacity-0', '-translate-x-8', 'pointer-events-none');
      dockDefaultState.classList.add('opacity-100', 'translate-x-0');
      
      // 4. Reset input and send button
      dockAiInput.value = ''; 
      if (dockSendBtn) {
        dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
        dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
      }
    };

    dockAiBtn.addEventListener('click', openAiSearch);
    dockCancelBtn.addEventListener('click', closeAiSearch);

    // Show send button only when typing
    if (dockAiInput && dockSendBtn) {
      dockAiInput.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
          dockSendBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        } else {
          dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        }
      });
    }
  }`;

if (content.match(jsRegex)) {
    content = content.replace(jsRegex, newJS);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated JS successfully.");
} else {
    console.log("Could not find JS to replace");
}
