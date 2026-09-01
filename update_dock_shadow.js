const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

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
    
    // Shadow classes
    const defaultShadow = ['shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)]', 'hover:shadow-[0_12px_40px_rgba(138,195,83,0.2)]'];
    const activeRedShadow = ['shadow-[0_8px_32px_rgba(225,36,39,0.25)]', 'hover:shadow-[0_12px_40px_rgba(225,36,39,0.35)]', 'border-[#ff8585]'];
    const defaultBorder = ['border-gray-200'];

    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('min-w-[330px]', 'md:min-w-[360px]', 'w-fit', ...defaultShadow, ...defaultBorder);
      mobileBottomDock.classList.add('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]', ...activeRedShadow);
      
      dockDefaultState.classList.remove('opacity-100', 'translate-x-0');
      dockDefaultState.classList.add('opacity-0', '-translate-x-8', 'pointer-events-none');
      
      dockInputState.classList.remove('opacity-0', 'translate-x-12', 'pointer-events-none');
      dockInputState.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
      
      setTimeout(() => dockAiInput.focus(), 150);
    };

    const closeAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('!max-w-[95vw]', 'md:!max-w-[600px]', '!w-[95vw]', 'md:!w-[600px]', ...activeRedShadow);
      mobileBottomDock.classList.add('min-w-[330px]', 'md:min-w-[360px]', 'w-fit', ...defaultShadow, ...defaultBorder);
      
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

if (content.match(jsRegex)) {
    content = content.replace(jsRegex, newJS);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated JS for dynamic shadow successfully.");
} else {
    console.log("Could not find JS to replace");
}
