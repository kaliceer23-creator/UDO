import './style.css';
import { hydrateProduct } from './product_hydrate.js';







// --- Mega Menu Click Logic ---
  const menuBtn = document.getElementById('category-menu-btn');
  const menuArrow = document.getElementById('category-menu-arrow');
  const megaMenu = document.getElementById('desktop-mega-menu');
  const overlay = document.getElementById('mega-menu-overlay');

  const closeMenu = () => {
    megaMenu.classList.add('hidden');
    megaMenu.classList.remove('flex');
    if (menuArrow) menuArrow.classList.remove('rotate-180');
    if (overlay) overlay.classList.add('hidden');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    if (menuArrow) menuArrow.classList.add('rotate-180');
    if (overlay) overlay.classList.remove('hidden');
  };

  if (menuBtn && megaMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = megaMenu.classList.contains('hidden');
      if (isHidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }



// --- Read More Logic ---
  const container = document.getElementById('rich-content-container');
  const fade = document.getElementById('rich-content-fade');
  const btn = document.getElementById('btn-read-more');
  const icon = document.getElementById('read-more-icon');
  const text = document.getElementById('read-more-text');

  if (btn && container && fade) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = container.style.maxHeight !== '' && container.style.maxHeight !== '500px';
      
      if (isExpanded) {
        // Collapse
        container.style.maxHeight = '500px';
        fade.classList.remove('h-[80px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[200px]', 'from-white', 'via-white/80');
        text.innerText = 'อ่านรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');
      } else {
        // Expand
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[200px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[80px]', 'from-transparent', 'via-transparent');
        text.innerText = 'ย่อรายละเอียด';
        icon.classList.add('rotate-180');
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.style.maxHeight !== '500px') {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }
    });
  }

// Script สำหรับทำ Fade Effect ให้กับช่องค้นหา
const searchPlaceholders = [
  "อุปกรณ์เสริม",
  "ตู้เชื่อม MIG / TIG...",
  "ลวดเชื่อมสเตนเลส...",
  "หน้ากากเชื่อมปรับแสงอัตโนมัติ...",
  "ชุดตัดแก๊ส / พลาสม่า...",
  "ใบตัดเหล็ก ใบเจียร...",
  "อะไหล่ปืนเชื่อมต่างๆ...",
  "ถุงมือหนังงานเชื่อม..."
];

const searchInput = document.getElementById('searchInput');
const animatedPlaceholder = document.getElementById('animatedPlaceholder');

if (searchInput && animatedPlaceholder) {
  let wordIndex = 0;
  animatedPlaceholder.textContent = searchPlaceholders[0];

  setInterval(() => {
    wordIndex = (wordIndex + 1) % searchPlaceholders.length;
    animatedPlaceholder.textContent = searchPlaceholders[wordIndex];
  }, 4500);

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      animatedPlaceholder.style.display = 'none';
    } else {
      animatedPlaceholder.style.display = 'block';
    }
  });
}



hydrateProduct();

// --- Fluid Framer-like Mobile Dock AI Search Logic ---
setTimeout(() => {
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
    const defaultShadow = ['shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)]', 'hover:shadow-[0_12px_40px_rgba(225,36,39,0.25)]'];
    const activeRedShadow = ['shadow-[0_0px_40px_rgba(225,36,39,0.35)]', 'hover:shadow-[0_0px_50px_rgba(225,36,39,0.45)]', 'border-white/50'];
    const defaultBorder = ['border-white/50'];

    const openAiSearch = (e) => {
      if(e) e.preventDefault();
      
      mobileBottomDock.classList.remove('w-[350px]', 'md:w-[380px]', ...defaultShadow, ...defaultBorder);
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
      mobileBottomDock.classList.add('w-[350px]', 'md:w-[380px]', ...defaultShadow, ...defaultBorder);
      
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
  }
}, 500); // delay to ensure dock.html is loaded via Vite plugin or fetch
