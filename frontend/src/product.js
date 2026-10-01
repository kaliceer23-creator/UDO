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
    if (menuBtn) menuBtn.classList.remove('bg-white/25');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    if (menuArrow) menuArrow.classList.add('rotate-180');
    if (overlay) overlay.classList.remove('hidden');
    if (menuBtn) menuBtn.classList.add('bg-white/25');
  };

  if (menuBtn && megaMenu) {
    // Mega Menu Sidebar Hover / Tab Switching
    const megaSidebarItems = megaMenu.querySelectorAll('.mega-sidebar-item');
    const megaPanels = megaMenu.querySelectorAll('.mega-panel');

    const activateMegaTab = (tabId) => {
      megaSidebarItems.forEach((item) => {
        const arrow = item.querySelector('.mega-sidebar-arrow');
        if (item.dataset.megaTab === tabId) {
          item.classList.add('bg-brand-green', 'text-white');
          item.classList.remove('text-[#252525]');
          if (arrow) {
            arrow.classList.add('text-white');
            arrow.classList.remove('text-gray-400');
          }
        } else {
          item.classList.remove('bg-brand-green', 'text-white');
          item.classList.add('text-[#252525]');
          if (arrow) {
            arrow.classList.remove('text-white');
            arrow.classList.add('text-gray-400');
          }
        }
      });

      megaPanels.forEach((panel) => {
        if (panel.id === `mega-panel-${tabId}`) {
          panel.classList.remove('hidden');
          panel.classList.add('block');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('block');
        }
      });
    };

    megaSidebarItems.forEach((item) => {
      const tabId = item.dataset.megaTab;
      item.addEventListener('mouseenter', () => {
        activateMegaTab(tabId);
      });
      item.addEventListener('focus', () => {
        activateMegaTab(tabId);
      });
    });

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = megaMenu.classList.contains('hidden');
      if (isHidden) {
        openMenu();
        activateMegaTab('12');
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
    const COLLAPSED_HEIGHT = '300px';

    const checkOverflow = () => {
      if (container.classList.contains('is-expanded')) return;
      if (container.scrollHeight <= 320) {
        fade.style.display = 'none';
        container.style.maxHeight = 'none';
      } else {
        fade.style.display = '';
        container.style.maxHeight = COLLAPSED_HEIGHT;
      }
    };

    window.checkRichContentOverflow = checkOverflow;
    window.addEventListener('load', checkOverflow);
    setTimeout(checkOverflow, 250);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = container.classList.contains('is-expanded');
      
      if (isExpanded) {
        // Collapse
        container.classList.remove('is-expanded');
        container.style.maxHeight = COLLAPSED_HEIGHT;
        fade.classList.remove('h-[60px]', 'from-transparent', 'via-transparent');
        fade.classList.add('h-[140px]', 'from-white', 'via-white/80');
        text.innerText = 'ดูรายละเอียดเพิ่มเติม';
        icon.classList.remove('rotate-180');

        const rect = container.getBoundingClientRect();
        if (rect.top < 0) {
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Expand
        container.classList.add('is-expanded');
        container.style.maxHeight = container.scrollHeight + 'px';
        fade.classList.remove('h-[140px]', 'from-white', 'via-white/80');
        fade.classList.add('h-[60px]', 'from-transparent', 'via-transparent');
        text.innerText = 'ย่อรายละเอียด';
        icon.classList.add('rotate-180');
        // After transition, set to none so it responds to window resize
        setTimeout(() => {
          if(container.classList.contains('is-expanded')) {
             container.style.maxHeight = 'none';
          }
        }, 500);
      }
    });
  }

import './nav_search.js';




hydrateProduct();

import './dock.js';

