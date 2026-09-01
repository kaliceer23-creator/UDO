const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('// --- Mobile Dock AI Search Logic ---'));

if (startIndex !== -1) {
    const newJS = `  // --- Fluid Framer-like Mobile Dock AI Search Logic ---
  const dockAiBtn = document.getElementById('dock-ai-btn');
  const dockDefaultState = document.getElementById('dock-default-state');
  const dockInputState = document.getElementById('dock-input-state');
  const dockAiInput = document.getElementById('dock-ai-input');
  const dockCancelBtn = document.getElementById('dock-cancel-btn');
  const mobileBottomDock = document.getElementById('mobile-bottom-dock');

  if (dockAiBtn && dockDefaultState && dockInputState && dockCancelBtn && mobileBottomDock) {
    
    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      // 1. Expand the dock width smoothly
      mobileBottomDock.classList.remove('min-w-[320px]', 'w-fit');
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
      mobileBottomDock.classList.add('min-w-[320px]', 'w-fit');
      
      // 2. Hide input state
      dockInputState.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
      dockInputState.classList.add('opacity-0', 'translate-x-12', 'pointer-events-none');
      
      // 3. Show default buttons
      dockDefaultState.classList.remove('opacity-0', '-translate-x-8', 'pointer-events-none');
      dockDefaultState.classList.add('opacity-100', 'translate-x-0');
      
      dockAiInput.value = ''; // Clear input
    };

    dockAiBtn.addEventListener('click', openAiSearch);
    dockCancelBtn.addEventListener('click', closeAiSearch);
  }`;

    lines.splice(startIndex, 32, newJS);
    content = lines.join('\n');
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Updated Dock JS successfully.");
} else {
    console.log("Could not find startIndex");
}
