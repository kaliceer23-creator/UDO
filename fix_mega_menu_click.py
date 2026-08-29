import re

def update_menu(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update HTML classes and add IDs
    
    # Remove group class from container
    content = content.replace('group static"', 'static"')
    
    # Add id to button and replace hover classes on icons
    old_btn_start = '<div class="cursor-pointer text-black/90 hover:text-brand-red transition-colors flex items-center justify-center p-2 -ml-2">'
    new_btn_start = '<div id="desktop-menu-btn" class="cursor-pointer text-black/90 hover:text-brand-red transition-colors flex items-center justify-center p-2 -ml-2">'
    content = content.replace(old_btn_start, new_btn_start)
    
    # Hamburger icon: w-7 h-7 group-hover:hidden -> id="desktop-menu-icon-hamburger" w-7 h-7 block
    content = content.replace('class="w-7 h-7 group-hover:hidden"', 'id="desktop-menu-icon-hamburger" class="w-7 h-7 block"')
    
    # Close icon: w-7 h-7 hidden group-hover:block -> id="desktop-menu-icon-close" w-7 h-7 hidden
    content = content.replace('class="w-7 h-7 hidden group-hover:block text-brand-green"', 'id="desktop-menu-icon-close" class="w-7 h-7 hidden text-brand-green"')
    
    # Mega Menu: class="hidden lg:group-hover:flex ... -> id="desktop-mega-menu" class="hidden absolute ... (we will use JS to add flex)
    content = content.replace('class="hidden lg:group-hover:flex absolute top-[100%]', 'id="desktop-mega-menu" class="hidden absolute top-[100%]')

    # 2. Append JS
    js_code = """
// --- Mega Menu Click Logic ---
setTimeout(() => {
  const menuBtn = document.getElementById('desktop-menu-btn');
  const iconHamburger = document.getElementById('desktop-menu-icon-hamburger');
  const iconClose = document.getElementById('desktop-menu-icon-close');
  const megaMenu = document.getElementById('desktop-mega-menu');

  if (menuBtn && megaMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = megaMenu.classList.contains('hidden');
      
      if (isHidden) {
        // Open menu
        megaMenu.classList.remove('hidden');
        megaMenu.classList.add('flex');
        iconHamburger.classList.remove('block');
        iconHamburger.classList.add('hidden');
        iconClose.classList.remove('hidden');
        iconClose.classList.add('block');
      } else {
        // Close menu
        megaMenu.classList.add('hidden');
        megaMenu.classList.remove('flex');
        iconClose.classList.remove('block');
        iconClose.classList.add('hidden');
        iconHamburger.classList.remove('hidden');
        iconHamburger.classList.add('block');
      }
    });

    // Optional: Click outside to close
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !megaMenu.contains(e.target) && !megaMenu.classList.contains('hidden')) {
        megaMenu.classList.add('hidden');
        megaMenu.classList.remove('flex');
        iconClose.classList.remove('block');
        iconClose.classList.add('hidden');
        iconHamburger.classList.remove('hidden');
        iconHamburger.classList.add('block');
      }
    });
  }
}, 100);
"""
    # Append if not already there
    if "Mega Menu Click Logic" not in content:
        content += js_code

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath} for click behavior.")

update_menu('/Users/aliceer/UDO/frontend/src/main.js')
update_menu('/Users/aliceer/UDO/frontend/src/product.js')

