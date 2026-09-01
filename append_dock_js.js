const fs = require('fs');
let content = fs.readFileSync('frontend/src/main.js', 'utf8');

const regex = /  \}\n\}, 100\);\n\n\n$/;

const newJS = `  }

  // --- Mobile Dock AI Search Logic ---
  const dockAiBtn = document.getElementById('dock-ai-btn');
  const dockDefaultState = document.getElementById('dock-default-state');
  const dockInputState = document.getElementById('dock-input-state');
  const dockAiInput = document.getElementById('dock-ai-input');
  const dockCancelBtn = document.getElementById('dock-cancel-btn');
  const mobileBottomDock = document.getElementById('mobile-bottom-dock');

  if (dockAiBtn && dockDefaultState && dockInputState && dockCancelBtn) {
    dockAiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Hide default buttons, show input state
      dockDefaultState.classList.add('hidden');
      dockInputState.classList.remove('hidden');
      dockInputState.classList.add('flex');
      
      // Expand the dock wrapper to a wider size (90vw, max 400px)
      mobileBottomDock.classList.remove('w-auto');
      mobileBottomDock.classList.add('w-[90vw]', 'max-w-[400px]');
      
      // Focus the input
      setTimeout(() => dockAiInput.focus(), 50);
    });

    dockCancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Hide input state, show default buttons
      dockInputState.classList.add('hidden');
      dockInputState.classList.remove('flex');
      dockDefaultState.classList.remove('hidden');
      
      // Revert dock wrapper size
      mobileBottomDock.classList.add('w-auto');
      mobileBottomDock.classList.remove('w-[90vw]', 'max-w-[400px]');
      
      dockAiInput.value = ''; // Clear input
    });
  }

}, 100);
`;

if (content.match(regex)) {
    content = content.replace(regex, newJS);
    fs.writeFileSync('frontend/src/main.js', content, 'utf8');
    console.log("Appended JS successfully.");
} else {
    console.log("Could not find the target text.");
}
