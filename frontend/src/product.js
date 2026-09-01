import './style.css'







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


import { hydrateProduct } from './product_hydrate.js';
hydrateProduct();
