import re

def fix_product_overlay(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove the overlay from inside sticky
    content = re.sub(r'\s*<!-- Mega Menu Overlay -->\s*<div id="mega-menu-overlay".*?</div>\n', '\n', content)

    # Insert before <div class="sticky top-0 z-[60] w-full">
    new_overlay = '\n  <!-- Mega Menu Overlay -->\n  <div id="mega-menu-overlay" class="hidden fixed inset-0 bg-black/30 z-[40] cursor-pointer"></div>\n  '
    content = content.replace('<div class="sticky top-0 z-[60] w-full">', new_overlay + '<div class="sticky top-0 z-[60] w-full">')
    
    with open(filepath, 'w') as f:
        f.write(content)
    print("Fixed product.js")

fix_product_overlay('/Users/aliceer/UDO/frontend/src/product.js')

