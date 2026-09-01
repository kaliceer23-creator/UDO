const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

// --- 1. Replace HTML ---
const htmlRegex = /<!-- State 2: Expanded AI Input \(Modern Chat Style\) -->[\s\S]*?(?=\n    <\/div>\n  <\/div>\n\n`;)/;
const newHTML = `<!-- State 2: Expanded AI Input (Modern Chat Style) -->
      <div id="dock-input-state" class="absolute inset-0 w-full h-full flex items-center px-2 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 transform translate-x-12 pointer-events-none">
        
        <!-- Cancel/Close Button (<) -->
        <button id="dock-cancel-btn" class="text-gray-500 hover:text-black p-2 transition-colors shrink-0 rounded-full mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- AI Icon (Thin Magnifying Glass only) -->
        <div class="relative flex items-center justify-center shrink-0 mr-1.5 md:mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke-width="1.2">
            <path stroke="#1d1d1f" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        
        <!-- Modern Input Field -->
        <input type="text" id="dock-ai-input" placeholder="ถาม UDO AI..." class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[16px] md:text-[17px] text-gray-900 font-normal placeholder-black w-full h-full py-2" autocomplete="off" />
        
        <!-- Action Buttons Wrapper (Mic & Send) -->
        <div class="relative w-[32px] h-[32px] flex items-center justify-center shrink-0 ml-1 mr-2 md:ml-2 md:mr-3">
          
          <!-- Microphone Button (Default) -->
          <button id="dock-mic-btn" class="absolute flex items-center justify-center w-full h-full text-gray-400 hover:text-black transition-all duration-300 opacity-100 scale-100 pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>

          <!-- Modern Send Button (Hidden by default) -->
          <button id="dock-send-btn" class="absolute flex items-center justify-center bg-brand-red hover:bg-[#c91d20] active:scale-95 text-white w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full transition-all duration-300 shadow-md opacity-0 scale-75 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[14px] h-[14px] md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        </div>

      </div>`;

content = content.replace(htmlRegex, newHTML);

// --- 2. Replace JS ---
const jsRegex = /\/\/ --- Fluid Framer-like Mobile Dock AI Search Logic ---[\s\S]*?(?=\}\n\n\}, 100\);\n)/;
const newJS = `// --- Fluid Framer-like Mobile Dock AI Search Logic ---
  const dockAiBtn = document.getElementById('dock-ai-btn');
  const dockDefaultState = document.getElementById('dock-default-state');
  const dockInputState = document.getElementById('dock-input-state');
  const dockAiInput = document.getElementById('dock-ai-input');
  const dockCancelBtn = document.getElementById('dock-cancel-btn');
  const mobileBottomDock = document.getElementById('mobile-bottom-dock');
  const dockSendBtn = document.getElementById('dock-send-btn');
  const dockMicBtn = document.getElementById('dock-mic-btn');

  if (dockAiBtn && dockDefaultState && dockInputState && dockCancelBtn && mobileBottomDock) {
    
    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('min-w-[330px]', 'md:min-w-[360px]', 'w-fit');
      mobileBottomDock.classList.add('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]');
      
      dockDefaultState.classList.remove('opacity-100', 'translate-x-0');
      dockDefaultState.classList.add('opacity-0', '-translate-x-8', 'pointer-events-none');
      
      dockInputState.classList.remove('opacity-0', 'translate-x-12', 'pointer-events-none');
      dockInputState.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
      
      setTimeout(() => dockAiInput.focus(), 150);
    };

    const closeAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]');
      mobileBottomDock.classList.add('min-w-[330px]', 'md:min-w-[360px]', 'w-fit');
      
      dockInputState.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
      dockInputState.classList.add('opacity-0', 'translate-x-12', 'pointer-events-none');
      
      dockDefaultState.classList.remove('opacity-0', '-translate-x-8', 'pointer-events-none');
      dockDefaultState.classList.add('opacity-100', 'translate-x-0');
      
      dockAiInput.value = ''; 
      
      if (dockSendBtn && dockMicBtn) {
        dockMicBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
        dockMicBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        
        dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
        dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
      }
    };

    dockAiBtn.addEventListener('click', openAiSearch);
    dockCancelBtn.addEventListener('click', closeAiSearch);

    // Cross-fade Mic and Send button based on input
    if (dockAiInput && dockSendBtn && dockMicBtn) {
      dockAiInput.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
          dockMicBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
          dockMicBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
          
          dockSendBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        } else {
          dockMicBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
          dockMicBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
          
          dockSendBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
          dockSendBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        }
      });
    }
  }`;

content = content.replace(jsRegex, newJS);

fs.writeFileSync('frontend/src/main.js', content, 'utf8');
console.log("Mic icon implemented successfully.");
