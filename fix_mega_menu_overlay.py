import re

def add_overlay(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Insert the overlay div right before the <header> or after it.
    # It's safer to put it right before <header>
    overlay_html = '\n    <!-- Mega Menu Overlay -->\n    <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/50 z-[50] cursor-pointer"></div>\n'
    
    # Check if it already exists
    if 'id="mega-menu-overlay"' not in content:
        content = content.replace('<header class="', overlay_html + '    <header class="')
    
    # 2. Update the JS logic.
    # We need to replace the old JS with the new JS that includes the overlay logic.
    
    # Old JS to replace:
    old_js_start = "// --- Mega Menu Click Logic ---"
    old_js_end = "}, 100);"
    
    if old_js_start in content and old_js_end in content:
        start_idx = content.find(old_js_start)
        end_idx = content.find(old_js_end) + len(old_js_end)
        
        new_js = """// --- Mega Menu Click Logic ---
setTimeout(() => {
  const menuBtn = document.getElementById('desktop-menu-btn');
  const iconHamburger = document.getElementById('desktop-menu-icon-hamburger');
  const iconClose = document.getElementById('desktop-menu-icon-close');
  const megaMenu = document.getElementById('desktop-mega-menu');
  const overlay = document.getElementById('mega-menu-overlay');

  const closeMenu = () => {
    megaMenu.classList.add('hidden');
    megaMenu.classList.remove('flex');
    iconClose.classList.remove('block');
    iconClose.classList.add('hidden');
    iconHamburger.classList.remove('hidden');
    iconHamburger.classList.add('block');
    if(overlay) overlay.classList.add('hidden');
  };

  const openMenu = () => {
    megaMenu.classList.remove('hidden');
    megaMenu.classList.add('flex');
    iconHamburger.classList.remove('block');
    iconHamburger.classList.add('hidden');
    iconClose.classList.remove('hidden');
    iconClose.classList.add('block');
    if(overlay) overlay.classList.remove('hidden');
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

    if(overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }
}, 100);"""
        
        content = content[:start_idx] + new_js + content[end_idx:]
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated overlay logic in {filepath}")
    else:
        print(f"Could not find JS logic in {filepath}")

add_overlay('/Users/aliceer/UDO/frontend/src/main.js')
add_overlay('/Users/aliceer/UDO/frontend/src/product.js')

